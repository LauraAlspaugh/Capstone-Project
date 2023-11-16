import { Schema } from "mongoose";

export const MoveSchema = new Schema({
    imgUrl: { type: String, required: true, maxLength: 600 },
    bodyPart: [{ type: String, required: true }],
    description: { type: String, required: true, maxLength: 1000 },
    englishName: { type: String, required: true, maxLength: 100 },
    sanskritName: { type: String, required: true, maxLength: 100 },
    benefits: { type: String, required: true, maxLength: 1000 },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    category: { type: String, enum: ['core yoga', 'seated yoga', 'strengthening yoga', 'chest opening yoga', 'backbend yoga', 'forward bend yoga', 'hip opening yoga', 'standing yoga', 'restorative yoga', 'arm balance yoga', 'balancing yoga', 'inversion yoga'], required: false },
    time: { type: Number, required: true, default: 45 },
    useageCount: { type: Number, required: true, default: 0 },
    totalCount: { type: Number, required: true, default: 0 },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
},
    { timestamps: true, toJSON: { virtuals: true } }
)

MoveSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
})

MoveSchema.virtual('moveUsage', {
    localField: '_id',
    foreignField: 'moveId',
    ref: 'ListEntry'
})
