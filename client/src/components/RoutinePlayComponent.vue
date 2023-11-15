<template>
  <div class="container-fluid componentBody">
    <section class="row">

      <div v-if="activeRoutine" class="col-12  p-5 position-relative">
        <button type="button" class=" fs-3 btn-close position-absolute " data-bs-dismiss="modal"
          aria-label="Close"></button>
        <span class="d-flex align-items-center"> <img class="logo-nav d-none d-lg-inline me-auto " alt="logo"
            src="../assets/img/RootedFlow Logo-only.png" />
          <button v-if="isPlaying == false" @click="$refs.timer.startTimer(); flipPlayingOrPaused()"
            class="btn btn rounded-circle  bg-dark"><i class="mdi mdi-play fs-4 "></i></button>
          <button v-else @click=" $refs.timer.pauseTimer(); flipPlayingOrPaused()"
            class="btn btn rounded-circle  bg-dark"><i class="mdi mdi-pause fs-4 "></i></button>
        </span>
        <section class="row ">
          <div v-if="nextMoveIndexNumber <= listEntries.length">
            <div v-if="activeRoutine" class="col-12 text-center mt-5">
              <div class="main-picture" :class="{ 'green-filter': greenFilter }">
                <img :src="listEntries[currentMoveIndexNumber].move.imgUrl" alt="First image" />
              </div>
              <p class="routine-name italiana mt-5">{{ listEntries[currentMoveIndexNumber].move.englishName }}
                <span @click="showDetails = !showDetails" class="btn fs-1" type="button" role="button"><i
                    title="show details " class="mdi mdi-dots-vertical"></i></span>
              </p>

            </div>
          </div>
        </section>
        <section class="row">

          <div v-if="nextMoveIndexNumber <= listEntries.length"></div>
          <div class="col-12  d-flex justify-content-between   small-image">
            <p class="d-flex  pl-4">
              <TimerComponent ref="timer" />
            </p>
            <div v-if="listEntries[nextMoveIndexNumber]">
              <div v-if="listEntries[nextMoveIndexNumber].transition == false">
                <img :src="listEntries[nextMoveIndexNumber].move.imgUrl" alt="Second Picture"
                  class="small-picture mt-3">
              </div>
              <div v-else>
                <p>{{ listEntries[nextMoveIndexNumber].duration }} second interval before next pose.</p>
                <img :src="listEntries[nextMoveIndexNumber + 1].move.imgUrl" alt="Second Picture" class="small-picture">
              </div>
              <!-- <p class="text-start pl-4">
              <TimerComponent/>
            </p> -->
            </div>
            <div v-else></div>
          </div>
        </section>
        <div v-if="nextMoveIndexNumber <= listEntries.length">
          <button @click="nextMove()" class="btn btn-success ">Change Move</button>
        </div>
        <div v-else>
        </div>

        <!-- <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel"></h5> -->

        <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
        <!-- </div> -->
        <div v-if="showDetails" class="modal-body">
          <RoutinePlayPageModal :moveProp="listEntries[currentMoveIndexNumber].move" />
        </div>
      </div>
      <!-- </div> -->
      <!-- </div>
      </div> -->

    </section>
    <!-- <div v-if="nextMoveIndexNumber <= listEntries.length" > 
        <button  @click="nextMove()" class="btn btn-success">Change Move</button>
        </div>
        <div v-else >
        
        </div>   -->
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, watch } from 'vue';
import { logger } from "../utils/Logger.js";
import TimerComponent from './TimerComponent.vue';
import RoutinePlayPageModal from './RoutinePlayPageModal.vue';


export default {
  setup() {
    let previousMoveIndexNumber = ref(-1);
    let currentMoveIndexNumber = ref(0);
    let nextMoveIndexNumber = ref(1);
    let greenFilter = ref(false);
    let isPlaying = ref(false);
    let nextMoveIsTransition = ref(false);
    const finishedMove = computed(() => AppState.finishedMove);
    let listEntries = computed(() => AppState.listEntries);
    const showDetails = ref(false);


    watch(finishedMove, () => {
      if (finishedMove.value) {
        nextMove();
      }
    });

    function nextMove() {
      if (greenFilter.value == true) {
        greenFilter.value = false;
        return;
      }
      if (nextMoveIndexNumber.value < listEntries.value.length) {
        if (AppState.listEntries[nextMoveIndexNumber.value].transition == true && AppState.listEntries[currentMoveIndexNumber.value].transition == false) {
          currentMoveIndexNumber.value += 2;
          nextMoveIndexNumber.value += 2;
          greenFilter.value = true;
        }
        else {
          currentMoveIndexNumber.value++;
          nextMoveIndexNumber.value++;
        }
      }
      else {
        nextMoveIndexNumber.value += 1;
        return;
      }
    }

    function flipPlayingOrPaused() {
      isPlaying.value = !isPlaying.value
      logger.log("isPlaying.value", isPlaying.value)
    }

    // return {
    //   previousMoveIndexNumber,
    //   currentMoveIndexNumber,
    //   nextMoveIndexNumber,
    //   greenFilter,
    //   nextMoveIsTransition,
    //   finishedMove,
    //   nextMove,
    //   listEntries,
    //   activeRoutine: computed(() => AppState.activeRoutine),
    //   activeMove: computed(() => AppState.activeMove),

    //   const showDetails: ref(false),

    return {
      previousMoveIndexNumber,
      currentMoveIndexNumber,
      nextMoveIndexNumber,
      nextMove,
      listEntries,
      greenFilter,
      nextMoveIsTransition,
      showDetails,
      isPlaying,
      flipPlayingOrPaused,

      activeRoutine: computed(() => AppState.activeRoutine),
      activeMove: computed(() => AppState.activeMove),
      finishedMove: computed(() => AppState.finishedMove),





    };
  },
  components: { RoutinePlayPageModal }
};
</script>


<style lang="scss" scoped>
.main-picture {
  display: flex;
  justify-content: center;
  height: 400px;
  width: 100%;

  img {
    height: 100%;
    object-fit: cover;
    position: center;
    border: 3px solid black;
  }
}

.small-picture {
  height: 140px;
  width: 250px;
  object-fit: cover;
  position: center;
  border: 3px solid black;
}

.green-filter {
  position: relative;

  // background-color: #6B8373b9;
  &::after {
    position: absolute;
    margin-inline: auto;
    top: 0;
    height: 100%;
    aspect-ratio: 1/1;
    content: "";
    background-color: rgba(82, 109, 82, 0.465)
  }

  // filter: drop-shadow(8px 8px 10px green);
}

.wrap {
  width: 400px;
  height: 400px;
  margin: 1em auto;
  position: relative;
}

.wrap img {
  -webkit-filter: sepia(100%) hue-rotate(90deg) saturate(400%);
  filter: sepia(100%) hue-rotate(90deg) saturate(400%);
}

.componentBody {
  background-color: white;
}

.routine-name {
  font-size: 50px;
}

.logo-nav {
  height: 10rem;
  top: .5rem;
  left: 20rem;

}

.btn-close {
  top: 1rem;
  right: 1rem;

}
</style>