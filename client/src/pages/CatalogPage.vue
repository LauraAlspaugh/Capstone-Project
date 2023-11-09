<template>
  <div class="container">
    <!-- SECTION Filter by Poses or Routines -->
    <section class="row ">
      <div class="col-12 d-flex justify-content-center p-4 italiana">
        <button class="btn white-gb m-2 mt-sm-5 me-sm-5 fs-1">Poses</button>
        <button class="btn white-gb m-2 mt-sm-5 ms-sm-5 fs-1">Routines</button>
      </div>
    </section>
    <!-- !SECTION filter by Poses or Routines End -->

    <section class="row">
      <div class="col-12 d-flex justify-content-center">
        <!-- SECTION filter by Level -->
        <div class="dropdown me-sm-3">
          <button class="btn white-gb dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown"
            aria-expanded="false">
            Level
          </button>
          <ul class="dropdown-menu bg-white" aria-labelledby="dropdownMenu2">
            <li class="ps-3" v-for="level in levels" :key="level">
              <div class="form-check">
                <input v-model="editableLevel" class=" form-check-input" type="radio" name="changeLevel"
                  @click="changeLevel(level)" value="${editableLevel}" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                  {{ level }}
                </label>
              </div>
            </li>
          </ul>
        </div>
        <!-- !SECTION Filter by Level End -->

        <!-- SECTION Filter Favorites -->
        <button class="btn white-gb ms-1 me-1 ms-sm-3 me-sm-3" role="button" type="button">My Favorites 🖤</button>
        <!-- !SECTION Filter Favorites End -->

        <!-- SECTION Filter by Focus -->
        <div class="dropdown ms-sm-3">
          <button class="btn white-gb dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown"
            aria-expanded="false">
            Focus
          </button>
          <ul class="dropdown-menu bg-white" aria-labelledby="dropdownMenu2">
            <li class="ps-3" v-for="focus in focuses" :key="focus">
              <div class="form-check">
                <input v-model="editableFocus" class="form-check-input" type="checkbox" :value="focus"
                  id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                  {{ focus }}
                </label>
              </div>
            </li>
          </ul>
        </div>
        <!-- !SECTION Filter by Focus End -->
      </div>
    </section>
    <section class="row">
      <div v-for="move in moves" :key="move.id" class="col-12">
        <MoveCatalogCard :moveProp="move" />
      </div>

    </section>

    <section class="row">
      <div v-for="routine in routines" :key="routine.id" class="col-12">
        <RoutineCatalogCard :routineProp="routine" />
      </div>

    </section>
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
    // const editableLevel = ref({});
    let editableLevel = ref("");
    // const editableFocus = ref({});
    let editableFocus = ref([]);
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
      moves: computed(() => {
        if (editableLevel.value && editableLevel.value != "All") {
          let movesByLevel = AppState.moves.filter(
            (move) => move.level == editableLevel.value.toLocaleLowerCase()
          );
          if (editableFocus.value && !editableFocus.value.includes("All")) {
            return movesByLevel.filter(move =>
              editableFocus.value.every(part => move.bodyPart.includes(part)))
          } else {
            return movesByLevel
          }
        }
        else if (editableLevel.value == "All" && editableFocus.value && !editableFocus.value.includes("All")) {
          return AppState.moves.filter(move =>
            editableFocus.value.every(part => move.bodyPart.includes(part)))
        }
        else {
          return AppState.moves;
        }
      }),
      movesByFocus: computed(() => {
        if (editableFocus.value && !editableFocus.value.includes("All")) {
          return AppState.moves.filter(move =>
            editableFocus.value.every(part => move.bodyPart.includes(part)))
        } else {
          return AppState.moves;
        }
      }),

      routines: computed(() => AppState.routines),

      changeLevel(level) {
        editableLevel.value = level;
      },

    };
  },

  components: { MoveCatalogCard, RoutineCatalogCard }
};
</script>


<style lang="scss" scoped>
.white-gb {
  /* From https://css.glass */
  background: rgba(255, 255, 255, 0.38);
  border-radius: 8px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5.6px);
  -webkit-backdrop-filter: blur(5.6px);
}
</style>