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
}
export const movesService = new MovesService()