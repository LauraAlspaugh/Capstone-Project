import { Schema } from "mongoose";

export const CommentSchema = new Schema({
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    body: { type: String, required: true, maxLength: 500 },
    routineId: { type: Schema.Types.ObjectId, required: true, ref: 'Routine' }

},
    { timestamps: true, toJSON: { virtuals: true } }
)