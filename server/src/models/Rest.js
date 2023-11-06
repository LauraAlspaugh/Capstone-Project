import { Schema } from "mongoose";

export const RestSchema = new Schema({
    routineId: { type: Schema.Types.ObjectId, required: true, ref: 'Routine' },
    duration: { type: Number, default: 300 },
    completed: { type: Boolean, default: false },


},
    { timestamps: true, toJSON: { virtuals: true } }

)