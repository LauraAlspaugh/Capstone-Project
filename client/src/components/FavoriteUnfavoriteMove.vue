<template>
  <div class="">
    <span role="button"><i class="fs-2 mdi mdi-heart"></i></span>
    <span @click="favoriteMove()" role="button"><i class="fs-2 mdi mdi-heart-outline"></i></span>

  </div>
</template>


<script>
import { AppState } from '../AppState.js';
import { computed, reactive, onMounted } from 'vue';
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { movesService } from "../services/MovesService.js";
export default {
  setup() {
    return {
      async favoriteMove() {
        try {
          const moveId = this.moves.moveId
          await movesService.favoriteMove(moveId)
        } catch (error) {
          logger.error(error)
          Pop.error(error)
        }
      },
      moves: computed(() => AppState.moves),
      myFavoriteMoves: computed(() => AppState.myFavoriteMoves),
      isFavMove: computed(() => AppState.myFavoriteMoves.find((move) => move.moveId == AppState.moves.id))
    }
  }
};
</script>


<style lang="scss" scoped></style>