<template>
    <section class="row">
        <div class="col-10">
            <section class="row white-gb">
                <div class="col-3">
                    <img :src="moveProp.imgUrl" alt="moveProp.englishName">
                </div>
                <div class="col-9">
                    <section class="row">
                        <div class="col d-flex justify-content-between">
                            <p>{{ moveProp.englishName }}</p>
                            <p>{{ moveProp.level }}</p>
                            <p>{{ moveProp.bodyPart }}</p>
                            <!-- TODO add v-if to show closed in heart if the logged in user has favorited that pose -->
                            <p><i class=" fs-2 mdi mdi-heart-outline"></i></p>
                            <!-- <p><i class="fs-2 mdi mdi-heart"></i></p> -->
                        </div>
                    </section>
                    <section class="row">
                        <div class="col">
                            {{ moveProp.sanskritName }}
                        </div>
                    </section>
                    <section class="row">
                        <div class="col">
                            <p>Benefits:</p>
                            <li>{{ moveProp.benefitsArray }}</li>
                        </div>
                    </section>
                </div>
            </section>
        </div>
    </section>
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


<style lang="scss" scoped>
img {
    height: 30rem;
    width: 30rem;
}
</style>