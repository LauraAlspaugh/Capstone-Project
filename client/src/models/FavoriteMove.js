export class FavoriteMove{
    constructor(data){
        this.id = data.id || data._id
        this.moveId = data.moveId
        this.creatorId = data.creatorId
        this.creator = data.creator
    }
}