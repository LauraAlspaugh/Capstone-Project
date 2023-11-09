import { Schema } from "mongoose";

export const FavoriteMoveSchema = new Schema({
    moveId: { type: Schema.Types.ObjectId, required: true, ref: 'Move' },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
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

FavoriteMoveSchema.index({ moveId: 1, creatorId: 1 }, { unique: true })