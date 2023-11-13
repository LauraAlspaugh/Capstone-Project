<template>
  <div class="container-fluid">
    <section v-if="activeRoutine" class="row justify-content-evenly">
      <div class="col-12 col-md-7 pt-3 pe-md-5">
        <div class="boxHeight pt-5">
          <span class="d-flex align-items-center">
            <div class="dropdown open me-auto">
              <button class="fs-1 mb-0 pe-3 text-nowrap btn d-flex align-items-" type="button" id="triggerId"
                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{ activeRoutine.name }}
                <i class="fs-1 mdi mdi-dots-vertical"></i>
              </button>
              <div class="dropdown-menu p-0" aria-labelledby="triggerId">
                <RoutineFavs />
              </div>
            </div>
          </span>
          <!-- ROUTINE COMPONENT  -->
          <RoutineEditor :routine="activeRoutine" />
        </div>
      </div>
      <div v-if="editRoutine" class="col-12 col-md-3 pt-3 about">
        <!-- MOVE SEARCH/FILTER COMPONENT -->
        <div class="boxHeight pt-5">
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
  <CreateNewRoutineModal />
</template>


<script>
import { AppState } from '../AppState';
import { computed, onMounted } from 'vue';
import RoutineEditor from "../components/RoutineEditor.vue";
import RoutineFavs from "../components/RoutineFavs.vue";
import MoveSearchComponent from "../components/MoveSearchComponent.vue";
import CreateNewRoutineModal from "../components/CreateNewRoutineModal.vue";

export default {
  setup() {

    onMounted(() => {
    })

    return {
      editRoutine: computed(() => AppState.editRoutine),
      activeRoutine: computed(() => AppState.activeRoutine),

    }
  },
  components: { RoutineEditor, RoutineFavs, MoveSearchComponent, CreateNewRoutineModal }

};
</script>


<style lang="scss" scoped>
.bgColor {
  background-color: #6B8373b9;
}

.boxHeight {
  max-height: 43dvh;
}
</style>