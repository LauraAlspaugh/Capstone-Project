<template>
  <div class="border boxShadow rounded">

    <section class="header d-flex align-items-center rounded-top px-3 py-2 bgBlur position-relative z1">
      <!-- <div class="dropdown open me-auto">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="triggerId" data-bs-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false">
          My Favorited Routines
        </button>
        <div class="dropdown-menu p-0" aria-labelledby="triggerId">
          <RoutineFavs />
        </div>
      </div> -->
      <div class="me-auto">
        <p class="mb-0">{{ routine.description }}</p>
      </div>
      <span class="fs-1 mx-2 d-flex"> <!-- TODO after edit fully functional: v-if account owner -->
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
      <div class="p-1 border rounded scroll">
        <ListEntryCard :keyImage="routine.keyImage" />
      </div>
    </section>

    <section class="rounded-bottom bgBlur mx-3 d-flex align-items-center">
      <i class="fs-1 ms-2 ps-4 btn color1 mdi mdi-play-box me-auto"></i>
      <p class="fs-5 mb-0 me-3"><small>Total Time: </small>
        <b v-if="totalPlayTime">
          {{ (totalPlayTime / 60 >= 1 ? Math.floor(totalPlayTime / 60) + ' min ' : '') +
            (totalPlayTime % 60 != 0 ? totalPlayTime % 60 + ' sec' : '') }}
        </b>
        <b v-else>0</b>
      </p>
    </section>

  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed} from 'vue';
import ListEntryCard from "./ListEntryCard.vue";
import Pop from "../utils/Pop";
import { Routine } from "../models/Routine";

export default {
  props: { routine: { type: Routine } },

  setup() {

    return {
      editRoutine: computed(() => AppState.editRoutine),
      totalPlayTime: computed(() => {
        let total = 0;
        AppState.listEntries.forEach(entry => total += entry.duration)
        if(!total){return 0}
        return total
      }),

      unlockRoutine() {
        AppState.editRoutine = true;
      },

      saveRoutine() {
        try {
          // submit changes to service > api and update
          // routinesService.updateRoutine(routineData.value);
          AppState.editRoutine = false;
        } catch (error) { Pop.error(error) }
      }

    };
  },
  components: { ListEntryCard }
};
</script>


<style lang="scss" scoped>
.bgBlur {
  backdrop-filter: blur(3px);
}

.boxShadow {
  box-shadow:
    0 0 20px 5px white inset;
  // 0 0 3px 1px white;
}

.tiny {
  font-size: 6px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: white;
  line-height: 14px;
}

.lh25 {
  line-height: 2.5rem;
}

.scroll {
  max-height: 57.5dvh;
  overflow-y: auto;
}

.color1 {
  color: #0F2D24;
  // background-color: #0F2D24;
}

.color2 {
  color: #2B4A3F;
  // background-color: #2B4A3F;
}

.color3 {
  color: #6B8373;
  // background-color: #6B8373;
}

.color4 {
  color: #C4D0CC;
  // background-color: #C4D0CC;
}

.z1 {
  z-index: 1;
}

::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: #d6dee1;
  border-radius: 20px;
  border: 2px solid transparent;
  background-clip: content-box;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #a8bbbf;
}
</style>