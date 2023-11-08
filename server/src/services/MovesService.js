import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

async function _updateUsageCount(_id) {
    // const moves = await dbContext.Moves.findById(moveId);
    const count = await dbContext.Routines.aggregate([
        { "$match": { "moves": _id } },
        { "$project": { "count": { $sum: 1 } } }
    ])
    await dbContext.Moves.findOneAndUpdate({ _id }, { $set: { useageCount: count.length } });
}

class MovesService {

    async getMoves(query) {
        const moves = await dbContext.Moves.find(query);
        return moves
    }

    async getMoveById(moveId) {
        const move = await dbContext.Moves.findById(moveId).populate('creator', 'name picture');
        if (!move) {
            throw new BadRequest(`${moveId} is not a valid ID`);
        }
        await _updateUsageCount(moveId);
        return move
    }

    // SECTION 🔽 REQUIRES AUTHENTICATION 🔽

    async createMove(moveData) {
        const newMove = await dbContext.Moves.create(moveData);
        return newMove
    }

    async editMove(moveId, userId, moveData) {
        let moveToEdit = await this.getMoveById(moveId);
        if (moveToEdit.creatorId.toString() != userId) {
            throw new Forbidden("Not your move to edit");
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

        await moveToEdit.save();
        return moveToEdit
    }

    async destroyMove(moveId, userId) {
        let moveToDelete = await this.getMoveById(moveId);
        if (moveToDelete.creatorId.toString() != userId) {
            throw new Forbidden(`This is not your move to delete.`);
        }
        await moveToDelete.delete();
        return "Move deleted."
    }

}

export const movesService = new MovesService()