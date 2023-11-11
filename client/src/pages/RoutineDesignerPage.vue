<template>
  <div class="container-fluid">
    <section v-if="activeRoutine" class="row justify-content-center">
      <div class="col-12 col-md-8 pt-3 pe-md-5">
        <div class="boxHeight">
          <span class="d-flex align-items-center">
            <p class="fs-1 mb-0 pe-3 text-nowrap">{{ activeRoutine.name }}</p>
            <span class="px-2">
              <button type="button" :data-bs-title="activeRoutine.name" :data-bs-content="activeRoutine.description"
                class="btn btn-secondary" data-bs-toggle="popover" data-bs-placement="bottom">Show description</button>
            </span>
          </span>
          <!-- ROUTINE COMPONENT  -->
          <RoutineEditor :routine="activeRoutine" />
        </div>
      </div>
      <div v-if="settings.editRoutine" class="col-12 col-md-3 pt-3 about">
        <!-- MOVE SEARCH/FILTER COMPONENT -->
        <div class="boxHeight">
          <MoveSearchComponent />
        </div>
      </div>
    </section>
    <section v-else class="row justify-content-center">
      <div class=" col-12 col-md-auto mt-5">
        <p class="p-2 mb-4 fs-3 fw-bold text-center rounded bgColor">My Favorite Routines</p>
        <!-- ROUTINE FAVORITES LIST -->
        <RoutineFavs />
      </div>
    </section>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, onMounted } from 'vue';
import RoutineEditor from "../components/RoutineEditor.vue";
import RoutineFavs from "../components/RoutineFavs.vue";
import MoveSearchComponent from "../components/MoveSearchComponent.vue";

export default {
  setup() {

    onMounted(() => {
    })

    return {
      settings: computed(() => AppState.settings),
      activeRoutine: computed(() => AppState.activeRoutine),

    }
  },
  components: { RoutineEditor, RoutineFavs, MoveSearchComponent }

};
</script>


<style lang="scss" scoped>
.bgColor {
  background-color: #6B8373b9;
}

.boxHeight {
  height: 63dvh;
}
</style>