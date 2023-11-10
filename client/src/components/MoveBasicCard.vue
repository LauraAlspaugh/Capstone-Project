<template>
  <section class="row image-border">
    <div  class="col-3">
<img class="img-fluid" :src="moveBasicProp.imgUrl" alt="move picture">
    </div>
    <div  class="col-9 d-flex">
<p class="fs-3 m-0  d-flex italiana  p-4 align-items-center">{{ moveBasicProp.englishName }}</p>
    </div>
  </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
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
img{
  // width: 225px; 
  // height: 150px; 
  object-fit: cover;
  position: center;
  padding: 4px;
  // border: 2px solid #D7DBDB;
}
.image-border{
  border: 2px solid #D7DBDB;
 
  background-color: #E3E0DE;
}
</style>