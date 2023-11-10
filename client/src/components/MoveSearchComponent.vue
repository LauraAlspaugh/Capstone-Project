<template>
    <section class="row">
        <div class="col-4">
            <p class="fs-1 p-4">Pose Search</p>
        </div>
    </section>
    <section class="row">
        <div class="col-12 d-flex ">
            <p class="fs-3  p-4">Level</p>
            <p class="fs-3 p-4">🖤</p>
            <p class="fs-3 justify-content-end p-4">Focus</p>
        </div>
    </section>
    <section class="row">
        <div v-if="moves.length > 0" class="col-12">
            <MoveBasicCard/>
        </div>
    </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Move } from '../models/Move.js';
import MoveBasicCard from './MoveBasicCard.vue';

export default {
    setup() {
        return {
            moves: computed(()=>AppState.moves)
        };
    },
    components: { MoveBasicCard }
};
</script>


<style lang="scss" scoped>

</style>