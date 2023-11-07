import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { routinesService } from "../services/RoutinesService.js";

export class RoutinesController extends BaseController {
    constructor() {
        super('api/routines')
        this.router
            .get('', this.getRoutines)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createRoutine)
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