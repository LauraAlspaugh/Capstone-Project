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
      .delete('/moves/:favoritedmoveId', this.removeFavoritedMove)
      .delete('/routines/:favoritedroutineId', this.removeFavoritedRoutine)
  }

  // SECTION 🔽 AUTHENTICATION REQUIRED 🔽
  async getMyFavoritedMoves(request, response, next) {
    try {
      const favoritedMoves = await favoritesService.getMyFavoritedMoves()
      return response.send(favoritedMoves)
    } catch (error) { next(error) }
  }

  async getMyFavoritedRoutines(request, response, next) {
    try {
      const favoritedRoutines = await favoritesService.getMyFavoritedRoutines()
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
      const favoritedmoveId = request.params.favoritedmoveId
      const userId = request.userInfo.id
      const deleteMessage = await favoritesService.removeFavoritedMove(favoritedmoveId, userId)
      return response.send(deleteMessage)
    } catch (error) { next(error) }
  }

  async removeFavoritedRoutine(request, response, next) {
    try {
      const favoritedroutineId = request.params.favoritedroutineId
      const userId = request.userInfo.id
      const deleteMessage = await favoritesService.removeFavoritedRoutine(favoritedroutineId, userId)
      return response.send(deleteMessage)
    } catch (error) { next(error) }
  }

}