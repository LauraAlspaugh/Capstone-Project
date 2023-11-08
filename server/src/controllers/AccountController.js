import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { favoritesService } from "../services/FavoritesService.js"

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .get('/favorites/moves', this.getMyFavoritedMoves)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .put('', this.updateUserAccount)
      .post('', this.dailyActivity)
  }

  async getMyFavoritedMoves(request, response, next) {
    try {
      const userId = request.userInfo.id
      const myFavoritedMoves = await favoritesService.getMyFavoritedMoves(userId)
      return response.send(myFavoritedMoves)
    } catch (error) {
      next(error)
    }

  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async updateUserAccount(req, res, next) {
    try {
      const account = await accountService.updateAccount(req.userInfo, req.body)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async dailyActivity(req, res, next) {
    try {
      const account = await accountService.dailyActivity(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

}
