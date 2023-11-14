<template>
    <section class="row justify-content-center italiana">
        <div class="col-10 py-3" @click="setActiveMove()" type="button">
            <section class="row white-gb p-3">
                <div class="col-12 col-md-4 d-flex align-items-center">
                    <img class="img-fluid black-border" :src="moveProp.imgUrl" alt="moveProp.englishName">
                </div>
                <div class="col-10 col-md-7">
                    <section class="row">
                        <div class="col d-block d-md-flex justify-content-between align-items-center">
                            <span class="fs-3 m-0 pe-3">{{ moveProp.englishName }}</span>
                            <p class="m-0 color3 fw-bold">{{ moveProp.level }}</p>
                        </div>
                    </section>
                    <section class="row my-2">
                        <div class="col">
                            <span class="pe-4 color3 fw-bold" v-for="focus in moveProp.bodyPart" :key="focus"> 
                                {{ focus }}
                            </span>
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
                    <span v-if="isFavMove" @click.stop="unfavoriteMove()" role="button"><i class="fs-2 mdi mdi-heart"></i></span>
                    <span v-else @click.stop="favoriteMove()" role="button"><i class="fs-2 mdi mdi-heart-outline"></i></span>
                </div>
            </section>
        </div>
    </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed } from 'vue';
import { Modal } from "bootstrap";
import Pop from "../utils/Pop";
import { movesService } from "../services/MovesService";
import { Move } from '../models/Move.js';

export default {
    props: { moveProp: { type: Move, required: true } },

    setup(props) {
        return {
            myFavoriteMoves: computed(() => AppState.myFavoriteMoves),
            isFavMove: computed(() => AppState.myFavoriteMoves.find((move) => move.moveId == props.moveProp.id)),

            async favoriteMove() {
                try {
                    const moveId = props.moveProp.id;
                    await movesService.favoriteMove(moveId);
                }
                catch (error) { Pop.error(error) }
            },

            async unfavoriteMove() {
                try {
                    const moveId = props.moveProp.id;
                    await movesService.unfavoriteMove(moveId);
                }
                catch (error) { Pop.error(error) }
            },

            setActiveMove() {
                AppState.activeMove = props.moveProp
                Modal.getOrCreateInstance('#move-modal').show();
            }
        }
    }
};
</script>


<style lang="scss" scoped>
.color3 {
    color: #6B8373;
}

.black-border {
    border: 2px solid black;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.412);
    border-radius: 3px;
}

img {
    border-radius: 3px;
    height: 15rem;
    width: 20rem;
}
</style>