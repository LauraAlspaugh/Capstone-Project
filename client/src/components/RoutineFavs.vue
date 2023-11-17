<template>
  <div class="rounded-top">
    <span class="d-flex">
      <span @click="editRoutineForm()" type="button" v-if="route?.name == 'RoutineDesigner' &&  activeRoutine && account.id == activeRoutine.creatorId"
        class="d-flex align-items-center justify-content-center rounded-bottom border selectable lighten-30 bgBlur bgColor1 w-100">
        <p class="mb-0 p-2 fs-5 ">Edit Routine</p>
        <i class="fs-2 mdi mdi-pencil"></i>
      </span>
      <span @click="createRoutineForm()" type="button" v-if="account.id"
        class="d-flex align-items-center justify-content-center rounded border selectable lighten-30 bgBlur bgColor1 w-100">
        <p class="mb-0 p-2 fs-5 ">Create Routine</p>
        <i class="fs-2 mdi mdi-plus-circle"></i>
      </span>
    </span>
    <span v-if="noFavRoutines" class="d-flex flex-column align-items-center">
      <span class="d-flex align-items-center ">
        <p class="mb-0 me-3 fs-3">Add some favorites! </p>
        <i class="fs-1 mdi mdi-star mdi-spin"></i>
      </span>
      <p class="me-3">Missing favorites?
        <small class="btn btn-secondary" @click="manualCheck()">Recheck</small>
      </p>
    </span>
    <span v-else-if="myFavoriteRoutines.length > 0">
      <div v-for="fav in myFavoriteRoutines" :key="fav.id" @click="setActiveRoutine(fav.routineId)"
        class="d-flex align-items-center justify-content-between border px-3 selectable lighten-30 bgBlur bgColor2">
        <p class="mb-0 p-2 fs-5 text-nowrap">{{ fav.routine.name }}</p>
        <p class="mb-0 p-2 fs-5 text-nowrap">{{ (fav.routine.playTime / 60).toFixed(1) }} min</p>
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
import { useRoute, useRouter } from "vue-router";
import { routinesService } from "../services/RoutinesService";
import Pop from "../utils/Pop";
import { Modal } from "bootstrap";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();

    return {
      route,

      account: computed(() => AppState.account),
      activeRoutine: computed(() => AppState.activeRoutine),
      myFavoriteRoutines: computed(() => AppState.myFavoriteRoutines),
      myRoutines: computed(() => AppState.myRoutines),
      noFavRoutines: computed(() => AppState.noFavRoutines),

      createRoutineForm() {
        AppState.editRoutine = false;
        Modal.getOrCreateInstance('#createOrEditRoutineModal').show()
      },
      
      editRoutineForm() {
        AppState.editRoutine = true;
        Modal.getOrCreateInstance('#createOrEditRoutineModal').show()
      },

      async setActiveRoutine(routineId) {
        try {
          await routinesService.setActiveRoutine(routineId);
          router.push({name: 'RoutineDesigner', params: {routineId} })
        } catch (error) { Pop.error(error) }
      },

      manualCheck() {
        routinesService.manualCheck();
      }

    }
  }
};
</script>


<style lang="scss" scoped>
.bgBlur {
  backdrop-filter: blur(3px);
}

.bgColor1 {
  background-color: #6B837399;
}

.bgColor2 {
  background-color: #6B837369;
}
</style>