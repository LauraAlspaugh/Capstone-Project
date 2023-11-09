export class FavoriteRoutine{
    constructor(data){
        this.id = data.id || data._id
        this.routineId = data.routineId
        this.creatorId = data.creatorId
        this.creator = data.creator
        this.routine = data.routine
    }
}