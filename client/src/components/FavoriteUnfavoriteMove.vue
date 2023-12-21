<template>
  <div>
    <span v-if="isFavMove" @click="unfavorite()" role="button"><i class="fs-2 mdi mdi-heart"
        title="Unfavorite this move"></i></span>
    <span v-if="isFavRoutine" @click="unfavorite()" role="button"><i class="fs-2 mdi mdi-heart"
        title="Unfavorite this routine"></i></span>
    <span v-else-if="!isFavMove" @click="favorite()" role="button"><i class="fs-2 mdi mdi-heart-outline"
        title="Favorite this move"></i></span>
    <span v-else-if="!isFavRoutine" @click="favorite()" role="button"><i class="fs-2 mdi mdi-heart"
        title="Favorite this routine"></i></span>
  </div>
</template>


<script>
import { AppState } from '../AppState.js';
import { computed } from 'vue';
import Pop from "../utils/Pop.js";
import { movesService } from "../services/MovesService.js";
import { routinesService } from "../services/RoutinesService";

export default {
  props: { id: { type: String }, moveOrRoutine: { type: String } },
  setup(props) {
    return {
      moves: computed(() => AppState.moves),
      myFavoriteMoves: computed(() => AppState.myFavoriteMoves),
      isFavMove: computed(() => AppState.myFavoriteMoves.find((move) => move.moveId == props.id)),

      routines: computed(() => AppState.routines),
      myFavoriteRoutines: computed(() => AppState.myFavoriteRoutines),
      isFavRoutine: computed(() => AppState.myFavoriteRoutines.find((routine) => routine.routineId == props.id)),


      async favorite() {
        if (props.moveOrRoutine == 'move') {
          await this.favoriteMove(props.id);
        }
        else {
          await this.favoriteRoutine(props.id);
        }
        await routinesService.getFavRoutines();
      },

      async favoriteMove(id) {
        try {
          await movesService.favoriteMove(id);
        }
        catch (error) { Pop.error(error) }
      },

      async favoriteRoutine(id) {
        try {
          await routinesService.favoriteRoutine(id);
        }
        catch (error) { Pop.error(error) }
      },

      async unfavorite() {
        if (props.moveOrRoutine == 'move') {
          await this.unfavoriteMove(props.id);
        }
        else {
          await this.unfavoriteRoutine(props.id);
        }
        await movesService.getMyFavoriteMoves();
      },

      async unfavoriteMove(id) {
        try {
          await movesService.unfavoriteMove(id);
        }
        catch (error) { Pop.error(error) }
      },

      async unfavoriteRoutine(id) {
        try {
          await routinesService.unfavoriteRoutine(id);
        }
        catch (error) { Pop.error(error) }
      },

    }
  }
};
</script>


<style lang="scss" scoped></style>