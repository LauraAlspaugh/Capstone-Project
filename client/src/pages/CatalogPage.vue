<template>
  <div class="container">
    <!-- SECTION Filter by Poses or Routines -->
    <section class="row">
      <div class="col-12 d-flex justify-content-center p-4 italiana">
        <div v-if="wantsPoses">
          <button class="btn-underline btn white-gb m-2 mt-sm-5 me-sm-5 fs-1">Poses</button>
          <button @click="swapPosesAndRoutines()" class="btn white-gb m-2 mt-sm-5 ms-sm-5 fs-1">Routines</button>
        </div>
        <div v-else>
          <button @click="swapPosesAndRoutines()" class="btn white-gb m-2 mt-sm-5 me-sm-5 fs-1">Poses</button>
          <button class="btn-underline btn white-gb m-2 mt-sm-5 ms-sm-5 fs-1">Routines</button>
        </div>
      </div>
    </section>

    <section class="row">
      <div class="col-12 d-flex justify-content-center">
        <div v-if="wantsPoses">
          <MoveFilterBar />
        </div>
        <div v-else>
          <section class="row py-2 image-border align-items-center justify-content-center filter-height">
            <div class="col-12 justify-content-evenly align-items-center d-flex box">
              <div>
                <div v-if="!wantsRootedFlowRoutines">
                  <button @click="swapShowRootedFlowAndShowAll()" class="btn white-gb italiana" type="button">
                    RootedFlow
                  </button>
                </div>
                <div v-else>
                  <button @click="swapShowRootedFlowAndShowAll()" class="btn white-gb italiana" type="button">
                    all routines
                  </button>
                </div>
              </div>
              <div>
                <div v-if="wantsToSeeFavorites == false">
                  <button @click="swapShowFavoritesAndShowAll()" class="btn white-gb ms-1 me-1 ms-sm-3 me-sm-3 italiana"
                    role="button" type="button">my favorites <i class="mdi mdi-heart"></i></button>
                </div>
                <div v-else>
                  <button @click="swapShowFavoritesAndShowAll()" class="btn white-gb ms-1 me-1 ms-sm-3 me-sm-3 italiana"
                    role="button" type="button">all routines</button>
                </div>
              </div>
              <div>
                <div v-if="!wantsCommunityRoutines">
                  <button @click="swapShowCommunityAndShowAll()" class="btn white-gb italiana" type="button">
                    Community
                  </button>
                </div>
                <div v-else-if="wantsCommunityRoutines">
                  <button @click="swapShowCommunityAndShowAll()" class="btn white-gb italiana" type="button">
                    all routines
                  </button>
                </div>
              </div>
            </div>
          </section>
          <section v-if="wantsToSeeFavorites" class="row">
            <div v-for="routine in myFavoriteRoutines" :key="routine.id" class="col-6 col-lg-4 col-xxl-3">
              <RoutineCatalogCard :routineProp="routine" />
            </div>
          </section>
          <section v-else-if="wantsRootedFlowRoutines" class="row">
            <div v-for="routine in rootedFlowRoutines" :key="routine.id" class="col-6 col-lg-4 col-xxl-3">
              <RoutineCatalogCard :routineProp="routine" />
            </div>
          </section>
          <section v-else-if="wantsCommunityRoutines" class="row">
            <div v-for="routine in communityRoutines" :key="routine.id" class="col-6 col-lg-4 col-xxl-3">
              <RoutineCatalogCard :routineProp="routine" />
            </div>
          </section>
          <section v-else class="row">
            <div v-for="routine in routines" :key="routine.id" class="col-6 col-lg-4 col-xxl-3">
              <RoutineCatalogCard :routineProp="routine" />
            </div>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, onMounted, ref } from 'vue';
import Pop from '../utils/Pop.js';
import RoutineCatalogCard from '../components/RoutineCatalogCard.vue';
import MoveCatalogCard from '../components/MoveCatalogCard.vue';
import { routinesService } from '../services/RoutinesService.js';
import { Routine } from "../models/Routine.js";

export default {
  setup() {

    let wantsPoses = ref(true);
    let wantsToSeeFavorites = ref(false);
    let wantsRootedFlowRoutines = ref(false);
    let wantsCommunityRoutines = ref(false);

    onMounted(() => {
      getRoutines();
    });

    async function getRoutines() {
      try { await routinesService.getRoutines() }
      catch (error) { Pop.error(error) }
    }

    return {
      wantsPoses,
      wantsToSeeFavorites,
      wantsRootedFlowRoutines,
      wantsCommunityRoutines,
      account: computed(() => AppState.account),

      routines: computed(() => {
        return AppState.routines.filter(
          (routine) => routine.isArchived == false && routine.isPrivate == false)
      }),

      unarchivedRoutines: computed(() => {
        return AppState.routines.filter(
          (routine) => routine.isArchived == false)
      }),

      myFavoriteRoutines: computed(() => {
        let filteredRoutines = []
        AppState.myFavoriteRoutines.forEach((routine) => {
          filteredRoutines.push(new Routine(routine.routine))
        })
        return filteredRoutines
      }),

      myRoutines: computed(() => {
        let myRoutines = []
        AppState.routines.forEach((routine) => {
          if (routine.id == AppState.account.id) {
            myRoutines.push(routine)
          }
        })
        return myRoutines
      }),

      rootedFlowRoutines: computed(() => {
        return AppState.routines.filter(
          (routine) => routine.isExample)
      }),

      communityRoutines: computed(() => {
        return AppState.routines.filter(
          (routine) => !routine.isExample && !routine.isPrivate)
      }),

      swapPosesAndRoutines() {
        wantsPoses.value = !wantsPoses.value;
      },

      swapShowFavoritesAndShowAll() {
        wantsToSeeFavorites.value = !wantsToSeeFavorites.value;
        wantsRootedFlowRoutines.value = false
        wantsCommunityRoutines.value = false
      },

      swapShowRootedFlowAndShowAll() {
        wantsRootedFlowRoutines.value = !wantsRootedFlowRoutines.value
        wantsToSeeFavorites.value = false
        wantsCommunityRoutines.value = false
      },

      swapShowCommunityAndShowAll() {
        wantsCommunityRoutines.value = !wantsCommunityRoutines.value
        wantsRootedFlowRoutines.value = false
        wantsToSeeFavorites.value = false
      },

    };
  },

  components: { MoveCatalogCard, RoutineCatalogCard }
};
</script>


<style lang="scss" scoped>
.selectedLevel {
  background-color: #0F2D24;
}

.white-gb {
  /* From https://css.glass */
  background: rgba(255, 255, 255, 0.38);
  border-radius: 8px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5.6px);
  -webkit-backdrop-filter: blur(5.6px);
}

.btn-underline {
  text-decoration-line: underline;
  text-decoration-thickness: 1px;
}

.box {
  width: 50vw;
}
</style>