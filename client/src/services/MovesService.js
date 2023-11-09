import { AppState } from "../AppState.js"
import { Move } from "../models/Move.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class MovesService{
async getMoves(){
    const res = await api.get('api/moves')
    logger.log('getting moves!', res.data)
    AppState.moves = res.data.map(pojo => new Move(pojo))
}
async getMoveById(moveId){
    AppState.activeMove = null
    const res = await api.get(`api/moves/${moveId}`)
    logger.log('getting move by Id', res.data)
    AppState.activeMove = new Move(res.data)
}

async favoriteMove(moveId){
    const res = await api.post(`api/favorites/moves`, {moveId})
    logger.log(res.data)
}
}
export const movesService = new MovesService()