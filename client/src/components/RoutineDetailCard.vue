<template>
    <section class="row justify-content-center">
        <div v-if="activeRoutine?.keyImage" class="col active-move">
            <section class="row">
                <div class="col">
                    <button type="button" class="btn-close btn-close-white p-3" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
            </section>
            <section class="row justify-content-center">
                <div class=" col-10 mt-2  pb-0 text-center">
                    <img class="img-fluid" :src="activeRoutine.keyImage" alt="activeRoutine name">
                    <p class="text-center name-text italiana  pt-3 m-0 pb-0">{{ activeRoutine.name }}</p>
                </div>
            </section>
            <section class="row italiana text-white px-4">
                <div class="col-12">
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="text-mint ">{{ activeRoutine.playTime/60 }} Min | Move Count {{ activeRoutine.moveCount
                        }}</span>
                        <span>
                            <FavoriteUnfavoriteMove :id="activeRoutine.id" :moveOrRoutine="'routine'" />
                        </span>
                    </div>
                    <div class=" ">
                        <p class="text-mint d-flex justify-content-between ">{{ activeRoutine.level }}
                            <span></span>
                        </p>
                        <span class="text-mint pe-3 m-2" v-for="focus in activeRoutine.target.name" :key="focus"> {{ focus
                        }}</span>
                    </div>
                    <div class="mb-3">
                        <p class=" m-0 mt-3 ">Description: </p>
                        <li v-for="description in activeRoutine.descriptionArray" :key="description">{{ description }}</li>
                    </div>
                    <div class="">
                        <p class="text-mint"> Created by {{ activeRoutine.creator.name }}</p>
                    </div>
                    <div class=" mb-5">
                        <router-link :to="{ name: 'RoutineDesigner' }" class="">
                            <button role="button" class="btn btn-outline-light p-2 text-white"
                                title="Open Full Routine in Routine Designer Page" data-bs-dismiss="modal">Open Full
                                Routine</button>
                        </router-link>
                    </div>

                </div>
            </section>

        </div>
    </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed } from 'vue';
import FavoriteUnfavoriteMove from "./FavoriteUnfavoriteMove.vue";
export default {
    setup() {
        return {
            routines: computed(() => AppState.routines),
            activeRoutine: computed(() => AppState.activeRoutine),
        };
    },
    components: { FavoriteUnfavoriteMove }
};
</script>


<style lang="scss" scoped>
.active-move {
    background-color: #0F2D24;
}

img {
    border: solid black 2px;
    border-radius: 3px;
    width: 580px;
    height: 350px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.412);
    object-fit: cover;
    position: center;

}

.name-text {
    color: white;
    font-size: 50px;

}

.text-mint {
    color: #BCC8C4;
}
</style>