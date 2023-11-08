import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class RoutinesService {

    async getRoutines(query) {
        const moves = await dbContext.Routines.find(query)
            .populate('creator', 'name picture')
            .populate("listEntry")
        return moves
    }

    async getRoutineById(routineId) {
        const routine = await dbContext.Routines.findById(routineId)
        await routine.populate('creator', 'name picture')
        await routine.populate("listEntry")
        if (!routine) {
            throw new BadRequest('this is not a valid routine')
        } return routine
    }

    async getRoutineByCreatorId(userId) {
        const routines = await dbContext.Routines.find({ creatorId: userId })
            .populate('creator', 'name picture')
            .populate("listEntry")
        return routines
    }

    // SECTION 🔽 REQUIRES AUTHENTICATION 🔽

    async createRoutine(routineData) {
        const newRoutine = await dbContext.Routines.create(routineData)
        return newRoutine
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
        routineToBeUpdated.playCount = routineData.playCount != undefined ? routineData.playCount :
            routineToBeUpdated.playCount
        routineToBeUpdated.playTime = routineData.playTime != undefined ? routineData.playTime :
            routineToBeUpdated.playTime
        routineToBeUpdated.isExample = routineData.isExample != undefined ? routineData.isExample :
            routineToBeUpdated.isExample
        await routineToBeUpdated.save()
        await routineToBeUpdated.populate("listEntry")
        return routineToBeUpdated
    }

    async archiveRoutine(routineId, userId) {
        const routine = await this.getRoutineById(routineId)
        if (routine.creatorId.toString() != userId) {
            throw new Forbidden('Not your routine to archive!')
        }
        routine.isArchived = !routine.isArchived
        await routine.save()
        return routine
    }

}
export const routinesService = new RoutinesService()