<template>
  <div class="border boxShadow rounded">

    <section class="header d-flex align-items-center rounded-top px-3 py-2 bgBlur">
      <div class="dropdown open me-auto">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true"
            aria-expanded="false">
              My Favorited Routines
            </button>
        <div class="dropdown-menu" aria-labelledby="triggerId">
            <RoutineFavs />
        </div>
      </div>
      <span class="fs-1 mx-2 d-flex">
        <span class="text-center me-2 position-relative" type="button" @click="unlockRoutine()">
          <i title="Locked" class="color3 lh25 mdi mdi-lock"></i>
          <p class="mb-0 tiny">Unlock <br> Routine</p>
        </span>
        <span class="text-center position-relative" type="button" @click="saveRoutine()">
          <i title="Unlocked" class="color2 lh25 mdi mdi-lock-open"></i>
          <p class="mb-0 tiny">Lock <br> Routine</p>
        </span>
      </span>
      <button class="btn btn-secondary ms-5">Clone Routine</button>
    </section>

    <section class="px-3 bgBlur">
      <div class="p-3 border rounded"></div>
      <RoutineBasicCard :routine="routine" />
    </section>

    <section class="rounded-bottom bgBlur">
      <i class="fs-1 btn color1 mdi mdi-play-box"></i>
    </section>

  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, watchEffect } from 'vue';
import RoutineBasicCard from "./RoutineBasicCard.vue";
import Pop from "../utils/Pop";
import RoutineFavs from "./RoutineFavs.vue";
import { Routine } from "../models/Routine";

export default {
  props: { routine: { type: Routine } },
  
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
    components: { RoutineBasicCard, RoutineFavs }
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
.tiny{
  font-size: 6px;
  position:absolute;
  bottom: 10px;
  left: 10px;
  color: white;
  line-height: 14px;
}
.lh25{
  line-height: 2.5rem;
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
.z1{
  z-index: 1;
}
.z3{
  z-index: 3;
}
</style>