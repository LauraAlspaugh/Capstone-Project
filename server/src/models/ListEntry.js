import { Schema } from "mongoose";
import { dbContext } from "../db/DbContext.js";

export const ListEntrySchema = new Schema({
    name: { type: String, maxLength: 100 },
    description: { type: String, maxLength: 700 },
    imgUrl: { type: String, maxLength: 800 },
    duration: { type: Number, required: true, default: 60 },
    position: { type: Number, required: false },
    transition: { type: Boolean, required: false, default: false },
    routineId: { type: Schema.Types.ObjectId, required: true, ref: 'Routine' },
    moveId: { type: Schema.Types.ObjectId, required: true, ref: 'Move' },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
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

async function calcRuntime() {
    let listEntry = this
    let routine = await dbContext.Routines.findById(listEntry.routineId)
    if (!routine) {
        return
    }
    let totalPlayTime = await dbContext.ListEntries.aggregate([
        {
            $match: {
                routineId: routine._id
            },
        },
        {
            $group: {
                _id: "$routineId", totalPlayTime: { $sum: "$duration" },
            },
        },
    ]);

    routine.playTime = totalPlayTime[0].totalPlayTime

    await routine.save()
}

ListEntrySchema.post("save", calcRuntime)

ListEntrySchema.post("remove", calcRuntime)