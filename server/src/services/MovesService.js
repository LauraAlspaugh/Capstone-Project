import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

class MovesService {
    async destroyMove(moveId, userId) {
        let moveToDelete = await this.getMoveById(moveId)
        if (moveToDelete.creatorId.toString() != userId) {
            throw new Forbidden(`This is not your move to delete.`)
        }
        await moveToDelete.delete()
        return "Move deleted."
    }
    async editMove(moveId, userId, moveData) {
        let moveToEdit = await this.getMoveById(moveId)
        if (moveToEdit.creatorId.toString() != userId) {
            throw new Forbidden("Not your move to edit")
        }
        moveToEdit.level = moveData.level || moveToEdit.level
        moveToEdit.imgUrl = moveData.imgUrl || moveToEdit.imgUrl
        moveToEdit.bodyPart = moveData.bodyPart || moveToEdit.bodyPart
        moveToEdit.description = moveData.description || moveToEdit.description
        moveToEdit.englishName = moveData.englishName || moveToEdit.englishName
        moveToEdit.sanskritName = moveData.sanskritName || moveToEdit.sanskritName
        moveToEdit.benefits = moveData.benefits || moveToEdit.benefits
        moveToEdit.category = moveData.category || moveToEdit.category
        moveToEdit.time = moveData.time || moveToEdit.time

        await moveToEdit.save()
        return moveToEdit
    }
    async getMoveById(moveId) {
        const move = await dbContext.Moves.findById(moveId)
        if (!move) {
            throw new BadRequest(`${moveId} is not a valid ID`)
        }
        await move.populate('creator', 'name picture')
        return move
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