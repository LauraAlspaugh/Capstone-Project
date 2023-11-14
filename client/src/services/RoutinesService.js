import { AppState } from "../AppState.js"
import { FavoriteRoutine } from "../models/FavoriteRoutine.js"
import { Routine } from "../models/Routine.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { listEntriesService } from "./ListEntriesService.js"

class RoutinesService {
    async getRoutines() {
        const res = await api.get('api/routines')
        // logger.log('getting routines!', res.data)
        AppState.routines = res.data.map(pojo => new Routine(pojo))
    }

    async getRoutineById(routineId) {
        const res = await api.get(`api/routines/${routineId}`)
        return new Routine(res.data)
    }

    async getFavRoutines() {
        const res = await api.get('api/favorites/routines')
        // logger.log('getting fav routines!', res.data)
        AppState.myFavoriteRoutines = res.data.map(pojo => new FavoriteRoutine(pojo))
        if (AppState.myFavoriteMoves.length == 0) {
            AppState.noFavRoutines = true;
        }
    }

    async createRoutine(body) {
        const res = await api.post('api/routines', body)
        const newRoutine = new Routine(res.data);
        logger.log('new routine', newRoutine);
        AppState.listEntries = [{
            position: 0,
            name: 'Add from the list on the right or browse the catalog to add moves',
        }]; // intro message to draw in until a move is added
        AppState.editRoutine = true; // enable edit view on routine editor
        AppState.activeRoutine = newRoutine;
    }

    async favoriteRoutine(routineId) {
        const res = await api.post(`api/favorites/routines`, { routineId })
        AppState.myFavoriteRoutines.push(new FavoriteRoutine(res.data))
    }

    async unfavoriteRoutine(routineId) {
        const myFavoritedRoutineObjectData = AppState.myFavoriteRoutines.find(favoriteRoutine => favoriteRoutine.routineId == routineId)
        const res = await api.delete(`api/favorites/routines/${myFavoritedRoutineObjectData.id}`)
        AppState.myFavoriteRoutines = AppState.myFavoriteRoutines.filter(fav => fav.id != myFavoritedRoutineObjectData.id)
        return res.data
    }

    async archiveRoutine(routineId) {
        const res = await api.delete(`api/routine/${routineId}`)
        logger.log('archived', res.data)
    }

    async deleteRoutine(routineId) {
        const res = await api.delete(`api/routine/${routineId}/delete`)
        logger.log(res.data)
    }

    async setActiveRoutine(routineId) {
        AppState.activeRoutine = {};
        AppState.activeRoutine = await this.getRoutineById(routineId)
        await listEntriesService.getListEntriesByRoutineId(routineId)
        AppState.playlist = AppState.listEntries.map(entry=>entry.id)
    }

    manualCheck() {
        if (AppState.myFavoriteMoves.length == 0) {
            AppState.noFavRoutines = true;
        } else {
            AppState.noFavRoutines = false;
        }
    }

}
export const routinesService = new RoutinesService()