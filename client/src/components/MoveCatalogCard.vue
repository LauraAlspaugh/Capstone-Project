<template>
    <section class="row justify-content-center">
        <div class="col-10 py-3">
            <section class="row white-gb p-3">
                <div class="col-3 d-flex align-items-center">
                    <img class="img-fluid" :src="moveProp.imgUrl" alt="moveProp.englishName">
                </div>
                <div class="col-8">
                    <section class="row">
                        <div class="col d-block d-md-flex justify-content-between align-items-center">
                            <span class="fs-3 m-0">{{ moveProp.englishName }}</span>
                            <p class="m-0">{{ moveProp.level }}</p>

                        </div>
                    </section>
                    <section class="row my-2">
                        <div class="col">
                            <span class="pe-4" v-for="focus in moveProp.bodyPart" :key="focus"> {{ focus }}</span>
                        </div>
                    </section>
                    <section class="row">
                        <div class="col pb-2">
                            <p class="m-0">Benefits:</p>
                            <li v-for="benefit in moveProp.benefitsArray" :key="benefit">{{ benefit }}</li>
                        </div>
                    </section>
                </div>
                <div class="col-1 d-flex justify-content-end h-100">
                    <!-- TODO add v-if to show closed in heart if the logged in user has favorited that pose -->
                    <span><i class="fs-2 mdi mdi-heart-outline"></i></span>
                    <!-- <p><i class="fs-2 mdi mdi-heart"></i></p> -->
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

</style>