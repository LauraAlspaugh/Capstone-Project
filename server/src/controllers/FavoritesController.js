import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { favoritesService } from "../services/FavoritesService.js"

export class FavoritesController extends BaseController {
  constructor() {
    super("api/favorites")
    this.router
      // 🔽 AUTHENTICATION REQUIRED 🔽
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get("/moves", this.getMyFavoritedMoves)
      .get("/routines", this.getMyFavoritedRoutines)
      .post("/moves", this.createFavoritedMove)
      .post("/routines", this.createFavoritedRoutine)
      .delete('/moves/:moveId', this.removeFavoritedMove)
      .delete('/routines/:routineId', this.removeFavoritedRoutine)
  }

  // SECTION 🔽 AUTHENTICATION REQUIRED 🔽
  async getMyFavoritedMoves(request, response, next) {
    try {
      const favoritedMoves = await favoritesService.getMyFavoritedMoves(request.userInfo.id)
      return response.send(favoritedMoves)
    } catch (error) { next(error) }
  }

  async getMyFavoritedRoutines(request, response, next) {
    try {
      const favoritedRoutines = await favoritesService.getMyFavoritedRoutines(request.userInfo.id)
      return response.send(favoritedRoutines)
    } catch (error) { next(error) }
  }

  async createFavoritedMove(request, response, next) {
    try {
      const favoritedMoveData = request.body
      const userInfo = request.userInfo
      favoritedMoveData.creatorId = userInfo.id
      let favoritedMove = await favoritesService.createFavoritedMove(favoritedMoveData)
      return response.send(favoritedMove)
    } catch (error) { next(error) }
  }

  async createFavoritedRoutine(request, response, next) {
    try {
      const favoritedRoutineData = request.body
      const userInfo = request.userInfo
      favoritedRoutineData.creatorId = userInfo.id
      let favoritedRoutine = await favoritesService.createFavoritedRoutine(favoritedRoutineData)
      return response.send(favoritedRoutine)
    } catch (error) { next(error) }
  }

  async removeFavoritedMove(request, response, next) {
    try {
      const moveId = request.params.moveId
      const userId = request.userInfo.id
      const deleteMessage = await favoritesService.removeFavoritedMove(moveId, userId)
      return response.send(deleteMessage)
    } catch (error) { next(error) }
  }

  async removeFavoritedRoutine(request, response, next) {
    try {
      const routineId = request.params.routineId
      const userId = request.userInfo.id
      const deleteMessage = await favoritesService.removeFavoritedRoutine(routineId, userId)
      return response.send(deleteMessage)
    } catch (error) { next(error) }
  }

}