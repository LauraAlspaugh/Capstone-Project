import { AppState } from "../AppState"
import { ListEntry } from "../models/ListEntry";
import { logger } from "../utils/Logger";

class ListEntriesService{

  async changePosition(listEntryId, newPosition) {

    logger.log('listEntryId', listEntryId,'newPosition', newPosition)
    const currentPosition = AppState.playlist.findIndex(entry => entry.id == listEntryId) + 1;
    // const shift = newPosition - currentPosition;
    const listEntry = AppState.playlist.splice(currentPosition, 1); // remove from current
    AppState.playlist.splice(newPosition, 0, listEntry); // insert into new position
    const updatePositions = AppState.playlist.slice(currentPosition - 1, newPosition); // get copy of positions that will change
    updatePositions.map((entryId, i) => new ListEntry({ id: entryId, position: i + 1 })); // create objects with IDs & new positions
    logger.log('updatePositions', updatePositions);

  }

}
export const listEntriesService = new ListEntriesService()