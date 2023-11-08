import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { logger } from "../utils/Logger.js";

function _tallyTotal(counts) {
    let total = 0;
    counts.forEach(c => total += c.count)
    return total
}

async function _updateUsageCount(moveId) {
    const ObjectId = require('mongoose').Types.ObjectId
    const counts = await dbContext.ListEntries.aggregate([
        { $match: { moveId: ObjectId(moveId) } },
        {
            "$group": {
                "_id": { "routineId": "$routineId" },
                "routineId": { "$first": "$routineId" },
                "count": { "$sum": 1 }
            }
        },
        { "$project": { "_id": 0 } }
    ])
    const totals = _tallyTotal(counts);
    logger.log('count results', totals, 'returned array?', counts, 'move', moveId,)
    await dbContext.Moves.findOneAndUpdate(
        { _id: moveId },
        {
            $set: {
                useageCount: counts.length,
                totalCount: totals
            }
        }
    );
}

class MovesService {

    async getMoves(query) {
        const moves = await dbContext.Moves.find(query);
        // moves.forEach(m => _updateUsageCount(m.id));
        return moves
    }

    async getMoveById(moveId) {
        await _updateUsageCount(moveId);
        const move = await dbContext.Moves.findById(moveId).populate('creator', 'name picture');
        if (!move) {
            throw new BadRequest(`${moveId} is not a valid ID`);
        }
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