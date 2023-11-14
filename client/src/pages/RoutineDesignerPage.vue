<template>
  <div class="container-fluid">
    <section v-if="activeRoutine" class="row justify-content-evenly">
      <div class="col-12 col-md-8 col-lg-7 pt-3 pe-lg-5">
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
      <div v-if="editRoutine" class="col-12 col-md-4 col-lg-4 col-xxl-3 pt-3 pe-md-4 pe-lg-5 about">
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
      editRoutine: computed(() => AppState.editRoutine),
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
  max-height: 43dvh;
}

@media screen and (max-width:768px){
  .boxHeight{
    max-height: 100%;
  }
}
</style>