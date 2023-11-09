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
        <!-- SECTION filter by Pose Level if wantsPoses -->
        <div v-if="wantsPoses">
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

        <!-- SECTION filter by RootedFlow Routines if !wantsPoses -->
        <div v-else>
          <button class="btn white-gb italiana" type="button">
            RootedFlow
          </button>
        </div>
        <!-- !SECTION Filter by RootedFlow Routines End -->


        <!-- SECTION Filter Favorite Poses -->
        <div v-if="wantsPoses">
          <button @click="onlyShowFavoriteMoves()" class="btn white-gb ms-1 me-1 ms-sm-3 me-sm-3 italiana" role="button"
            type="button">my favorites <i class="mdi mdi-heart"></i></button>
        </div>
        <!-- !SECTION Filter Favorite Poses End -->

        <!-- SECTION Filter Favorite Routines -->
        <div v-else>
          <button class="btn white-gb ms-1 me-1 ms-sm-3 me-sm-3 italiana" role="button" type="button">my favorites <i
              class="mdi mdi-heart"></i></button>
        </div>
        <!-- !SECTION Filter Favorite Routines End -->

        <!-- SECTION Filter by Pose Focus if wantsPoses -->
        <div v-if="wantsPoses">
          <div class="dropdown ms-sm-3">
            <button class="btn white-gb dropdown-toggle italiana" type="button" id="dropdownMenu2"
              data-bs-toggle="dropdown" aria-expanded="false">
              focus
            </button>
            <ul class="dropdown-menu bg-white" aria-labelledby="dropdownMenu2">
              <li class="ps-3" v-for="focus in focuses" :key="focus">
                <div class="form-check">
                  <input v-model="editableFocus" class="form-check-input" type="checkbox" :value="focus"
                    id="flexCheckDefault">
                  <label class="form-check-label italiana" for="flexCheckDefault">
                    {{ focus }}
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- !SECTION Filter by Pose Focus End -->

        <!-- SECTION filter Routine by Community -->
        <div v-else>
          <button class="btn white-gb italiana" type="button">
            Community
          </button>
        </div>
        <!-- !SECTION filter Routine by Community -->

      </div>
    </section>

    <!-- SECTION show Move Cards if wantsPoses -->
    <div v-if="wantsPoses">
      <section class="row">
        <div v-for="move in moves" :key="move.id" class="col-12">
          <MoveCatalogCard :moveProp="move" />
        </div>
      </section>
    </div>
    <!-- !SECTION show Move Cards -->

    <!-- SECTION show Routine Cards if !wantsPoses -->
    <div v-else>
      <section class="row">
        <div v-for="routine in routines" :key="routine.id" class="col-12">
          <RoutineCatalogCard :routineProp="routine" />
        </div>
      </section>
    </div>
    <!-- !SECTION show Routine Cards -->
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { movesService } from '../services/MovesService.js';
import MoveCatalogCard from '../components/MoveCatalogCard.vue';
import { routinesService } from '../services/RoutinesService.js';
import RoutineCatalogCard from '../components/RoutineCatalogCard.vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const levels = ["all", "beginner", "intermediate", "expert"];
    const focuses = ["all", "arms", "chest", "core", "neck", "glutes", "hamstrings", "hips", "inner thighs", "lower Back", "quads", "shoulder", "upper back"];
    let editableLevel = ref("");
    let editableFocus = ref([]);
    let wantsPoses = ref(true);
    let selectedLevel = ref("");
    onMounted(() => {
      getMoves();
      getRoutines();
      // getMoveById();
    });
    async function getMoves() {
      try {
        await movesService.getMoves();
      }
      catch (error) {
        logger.error(error);
        Pop.error(error);
      }
    }
    async function getRoutines() {
      try {
        await routinesService.getRoutines()
      } catch (error) {
        logger.error(error)
        Pop.error(error)

      }

    }
    async function getMoveById() {
      try {
        const moveId = route.params.moveId
        await movesService.getMoveById(moveId)
      } catch (error) {
        logger.error(error)
        Pop.error(error)
      }
    }

    return {
      editableLevel,
      editableFocus,
      levels,
      focuses,
      wantsPoses,
      selectedLevel,
      moves: computed(() => {
        //if level is anything but "all", filter it by level
        if (editableLevel.value && editableLevel.value != "all") {
          let movesByLevel = AppState.moves.filter(
            (move) => move.level == editableLevel.value.toLocaleLowerCase()
          );
          //and if focus is anything but "all", filter it even more by bodypart
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

      changeLevel(level) {
        editableLevel.value = level;
        selectedLevel.value = level
      },

      swapPosesAndRoutines() {
        wantsPoses.value = !wantsPoses.value;
        logger.log(wantsPoses)
      },

      myFavoriteMoves: computed(() => AppState.myFavoriteMoves),

      onlyShowFavoriteMoves() {
        this.myFavoriteMoves
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