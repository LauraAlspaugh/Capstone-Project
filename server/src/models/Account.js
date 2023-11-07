import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const AccountSchema = new Schema(
  {
    subs: [{ type: String, unique: true }],
    email: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String },
    bio: { type: String },
    dailyPlayStreak: { type: Number, default: 0 },
    lastActive: { type: Date, default: new Date() },
    customLogoUrl: { type: String },
    useCustomLogo: { type: Boolean },
    enableAudio: { type: Boolean },
    customAudioId: { type: String },

    // NOTE If you wish to add additional properties do so here
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

