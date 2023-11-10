<template>
  <div class="rounded-top">
    <span class="d-flex align-items-center justify-content-center rounded-top selectable lighten-30 bgBlur bgColor1"
    @click="createRoutine()">
      <p class="mb-0 p-2 fs-4 ">Create New Routine</p>
      <i class="fs-1 mdi mdi-plus-circle"></i>
    </span>

    <span v-if="noFavRoutines" class="d-flex flex-column align-items-center">
      <span class="d-flex align-items-center ">
        <p class="mb-0 me-3 fs-3">Add some favorites! </p>
        <i class="fs-1 mdi mdi-star mdi-spin"></i>
      </span>
      <p class="me-3">Missing favorites?
        <small class="btn btn-secondary" @click="manualCheck()">Recheck</small></p>
    </span>
    <span v-else-if="favRoutines.length > 0">
      <div v-for="fav in favRoutines" :key="fav.id" @click="setActiveRoutine(fav.routineId)"
      class="d-flex align-items-center justify-content-between border px-3 selectable lighten-30 bgBlur bgColor2">
        <p class="mb-0 p-2 fs-5 text-nowrap">{{fav.routine.name}}</p>
        <p class="mb-0 p-2 fs-5 text-nowrap">{{fav.routine.playTime/60}} min</p>
      </div>
    </span>
    <span v-else class="d-flex align-items-center justify-content-center">
      <p class="mb-0 me-3 fs-3">Loading...</p>
      <i class="fs-1 mdi mdi-loading mdi-spin"></i>
    </span>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed } from 'vue';
import Pop from "../utils/Pop";
import { routinesService } from "../services/RoutinesService";

export default {
  setup() {
    
    return {
      favRoutines: computed(() => AppState.myFavoriteRoutines),
      noFavRoutines: computed(() => AppState.noFavRoutines),

      async createRoutine() {
        try {
          await routinesService.createRoutine();
        } catch (error) {Pop.error(error)}
      },

      async setActiveRoutine(routineId) {
        try {
          await routinesService.setActiveRoutine(routineId);
        } catch (error) {Pop.error(error)}
      },

      manualCheck() {
        routinesService.manualCheck();
      }

    }
  }
};
</script>


<style lang="scss" scoped>
.bgBlur{
  backdrop-filter: blur(3px);
}
.bgColor1{
  background-color: #6B837399;
}
.bgColor2{
  background-color: #6B837369;
}
</style>