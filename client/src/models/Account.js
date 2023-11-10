export class Account {
  constructor(data) {
    this.id = data.id
    this.email = data.email
    this.name = data.name
    this.picture = data.picture
    // TODO add additional properties if needed

    this.dailyPlayStreak = data.dailyPlayStreak
    this.lastActive = data.lastActive

    this.customLogoUrl = data.customLogoUrl
    this.useCustomLogo = data.useCustomLogo
    
    this.enableAudio = data.enableAudio
    this.customAudio = data.customAudio

    this.github = data.github
    this.linkedin = data.linkedin
    this.resume = data.resume
    this.website = data.website
    this.bio = data.bio
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
  }
}