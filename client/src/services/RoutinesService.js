import { AppState } from "../AppState.js"
import { FavoriteRoutine } from "../models/FavoriteRoutine.js"
import { Routine } from "../models/Routine.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { listEntriesService } from "./ListEntriesService.js"

function _clearData() {
    AppState.activeRoutine = {};
    AppState.listEntries = [];
}

class RoutinesService {
    async getRoutines() {
        const res = await api.get('api/routines')
        AppState.routines = res.data.map(pojo => new Routine(pojo))
    }

    async getRoutineById(routineId) {
        const res = await api.get(`api/routines/${routineId}`)
        return new Routine(res.data)
    }

    async getMyRoutines() {
        const res = await api.get('account/routines');
        AppState.myRoutines = res.data.map(pojo => new Routine(pojo))
    }

    async getFavRoutines() {
        const res = await api.get('api/favorites/routines')
        AppState.myFavoriteRoutines = res.data.map(pojo => new FavoriteRoutine(pojo))
        if (AppState.myFavoriteRoutines.length == 0) {
            AppState.noFavRoutines = true;
        }
    }

    async createRoutine(routineData) {
        _clearData();
        const res = await api.post('api/routines', routineData)
        const newRoutine = new Routine(res.data);
        logger.log('new routine', newRoutine);
        newRoutine.edit = true; // enable edit view on routine editor
        AppState.activeRoutine = newRoutine;
        return newRoutine
    }

    async cloneRoutine(routineId) {
        const res = await api.post(`api/routines/${routineId}/clone`)
        const clonedRoutine = new Routine(res.data);
        logger.log('cloned routine', clonedRoutine);
        clonedRoutine.edit = true; // enable edit view on routine editor
        await this.setActiveRoutine(clonedRoutine.id)
        return clonedRoutine
    }

    async editRoutine(routineData) {
        const res = await api.put(`api/routines/${routineData.id}`, routineData)
        const updatedRoutine = new Routine(res.data);
        logger.log('updated routine', updatedRoutine);
        AppState.activeRoutine = updatedRoutine;
    }

    async favoriteRoutine(routineId) {
        const res = await api.post(`api/favorites/routines`, { routineId });
        AppState.myFavoriteRoutines.push(new FavoriteRoutine(res.data));
        const routine = AppState.routines.find(routine => routine.id == routineId);
        routine.favoritedCount++
    }

    async unfavoriteRoutine(routineId) {
        const res = await api.delete(`api/favorites/routines/${routineId}`);
        AppState.myFavoriteRoutines = AppState.myFavoriteRoutines.filter(fav => fav.routineId != routineId);
        const routine = AppState.routines.find(routine => routine.id == routineId);
        routine.favoritedCount--
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
        await this.unfavoriteRoutine(routineObj.id);
    }

    async unarchiveRoutine() {
        const routineObj = AppState.selectedRoutine;
        if (routineObj.creatorId != AppState.account.id) { throw new Error('Not yours to unarchive') }
        const res = await api.delete(`api/routines/${routineObj.id}`)
        const updated = new Routine(res.data);
        AppState.selectedRoutine = updated;
        const index = AppState.routines.findIndex(routine => routine.id == routineObj.id);
        AppState.routines.splice(index, 1, updated);
        await this.favoriteRoutine(routineObj.id);
    }

    async deleteRoutine() {
        const routineObj = AppState.selectedRoutine;
        if (routineObj.favoritedCount > 0){ throw new Error('Cannot delete - someone is still using this routine')}
        if (routineObj.creatorId != AppState.account.id) { throw new Error('Not yours to delete') }
        const res = await api.delete(`api/routines/${routineObj.id}/delete`)
        AppState.routines = AppState.routines.filter(routine => routine.id != routineObj.id);
        AppState.myRoutines = AppState.myRoutines.filter(routine => routine.id != routineObj.id);
        logger.log(res.data)
    }

    async setActiveRoutine(routineId) {
        _clearData();
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