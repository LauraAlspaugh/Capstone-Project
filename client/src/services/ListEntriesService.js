import { AppState } from "../AppState"
import { ListEntry } from "../models/ListEntry";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { api } from "./AxiosService";

class ListEntriesService{

  async getListEntriesByRoutineId(routineId) {
    AppState.listEntries = [];
    const res = await api.get(`api/routines/${routineId}/listentries`)
    AppState.listEntries = res.data.map(entry => new ListEntry(entry));
    logger.log('listentries', AppState.listEntries);
  }

  async createListEntry(routineId, moveId) {
    logger.log('routineId', routineId, ' moveId', moveId)
    const res = await api.post('api/listentries', { routineId, moveId });
    AppState.listEntries.push(new ListEntry(res.data))
  }

  async changePosition(listEntryId, newPosition) {
    const currentPosition = AppState.listEntries.findIndex(entry => entry.id == listEntryId) + 1;
    if (currentPosition == newPosition) { return }
    if (newPosition > AppState.listEntries.length) {
      Pop.error('Position is out of bounds. Please specify a position within the current playlist length.')
      return
    }
    
    const shift = newPosition - currentPosition;
    let shiftPositions = [];

    if (shift > 0) {
      shiftPositions = AppState.listEntries.slice(currentPosition - 1, newPosition); // get copy of positions that will change
      shiftPositions[0].position = newPosition + 1;
      shiftPositions.forEach(entry => { entry.position-- });
      shiftPositions.sort((a, b) => (a.position - b.position));
      shiftPositions.forEach((entry, i) => {
        AppState.listEntries.splice(currentPosition - 1 + i, 1, shiftPositions[i])        
      })
    } else if (shift < 0) {
      shiftPositions = AppState.listEntries.slice(newPosition - 1, currentPosition); // get copy of positions that will change
      shiftPositions[shiftPositions.length - 1].position = newPosition - 1;
      shiftPositions.forEach(entry => { entry.position++ });
      shiftPositions.sort((a, b) => (a.position - b.position));
      shiftPositions.forEach((entry, i) => {
        AppState.listEntries.splice(newPosition - 1 + i, 1, shiftPositions[i])        
      })
    } 
    logger.log('shiftPositions', shiftPositions);
    const updatePositions = shiftPositions.map(entry => new ListEntry({ _id: entry.id, position: entry.position })); // create objects with IDs & new positions
    const res = await api.put('api/listentries', updatePositions) 
    logger.log('api put results', res.data)
  }
  
  async changeDuration(listEntryObj) {
    const duration = listEntryObj.duration;
    const res = await api.put(`api/listentries/${listEntryObj.id}`, { duration })
    return res.data
  }


}

export const listEntriesService = new ListEntriesService()