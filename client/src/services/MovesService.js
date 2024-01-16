import { AppState } from "../AppState.js"
import { FavoriteMove } from "../models/FavoriteMove.js"
import { Move } from "../models/Move.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class MovesService{
async getMoves(){
    const res = await api.get('api/moves')
    AppState.moves = res.data.map(pojo => new Move(pojo))
    AppState.moves.sort((m1, m2) => {
        if (m1.englishName < m2.englishName) return -1;
        if (m1.englishName > m2.englishName) return 1;
        return 0
    })
}
async getMoveById(moveId){
    AppState.activeMove = null
    const res = await api.get(`api/moves/${moveId}`)
    AppState.activeMove = new Move(res.data)
}

async favoriteMove(moveId){
    const res = await api.post(`api/favorites/moves`, { moveId });
    AppState.myFavoriteMoves.push(new FavoriteMove(res.data));
}

async unfavoriteMove(moveId){
    const res = await api.delete(`api/favorites/moves/${moveId}`);
    AppState.myFavoriteMoves = AppState.myFavoriteMoves.filter(fav => fav.moveId != moveId);
    return res.data
}

async getMyFavoriteMoves(){
    const res = await api.get(`api/favorites/moves`)
    AppState.myFavoriteMoves = res.data.map(fav => new FavoriteMove(fav))
    AppState.myFavoriteMoves.sort((m1, m2) => {
        if (m1.move.englishName < m2.move.englishName) return -1;
        if (m1.move.englishName > m2.move.englishName) return 1;
        return 0
    })
}

finishMove() {
    AppState.finishedMove = true;
}

startMove() {
    AppState.finishedMove = false;
}

finishPlayingRoutine() {
    AppState.routineIsFinishedPlaying = true;
}

startPlayingRoutine() {
    AppState.routineIsFinishedPlaying = false;
}

}
export const movesService = new MovesService()