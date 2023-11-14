<template>
  <div class="container-fluid template-body">
    <section class="row">

      <div v-if="activeRoutine" class="col-12 text-end p-5">
        <p ><i class="mdi mdi-play fs-1 "></i></p>
        <section class="row ">
          <div v-if="nextMoveIndexNumber <= activeRoutine.listEntry.length ">
          <div v-if="activeRoutine" class="col-12 text-center mt-5">
            <img :src="activeRoutine.listEntry[currentMoveIndexNumber].move.imgUrl" alt="First image" class="main-picture"
              :class="[greenFilter == true ? 'green-filter' : '']">
              <p class="routine-name italiana mt-5">{{ activeRoutine.name }}</p>
          </div>
          </div>
        </section>
      <section class="row">

      <div v-if="nextMoveIndexNumber <= activeRoutine.listEntry.length " ></div>
          <div  class="col-12 pr-4 text-end small-image">
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
              <div class="text-start">
              <TimerComponent/>
            </div>
            </div>
            <div v-else></div>
          </div>
        </section>
        <div v-if="nextMoveIndexNumber <= activeRoutine.listEntry.length" > 
        <button  @click="nextMove()" class="btn btn-success">Change Move</button>
        </div>
        <div v-else >
        </div>
          </div>
          
        </section>
          <!-- <div v-if="nextMoveIndexNumber <= activeRoutine.listEntry.length" > 
        <button  @click="nextMove()" class="btn btn-success">Change Move</button>
        </div>
        <div v-else >
        
        </div>   -->
      </div>
  
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { useRoute } from "vue-router";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { routinesService } from "../services/RoutinesService.js";
import TimerComponent from '../components/TimerComponent.vue';

export default {
    setup() {
        const route = useRoute();
        let previousMoveIndexNumber = ref(-1);
        let currentMoveIndexNumber = ref(0);
        let nextMoveIndexNumber = ref(1);
        let greenFilter = ref(false);
        let nextMoveIsTransition = ref(false);
        onMounted(() => {
            getRoutineById();
        });
        async function getRoutineById() {
            try {
                const routineId = route.params.routineId;
                await routinesService.setActiveRoutine(routineId);
                logger.log(AppState.activeRoutine);
            }
            catch (error) {
                Pop.error(error);
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
                    logger.log("Switching green filter?");
                    greenFilter.value = false;
                    return;
                }
                if (nextMoveIndexNumber.value < this.activeRoutine.listEntry.length) {
                    // if (AppState.activeRoutine.listEntry[nextMoveIndexNumber.value].transition == false && AppState.activeRoutine.listEntry[currentMoveIndexNumber.value].transition == true) {
                    //   logger.log("First condition TRUE, figure out what to do")
                    if (AppState.activeRoutine.listEntry[nextMoveIndexNumber.value].transition == true && AppState.activeRoutine.listEntry[currentMoveIndexNumber.value].transition == false) {
                        currentMoveIndexNumber.value += 2;
                        nextMoveIndexNumber.value += 2;
                        greenFilter.value = true;
                        logger.log("Second condition TRUE, next move is a transition and current is not, indexNumber", currentMoveIndexNumber.value);
                    }
                    else {
                        logger.log("Third condition TRUE, neither is interval so go to next move");
                        currentMoveIndexNumber.value++;
                        nextMoveIndexNumber.value++;
                    }
                    logger.log("Index number", currentMoveIndexNumber.value, "AppState.activeRoutine.length", AppState.activeRoutine.listEntry.length);
                }
                else {
                    logger.log("false");
                    nextMoveIndexNumber.value += 1;
                    return;
                }
            },
        };
    },
    components: { TimerComponent }
};
</script>


<style lang="scss" scoped>
.main-picture {
  height: 400px;
  width: 600px;
  object-fit: cover;
  position: center;
  border: 3px solid black ;
 

}

.small-picture {
  height: 100px;
  width: 170px;
  object-fit: cover;
  position: center ;
  border: 3px solid black; 
}

.green-filter {
  background-color: #6B8373b9;
  backdrop-filter: blur(5px);
}
.template-body{
  background-color: white;
  
}
.routine-name{
  font-size: 50px;
}
</style>