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

  async removeFavoritedMove(moveId, creatorId) {
    const favoriteToDelete = await dbContext.FavoriteMoves.findOne({ moveId, creatorId })
    if (!favoriteToDelete) {
      throw new BadRequest(`Could not find ID ${moveId}`)
    }
    if (favoriteToDelete.creatorId != creatorId) {
      throw new Forbidden(`You are not the one who liked this move`)
    }
    const results = await favoriteToDelete.remove()
    return 'Successfully removed favorite: ' + results
  }

  async removeFavoritedRoutine(routineId, creatorId) {
    const favoriteToDelete = await dbContext.FavoriteRoutines.findOne({ routineId, creatorId })
    if (!favoriteToDelete) {
      throw new BadRequest(`Could not find by Routine ID ${routineId}`)
    }
    if (favoriteToDelete.creatorId != creatorId) {
      throw new Forbidden(`You are not the one who liked this move`)
    }
    const results = (await favoriteToDelete.remove())
    return 'Successfully removed favorite: ' + results
  }


}

export const favoritesService = new FavoritesService()