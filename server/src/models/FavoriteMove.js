import { Schema } from "mongoose";

export const FavoriteMoveSchema = new Schema({
    moveId: { type: Schema.Types.ObjectId, ref: 'Move' },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account' }

})
FavoriteMoveSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
})

FavoriteMoveSchema.virtual('move', {
    localField: 'moveId',
    foreignField: '_id',
    justOne: true,
    ref: 'Move'
})