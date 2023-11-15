<template>
  <div class="container-fluid" >
    <section class="row justify-content-center">
      <div v-if="activeMove?.imgUrl" class="col active-move">
        <section class="row">
          <div class="col">
            <button type="button" class="btn-close btn-close-white p-3" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
        </section>
        <section class="row justify-content-center">
          <div class="col-10 mt-2 pb-0 text-center">
            <img class="img-fluid" :src="activeMove.imgUrl" alt="activeMove.englishName">
            <p class="text-center m-0 name-text  italiana pt-3 pb-0">{{ activeMove.englishName }}</p>
          </div>
        </section>
        <section class="row  italiana text-white px-4">
          <div class="col-12">
            <span class="text-mint d-flex justify-content-between align-items-center">
              {{ activeMove.level }}
              <span class="d-flex align-items-center">
                <i v-if="activeRoutine.edit" class="fs-1 me-5 mdi mdi-plus" title="Add move to routine" type="button" 
                @click="addMoveToRoutine()"></i>
                <span v-else class="position-relative">
                  <i class="fs-1 me-5 showHidden mdi mdi-information" title="(set a routine active to add from catalog)"></i>
                  <p class="mb-0 position-absolute hidden card p-3">Set a routine active and unlock it to add directly from the catalog</p>
                </span>
                <FavoriteUnfavoriteMove :id="activeMove.id" :moveOrRoutine="'move'" />
              </span>
            </span>
            <span class="text-mint pe-3" v-for="focus in activeMove.bodyPart" :key="focus"> {{ focus }}</span>
            <div class="mb-3">
              <p class="m-0 mt-3">Description: </p>
              <li v-for="description in activeMove.descriptionArray" :key="description">{{ description }}</li>
            </div>
            <div class="mb-5">
              <p class="m-0">Benefits: </p>
              <li v-for="benefit in activeMove.benefitsArray" :key="benefit">{{ benefit }}</li>
            </div>
          </div>
        </section>
      </div>
      
    </section>
  </div>
</template>


<script>
import { AppState } from '../AppState.js';
import { computed } from 'vue';
import FavoriteUnfavoriteMove from "./FavoriteUnfavoriteMove.vue"
import { listEntriesService } from "../services/ListEntriesService";
import Pop from "../utils/Pop";

export default {
  setup() {

    return {
      moves: computed(() => AppState.moves),
      activeMove: computed(() => AppState.activeMove),
      activeRoutine: computed(() => AppState.activeRoutine),

      async addMoveToRoutine() {
        try {
          await listEntriesService.createListEntry(this.activeRoutine.id, this.activeMove.id);
          Pop.success(`'${this.activeMove.englishName}' has been added to the routine '${this.activeRoutine.name}'`)
        }
        catch (error) { Pop.error(error) }
      },

      clearMove() {
        AppState.activeMove = null;
      }

    };
  },
  components: { FavoriteUnfavoriteMove }
};
</script>


<style lang="scss" scoped>
.active-move {
  background-color: #0F2D24;
}

.name-text {
  color: white;
  font-size: 50px;

}

.more-text {
  color: white;

}

.text-mint {
  color: #BCC8C4;
}

img {
  border: solid black 2px;
  border-radius: 3px;
  width: 580px;
  max-height: 350px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.412);
  object-fit: cover;
  position: center;
}

.hidden{
  width: 12.5rem;
  bottom: 3rem;
  right: 4.5rem;
  opacity: 0;
  transition: .25s;
  pointer-events: none;
}
.showHidden:hover+.hidden{
  opacity: 1;
}
</style>