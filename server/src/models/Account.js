import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const AccountSchema = new Schema(
  {
    subs: [{ type: String, unique: true }],
    email: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String },

    // NOTE If you wish to add additional properties do so here

    dailyPlayStreak: { type: Number, default: 0 },
    lastActive: { type: Date, default: new Date() },

    customLogoUrl: { type: String, required: false },
    useCustomLogo: { type: Boolean, required: false },

    enableAudio: { type: Boolean, required: false },
    customAudioId: { type: String, required: false },

    github: { type: String, required: false, maxLength: 64 },
    linkedin: { type: String, required: false, maxLength: 64 },
    resume: { type: String, required: false, maxLength: 64 },
    website: { type: String, required: false, maxLength: 64 },
    bio: { type: String, required: false, maxLength: 500 },
    appAuthor: { type: Boolean, required: false, default: false },
    transitionSound: { type: String, enum: ['Ascend', 'Chimes', 'Ding', 'Gong', 'Marimba'], default: 'Ding' },
  },
  { timestamps: true, toJSON: { virtuals: true } },

)

