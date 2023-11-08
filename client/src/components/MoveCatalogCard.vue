<template>
    <!-- <section class="row">
        <div class="col-10"> -->
    <section class="row">
        <div class="col-3">
            <img :src="moveProp.imgUrl" alt="moveProp.englishName">
        </div>
        <div class="col-9">
            
        </div>
    </section>
    <!-- </div>
    </section> -->

    <p>{{ moveProp.englishName }}</p>
    <p>{{ moveProp.description }}</p>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Move } from '../models/Move.js';
export default {
    props: { moveProp: { type: Move, required: true } },
    setup() {
        return {}
    }
};
</script>


<style lang="scss" scoped></style>