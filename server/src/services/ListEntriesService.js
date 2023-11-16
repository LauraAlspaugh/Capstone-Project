import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { logger } from "../utils/Logger.js";
import { routinesService } from "./RoutinesService.js"

function _tallyTotal(counts) {
    let total = 0;
    counts.forEach(c => total += c.count)
    return total
}

async function _updateUsageCount(moveId) {
    const ObjectId = require('mongoose').Types.ObjectId;
    const counts = await dbContext.ListEntries.aggregate([
        { $match: { moveId: ObjectId(moveId) } },
        {
            "$group": {
                "_id": { "routineId": "$routineId" },
                "routineId": { "$first": "$routineId" },
                "count": { "$sum": 1 }
            }
        },
        { "$project": { "_id": 0 } }
    ])
    const totals = _tallyTotal(counts);
    await dbContext.Moves.findOneAndUpdate(
        { _id: moveId },
        {
            $set: {
                useageCount: counts.length,
                totalCount: totals
            }
        }
    );
}

class ListEntriesService {

    async getListEntries(query) {
        const listEntries = await dbContext.ListEntries.find(query)
            .populate('creator', 'name picture')
            .populate('move', 'englishName sanskritName imgUrl duration bodyPart benefits level description ')
        return listEntries
    }

    async getListEntryById(listEntryId) {
        const listEntry = await dbContext.ListEntries.findById(listEntryId)
            .populate('move', 'englishName sanskritName imgUrl duration bodyPart benefits level description')
        if (!listEntry) {
            throw new BadRequest('This is not a valid listEntry')
        } return listEntry
    }

    async getListEntryByRoutineId(routineId) {
        const listEntries = await dbContext.ListEntries.find({ routineId: routineId })
            .populate('move', 'englishName sanskritName imgUrl duration bodyPart benefits level description')
        listEntries.sort((a, b) => (a.position - b.position));
        return listEntries
    }

    // SECTION 🔽 AUTHENTICATION REQUIRED 🔽

    async createListEntry(listEntryData) {
        const routineId = listEntryData.routineId
        const routineDoc = await dbContext.Routines.findById(routineId)
        if (routineDoc.creatorId.toString() != listEntryData.creatorId) {
            throw new Forbidden('Do not even try it')
        } if (!routineDoc) {
            throw new BadRequest('This is not a routine to be updated')
        }

        const routine = await dbContext.ListEntries.find({ routineId })
        listEntryData.position = routine.length + 1;

        const interval = await dbContext.Moves.find({ englishName: 'Interval' }).lean()
        if (listEntryData.moveId == interval[0]._id.toString()) { listEntryData.transition = true; }

        const move = await dbContext.Moves.findById(listEntryData.moveId);
        listEntryData.duration = move.time;

        const newListEntry = await dbContext.ListEntries.create(listEntryData)
        await newListEntry.populate('move', 'englishName sanskritName imgUrl duration bodyPart level description benefits')
        await _updateUsageCount(newListEntry.moveId)
        return newListEntry
    }

    async editListEntry(listEntryId, userId, listEntryData) {
        const listEntryToBeUpdated = await this.getListEntryById(listEntryId)
        if (listEntryToBeUpdated.creatorId.toString() != userId) {
            throw new Forbidden('Do not even try it')
        }
        if (!listEntryToBeUpdated) {
            throw new BadRequest('This is not a listEntry to be updated')
        }
        listEntryToBeUpdated.name = listEntryData.name || listEntryToBeUpdated.name
        listEntryToBeUpdated.description = listEntryData.description || listEntryToBeUpdated.description
        listEntryToBeUpdated.position = listEntryData.position || listEntryToBeUpdated.position
        listEntryToBeUpdated.duration = listEntryData.duration || listEntryToBeUpdated.duration
        listEntryToBeUpdated.transition = listEntryData.transition != undefined ? listEntryData.transition :
            listEntryToBeUpdated.transition
        await listEntryToBeUpdated.save()
        listEntryToBeUpdated.populate('move', 'englishName sanskritName imgUrl duration bodyPart level')
        return listEntryToBeUpdated
    }

    async editPosition(listEntryData) {
        const routine = await dbContext.Routines.findById(listEntryData[0].routineId);
        logger.log('routine search on edit', routine, listEntryData)
        if (routine.creatorId.toString() != listEntryData.userId) {
            throw new Forbidden('Do not even try it')
        }
        let results = [];
        await listEntryData.forEach(async ({ id, position }) => {
            const result = await dbContext.ListEntries.updateOne(
                { _id: id },
                { $set: { position } }
            )
            results.push(result);
            logger.log('update bulk', { _id: id, position })
        })
        logger.log('results', results)
        return results
    }

    async destroyListEntry(listEntryId, userId) {
        const listEntryToDelete = await this.getListEntryById(listEntryId)
        if (listEntryToDelete.creatorId.toString() != userId) {
            throw new Forbidden('Not your list entry to delete!')
        }
        await listEntryToDelete.delete()
        await _updateUsageCount(listEntryToDelete.moveId)
        return "This list entry has been deleted"
    }

}

export const listEntriesService = new ListEntriesService()