import { Schema } from "mongoose";

export const RoutineSchema = new Schema({
    name: { type: String, required: true, maxLength: 100 },
    description: { type: String, required: true, maxLength: 700 },
    category: [{ type: String, required: true }],
    target: [{ type: String, required: true }],
    isPrivate: { type: Boolean, default: true },
    isArchived: { type: Boolean, default: false },
    playCount: { type: Number, default: 0 },
    playTime: { type: Number, default: 0 },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    level: { type: String, enum: ['beginner', 'intermediate', 'expert'], required: true },
    moves: [{ type: Schema.Types.ObjectId, ref: 'Move' }]
},
    { timestamps: true, toJSON: { virtuals: true } }
)

RoutineSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
})

RoutineSchema.virtual('moveCount', {
    localField: '_id',
    foreignField: 'routineId',
    count: true,
    ref: 'ListEntry'
})
