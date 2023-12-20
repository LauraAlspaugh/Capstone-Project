<template>
  <div class="container-fluid componentBody">
    <section class="row">

      <div v-if="activeRoutine" class="col-12  p-5 position-relative">
        <button @click="$refs.timer.resetAndStopTimer(); resetRoutine()" type="button"
          class=" fs-3 btn-close position-absolute " data-bs-dismiss="modal" aria-label="Close"></button>
        <div class="d-flex justify-content-between">
          <span class="d-flex align-items-center"> <img class="logo-nav d-none d-lg-inline me-auto " alt="logo"
              src="/img/RootedFlow-Logo-only.png" /></span>
          <div>
            <div class="my-3 me-3">
              <button v-if="!isPlaying && !routineIsFinishedPlaying"
                @click="$refs.timer.startTimer(); flipPlayingOrPaused()" class="btn rounded-circle mt-3 bg-dark"><i
                  class="mdi mdi-play fs-4 " title="Play Routine"></i></button>
              <button v-else-if="isPlaying && !routineIsFinishedPlaying"
                @click="$refs.timer.pauseTimer(); flipPlayingOrPaused()" class="btn rounded-circle mt-3 bg-dark"
                title="Pause Routine"><i class="mdi mdi-pause fs-4 "></i></button>
            </div>
            <div>
              <button v-if="isPlaying && !routineIsFinishedPlaying" @click="nextMove(); $refs.timer.resetTimer()"
                class="btn rounded-circle bg-dark"><i class="mdi mdi-skip-next fs-4"
                  title="Skip to next move"></i></button>
            </div>
          </div>
        </div>
        <section class="row ">
          <div v-if="routineIsFinishedPlaying == false">
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
          </div>
          <div v-else class="col-12">
            <p class="text-center fs-1 my-2 italiana">Thank you for enjoying Rooted Flow!</p>
            <p class="text-center fs-3 my-5 italiana">Would you like to replay {{ activeRoutine.name }}?</p>
            <div class="d-flex justify-content-center">
              <button @click="replayRoutine(); $refs.timer.resetTimer()" class="btn btn-theme-color mx-4">Yes</button>
              <button @click="$refs.timer.resetAndStopTimer(); resetRoutine()" class="btn btn-theme-color mx-4"
                data-bs-dismiss="modal" aria-label="Close">No</button>
            </div>
          </div>
        </section>
        <section class="row justify-content-between d-flex">
          <!-- <div v-if="nextMoveIndexNumber <= listEntries.length"></div> -->
          <!-- <div class="col-12  d-flex justify-content-between   small-image">
            <TimerComponent ref="timer" />
            <div v-if="listEntries[nextMoveIndexNumber]">
              <div v-if="listEntries[nextMoveIndexNumber].transition == false">
                <img :src="listEntries[nextMoveIndexNumber].move.imgUrl" alt="Second Picture" class="small-picture mt-3">
              </div>
              <div v-else>
                <p>{{ listEntries[nextMoveIndexNumber].duration }} second interval before next pose.</p>
                <img :src="listEntries[nextMoveIndexNumber + 1].move.imgUrl" alt="Second Picture" class="small-picture">
              </div>
            </div>
            <div v-else></div>
          </div> -->
          <div class="col-4">
            <TimerComponent ref="timer" :class="routineIsFinishedPlaying ? 'hidden' : ''" />
          </div>
          <div class="col-5">
            <div v-if="showDetails && routineIsFinishedPlaying == false" class="modal-body">
              <RoutinePlayPageModal :moveProp="listEntries[currentMoveIndexNumber].move" />
            </div>
          </div>
          <div class="col-3">
            <div v-if="listEntries[nextMoveIndexNumber]">
              <div v-if="listEntries[nextMoveIndexNumber].transition == false">
                <img :src="listEntries[nextMoveIndexNumber].move.imgUrl" alt="Second Picture" class="small-picture mt-3">
              </div>
              <div v-else>
                <p>{{ listEntries[nextMoveIndexNumber].duration }} second interval before next pose.</p>
                <img :src="listEntries[nextMoveIndexNumber + 1].move.imgUrl" alt="Second Picture" class="small-picture">
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
    <!-- <div v-if="showDetails" class="modal-body">
      <RoutinePlayPageModal :moveProp="listEntries[currentMoveIndexNumber].move" /> -->
    <!-- </div> -->
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, watch } from 'vue';
import RoutinePlayPageModal from './RoutinePlayPageModal.vue';
import { movesService } from '../services/MovesService.js'


export default {
  setup() {
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

    function playAudioCue() {
      const soundName = AppState.account.transitionSound
      const audioObject = AppState.transitionSounds.find(sound => sound.name == soundName)
      audioObject.audio.play()
    }

    function nextMove() {
      if (greenFilter.value == true) {
        greenFilter.value = false;
        playAudioCue()
        return;
      }
      if (nextMoveIndexNumber.value < listEntries.value.length) {
        if (AppState.listEntries[nextMoveIndexNumber.value].transition == true && AppState.listEntries[currentMoveIndexNumber.value].transition == false) {
          currentMoveIndexNumber.value += 2;
          nextMoveIndexNumber.value += 2;
          greenFilter.value = true;
          playAudioCue()
        }
        else {
          currentMoveIndexNumber.value++;
          nextMoveIndexNumber.value++;
          playAudioCue()
        }
      }
      else {
        movesService.finishPlayingRoutine()
        // nextMoveIndexNumber.value += 1;
        return;
      }
    }

    // function playAudioCue() {
    //   logger.log('play audio cue')
    //   const soundName = AppState.account.customAudioId
    //   const audioObject = AppState.transitionSounds.find(sound => sound.name == soundName)
    //   audioObject.audio.play()
    // }

    function flipPlayingOrPaused() {
      isPlaying.value = !isPlaying.value
    }

    function replayRoutine() {
      setTimeout(() => {
        movesService.startPlayingRoutine()
        currentMoveIndexNumber.value = 0;
        nextMoveIndexNumber.value = 1;
        greenFilter.value = false;
        nextMoveIsTransition.value = false;
      }, 500)
    }

    function resetRoutine() {
      this.replayRoutine()
      isPlaying.value = false;
    }

    return {
      currentMoveIndexNumber,
      nextMoveIndexNumber,
      nextMove,
      listEntries,
      greenFilter,
      nextMoveIsTransition,
      showDetails,
      isPlaying,
      flipPlayingOrPaused,
      replayRoutine,
      resetRoutine,

      activeRoutine: computed(() => AppState.activeRoutine),
      activeMove: computed(() => AppState.activeMove),
      // finishedMove: computed(() => AppState.finishedMove),
      routineIsFinishedPlaying: computed(() => AppState.routineIsFinishedPlaying),




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

.hidden {
  visibility: hidden;
}

.btn-theme-color {
  background-color: #6B8373b9;
}

.btn-theme-color:hover {
  background-color: white;
  border: 1px solid #6B8373b9;
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

@media screen and (max-width: 992px) {
  .main-picture {
    height: 15rem;
    width: 15rem;
    justify-content: center;
    display: flex;
  }

  .small-picture {
    // display: none;
    width: 100%;
    height: 100%;
  }

}
</style>