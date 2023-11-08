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
            <li class="ps-3">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                  Beginner
                </label>
              </div>
            </li>
            <li class="ps-3">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                  Intermediate
                </label>
              </div>
            </li>
            <li class="ps-3">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                  Expert
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
            <li class="ps-3">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                  Arms
                </label>
              </div>
            </li>
            <li class="ps-3">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                  Chest
                </label>
              </div>
            </li>
            <li class="ps-3">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                  Core
                </label>
              </div>
            </li>
            <li class="ps-3">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                  Neck
                </label>
              </div>
            </li>
            <li class="ps-3">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                  Glutes
                </label>
              </div>
            </li>
            <li class="ps-3">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                  Hamstrings
                </label>
              </div>
            </li>
            <li class="ps-3">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                  Hips
                </label>
              </div>
            </li>
            <li class="ps-3">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                  Inner Thighs
                </label>
              </div>
            </li>
            <li class="ps-3">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                  Lower Back
                </label>
              </div>
            </li>
            <li class="ps-3">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                  Quads
                </label>
              </div>
            </li>
            <li class="ps-3">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                  Shoulder
                </label>
              </div>
            </li>
            <li class="ps-3">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                  Upper Back
                </label>
              </div>
            </li>
          </ul>
        </div>
        <!-- !SECTION Filter by Focus End -->
      </div>
    </section>



  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { movesService } from '../services/MovesService.js';
export default {
  setup() {
    onMounted(()=> {
      getMoves()
    });
    async function getMoves(){
      try {
        await movesService.getMoves()
    } 
      catch (error) {
        logger.error(error)
        Pop.error(error)
      }
    }
    return {
      moves: computed(()=> AppState.moves)
    }
  }
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