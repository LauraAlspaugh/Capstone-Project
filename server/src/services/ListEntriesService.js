import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
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
        const listEntries = await dbContext.ListEntries.find(query).populate('creator', ' name picture')
        return listEntries
    }

    async getListEntryById(listEntryId) {
        const listEntry = await dbContext.ListEntries.findById(listEntryId).populate('creator', 'name picture')
        if (!listEntry) {
            throw new BadRequest('This is not a valid listEntry')
        } return listEntry
    }

    async getListEntryByRoutineId(routineId) {
        const listEntries = await dbContext.ListEntries.find({ routineId: routineId })
            .populate('creator', 'name picture')
        return listEntries
    }

    // SECTION 🔽 AUTHENTICATION REQUIRED 🔽

    async createListEntry(listEntryData) {
        const newListEntry = await dbContext.ListEntries.create(listEntryData)
        await newListEntry.populate('creator', 'name picture')
        await _updateUsageCount(newListEntry.moveId)
        return newListEntry
    }

    async editListEntry(listEntryId, userId, listEntryData) {
        const listEntryToBeUpdated = await this.getListEntryById(listEntryId)
        if (listEntryToBeUpdated.creatorId.toString() != userId) {
            throw new Forbidden('Do not even try it')
        } if (!listEntryToBeUpdated) {
            throw new BadRequest('This is not a listEntry to be updated')
        }
        listEntryToBeUpdated.name = listEntryData.name || listEntryToBeUpdated.name
        listEntryToBeUpdated.description = listEntryData.description || listEntryToBeUpdated.description
        listEntryToBeUpdated.position = listEntryData.position || listEntryToBeUpdated.position
        listEntryToBeUpdated.duration = listEntryData.duration || listEntryToBeUpdated.duration
        listEntryToBeUpdated.transition = listEntryData.transition != undefined ? listEntryData.transition :
            listEntryToBeUpdated.transition
        await listEntryToBeUpdated.save()
        return listEntryToBeUpdated
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