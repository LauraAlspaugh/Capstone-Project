<template>
    <section class="row p-2 p-md-4 italiana">
        <div class="col-12 d-block white-gb p-3" type="button" @click="setSelectedRoutine()">

            <div class="row">
                <div class="col-12">
                    <img v-if="routineProp.keyImage" class="img-fluid" :src="routineProp.keyImage" alt="routineProp.name">
                </div>
            </div>

            <div class="d-flex justify-content-between pt-2">
                <span class="fs-4"> 
                    {{ routineProp.name }}
                </span>
                <span class="">
                    <span v-if="isFavRoutine" @click.stop="unfavoriteRoutine()" role="button" class="fs-3">
                        <i class="mdi mdi-heart"></i>
                    </span>
                    <span v-else @click.stop="favoriteRoutine()" role="button" class="fs-3">
                        <i class="mdi mdi-heart-outline"></i>
                    </span>
                </span>
            </div>

            <div class="d-flex justify-content-between color3">
                <span>{{ (routineProp.playTime / 60).toFixed(1) }} min</span>
                <span>{{ routineProp.level }}</span>
                <!-- <span>{{ routineProp.target }}</span> -->
            </div>

            <div>
                <span>Description: {{ routineProp.shortDescription }}...</span>
            </div>

            <div>
                <span class="color3">Creator: {{ routineProp.creator.name }}</span>
            </div>
        </div>
    </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed } from 'vue';
import { Modal } from "bootstrap";
import Pop from "../utils/Pop";
import { Routine } from '../models/Routine.js';
import { routinesService } from "../services/RoutinesService";

export default {
    props: { routineProp: { type: Routine, required: true } },

    setup(props) {
        return {
            myFavoriteRoutines: computed(() => AppState.myFavoriteRoutines),
            isFavRoutine: computed(() => AppState.myFavoriteRoutines.find((routine) => routine.routineId == props.routineProp.id)),

            setSelectedRoutine() {
                AppState.selectedRoutine = props.routineProp;
                Modal.getOrCreateInstance('#routine-modal').show();
            },

            async favoriteRoutine() {
                try {
                    const routineId = props.routineProp.id
                    await routinesService.favoriteRoutine(routineId)
                }
                catch (error) { Pop.error(error) }
            },

            async unfavoriteRoutine() {
                try {
                    const routineId = props.routineProp.id
                    await routinesService.unfavoriteRoutine(routineId)
                }
                catch (error) { Pop.error(error) }
            },

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

.noTouchy{
    pointer-events: none;
}

.touchy{
    // pointer-events: visible;
}
</style>