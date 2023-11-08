import { AppState } from "../AppState.js"
import { Routine } from "../models/Routine.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class RoutinesService{
async getRoutines(){
    const res = await api.get('api/routines')
    logger.log('getting routines!', res.data)
    AppState.routines = res.data.map(pojo => new Routine (pojo))
}
}
export const routinesService = new RoutinesService()