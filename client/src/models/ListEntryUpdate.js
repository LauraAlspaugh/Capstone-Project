
export class ListEntryUpdate {
    constructor(data) {
        this.id = data.id || data._id
        this.duration = data.duration
        this.position = data.position
        this.routineId = data.routineId
        this.moveId = data.moveId
        this.creatorId = data.creatorId
    }
}