<template>
    <section class="row p-2 p-md-4 italiana">
        <div class="col-12 d-block white-gb p-3">
            <div @click="setActiveRoutine()" data-bs-toggle="modal" data-bs-target="#routine-modal" type="button"
                class="row">
                <div class="col">

                    <img class="img-fluid" :src="routineProp.keyImage" alt="routineProp.name">
                </div>
            </div>
            <div class="d-flex justify-content-between pt-2">
                <span @click="setActiveRoutine()" data-bs-toggle="modal" data-bs-target="#routine-modal" type="button"
                    class="fs-4"> {{ routineProp.name }}</span>
                <span v-if="isFavRoutine" @click="unfavoriteRoutine()" role="button" class="fs-3"><i
                        class="mdi mdi-heart"></i></span>
                <span v-else @click="favoriteRoutine()" role="button" class="fs-3"><i
                        class="mdi mdi-heart-outline"></i></span>
            </div>
            <div @click="setActiveRoutine()" data-bs-toggle="modal" data-bs-target="#routine-modal" type="button"
                class="d-flex justify-content-between color3">
                <span>{{ routineProp.playTime }} sec</span>
                <span>{{ routineProp.level }}</span>
                <!-- <span>{{ routineProp.target }}</span> -->
            </div>
            <div @click="setActiveRoutine()" data-bs-toggle="modal" data-bs-target="#routine-modal" type="button">
                <span>Description: {{ routineProp.shortDescription }}...</span>
            </div>
            <div>
                <span class="color3">Creator: {{ routineProp.creator.name }}</span>
            </div>
        </div>
    </section>
    <!-- <p>{{ routineProp.name }}</p> -->
    <!-- <p>{{ routineProp.description }}</p> -->
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Routine } from '../models/Routine.js';
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { routinesService } from "../services/RoutinesService";
export default {
    props: { routineProp: { type: Routine, required: true } },
    setup(props) {
        return {
            async favoriteRoutine() {
                try {
                    const routineId = props.routineProp.id
                    await routinesService.favoriteRoutine(routineId)
                } catch (error) {
                    logger.error(error)
                    Pop.error(error)
                }
            },
            async unfavoriteRoutine() {
                try {
                    const routineId = props.routineProp.id
                    await routinesService.unfavoriteRoutine(routineId)
                } catch (error) {
                    logger.error(error)
                    Pop.error(error)
                }

            },
            myFavoriteRoutines: computed(() => AppState.myFavoriteRoutines),
            isFavRoutine: computed(() => AppState.myFavoriteRoutines.find((routine) => routine.routineId == props.routineProp.id)),
            setActiveRoutine() {
                AppState.activeRoutine = props.routineProp
            }
        }
    }
};
</script>


<style lang="scss" scoped>
.color3 {
    color: #6B8373;
}

img {
    border: solid black 2px;
    border-radius: 3px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.412);
    width: 250px;
    height: 170px;
    object-fit: cover;
    position: center;
}
</style>