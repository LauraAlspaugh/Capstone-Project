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
        this.level = data.level
        this.creator = data.creator
        this.moveCount = data.moveCount
        this.listEntry = data.listEntry
        this.creatorId = data.creatorId
        this.edit = data.edit
    }
    
    get descriptionArray(){
        return this.description.split('. ')
    }

    get shortDescription(){
        return this.description.slice(0, 50)
    }
}