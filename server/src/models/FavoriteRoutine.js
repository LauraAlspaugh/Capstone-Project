import { Schema } from "mongoose";

export const FavoriteRoutineSchema = new Schema({
    routineId: { type: Schema.Types.ObjectId, required: true, ref: 'Routine' },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
})

FavoriteRoutineSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
})

FavoriteRoutineSchema.virtual('routine', {
    localField: 'routineId',
    foreignField: '_id',
    justOne: true,
    ref: 'Routine'
})