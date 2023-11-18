<template>
  <div class="container">
    <!-- SECTION Filter by Poses or Routines -->
    <section class="row ">
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
    <!-- !SECTION filter by Poses or Routines End -->

    <section class="row">
      <div class="col-12 d-flex justify-content-center">
        <!-- SECTION filter by Pose Level if wantsPoses but not favorites -->
        <div v-if="wantsPoses && wantsToSeeFavorites == false">
          <div class="dropdown me-sm-3">
            <button class="btn white-gb dropdown-toggle italiana" type="button" id="dropdownMenu2"
              data-bs-toggle="dropdown" aria-expanded="false">
              level
            </button>
            <ul class="dropdown-menu bg-white" aria-labelledby="dropdownMenu2">
              <li class="ps-3" v-for="level in levels" :key="level">
                <div class="form-check">
                  <label class="form-check-label italiana" for="flexRadioDefault">
                    <input v-model="editableLevel" class="form-check-input" type="radio" name="radio"
                      @change="changeLevel(level)" :class="{ 'selectedLevel': level == selectedLevel }"
                      value="${editableLevel}" id="flexRadioDefault">
                    {{ level }}
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- !SECTION Filter by Level End -->

        <!-- SECTION no filter if looking at Pose favorites -->
        <div v-else-if="wantsPoses && wantsToSeeFavorites == true"></div>
        <!-- !SECTION no filter if looking at Pose favorites -->

        <!-- SECTION filter by RootedFlow Routines if !wantsPoses and !wantsRootedFlowRoutines yet -->
        <div v-else-if="!wantsPoses && !wantsRootedFlowRoutines">
          <button @click="swapShowRootedFlowAndShowAll()" class="btn white-gb italiana" type="button">
            RootedFlow
          </button>
        </div>
        <div v-else>
          <button @click="swapShowRootedFlowAndShowAll()" class="btn white-gb italiana" type="button">
            all routines
          </button>
        </div>
        <!-- !SECTION Filter by RootedFlow Routines End -->


        <!-- SECTION Filter Favorite Poses -->
        <div v-if="wantsPoses && wantsToSeeFavorites == false">
          <button @click="swapShowFavoritesAndShowAll()" class="btn white-gb ms-1 me-1 ms-sm-3 me-sm-3 italiana"
            role="button" type="button">my favorites<i class="mdi mdi-heart"></i></button>
        </div>
        <!-- !SECTION Filter Favorite Poses End -->

        <!-- SECTION be able to flip back to see all if looking at Pose favorites -->
        <div v-else-if="wantsPoses && wantsToSeeFavorites == true">
          <button @click="swapShowFavoritesAndShowAll()" class="btn white-gb ms-1 me-1 ms-sm-3 me-sm-3 italiana"
            role="button" type="button">all poses</button>
        </div>
        <!-- !SECTION be able to flip back to see all if looking at Pose favorites -->

        <!-- SECTION Filter Favorite Routines -->
        <div v-else-if="!wantsPoses && wantsToSeeFavorites == false">
          <button @click="swapShowFavoritesAndShowAll()" class="btn white-gb ms-1 me-1 ms-sm-3 me-sm-3 italiana"
            role="button" type="button">my favorites <i class="mdi mdi-heart"></i></button>
        </div>
        <!-- !SECTION Filter Favorite Routines End -->

        <!-- SECTION be able to flip back to see all if looking at Routine favorites -->
        <div v-else>
          <button @click="swapShowFavoritesAndShowAll()" class="btn white-gb ms-1 me-1 ms-sm-3 me-sm-3 italiana"
            role="button" type="button">all routines</button>
        </div>
        <!-- !SECTION be able to flip back to see all if looking at Routine favorites -->

        <!-- SECTION Filter by Pose Focus if wantsPoses -->
        <div v-if="wantsPoses && wantsToSeeFavorites == false">
          <div class="dropdown ms-sm-3">
            <button class="btn white-gb dropdown-toggle italiana" type="button" id="dropdownMenu2"
              data-bs-toggle="dropdown" aria-expanded="false">
              focus
            </button>
            <ul class="dropdown-menu bg-white" aria-labelledby="dropdownMenu2">
              <li class="ps-3" v-for="focus in focuses" :key="focus">
                <div class="form-check">
                  <input v-model="editableFocus" class="form-check-input" type="checkbox" :value="focus"
                    id="flexCheckDefault" @change="uncheckIfAll(focus)">
                  <label class="form-check-label italiana" for="flexCheckDefault">
                    {{ focus }}
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- !SECTION Filter by Pose Focus End -->

        <!-- SECTION no filter if looking at Pose favorites -->
        <div v-else-if="wantsPoses && wantsToSeeFavorites == true"></div>
        <!-- !SECTION no filter if looking at Pose favorites -->

        <!-- SECTION filter Routine by Community -->
        <div v-else-if="!wantsPoses && !wantsCommunityRoutines">
          <button @click="swapShowCommunityAndShowAll()" class="btn white-gb italiana" type="button">
            Community
          </button>
        </div>
        <div v-else>
          <button @click="swapShowCommunityAndShowAll()" class="btn white-gb italiana" type="button">
            all routines
          </button>
        </div>
        <!-- !SECTION filter Routine by Community -->

      </div>
    </section>

    <!-- SECTION show Move Cards if wantsPoses -->
    <div v-if="wantsPoses">
      <section v-if="wantsToSeeFavorites">
        <div v-for="move in myFavoriteMoves" :key="move.id" class="col-12">
          <MoveCatalogCard :moveProp="move" />
        </div>
      </section>
      <section v-else class="row">
        <div v-for="move in moves" :key="move.id" class="col-12">
          <MoveCatalogCard :moveProp="move" />
        </div>
      </section>
    </div>
    <!-- !SECTION show Move Cards -->

    <!-- SECTION show Routine Cards if !wantsPoses -->
    <div v-else>
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
    <!-- !SECTION show Routine Cards -->
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, onMounted, ref } from 'vue';
import Pop from '../utils/Pop.js';
import RoutineCatalogCard from '../components/RoutineCatalogCard.vue';
import MoveCatalogCard from '../components/MoveCatalogCard.vue';
import { routinesService } from '../services/RoutinesService.js';
import { movesService } from '../services/MovesService.js';
import { Routine } from "../models/Routine.js";
import { Move } from "../models/Move.js";

