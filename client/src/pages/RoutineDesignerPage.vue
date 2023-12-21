<template>
  <div class="container-fluid italiana">
    <section v-if="activeRoutine?.id" class="row justify-content-evenly">
      <div class="col-12 col-md-8 col-lg-7 pt-3 pe-lg-5">
        <div class="boxHeight pt-5">
          <!-- <span class="d-flex align-items-center">
            <div class="dropdown open">
              <button class="fs-1 mb-0 pe-3 text-nowrap btn d-flex showHidden" type="button" id="triggerId"
                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{ activeRoutine.name }}
                <i class="fs-1 mdi mdi-dots-vertical"></i>
              </button>
              <div class="hidden position-absolute z3 px-3 py-2 card">{{ activeRoutine.description }}</div>
              <div class="dropdown-menu p-0" aria-labelledby="triggerId">
                <RoutineFavs />
              </div>
            </div>
          </span> -->
          <!-- ROUTINE COMPONENT  -->
          <RoutineEditor :routine="activeRoutine" />
        </div>
      </div>
      <div v-if="activeRoutine.edit" class="col-12 col-md-4 col-lg-4 col-xxl-3 pt-3 pe-md-4 pe-lg-5 about">
        <!-- MOVE SEARCH/FILTER COMPONENT -->
        <div class="boxHeight pt-5 ">
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
import { useRoute } from "vue-router";
import Pop from "../utils/Pop";
import { routinesService } from "../services/RoutinesService";
import MoveSearchComponent from "../components/MoveSearchComponent.vue";
import RoutineEditor from "../components/RoutineEditor.vue";
import RoutineFavs from "../components/RoutineFavs.vue";

export default {
  setup() {
    const route = useRoute();

    async function _setActiveIfProvided() {
      try {
        const routineId = route.params.routineId;
        if (routineId) {
          await routinesService.setActiveRoutine(routineId);
        }
      } catch (error) { Pop.error(error); }
    }

    onMounted(() => {
      if (!AppState.activeRoutine?.id) {
        _setActiveIfProvided();
      }
    })

    return {
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

.cream-bg {
  border: 1px solid #C4D0CC;
  background-color: #e0dddbd5;
  backdrop-filter: blur(3px)
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