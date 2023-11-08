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
                <input v-model="editableLevel[level]" class=" form-check-input" type="checkbox" value=""
                  id="flexCheckDefault">
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
                <input v-model="editableFocus[focus]" class="form-check-input" type="checkbox" value=""
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
      <MoveCard :moveProp="move"/>
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
import MoveCard from '../components/MoveCard.vue';
export default {
    setup() {
        const levels = ["Beginner", "Intermediate", "Expert"];
        const focuses = ["Arms", "Chest", "Core", "Neck", "Glutes", "Hamstrings", "Hips", "Inner thighs", "Lower Back", "Quads", "Shoulder", "Upper Back"];
        const editableLevel = ref({});
        const editableFocus = ref({});
        onMounted(() => {
            getMoves();
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
        return {
            editableLevel,
            editableFocus,
            levels,
            focuses,
            moves: computed(() => AppState.moves)
        };
    },
    components: { MoveCard }
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