export class Routine{
    constructor(data){
        this.id = data.id || data._id
        this.name = data.name
        this.description = data.description
        this.keyImage = data.keyImage
        this.category = data.category
        this.target = data.target
        this.isPrivate = data.isPrivate
        this.isExample = data.isExample
        this.isArchived = data.isArchived
        this.playCount = data.playCount
        this.playTime = data.playTime 
        this.creatorId = data.creatorId
        this.level = data.level
        this.moves = data.moves
        this.creator = data.creator
        this.moveCount = data.moveCount
        this.edit = data.edit
    }
    
    get descriptionArray(){
        return this.description.split('. ')
    }

    get shortDescription(){
        return this.description.slice(0, 50)
    }
}