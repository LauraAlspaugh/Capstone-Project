import { Move } from "./Move.js"

export class ListEntry {
    constructor(data) {
        this.id = data.id || data._id
        this.name = data.name
        this.description = data.description
        this.imgUrl = data.imgUrl
        this.duration = data.duration
        this.position = data.position
        this.transition = data.transition
        this.routineId = data.routineId
        this.moveId = data.moveId
        this.move = new Move(data.move) 
        this.creatorId = data.creatorId
        this.creator = data.creator
        this.editPosition = false
        this.editDuration = false
    }
}