import { dbContext } from "../db/DbContext.js"

class RoutinesService {
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