import { dbContext } from '../db/DbContext'

// Private Methods

/**
 * Creates account if one does not exist
 * @param {any} account
 * @param {any} user
 */
async function createAccountIfNeeded(account, user) {
  if (!account) {
    user._id = user.id
    if (typeof user.name == 'string' && user.name.includes('@')) {
      user.name = user.nickname
    }
    account = await dbContext.Account.create({
      ...user,
      subs: [user.sub]
    })
  }
  return account
}

/**
 * Adds sub to account if not already on account
 * @param {any} account
 * @param {any} user
 */
async function mergeSubsIfNeeded(account, user) {
  if (!account.subs.includes(user.sub)) {
    // @ts-ignore
    account.subs.push(user.sub)
    await account.save()
  }
}
/**
 * Restricts changes to the body of the account object
 * @param {any} body
 */
function sanitizeBody(body) {
  const writable = {
    name: body.name,
    picture: body.picture,
    useCustomLogo: body.useCustomLogo,
    customLogoUrl: body.customLogoUrl,
    enableAudio: body.enableAudio,
    customAudioId: body.customAudioId,
    transitionSound: body.transitionSound,
    github: body.github,
    linkedin: body.linkedin,
    resume: body.resume,
    website: body.website,
    bio: body.bio,
    createdAt: body.createdAt,
    updatedAt: body.updatedAt,
    transitionSound: body.transitionSound,
  }
  return writable
}

function _filterBody(body) {
  const shareable = {
    name: body.name,
    email: body.email,
    picture: body.picture,
    github: body.github,
    linkedin: body.linkedin,
    resume: body.resume,
    website: body.website,
    bio: body.bio,
    createdAt: body.createdAt,
    updatedAt: body.updatedAt,
  }
  return shareable
}

class AccountService {
  async getAppAuthors() {
    const accounts = await dbContext.Account.find({ appAuthor: true });
    const authors = accounts.map(acct => _filterBody(acct));
    return authors
  }

  /**
   * Returns a user account from the Auth0 user object
   *
   * Creates user if none exists
   *
   * Adds sub of Auth0 account to account if not currently on account
   * @param {any} user
   */
  async getAccount(user) {
    let account = await dbContext.Account.findOne({
      _id: user.id
    })
    account = await createAccountIfNeeded(account, user)
    await mergeSubsIfNeeded(account, user)
    return account
  }

  /**
   * Updates account with the request body, will only allow changes to editable fields
   *  @param {any} user Auth0 user object
   *  @param {any} body Updates to apply to user object
   */
  async updateAccount(user, body) {
    const update = sanitizeBody(body)
    const account = await dbContext.Account.findOneAndUpdate(
      { _id: user.id },
      { $set: update },
      { runValidators: true, setDefaultsOnInsert: true, new: true }
    )
    return account
  }

  async dailyActivity(user) {
    const addOne = await dbContext.Account.findOneAndUpdate(
      { _id: user.id },
      {
        $inc: { dailyPlayStreak: 1 },
        $set: { lastActive: new Date() }
      },
      { new: true }
    )
    return addOne
  }

}
export const accountService = new AccountService()
