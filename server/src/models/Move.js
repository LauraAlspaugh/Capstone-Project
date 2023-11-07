import { Schema } from "mongoose";

export const MoveSchema = new Schema({
    level: { type: String, enum: ['beginner', 'intermediate', 'expert'], required: true },
    imgUrl: { type: String, required: true, maxLength: 600 },
    bodyPart: { type: Array, required: true },
    description: { type: String, required: true, maxLength: 1000 },
    name: { type: String, required: true, maxLength: 100 },
    benefits: { type: String, required: true, maxLength: 1000 },
    category: { type: String, enum: ['core yoga', 'seated yoga', 'strengthening yoga', 'chest opening yoga', 'backbend yoga', 'forward bend yoga', 'hip opening yoga', 'standing yoga', 'restorative yoga', 'arm balance yoga', 'balancing yoga', 'inversion yoga'], required: true },
    defaultTime: { type: Number, required: true, default: 45 },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Move' },
},
    { timestamps: true, toJSON: { virtuals: true } }
)
MoveSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Profile'
})
