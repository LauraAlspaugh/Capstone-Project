export class Move  {
    constructor(data){
        this.id = data.id || data._id
        this.level = data.level
        this.imgUrl = data.imgUrl
        this.bodyPart = data.bodyPart
        this.description = data.description
        this.englishName = data.englishName
        this.sanskritName = data.sanskritName
        this.benefits = data.benefits
        this.category = data.category
        this.time = data.time
        this.useageCount = data.useageCount
        this.totalInstanceCount = data.totalInstanceCount
        this.creatorId = data.creatorId
        this.creator = data.creator

    }
    get benefitsArray(){
        return this.benefits.split('. ')
    }
}