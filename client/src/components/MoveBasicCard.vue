<template>
  <div @click="setActiveMove(moveBasicProp)" data-bs-toggle="modal" data-bs-target="#move-modal" type="button">
    <section class="image-border d-flex">
      <div class="d-flex align-items-center">
        <img class="thumbnail" :src="moveBasicProp.imgUrl" alt="move picture">
        <p class="fs-5 m-0 italiana fw-bold p-2">{{ moveBasicProp.englishName }}</p>
      </div>
    </section>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed } from 'vue';
import { Move } from '../models/Move.js';

export default {
  props: { moveBasicProp: { type: Move, required: true } },
  setup() {
    
    return {
      moves: computed(() => AppState.moves),
      myFavoriteMoves: computed(() => AppState.myFavoriteMoves),
      
      setActiveMove(moveObj) {
        AppState.activeMove = moveObj;
      },

    }
  }
}
</script>


<style lang="scss" scoped>
.image-border {
  border: 2px solid #D7DBDB;
  background-color: #E3E0DE;
}

.thumbnail {
  object-fit: cover;
  position: center;
  height: 80px;
  padding: 4px;
}
</style>