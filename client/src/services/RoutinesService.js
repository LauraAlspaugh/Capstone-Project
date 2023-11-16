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
        AppState.editRoutine = true; // enable edit view on routine editor
        AppState.activeRoutine = newRoutine;
    }

    async editRoutine(body) {
        const res = await api.put('api/routines', body)
        const updatedRoutine = new Routine(res.data);
        logger.log('updated routine', updatedRoutine);
        AppState.activeRoutine = updatedRoutine;
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

    async archiveRoutine() {
        const routineObj = AppState.selectedRoutine;
        if (routineObj.creatorId != AppState.account.id) { throw new Error('Not yours to archive') }
        const res = await api.delete(`api/routines/${routineObj.id}`);
        const updated = new Routine(res.data);
        AppState.selectedRoutine = updated;
        const index = AppState.routines.findIndex(routine => routine.id == routineObj.id);
        AppState.routines.splice(index, 1, updated);
        logger.log('archived', res.data)
    }

    async unarchiveRoutine() {
        const routineObj = AppState.selectedRoutine;
        if (routineObj.creatorId != AppState.account.id) { throw new Error('Not yours to unarchive') }
        const res = await api.delete(`api/routines/${routineObj.id}`)
        const updated = new Routine(res.data);
        AppState.selectedRoutine = updated;
        const index = AppState.routines.findIndex(routine => routine.id == routineObj.id);
        AppState.routines.splice(index, 1, updated);
        logger.log('archived', res.data)
    }

    async deleteRoutine() {
        const routineObj = AppState.selectedRoutine;
        if (routineObj.favoritedCount > 0){ throw new Error('Cannot delete - someone is still using this routine')}
        if (routineObj.creatorId != AppState.account.id) { throw new Error('Not yours to delete') }
        const res = await api.delete(`api/routines/${routineObj.id}/delete`)
        AppState.routines = AppState.routines.filter(routine => routine.id != routineObj.id);
        logger.log(res.data)
    }

    async setActiveRoutine(routineId) {
        AppState.activeRoutine = {};
        AppState.activeRoutine = await this.getRoutineById(routineId)

        await listEntriesService.getListEntriesByRoutineId(routineId)
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