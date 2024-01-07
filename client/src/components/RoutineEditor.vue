<template>
  <div class="border green-gb bgBlur rounded">
    <section class="header d-flex align-items-center justify-content-between rounded-top px-2 py-2 position-relative z1">
      <span class="d-flex align-items-center">
        <div class="dropdown open">
          <button class="fs-1 mb-0 pe-3 text-nowrap btn d-flex showHidden navbar-cream" type="button" id="triggerId"
            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {{ routine.name }}
            <i class="fs-1 mdi mdi-dots-vertical"></i>
          </button>
          <div class="hidden position-absolute z3 px-3 py-2 card">{{ routine.description }}</div>
          <div class="dropdown-menu p-0" aria-labelledby="triggerId">
            <RoutineFavs />
          </div>
        </div>
      </span>
      <button class="btn btn-secondary" type="button" @click="cloneRoutine()">Clone Routine</button>
      <div class="me-auto">
      </div>
      <span class="fs-1 mx-2 d-flex" v-if="routine.creatorId == account.id">
        <span v-if="locked" title="Locked" class="text-center me-2 position-relative" type="button"
          @click="toggleRoutineLock()">
          <i class="color3 lh25 mdi mdi-lock"></i>
          <p class="mb-0 tiny">Unlock <br> Routine</p>
        </span>
        <span v-else title="Unlocked" class="text-center position-relative" type="button" @click="toggleRoutineLock()">
          <i class="color2 lh25 mdi mdi-lock-open"></i>
          <p class="mb-0 tiny">Lock <br> Routine</p>
        </span>
      </span>
    </section>

    <section class="px-3">
      <div class="p-1 border rounded scroll">
        <ListEntryCard :keyImage="routine.keyImage" />
      </div>
    </section>

    <section class="rounded-bottom mx-3 d-flex align-items-center navbar-cream"
      :class="[listEntries.length > 0 ? 'justify-content-between' : 'justify-content-end']">
      <i v-if="listEntries.length > 0" class="fs-1 p-0  btn navbar-cream mdi mdi-play me-auto" type="button"
        data-bs-toggle="modal" data-bs-target="#openPlayer"></i>
      <p class="fs-5 mb-0 me-3 py-3"><small>Total Time: </small>
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
import { computed } from 'vue';
import ListEntryCard from "./ListEntryCard.vue";
import Pop from "../utils/Pop";
import { Routine } from "../models/Routine";
import { routinesService } from "../services/RoutinesService";

export default {
  props: { routine: { type: Routine } },

  setup() {

    return {
      account: computed(() => AppState.account),
      listEntries: computed(() => AppState.listEntries),
      editRoutine: computed(() => AppState.editRoutine),
      locked: computed(() => !AppState.activeRoutine.edit),
      totalPlayTime: computed(() => {
        let total = 0;
        AppState.listEntries.forEach(entry => total += entry.duration)
        if (!total) { return 0 }
        return total
      }),

      toggleRoutineLock() {
        AppState.activeRoutine.edit = !AppState.activeRoutine.edit;
      },

      async cloneRoutine() {
        try {
          const yes = await Pop.confirm('Clone this routine?', '')
          if (!yes) { return }
          const routineId = AppState.activeRoutine.id;
          await routinesService.cloneRoutine(routineId);
          await routinesService.getFavRoutines();
        } catch (error) { Pop.error(error) }
      },

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

.green-gb {
  background: #2b4a3fd9;
  border-radius: 8px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5.6px);
  -webkit-backdrop-filter: blur(5.6px);
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

.navbar-cream {
  color: #E0DDDB;
}

.z1 {
  z-index: 1;
}

.btn-secondary {
  opacity: .5;
  transition: .25s;
}

.btn-secondary:hover {
  opacity: 1;
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

.hidden {
  top: 4.8rem;
  left: 2rem;
  min-width: 10rem;
  max-width: 50vw;
  opacity: 0;
  transition: .25s;
  visibility: hidden;
}

.showHidden:hover+.hidden {
  opacity: 1;
  visibility: visible;
}

.z3 {
  z-index: 3;
}

.boxHeight {
  max-height: 42dvh;
}

@media screen and (max-width:768px) {
  .boxHeight {
    max-height: 100%;
  }
}
</style>