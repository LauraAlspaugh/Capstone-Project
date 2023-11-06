import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { dbContext } from "../db/DbContext.js";
import { movesService } from "../services/MovesService.js";

export class MovesController extends BaseController {
    constructor() {
        super('api/moves')
        this.router
            .get('', this.getMoves)
            .get('/:moveId', this.getMoveById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createMove)
            .put('/:moveId', this.editMove)
            .delete('/:moveId', this.destroyMove)
    }
    async destroyMove(request, response, next) {
        try {
            const moveId = request.params.moveId
            const userId = request.userInfo.id
            const move = await movesService.destroyMove(moveId, userId)
            return response.send(move)
        } catch (error) {
            next.error(error)

        }

    }
    async editMove(request, response, next) {
        try {
            const moveId = request.params.moveId
            const userId = request.userInfo.id
            const moveData = request.body
            const updatedMove = await movesService.editMove(moveId, userId, moveData)
            return response.send(updatedMove)
        } catch (error) {
            next.error(error)

        }
    }
    async getMoveById(request, response, next) {
        try {
            const moveId = request.params.moveId
            const move = await movesService.getMoveById(moveId)
            return response.send(move)
        } catch (error) {
            next.error(error)

        }
    }
    async getMoves(request, response, next) {
        try {
            const moves = await movesService.getMoves()
            return response.send(moves)
        } catch (error) {
            next.error(error)

        }
    }
    async createMove(request, response, next) {
        try {
            const moveData = request.body
            const userId = request.userInfo.id
            moveData.creatorId = userId
            const move = await movesService.createMove(moveData)
            return response.send(move)

        } catch (error) {
            next.error(error)

        }
    }
}