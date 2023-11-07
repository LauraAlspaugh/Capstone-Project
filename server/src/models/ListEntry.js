import { Schema } from "mongoose";

export const ListEntrySchema = new Schema({
    name: { type: String, maxLength: 100 },
    description: { type: String, maxLength: 700 },
    imgUrl: { type: String, maxLength: 800 },
    interval: { type: Boolean, required: false, default: false },
    intervalTime: { type: Number, required: false, default: 30 },
    routineId: { type: Schema.Types.ObjectId, required: true, ref: 'Routine' },
    moveId: { type: Schema.Types.ObjectId, required: true, ref: 'Move' },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    completed: { type: Boolean, required: true, default: false },
    duration: { type: Number, required: true, default: 60 },
    position: { type: Number, required: false },
},
    { timestamps: true, toJSON: { virtuals: true } }
)
ListEntrySchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
})
ListEntrySchema.virtual('move', {
    localField: 'moveId',
    foreignField: '_id',
    justOne: true,
    ref: 'Move'
})
ListEntrySchema.virtual('routine', {
    localField: 'routineId',
    foreignField: '_id',
    justOne: true,
    ref: 'Routine'
})