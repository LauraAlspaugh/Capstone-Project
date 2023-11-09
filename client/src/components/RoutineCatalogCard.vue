<template>
    <section class="row p-4">
        <div class="col-12 d-block white-gb">
            <img class="img-fluid" :src="routineProp.keyImage" alt="routineProp.name">
            <div class="d-flex justify-content-between">
                <span class="fs-3"> {{ routineProp.name }}</span>
                <span @click="unfavoriteRoutine()" role="button" class="fs-3"><i class="mdi mdi-heart"></i></span>
                <span @click="favoriteRoutine()" role="button" class="fs-3"><i class="mdi mdi-heart-outline"></i></span>
            </div>
            <div>
                <span>{{ routineProp.playTime }} sec</span>
                <span>{{ routineProp.level }}</span>
                <!-- <span>{{ routineProp.target }}</span> -->
            </div>
            <div>
                <span>Description: {{ routineProp.shortDescription }}...</span>
            </div>
            <div>
                <span>Creator: {{ routineProp.creator.name }}</span>
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

            }
            // myFavoriteRoutines:
        }
    }
};
</script>


<style lang="scss" scoped>
img {
    // max-height: 10rem;
    // max-width: 15rem;
}
</style>