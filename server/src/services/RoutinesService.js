import mongoose, { Model } from "mongoose";
import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { logger } from "../utils/Logger.js";
import { RoutineSchema } from "../models/Routine.js";
import { ListEntrySchema } from "../models/ListEntry.js";
import { favoritesService } from "./FavoritesService.js";

// const CALC_CACHE = {}

async function _calcTarget(routineId) {

    // if (CALC_CACHE[routineId]) {
    //     return CALC_CACHE[routineId]
    // }

    const allEntries = await dbContext.ListEntries.find({ routineId })
        .populate('move', 'englishName bodyPart level benefits description ')
        .lean() // lean trims from the DB document format back into a more readable object


    const bodyParts = {}
    allEntries.forEach(entry => {
        //tally number of instances a body part is mentioned as a target
        // @ts-ignore
        entry.move.bodyPart.forEach(part => {
            bodyParts[part] = bodyParts[part] || { name: part, count: 0 }
            bodyParts[part].count++
        })
    })
    // Remove the 'key' that was used to separate and count
    const bodyPartArray = Object.entries(bodyParts).map(e => (e[1]))

    // tally # of times a move is in a routine  --  acc = accumulator
    // const movesObject = allEntries.reduce((acc, entry) => {
    //     const moveId = entry.moveId.toString()
    //     // @ts-ignore
    //     acc[moveId] = acc[moveId] || { name: entry.move.englishName, count: 0 }
    //     acc[moveId].count++
    //     return acc
    // }, {})

    // Original function, tested here: https://mongoplayground.net/p/aGS9HVtlEvm 
    // --NOTE: Playground uses a STRING for ID, but actual objectId comparison required
    // const target = await dbContext.Routines.aggregate([
    //     { $match: { _id: ObjectId(routineId) } },
    //     { $lookup: { from: '$ListEntry', localField: "_id", foreignField: "routineId", as: "listEntry" } },
    //     { $unwind: '$listEntry' },
    //     { $lookup: { from: '$Move', localField: "listEntry.moveId", foreignField: "_id", as: "move" } },
    //     { $unwind: '$move' },
    //     { $unwind: '$move.bodyPart' },
    //     { $group: { _id: '$move.bodyPart', count: { $sum: 1 } } },
    //     { $sort: { count: -1 } },
    //     { $limit: 5 }
    // ]) // Denied due to free-tier of MongoDB not permitting $lookup for injecting data (the populate for aggregates)

    // (bodyPartArray.sort((a, b) => (b.count - a.count)))).slice(0,5) if wanting to limit to top 5
    // logger.log('bodyPartArray', bodyPartArray) 

    await dbContext.Routines.findOneAndUpdate(
        { _id: routineId },
        { $set: { target: bodyPartArray.sort((a, b) => (b.count - a.count)) } },
        { new: true }
    )

    // We're running this to recalc on each add/remove of a list-entry to a routine, so caching isn't necessary
    // CALC_CACHE[routineId] = { movesObject, bodyParts }
    // return CALC_CACHE[routineId]
}

class RoutinesService {

    async getRoutines(query) {
        const moves = await dbContext.Routines.find(query)
            .populate('creator', 'name picture')
            .populate("moveCount")
            .populate("favoritedCount")
            .populate({
                path: 'listEntry',
                select: 'name position duration transition moveId',
                populate: {
                    path: 'move',
                    select: 'englishName imgUrl bodyPart level benefits description '
                }
            })
        return moves
    }

    async getRoutineById(routineId) {
        await _calcTarget(routineId);
        const routine = await dbContext.Routines.findById(routineId)
        if (!routine) { throw new BadRequest('This is not a valid routine') }
        await routine.populate('creator', 'name picture')
        await routine.populate('moveCount')
        await routine.populate('favoritedCount')
        await routine.populate({
            path: 'listEntry',
            select: 'name position duration transition moveId',
            populate: {
                path: 'move',
                select: 'englishName imgUrl bodyPart level benefits description'
            }
        })
        return routine
    }

    async getRoutineByCreatorId(userId) {
        const routines = await dbContext.Routines.find({ creatorId: userId })
            .populate('creator', 'name picture')
            .populate("moveCount")
            .populate("favoritedCount")
            .populate({
                path: 'listEntry',
                select: 'name position duration transition moveId',
                populate: {
                    path: 'move',
                    select: 'englishName imgUrl bodyPart  level description benefits'
                }
            })
        return routines
    }

    // SECTION 🔽 REQUIRES AUTHENTICATION 🔽

    async createRoutine(routineData) {
        const newRoutine = await dbContext.Routines.create(routineData)
        _calcTarget(newRoutine.id);
        await newRoutine.populate('creator', 'name picture')
        await newRoutine.populate({
            path: 'listEntry',
            select: 'name position duration transition moveId',
            populate: {
                path: 'move',
                select: 'englishName imgUrl bodyPart level description benefits'
            }
        })
        await favoritesService.createFavoritedRoutine({ routineId: newRoutine.id, creatorId: routineData.creatorId });

        return newRoutine
    }

