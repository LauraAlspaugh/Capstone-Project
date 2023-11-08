import { query } from "express"
import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { routinesService } from "./RoutinesService.js"

class ListEntriesService {
    async getListEntryByRoutineId(routineId) {
        const listEntries = await dbContext.ListEntries.find({ routineId: routineId })
            .populate('creator', 'name picture')
        return listEntries
    }
    async destroyListEntry(listEntryId, userId) {
        const listEntryToDelete = await this.getListEntryById(listEntryId)
        if (listEntryToDelete.creatorId.toString() != userId) {
            throw new Forbidden('not your list Entry to delete!')
        }
        await listEntryToDelete.delete()
        return "this listEntry has been deleted"
    }
    async getListEntryById(listEntryId) {
        const listEntry = await dbContext.ListEntries.findById(listEntryId).populate('creator', 'name picture')
        if (!listEntry) {
            throw new BadRequest('this is not a valid listEntry')
        } return listEntry
    }
    async editListEntry(listEntryId, userId, listEntryData) {
        const listEntryToBeUpdated = await this.getListEntryById(listEntryId)
        if (listEntryToBeUpdated.creatorId.toString() != userId) {
            throw new BadRequest('do not even try it')
        } if (!listEntryToBeUpdated) {
            throw new BadRequest('this is not a listEntry to be updated')

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
    async createListEntry(listEntryData) {
        const newListEntry = await dbContext.ListEntries.create(listEntryData)
        await newListEntry.populate('creator', 'name picture')
        let routine = await routinesService.getRoutineById(newListEntry.routineId)
        routine.moves.push(newListEntry.id)
        return newListEntry
    }
    async getListEntries(query) {
        const listEntries = await dbContext.ListEntries.find(query).populate('creator', ' name picture')
        return listEntries
    }

}

export const listEntriesService = new ListEntriesService()