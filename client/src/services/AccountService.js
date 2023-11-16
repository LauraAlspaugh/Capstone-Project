import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { logger } from '../utils/Logger'
import Pop from "../utils/Pop"
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = new Account(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async getAppAuthors() {
    try {
      const res = await api.get('/account/authors');
      AppState.authors = res.data.map(author => new Account(author));
    } catch (error) {
      Pop.error(error)
    }
  }

  async updateProfile(newData) {
    try {
      const res = await api.put('/account', newData);
      AppState.account = new Account(res.data);
      AppState.activeTransitionSound = AppState.account.transitionSound
    } catch (error) {
      Pop.error(error);
    }
  }

}

export const accountService = new AccountService()