    async cloneRoutine(creatorId, routineId) {
        const ogRoutine = await dbContext.Routines.findById(routineId);
        // @ts-ignore
        const Routine = mongoose.model('Routine', RoutineSchema);

        const clonedRoutine = new Routine({
            ...ogRoutine.toObject(),
            _id: new mongoose.Types.ObjectId(),
            name: ogRoutine.name + ' (clone)',
            creatorId,
            isNew: true
        });
        await clonedRoutine.save();

        const ogListEntries = await dbContext.ListEntries.find({ routineId }).lean();
        const ListEntry = mongoose.model('ListEntry', ListEntrySchema);
        ogListEntries.forEach(listEntry => {
            // @ts-ignore
            const clonedListEntry = new ListEntry({
                ...listEntry,
                _id: new mongoose.Types.ObjectId(),
                routineId: clonedRoutine._id,
                creatorId
            });
            clonedListEntry.save();
        })

        // _calcTarget(clonedRoutine.id); // Don't need to re-calculate since it is a direct clone

        // Add new cloned routine to your favorites
        await favoritesService.createFavoritedRoutine({ routineId: clonedRoutine.id, creatorId })

        await clonedRoutine.populate('creator', 'name picture')
        await clonedRoutine.populate('moveCount')
        await clonedRoutine.populate('favoritedCount')
        await clonedRoutine.populate('totalEntries')
        await clonedRoutine.populate({
            path: 'listEntry',
            select: 'name position duration transition moveId',
            populate: {
                path: 'move',
                select: 'englishName imgUrl bodyPart level description benefits'
            }
        })
        return clonedRoutine
    }

    async editRoutine(routineId, userId, routineData) {
        const routineToBeUpdated = await this.getRoutineById(routineId)
        if (routineToBeUpdated.creatorId.toString() != userId) {
            throw new Forbidden('Do not even try it')
        } if (!routineToBeUpdated) {
            throw new BadRequest('This is not a routine to be updated')
        }
        routineToBeUpdated.name = routineData.name || routineToBeUpdated.name
        routineToBeUpdated.description = routineData.description || routineToBeUpdated.description
        routineToBeUpdated.category = routineData.category || routineToBeUpdated.category
        routineToBeUpdated.target = routineData.target || routineToBeUpdated.target
        routineToBeUpdated.isPrivate = routineData.isPrivate != undefined ? routineData.isPrivate :
            routineToBeUpdated.isPrivate
        routineToBeUpdated.isArchived = routineData.isArchived != undefined ? routineData.isArchived :
            routineToBeUpdated.isArchived
        routineToBeUpdated.level = routineData.level || routineToBeUpdated.level
        routineToBeUpdated.keyImage = routineData.keyImage || routineToBeUpdated.keyImage
        routineToBeUpdated.playCount = routineData.playCount != undefined ? routineData.playCount :
            routineToBeUpdated.playCount
        routineToBeUpdated.playTime = routineData.playTime != undefined ? routineData.playTime :
            routineToBeUpdated.playTime
        routineToBeUpdated.isExample = routineData.isExample != undefined ? routineData.isExample :
            routineToBeUpdated.isExample
        await routineToBeUpdated.save()
        await routineToBeUpdated.populate("listEntry")
        await routineToBeUpdated.populate("moveCount")
        await routineToBeUpdated.populate("favoritedCount")
        _calcTarget(routineId);
        return routineToBeUpdated
    }

    async archiveRoutine(routineId, userId) {
        const routine = await this.getRoutineById(routineId)
        if (routine.creatorId.toString() != userId) {
            throw new Forbidden('Not your routine to archive!')
        }
        routine.isArchived = !routine.isArchived
        await routine.save()
        await routine.populate('favoritedCount')
        return routine
    }

    async deleteRoutine(routineId, userId) {
        const routine = await this.getRoutineById(routineId)
        if (routine.creatorId.toString() != userId) {
            throw new Forbidden('Not your routine to delete!')
        }
        if (!routine.isArchived) {
            throw new BadRequest('Cannot delete active routines')
        }
        // remove all associated data that would be orphaned before the routine itself
        const favoriteRoutineResults = await dbContext.FavoriteRoutines.deleteMany({ routineId })
        const listEntryResults = await dbContext.ListEntries.deleteMany({ routineId })
        const routineResults = await dbContext.Routines.findByIdAndRemove(routineId)
        logger.log('Routine Favorites removed. Results:', favoriteRoutineResults)
        logger.log('List Entries removed. Results:', listEntryResults)
        logger.log('Routine removed. Results:', routineResults)
        return `Removed Routine: ${routineResults}, Removed List Entries: ${listEntryResults}, Removed Routine Favorites ${favoriteRoutineResults}, `
    }

}
export const routinesService = new RoutinesService()