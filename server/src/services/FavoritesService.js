import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { logger } from "../utils/Logger.js";
class FavoritesService {

  async getMyFavoritedMoves(userId) {
    const myFavoritedMoves = await dbContext.FavoriteMoves.find({ creatorId: userId })
      .populate({
        path: "move", populate: { path: "creator", select: "name picture" }
      })
    logger.log('myFavoritedMoves', myFavoritedMoves)
    return myFavoritedMoves
  }

  async getMyFavoritedRoutines(userId) {
    const myFavoritedRoutines = await dbContext.FavoriteRoutines.find({ creatorId: userId })
      .populate({
        path: "routine", populate: { path: "creator", select: "name picture" }
      })
    logger.log('myFavoritedRoutines', myFavoritedRoutines)
    return myFavoritedRoutines
  }

  async createFavoritedMove(favoritedMoveData) {
    const favoritedMove = await dbContext.FavoriteMoves.create(favoritedMoveData)
    await favoritedMove.populate("creator")
    await favoritedMove.populate("move")
    return favoritedMove
  }

  async createFavoritedRoutine(favoritedRoutineData) {
    const favoritedRoutine = await dbContext.FavoriteRoutines.create(favoritedRoutineData)
    await favoritedRoutine.populate("creator")
    await favoritedRoutine.populate("routine")
    return favoritedRoutine
  }

  async removeFavoritedMove(favoritedmoveId, userId) {
    const favoriteToDelete = await dbContext.FavoriteMoves.findById(favoritedmoveId)
    if (!favoriteToDelete) {
      throw new BadRequest(`Could not find ID ${favoritedmoveId}`)
    }
    if (favoriteToDelete.creatorId != userId) {
      throw new Forbidden(`You are not the one who liked this move`)
    }
    await favoriteToDelete.remove()
    return "This move has been removed from your favorites."
  }

  async removeFavoritedRoutine(favoritedroutineId, userId) {
    const favoriteToDelete = await dbContext.FavoriteRoutines.findById(favoritedroutineId)
    if (!favoriteToDelete) {
      throw new BadRequest(`Could not find ID ${favoritedroutineId}`)
    }
    if (favoriteToDelete.creatorId != userId) {
      throw new Forbidden(`You are not the one who liked this move`)
    }
    await favoriteToDelete.remove()
    return "This move has been removed from your favorites."
  }


}

export const favoritesService = new FavoritesService()