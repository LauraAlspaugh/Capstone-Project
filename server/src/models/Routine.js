import { Schema } from "mongoose";

export const RoutineSchema = new Schema({
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    level: { type: String, enum: ['beginner', 'intermediate', 'expert'], required: true },
    rest: { type: Boolean, required: true, default: true },
    moves: { type: Array }



},
    { timestamps: true, toJSON: { virtuals: true } }
)
RoutineSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Profile'
})
