import { Schema } from "mongoose";

export const ListEntrySchema = new Schema({
    interval: { type: Boolean, required: true, default: false },
    intervalTime: { type: Number, required: false, default: 30 },
    routineId: { type: Schema.Types.ObjectId, required: true, ref: 'Routine' },
    moveId: { type: Schema.Types.ObjectId, required: true, ref: 'Move' },
    completed: { type: Boolean, required: true, default: false },
    duration: { type: Number, required: true, default: 60 },
    position: { type: Number, required: false },
},
    { timestamps: true, toJSON: { virtuals: true } }
)