<template>
  <div class="container-fluid">
    <section class="row">
      <div v-if="activeRoutine" class="col-12">
        <section class="row">
          <div v-if="currentMoveIndexNumber <= activeRoutine.listEntry.length" class="col-7">
            <img :src="activeRoutine.listEntry[currentMoveIndexNumber].move.imgUrl" alt="First image" class="main-picture"
              :class="[greenFilter == true ? 'green-filter' : '']">
          </div>
          <div v-else class="col-3 d-flex align-items-end">
            <div v-if="activeRoutine.listEntry[nextMoveIndexNumber]">
              <div v-if="activeRoutine.listEntry[nextMoveIndexNumber].transition == false">
                <img :src="activeRoutine.listEntry[nextMoveIndexNumber].move.imgUrl" alt="Second Picture"
                  class="small-picture">
              </div>
              <div v-else>
                <p>{{ activeRoutine.listEntry[nextMoveIndexNumber].duration }} second interval before next pose.</p>
                <img :src="activeRoutine.listEntry[nextMoveIndexNumber + 1].move.imgUrl" alt="Second Picture"
                  class="small-picture">
              </div>
            </div>
            <div v-else></div>
          </div>
        </section>
        <button @click="nextMove()" class="btn btn-success">Change Move</button>
      </div>
    </section>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { useRoute } from "vue-router";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { routinesService } from "../services/RoutinesService.js";

export default {
  setup() {
    const route = useRoute();
    let previousMoveIndexNumber = ref(-1)
    let currentMoveIndexNumber = ref(0)
    let nextMoveIndexNumber = ref(1)
    let greenFilter = ref(false)
    let nextMoveIsTransition = ref(false)

    onMounted(() => {
      getRoutineById()
    })

    async function getRoutineById() {
      try {
        const routineId = route.params.routineId
        await routinesService.setActiveRoutine(routineId)
        logger.log(AppState.activeRoutine)
      } catch (error) {
        Pop.error(error)
      }

    }


    return {
      previousMoveIndexNumber,
      currentMoveIndexNumber,
      nextMoveIndexNumber,
      greenFilter,
      nextMoveIsTransition,
      activeRoutine: computed(() => AppState.activeRoutine),

      nextMove() {
        if (greenFilter.value == true) {
          logger.log("Switching green filter?")
          greenFilter.value = false
          return
        }
        if (AppState.activeRoutine.listEntry.length > currentMoveIndexNumber.value) {
          if (AppState.activeRoutine.listEntry[nextMoveIndexNumber.value].transition == false && AppState.activeRoutine.listEntry[currentMoveIndexNumber.value].transition == true) {
            logger.log("First condition TRUE, figure out what to do")
          } else if (AppState.activeRoutine.listEntry[nextMoveIndexNumber.value].transition == true && AppState.activeRoutine.listEntry[currentMoveIndexNumber.value].transition == false) {
            currentMoveIndexNumber.value += 2
            nextMoveIndexNumber.value += 2
            greenFilter.value = true
            logger.log("Second condition TRUE, next move is a transition and current is not, indexNumber", currentMoveIndexNumber.value)
          } else {
            logger.log("Third condition TRUE, neither is interval so go to next move")
            currentMoveIndexNumber.value++
            nextMoveIndexNumber.value++
          }
          logger.log("Index number", currentMoveIndexNumber.value, "AppState.activeRoutine.length", AppState.activeRoutine.listEntry.length)
        } else {
          logger.log("false")
          return
        }
      },


    }
  }
};
</script>


<style lang="scss" scoped>
.main-picture {
  height: 400px;
  width: auto;
}

.small-picture {
  height: 100px;
  width: auto;
}

.green-filter {
  background-color: #6B8373b9;
  backdrop-filter: blur(5px);
}
</style>