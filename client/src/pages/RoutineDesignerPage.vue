<template>
<div class="container-fluid">
    <section class="row justify-content-around">
      <div class="col-12 col-md-7 py-5">
        <section class="header">
          <div class="dropdown open">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true"
                aria-expanded="false">
                  My Favorited Routines
                </button>
            <div class="dropdown-menu" aria-labelledby="triggerId">
              <button v-for="fav in myFavRoutines" :key="fav.routineId" href="#" class="dropdown-item">{{ fav }}</button>
            </div>
          </div>
          
        </section>
        <!-- ROUTINE COMPONENT  -->
      </div>
      <div class="col-12 col-md-3 py-5">
        <p class="mb-0 fs-1">Pose Search</p>
        <!-- MOVE SEARCH/FILTER COMPONENT -->
      </div>
    </section>
  </div>


</template>


<script>
import { AppState } from '../AppState';
import { computed, onMounted } from 'vue';
import Pop from "../utils/Pop";
import { routinesService } from "../services/RoutinesService.js";

export default {
  setup() {

    onMounted(() => {
    })

    return {
      myFavRoutines: computed(() => AppState.myFavoriteRoutines),
      
    }
  }
};
</script>


<style lang="scss" scoped></style>