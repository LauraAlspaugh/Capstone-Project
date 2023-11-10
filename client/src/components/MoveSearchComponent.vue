<template>
    <section class="row">
        <div class="col-4">
            <p class="fs-1 p-4">Pose Search</p>
        </div>
    </section>
    <section class="row">
        <div class="col-12 d-flex ">
            <p class="fs-3  p-4">Level</p>
            <p class="text-dark">{{ moves.englishName }}</p>
            <p class="fs-3 p-4">🖤</p>
            <p class="fs-3 justify-content-end p-4">Focus</p>
        </div>
    </section>
    <section  v-if="moves.length > 0" class="row">
        <div v-for="move in moves" :key="move.id" class="col-12">
            <MoveBasicCard :moveBasicProp="move"/>
        </div>
    </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Move } from '../models/Move.js';
import MoveBasicCard from './MoveBasicCard.vue';
import { movesService } from '../services/MovesService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';



export default {
    // props: { moveSearchProp: { type: Move, required: true } },
    setup() {
        onMounted(()=> {
            getMoves()
        })
        async function getMoves() {
    try {
        await movesService.getMoves();
    }
    catch (error) {
        logger.error(error);
        Pop.error(error);
    }
    }
        return {
            moves: computed(()=>AppState.moves)
        };
    },
    components: { MoveBasicCard}
};
</script>


<style lang="scss" scoped>

</style>