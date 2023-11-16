import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { routinesService } from "../services/RoutinesService.js";
import { listEntriesService } from "../services/ListEntriesService.js";

export class RoutinesController extends BaseController {
    constructor() {
        super('api/routines')
        this.router
            .get('', this.getRoutines)
            .get('/:routineId', this.getRoutineById)
            .get('/:routineId/listentries', this.getListEntryByRoutineId)
            // 🔽 REQUIRES AUTHENTICATION 🔽
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createRoutine)
            .get('/routineId/clone', this.cloneRoutine)
            .put('/:routineId', this.editRoutine)
            .delete('/:routineId', this.archiveRoutine)
            .delete('/:routineId/delete', this.deleteRoutine)
    }

    async getRoutines(request, response, next) {
        try {
            const query = request.query
            const routines = await routinesService.getRoutines(query)
            return response.send(routines)
        } catch (error) { next(error) }
    }

    async getRoutineById(request, response, next) {
        try {
            const routineId = request.params.routineId
            const routine = await routinesService.getRoutineById(routineId)
            return response.send(routine)
        } catch (error) { next(error) }
    }

    async getListEntryByRoutineId(request, response, next) {
        try {
            const routineId = request.params.routineId
            const listEntries = await listEntriesService.getListEntryByRoutineId(routineId)
            return response.send(listEntries)
        } catch (error) { next(error) }
    }

    // SECTION 🔽 REQUIRES AUTHENTICATION 🔽

    async createRoutine(request, response, next) {
        try {
            const routineData = request.body
            const userId = request.userInfo.id
            routineData.creatorId = userId
            const newRoutine = await routinesService.createRoutine(routineData)
            return response.send(newRoutine)
        } catch (error) { next(error) }
    }
    async cloneRoutine(request, response, next) {
        try {
            const creatorId = request.userInfo.id;
            const routineId = request.params.routineId;
            const newRoutine = await routinesService.cloneRoutine(creatorId, routineId, request.body);
            return response.send(newRoutine)
        } catch (error) { next(error) }
    }

    async editRoutine(request, response, next) {
        try {
            const routineId = request.params.routineId
            const userId = request.userInfo.id
            const routineData = request.body
            const updatedRoutine = await routinesService.editRoutine(routineId, userId, routineData)
            return response.send(updatedRoutine)
        } catch (error) { next(error) }
    }

    async archiveRoutine(request, response, next) {
        try {
            const routineId = request.params.routineId
            const userId = request.userInfo.id
            const routine = await routinesService.archiveRoutine(routineId, userId)
            return response.send(routine)
        } catch (error) { next(error) }
    }

    async deleteRoutine(request, response, next) {
        try {
            const routineId = request.params.routineId
            const userId = request.userInfo.id
            const routine = await routinesService.deleteRoutine(routineId, userId)
            return response.send(routine)
        } catch (error) { next(error) }
    }

}