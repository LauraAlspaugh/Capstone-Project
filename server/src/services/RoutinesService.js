import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class RoutinesService {
    async archiveRoutine(routineId, userId) {
        const routine = await this.getRoutineById(routineId)
        if (routine.creatorId.toString() != userId) {
            throw new Forbidden('not your routine to archive!')
        }
        routine.isArchived = !routine.isArchived
        await routine.save()
        return ('this routine has been archived!')
    }
    async editRoutine(routineId, userId, routineData) {
        const routineToBeUpdated = await this.getRoutineById(routineId)
        if (routineToBeUpdated.creatorId.toString() != userId) {
            throw new BadRequest('do not even try it')
        } if (!routineToBeUpdated) {
            throw new BadRequest('this is not a routine to be updated')

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
        routineToBeUpdated.moves = routineData.moves || routineToBeUpdated.moves
        routineToBeUpdated.playCount = routineData.playCount != undefined ? routineData.playCount :
            routineToBeUpdated.playCount
        routineToBeUpdated.playTime = routineData.playTime != undefined ? routineData.playTime :
            routineToBeUpdated.playTime
        await routineToBeUpdated.save()
        return routineToBeUpdated
    }
    async getRoutineById(routineId) {
        const routine = (await dbContext.Routines.findById(routineId)).populate('creator', 'name picture')
        if (!routine) {
            throw new BadRequest('this is not a valid routine')
        } return routine
    }
    async createRoutine(routineData) {
        const newRoutine = await dbContext.Routines.create(routineData)
        await newRoutine.populate('creator', 'name picture')
        return newRoutine

    }
    async getRoutines(query) {
        const moves = await dbContext.Routines.find(query).populate('creator', 'name picture')
        return moves

    }

}
export const routinesService = new RoutinesService()