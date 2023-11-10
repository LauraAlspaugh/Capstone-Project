<template>
  <div class="border boxShadow rounded py-1 px-3">

    <section class="header d-flex align-items-center rounded bgBlur">
      <div class="dropdown open me-auto">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true"
            aria-expanded="false">
              My Favorited Routines
            </button>
        <div class="dropdown-menu" aria-labelledby="triggerId">
          <button v-for="fav in myFavRoutines" :key="fav.routineId" href="#" class="dropdown-item">{{ fav }}</button>
        </div>
      </div>
      <span class="fs-1 mx-2">
        <i type="button" title="Locked" class="color3 mdi mdi-lock" @click="unlockRoutine()"></i>
        <i type="button" title="Unlocked" class="color2 mdi mdi-lock-open" @click="saveRoutine()"></i>
      </span>
      <button class="btn btn-secondary ms-5">Clone Routine</button>
    </section>

    <section class="border rounded p-2 mb-3 bgBlur">
      <RoutineBasicCard :routine="routine" />
    </section>

    <section class="">
      <i class="fs-1 btn color1 mdi mdi-play-box"></i>
    </section>

  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, onMounted, ref, watchEffect } from 'vue';
import RoutineBasicCard from "./RoutineBasicCard.vue";
import { routinesService } from "../services/RoutinesService.js";
import Pop from "../utils/Pop";

export default {
  setup() {

    const routineData = ref({})

    watchEffect(() => {
      if (AppState.account) {
        routineData.value = { ...AppState.account };
      }
      else {
        routineData.value = {};
      }
    });

        return {
          myFavRoutines: computed(() => AppState.myFavoriteRoutines),

          unlockRoutine() {
            AppState.settings.editRoutine = true;
          },

          saveRoutine() {
            try {
              // submit changes to service > api and update
              // routinesService.updateRoutine(routineData.value);
              AppState.settings.editRoutine = false;
            } catch (error) {Pop.error(error)}
          }

        };
    },
    components: { RoutineBasicCard }
};
</script>


<style lang="scss" scoped>
.bgBlur{
  backdrop-filter: blur(3px);
}
.boxShadow{
  box-shadow: 
    0 0 20px 5px white inset;
    // 0 0 3px 1px white;
}
.color1{
  color:#0F2D24;
  // background-color: #0F2D24;
}
.color2{
  color:#2B4A3F;
  // background-color: #2B4A3F;
}
.color3{
  color:#6B8373;
  // background-color: #6B8373;
}
.color4{
  color:#C4D0CC;
  // background-color: #C4D0CC;
}
</style>