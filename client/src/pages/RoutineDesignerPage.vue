<template>
  <div class="container-fluid italiana">

    <section v-if="activeRoutine?.id" class="row justify-content-evenly">
      <div class="col-12 col-md-8 col-lg-7 pt-3 pe-lg-5">
        <div class="boxHeight pt-5">
          <!-- ROUTINE COMPONENT  -->
          <RoutineEditor :routine="activeRoutine" />
        </div>
      </div>

      <div v-if="activeRoutine.edit" class="col-12 col-md-4 col-lg-4 col-xxl-3 pt-3 pe-md-4 pe-lg-5">
        <!-- MOVE SEARCH/FILTER COMPONENT -->
        <div class="boxHeight pt-5 ">
          <MoveSearchComponent />
        </div>
      </div>
    </section>

    <section v-else-if="account?.id" class="row justify-content-center">
      <div class="col-12 col-md-auto mt-5 boxHeight">
        <p class="p-2 mb-4 fs-3 fw-bold text-center rounded bgColor">My Favorite Routines</p>
        <!-- ROUTINE FAVORITES LIST -->
        <RoutineFavs />
      </div>
    </section>

    <section v-else class="row justify-content-center">
      <div class="col-auto mt-5">
        <div class="p-3 mb-4 rounded white-gb">
          <p class="fs-3 fw-bold text-center">No active routine set</p>
          <p class="fs-5 fw-bold text-center">
            Login to select favorites and edit your routines <br>
            or set an active routine to start
          </p>
        </div>
        <div class="p-1 text-center">
          <router-link :to="{ name: 'Catalog' }" class="btn selectable cream-bg">
            <p class="p-1 mb-0 fs-3 fw-bold text-uppercase">Browse the Catalog</p>
          </router-link>
        </div>
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
      account: computed(() => AppState.account),
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

// .boxHeight {
//   max-height: 42dvh;
// }

@media screen and (max-width:768px) {
  .boxHeight {
    max-height: 100%;
  }
}
</style>