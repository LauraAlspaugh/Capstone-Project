<template>
    <div class="container-fluid">
        <section v-if="activeMove" class="row">
            <div class="col-12 d-flex justify-content-between">
                <!-- <p>{{activeRoutine.listEntry[currentMoveIndexNumber].move.level}}</p> -->
                <!-- <p class="fs-5">{{ moveProp.level }}</p> -->
                <!-- <i class=" fs-3 mdi mdi-heart"></i> -->
            </div>
        </section>
        <section v-if="activeMove" class="row">
            <!-- <div class="col-12 text-start p-3">
                <span class="pe-3 fs-5" v-for="body in moveProp.bodyPart" :key="body">{{ body }}</span>
            </div> -->
        </section>
        <section v-if="activeMove" class="row">
            <div class="col-12 p-3 d-flex justify-content-between ">
                <p class="fs-4 ">Description: </p>
                <i class=" fs-3 me-3 mdi mdi-heart"></i>
            </div>
        </section>
        <section class="row">
            <div class="col-12">
                <li v-for="description in moveProp.descriptionArray" :key="description">{{ description }}</li>
                <!-- <p class="fs-5">{{ moveProp.description }}</p> -->
            </div>
        </section>
        <!-- <section v-if="activeMove" class="row">
            <div class="col-12 text-start">
                <p class="fs-4">Benefits: </p>
                <li v-for="benefit in moveProp.benefitsArray" :key="benefit"> {{ benefit }}</li> 
                <p class="fs-5">{{ moveProp.benefits }}</p>
            </div>
        </section> -->

        <!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        
Launch demo modal
</button> -->

    </div>


    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{ routine.level }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <p>{{ routine.level }}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, onMounted, ref } from 'vue';
import { Move } from '../models/Move.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { movesService } from '../services/MovesService.js';

export default {
    props: { moveProp: { type: Move, required: true } },

    setup(props) {
        let currentMoveIndexNumber = ref(0);

        async function findMove() {
            try {
                const id = props.moveProp.id
                const move = await movesService.getMoveById(id)
                // const move = AppState.moves.filter((move) => move.id == id)
                // logger.log('getting move', move)
                // return move
                logger.log('getting move', move)
                return move
            }
            catch (error) { Pop.error(error) }
        }

        onMounted(() => {
            findMove();
        })

        return {
            currentMoveIndexNumber,
            routine: computed(() => AppState.routines),
            activeRoutine: computed(() => AppState.activeRoutine),
            activeMove: computed(() => AppState.activeMove),
            move: computed(() => findMove())
        }
    }
};
</script>


<style lang="scss" scoped></style>