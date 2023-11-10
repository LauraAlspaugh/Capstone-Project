import { AppState } from "../AppState.js"
import { FavoriteRoutine } from "../models/FavoriteRoutine.js"
import { Routine } from "../models/Routine.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class RoutinesService{
    async getRoutines(){
        const res = await api.get('api/routines')
        logger.log('getting routines!', res.data)
        AppState.routines = res.data.map(pojo => new Routine (pojo))
    }

    async getRoutineById(routineId){
        const res = await api.get(`api/routines/${routineId}`)
        return new Routine(res.data)
    }
    
    async getFavRoutines(){
        const res = await api.get('api/favorites/routines')
        logger.log('getting fav routines!', res.data)
        AppState.myFavoriteRoutines = res.data.map(pojo => new FavoriteRoutine(pojo))
    }
    
    async favoriteRoutine(routineId) {
        const res = await api.post(`api/favorites/routines`, { routineId })
        AppState.myFavoriteRoutines.push(new FavoriteRoutine(res.data))
        logger.log('favorited routine', res.data)
    }

    async unfavoriteRoutine(routineId){
        logger.log('routineId', routineId)
        const myFavoritedRoutineObjectData = AppState.myFavoriteRoutines.find(favoriteRoutine => favoriteRoutine.routineId == routineId)
        logger.log('myFavoritedRoutineObjectData', myFavoritedRoutineObjectData)
        const res = await api.delete(`api/favorites/routines/${myFavoritedRoutineObjectData.id}`)
        logger.log(res.data)
        AppState.myFavoriteRoutines = AppState.myFavoriteRoutines.filter(fav => fav.id != myFavoritedRoutineObjectData.id)
    }

    async setActiveRoutine(routineId) {
        AppState.activeRoutine = await this.getRoutineById(routineId)
    }

}
export const routinesService = new RoutinesService()