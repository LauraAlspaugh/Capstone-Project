import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { favoritesService } from "../services/FavoritesService.js"

export class FavoritesController extends BaseController {
  constructor() {
    super("api/favorites")
    this.router
      .get("/moves", this.getFavoritedMoves)
      .get("/routines", this.getFavoritedRoutines)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("/moves", this.createFavoritedMove)
      .post("/routines", this.createFavoritedRoutine)
      .delete('moves/:favoritedmoveId', this.removeFavoritedMove)
      .delete('routines/:favoritedroutineId', this.removeFavoritedRoutine)
  }

  async getFavoritedMoves(request, response, next) {
    try {
      const favoritedMoves = await favoritesService.getFavoritedMoves()
      return response.send(favoritedMoves)
    } catch (error) {
      next(error)
    }
  }

  async getFavoritedRoutines(request, response, next) {
    try {
      const favoritedRoutines = await favoritesService.getFavoritedRoutines()
      return response.send(favoritedRoutines)
    } catch (error) {
      next(error)
    }
  }

  async createFavoritedMove(request, response, next) {
    try {
      const favoritedMoveData = request.body
      const userInfo = request.userInfo
      favoritedMoveData.creatorId = userInfo.creatorId
      let favoritedMove = await favoritesService.createFavoritedMove(favoritedMoveData)
      return response.send(favoritedMove)
    } catch (error) {
      next(error)
    }
  }

  async createFavoritedRoutine(request, response, next) {
    try {
      const favoritedRoutineData = request.body
      const userInfo = request.userInfo
      favoritedRoutineData.creatorId = userInfo.creatorId
      let favoritedRoutine = await favoritesService.createFavoritedRoutine(favoritedRoutineData)
      return response.send(favoritedRoutine)
    } catch (error) {
      next(error)
    }
  }

  async removeFavoritedMove(request, response, next) {
    try {
      const favoritedmoveId = request.params.favoritedmoveId
      const userId = request.userInfo.id
      const deleteMessage = await favoritesService.removeFavoritedMove(favoritedmoveId, userId)
      return response.send(deleteMessage)
    } catch (error) {
      next(error)
    }
  }

  async removeFavoritedRoutine(request, response, next) {
    try {
      const favoritedroutineId = request.params.favoritedroutineId
      const userId = request.userInfo.id
      const deleteMessage = await favoritesService.removeFavoritedRoutine(favoritedroutineId, userId)
      return response.send(deleteMessage)
    } catch (error) {
      next(error)
    }
  }

}