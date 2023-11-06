import { dbContext } from "../db/DbContext.js";

class MovesService {
    destroyMove(moveId, userId) {

    }
    editMove(moveId, userId, moveData) {

    }
    getMoveById(moveId) {

    }
    async getMoves(query) {
        const moves = await dbContext.Moves.find(query).populate('creator', 'name picture')
        return moves
    }
    async createMove(moveData) {
        const move = await dbContext.Moves.create(moveData)
        await move.populate('creator', 'name picture')
        return move
    }

}

export const movesService = new MovesService()