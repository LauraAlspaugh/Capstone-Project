<template>
  <div class="">
    <span v-if="isFavMove" @click="unfavorite()" role="button"><i class="fs-2 mdi mdi-heart"></i></span>
    <span v-if="isFavRoutine" @click="unfavorite()" role="button"><i class="fs-2 mdi mdi-heart"></i></span>
    <span v-else-if="!isFavMove" @click="favorite()" role="button"><i class="fs-2 mdi mdi-heart-outline"></i></span>

  </div>
</template>


<script>
import { AppState } from '../AppState.js';
import { computed, reactive, onMounted } from 'vue';
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { movesService } from "../services/MovesService.js";
import { routinesService } from "../services/RoutinesService";
export default {
  props: { id: { type: String }, moveOrRoutine: { type: String } },
  setup(props) {
    return {
      async favoriteMove(id) {
        try {
          await movesService.favoriteMove(id)
        } catch (error) {
          logger.error(error)
          Pop.error(error)
        }
      },

      async favoriteRoutine(id) {
        try {
          await routinesService.favoriteRoutine(id)
        } catch (error) {
          logger.error(error)
          Pop.error(error)
        }
      },

      async favorite() {
        if (props.moveOrRoutine == 'move') {
          this.favoriteMove(props.id)
        }
        else {
          this.favoriteRoutine(props.id)
        }
      },
      async unfavoriteMove(id) {
        try {
          await movesService.unfavoriteMove(id)
        } catch (error) {
          logger.error(error)
          Pop.error(error)
        }
      },
      async unfavoriteRoutine(id) {
        try {
          await routinesService.unfavoriteRoutine(id)
        } catch (error) {
          logger.error(error)
          Pop.error(error)
        }
      },
      async unfavorite() {
        if (props.moveOrRoutine == 'move') {
          this.unfavoriteMove(props.id)
        }
        else {
          this.unfavoriteRoutine(props.id)
        }
      },
      moves: computed(() => AppState.moves),
      myFavoriteMoves: computed(() => AppState.myFavoriteMoves),
      isFavMove: computed(() => AppState.myFavoriteMoves.find((move) => move.moveId == props.id)),
      routines: computed(() => AppState.routines),
      myFavoriteRoutines: computed(() => AppState.myFavoriteRoutines),
      isFavRoutine: computed(() => AppState.myFavoriteRoutines.find((routine) => routine.routineId == props.id))
    }
  }
};
</script>


<style lang="scss" scoped></style>