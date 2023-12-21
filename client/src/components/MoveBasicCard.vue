<template>
  <div @click="setActiveMove(moveBasicProp)" type="button">
    <section class="image-border d-flex">
      <div class="d-flex align-items-center w-100">
        <img class="thumbnail" :class="moveBasicProp.englishName == 'Interval' ? 'rounded-circle' : ''"
          :src="moveBasicProp.imgUrl" alt="move picture">
        <p class="fs-5 m-0 me-auto italiana fw-bold p-2">{{ moveBasicProp.englishName }}</p>
        <i class="fs-4 mx-2 mint dimmed mdi mdi-plus" type="button" title="add pose to routine"
          @click.stop="addMoveToRoutine(moveBasicProp)"></i>
      </div>
    </section>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed } from 'vue';
import { Move } from '../models/Move.js';
import Pop from "../utils/Pop";
import { listEntriesService } from "../services/ListEntriesService";
import { Modal } from "bootstrap";

export default {
  props: { moveBasicProp: { type: Move, required: true } },

  setup() {

    return {
      moves: computed(() => AppState.moves),
      myFavoriteMoves: computed(() => AppState.myFavoriteMoves),

      setActiveMove(moveObj) {
        AppState.activeMove = moveObj;
        Modal.getOrCreateInstance('#move-modal').show()
      },

      async addMoveToRoutine(moveObj) {
        try {
          await listEntriesService.createListEntry(AppState.activeRoutine.id, moveObj.id);
          Pop.success(`'${moveObj.englishName}' has been added to the routine '${AppState.activeRoutine.name}'`)
        }
        catch (error) { Pop.error(error) }
      },

    }
  }
}
</script>


<style lang="scss" scoped>
.image-border {
  border: 1px solid #C4D0CC;
  background-color: #e0dddbd5;
  backdrop-filter: blur(3px)
}

.mint {
  color: #C4D0CC;
}

.thumbnail {
  object-fit: cover;
  position: center;
  height: 5rem;
  width: 5rem;
  padding: 4px;
}

.dimmed {
  opacity: .3;
  transition: .25s;
}

.dimmed:hover {
  opacity: 1;
}
</style>