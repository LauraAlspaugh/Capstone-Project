import { Schema } from "mongoose";

export const FavoriteRoutineSchema = new Schema({
    routineId: { type: Schema.Types.ObjectId, ref: 'Routine' },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account' }

})
FavoriteRoutineSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
})