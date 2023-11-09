<template>
    <section class="row justify-content-center">
        <div class="col-10 py-3">
            <section class="row white-gb">
                <div class="col-3">
                    <img class="img-fluid" :src="moveProp.imgUrl" alt="moveProp.englishName">
                </div>
                <div class="col-9">
                    <section class="row">
                        <div class="col d-flex justify-content-between">
                            <span>{{ moveProp.englishName }}</span>
                            <span>{{ moveProp.level }}</span>
                            <!-- <p>{{ moveProp.bodyPart }}</p> -->
                            <span v-for="focus in moveProp.bodyPart" :key="focus"> {{ focus }}</span>
                            <!-- TODO add v-if to show closed in heart if the logged in user has favorited that pose -->
                            <span><i class=" fs-2 mdi mdi-heart-outline"></i></span>
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
                            <li v-for="benefit in moveProp.benefitsArray" :key="benefit">{{ benefit }}</li>
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
// img {
//     height: 30rem;
//     width: 30rem;
// }
</style>