export default {
  setup() {

    const levels = ["all", "beginner", "intermediate", "advanced"];
    const focuses = ["all", "arms", "chest", "core", "neck", "glutes", "hamstrings", "hips", "inner thighs", "lower Back", "quads", "shoulder", "upper back"];

    let editableLevel = ref("");
    let editableFocus = ref([]);
    let wantsPoses = ref(true);
    let selectedLevel = ref("");
    let wantsToSeeFavorites = ref(false);
    let wantsRootedFlowRoutines = ref(false);
    let wantsCommunityRoutines = ref(false);

    onMounted(() => {
      if (!AppState.moves.length > 0) {
        getMoves();
      }
      getRoutines();
      // getMoveById();
    });

    async function getMoves() {
      try { await movesService.getMoves(); }
      catch (error) { Pop.error(error); }
    }

    async function getRoutines() {
      try { await routinesService.getRoutines() }
      catch (error) { Pop.error(error) }
    }

    return {
      editableLevel,
      editableFocus,
      levels,
      focuses,
      wantsPoses,
      selectedLevel,
      wantsToSeeFavorites,
      wantsRootedFlowRoutines,
      wantsCommunityRoutines,

      moves: computed(() => {
        //if level is anything but "all", filter it by level
        if (editableLevel.value && editableLevel.value != "all") {
          let movesByLevel = AppState.moves.filter(
            (move) => move.level == editableLevel.value.toLocaleLowerCase()
          );
          //and if focus is anything but "all", filter it even more by bodyPart
          if (editableFocus.value && !editableFocus.value.includes("all")) {
            return movesByLevel.filter(move =>
              editableFocus.value.every(part => move.bodyPart.includes(part)))
          } else { //if level is anything but "all" and focus is "all" or unselected, just return what was filtered by level
            return movesByLevel
          }
        }
        //else if level is "all" or unselected, no filters for level
        else if (!editableLevel.value || editableLevel.value == "all") {
          //if focus is anything but "all", filter it just by body part
          if (editableFocus.value && !editableFocus.value.includes("all")) {
            return AppState.moves.filter(move =>
              editableFocus.value.every(part => move.bodyPart.includes(part)))
          }
          //if level is "all" or unselected and focus is "all" or unselected, return moves from the AppState(no filter)
          else {
            return AppState.moves;
          }
        } else {
          return AppState.moves;
        }
      }),

      routines: computed(() => AppState.routines),

      myFavoriteMoves: computed(() => {
        let filteredMoves = []
        AppState.myFavoriteMoves.forEach((move) => {
          filteredMoves.push(new Move(move.move))
        })
        return filteredMoves
      }),

      myFavoriteRoutines: computed(() => {
        let filteredRoutines = []
        AppState.myFavoriteRoutines.forEach((routine) => {
          filteredRoutines.push(new Routine(routine.routine))
        })
        return filteredRoutines
      }),

      rootedFlowRoutines: computed(() => {
        return AppState.routines.filter(
          (routine) => routine.isExample)
      }),

      communityRoutines: computed(() => {
        return AppState.routines.filter(
          (routine) => !routine.isExample && !routine.isPrivate)
      }),

      changeLevel(level) {
        editableLevel.value = level;
        selectedLevel.value = level;
      },

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

      uncheckIfAll(selection) {
        if (selection == "all") {
          this.editableFocus = [selection]
          this.focuses.forEach((focus) => {
            if (focus != "all" && this.editableFocus.indexOf(focus) != -1) {
              this.editableFocus.splice(this.editableFocus.indexOf(focus))
            }
          })
        } else {
          this.editableFocus.forEach((focus) => {
            if (focus == "all" && this.editableFocus.indexOf(focus) != -1) {
              this.editableFocus.splice(this.editableFocus.indexOf(focus), 1)
            }
          })
        }
      }

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
</style>