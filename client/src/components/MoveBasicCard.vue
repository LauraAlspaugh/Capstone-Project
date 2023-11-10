<template>
  <section class="image-border d-flex">
    <div  class="d-flex align-items-center">
      <img class="thumbnail" :src="moveBasicProp.imgUrl" alt="move picture">
      <p class="fs-5 m-0 italiana fw-bold p-2">{{ moveBasicProp.englishName }}</p>
    </div>
  </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, onMounted } from 'vue';
import { Move } from '../models/Move.js';
import { movesService } from '../services/MovesService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
export default {
  props: { moveBasicProp: { type: Move, required: true } },
  setup() {
    onMounted(()=> {
            getMoves()
        })
        async function getMoves() {
    try {
        await movesService.getMoves();
    }
    catch (error) {
        logger.error(error);
        Pop.error(error);
    }
    }
    return {
      moves: computed(() => AppState.moves),
      
    }
  }
}


</script>


<style lang="scss" scoped>
.image-border{
  border: 2px solid #D7DBDB;
  background-color: #E3E0DE;
}
.thumbnail{
  object-fit: cover;
  position: center;
  height: 80px;
  padding: 4px;
}
</style>