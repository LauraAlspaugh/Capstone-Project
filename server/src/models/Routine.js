import { Schema } from "mongoose";

export const RoutineSchema = new Schema({
    name: { type: String, required: true, maxLength: 100 },
    description: { type: String, required: true, maxLength: 700 },
    keyImage: { type: String, required: false, maxLength: 700 },
    category: [{ type: String, required: true }],
    level: { type: String, required: false, enum: ['beginner', 'intermediate', 'expert'] },
    target: [{ type: Object, required: true, default: {} }],
    isPrivate: { type: Boolean, required: false, default: true },
    isExample: { type: Boolean, required: false, default: false },
    isArchived: { type: Boolean, required: false, default: false },
    playCount: { type: Number, required: true, default: 0 },
    playTime: { type: Number, required: true, default: 0 },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
},
    { timestamps: true, toJSON: { virtuals: true } }
)

RoutineSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})

RoutineSchema.virtual('moveCount', {
    match: { transition: false },
    foreignField: 'routineId',
    localField: '_id',
    ref: 'ListEntry',
    count: true
})

RoutineSchema.virtual('listEntry', {
    foreignField: 'routineId',
    localField: '_id',
    ref: 'ListEntry'
})