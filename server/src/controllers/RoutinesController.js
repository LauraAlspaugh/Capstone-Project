import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { routinesService } from "../services/RoutinesService.js";

export class RoutinesController extends BaseController {
    constructor() {
        super('api/routines')
        this.router
            .get('', this.getRoutines)
            .get('/:routineId', this.getRoutineById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createRoutine)
            .put('/:routineId', this.editRoutine)
            .delete('/:routineId', this.archiveRoutine)
    }

    async archiveRoutine(request, response, next) {
        try {
            const routineId = request.params.routineId
            const userId = request.userInfo.id
            const routine = await routinesService.archiveRoutine(routineId, userId)
            return response.send(routine)
        } catch (error) {
            next(error)

        }
    }
    async editRoutine(request, response, next) {
        try {
            const routineId = request.params.routineId
            const userId = request.userInfo.id
            const routineData = request.body
            const updatedRoutine = await routinesService.editRoutine(routineId, userId, routineData)
            return response.send(updatedRoutine)
        } catch (error) {
            next(error)

        }
    }
    async getRoutineById(request, response, next) {
        try {
            const routineId = request.params.routineId
            const routine = await routinesService.getRoutineById(routineId)
            return response.send(routine)
        } catch (error) {
            next(error)

        }
    }
    async createRoutine(request, response, next) {
        try {
            const routineData = request.body
            const userId = request.userInfo.id
            routineData.creatorId = userId
            const newRoutine = await routinesService.createRoutine(routineData)
            return response.send(newRoutine)
        } catch (error) {
            next(error)

        }
    }
    async getRoutines(request, response, next) {
        try {
            const routines = await routinesService.getRoutines()
            return response.send(routines)
        } catch (error) {
            next(error)

        }
    }
}