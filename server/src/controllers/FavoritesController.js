import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { favoritesService } from "../services/FavoritesService.js"

export class FavoritesController extends BaseController {
  constructor() {
    super("api/favorites")
    this.router
      .get("/moves", this.getFavoritedMoves)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("/moves", this.createFavoritedMove)
      .delete('moves/:favoritedmoveId', this.removeFavoritedMove)
  }

  async getFavoritedMoves(request, response, next) {
    try {
      const favoriteMoves = await favoritesService.getFavoritedMoves()
      return response.send(favoriteMoves)
    } catch (error) {
      next(error)
    }
  }

  async createFavoritedMove(request, response, next) {
    try {
      const favoriteMoveData = request.body
      const userInfo = request.userInfo
      favoriteMoveData.creatorId = userInfo.creatorId
      let favoriteMove = await favoritesService.createFavoritedMove(favoriteMoveData)
      return response.send(favoriteMove)
    } catch (error) {
      next(error)
    }
  }

  async removeFavoritedMove(request, response, next) {
    try {
      const favoritemoveId = request.params.favoritemoveId
      const userId = request.userInfo.id
      const deleteMessage = await favoritesService.removeFavoritedMove(favoritemoveId, userId)
      return response.send(deleteMessage)
    } catch (error) {
      next(error)
    }
  }

}