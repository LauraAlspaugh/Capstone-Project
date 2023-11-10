<template>
  <div class="border rounded p-2">
    <section class="header d-flex justify-content-between align-items-center">
      <div class="dropdown open">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true"
            aria-expanded="false">
              My Favorited Routines
            </button>
        <div class="dropdown-menu" aria-labelledby="triggerId">
          <button v-for="fav in myFavRoutines" :key="fav.routineId" href="#" class="dropdown-item">{{ fav }}</button>
        </div>
      </div>
      <span class="fs-1 mx-2">
        <i title="Locked" class="text-secondary mdi mdi-lock" @click="unlock"></i>
        <i title="Unlocked" class="text- mdi mdi-lock-open" @click="lock"></i>
      </span>
      <button class="btn btn-secondary">Clone Routine</button>
    </section>

    <section class="border rounded p-2">
      <RoutineBasicCard :routine="routine" />
    </section>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, onMounted } from 'vue';
import RoutineBasicCard from "./RoutineBasicCard.vue";
import { routinesService } from "../services/RoutinesService.js";

export default {
    setup() {
        return {
            myFavRoutines: computed(() => AppState.myFavoriteRoutines),
        };
    },
    components: { RoutineBasicCard }
};
</script>


<style lang="scss" scoped>
.color1{
  color:#0F2D24;
  background-color: #0F2D24;
}
.color2{
  color:#2B4A3F;
  background-color: #2B4A3F;
}
.color3{
  color:#6B8373;
  background-color: #6B8373;
}
.color4{
  color:#C4D0CC;
  background-color: #C4D0CC;
}
</style>