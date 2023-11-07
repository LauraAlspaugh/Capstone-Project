import { dbContext } from "../db/DbContext.js";

class MovesService {
    destroyMove(moveId, userId) {

    }
    editMove(moveId, userId, moveData) {

    }
    getMoveById(moveId) {

    }
    async getMoves(query) {
        const moves = await dbContext.Moves.find(query)
            .populate('creator', 'name picture')
        return moves
    }
    async createMove(moveData) {
        const newMove = await dbContext.Moves.create(moveData)
        await newMove.populate('creator', 'name picture')
        return newMove
    }

}

export const movesService = new MovesService()