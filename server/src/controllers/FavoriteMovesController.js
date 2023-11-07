import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { favoriteMovesService } from "../services/FavoriteMovesService.js";

export class FavoriteMovesController extends BaseController {
  constructor() {
    super("api/favoritemoves")
    this.router
      .get("", this.getFavoriteMoves)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.createFavoriteMove)
      .delete('/:favoritemoveId', this.removeFavoriteMove)
  }

  async getFavoriteMoves(request, response, next) {
    try {
      const favoriteMoves = await favoriteMovesService.getFavoriteMoves()
      return response.send(favoriteMoves)
    } catch (error) {
      next(error)
    }
  }

  async createFavoriteMove(request, response, next) {
    try {
      const favoriteMoveData = request.body
      const userInfo = request.userInfo
      favoriteMoveData.creatorId = userInfo.creatorId
      let favoriteMove = await favoriteMovesService.createFavoriteMove(favoriteMoveData)
      return response.send(favoriteMove)
    } catch (error) {
      next(error)
    }
  }

  async removeFavoriteMove(request, response, next) {
    try {
      const favoritemoveId = request.params.favoritemoveId
      const userId = request.userInfo.id
      const deleteMessage = await favoriteMovesService.removeFavoriteMove(favoritemoveId, userId)
      return response.send(deleteMessage)
    } catch (error) {
      next(error)
    }
  }

}