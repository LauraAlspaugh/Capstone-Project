import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
class FavoriteMovesService {

  async getFavoriteMoves() {
    let favoriteMoves = await dbContext.FavoriteMoves.find().populate("creator move")
    return favoriteMoves
  }

  async createFavoriteMove(favoriteMoveData) {
    const favoriteMove = await dbContext.FavoriteMoves.create(favoriteMoveData)
    await favoriteMove.populate("creator")
    await favoriteMove.populate("move")
    return favoriteMove
  }

  async removeFavoriteMove(favoritemoveId, userId) {
    const favoriteToDelete = await dbContext.FavoriteMoves.findById(favoritemoveId)
    if (!favoriteToDelete) {
      throw new BadRequest(`Could not find ID ${favoritemoveId}`)
    }
    if (favoriteToDelete.creatorId != userId) {
      throw new Forbidden(`You are not the one who liked this move`)
    }
    await favoriteToDelete.remove()
    return "This move has been removed from your favorites."
  }

}

export const favoriteMovesService = new FavoriteMovesService()