import { AppState } from "../AppState"
import { ListEntry } from "../models/ListEntry";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class ListEntriesService{

  async getListEntriesByRoutineId(routineId) {
    const res = await api.get(`api/routines/${routineId}/listentries`)
    AppState.listEntries = res.data.map(entry => new ListEntry(entry));
    logger.log('listentries', AppState.listEntries);
  }

  async changePosition(listEntryId, newPosition) {

    logger.log('listEntryId', listEntryId,'newPosition', newPosition)
    const currentPosition = AppState.listEntries.findIndex(entry => entry.id == listEntryId) + 1;
    const shift = newPosition - currentPosition;
    let shiftPositions = [];
    if (shift > 0) {
      shiftPositions = AppState.listEntries.slice(currentPosition - 1, newPosition); // get copy of positions that will change
      shiftPositions[0].position = newPosition + 1;
      shiftPositions.forEach(entry => { entry.position-- });
    }
    logger.log('shiftPositions', shiftPositions);
    
    const updatePositions = shiftPositions.map(entry => new ListEntry({ _id: entry.id, position: entry.position })); // create objects with IDs & new positions
    const res = await api.put('api/listentries', updatePositions) 
    logger.log('api put results', res.data)
    
  }
  
}

export const listEntriesService = new ListEntriesService()