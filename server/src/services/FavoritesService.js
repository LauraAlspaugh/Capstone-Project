import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
class FavoritesService {

  async getFavoritedMoves() {
    let favoritedMoves = await dbContext.FavoriteMoves.find().populate("creator move")
    return favoritedMoves
  }

  async createFavoritedMove(favoriteMoveData) {
    const favoritedMove = await dbContext.FavoriteMoves.create(favoriteMoveData)
    await favoritedMove.populate("creator")
    await favoritedMove.populate("move")
    return favoritedMove
  }

  async removeFavoritedMove(favoritemoveId, userId) {
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

  async getMyFavoritedMoves(userId) {
    let myFavoritedMoves = await dbContext.FavoriteMoves.find({ userId: userId }).populate("creator move")
    return myFavoritedMoves
  }

}

export const favoritesService = new FavoritesService()