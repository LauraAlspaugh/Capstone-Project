<template>
    <div class="container-fluid">
        <section class="row justify-content-center">
            <div v-if="selectedRoutine?.keyImage" class="col active-move position-relative z0">
                <section class="row">
                    <div class="col-12 d-flex justify-content-between align-items-center px-3 py-2">
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close">
                        </button>
                        <span v-if="selectedRoutine.creatorId == account.id" >
                            <div v-if="!selectedRoutine.isArchived" class="position-relative z3">
                                <i class="fs-3 onHover showHidden text-success mdi mdi-package-down" type="button" title="Archive the routine?" @click="archiveRoutine()"></i>
                                <p class="mb-0 p-2 card hidden position-absolute">
                                    Archive a routine to remove it from the community list. Anyone who has favorited it will still be able to use the routine.
                                </p>
                            </div>
                            <i v-if="selectedRoutine.isArchived" class="fs-3 onHover text-success mdi mdi-package-up" type="button" title="Unarchive the routine?" @click="unarchiveRoutine()"></i>
                            <div v-if="selectedRoutine.isArchived && selectedRoutine.favoritedCount == 0" class="position-relative d-inline z3">
                                <i class="fs-3 onHover showHidden ms-5 text-danger mdi mdi-trash-can" type="button" title="Permanently delete the routine?" @click="deleteRoutine()"></i>
                                <p class="mb-0 p-2 card hidden position-absolute">
                                    To permanently delete a routine, there can be no favorites on it.
                                </p>
                            </div>
                            <p v-else-if="selectedRoutine.isArchived" class="">{{ selectedRoutine.favoritedCount }}</p>
                        </span>
                    </div>
                </section>
                <section class="row justify-content-center">
                    <div class=" col-10 mt-2  pb-0 text-center position-relative">
                        <p v-if="selectedRoutine.isArchived" class="position-absolute archivedNote rounded fs-5"> <br>
                            This routine has been archived! <br>
                            If you wish to unarchive this later,<br>
                            you can find it on your <router-link :to="{ name: 'Account' }">account</router-link> page.
                        </p>
                        <img class="img-fluid" :src="selectedRoutine.keyImage" alt="selectedRoutine name">
                        <p class="text-center name-text italiana  pt-3 m-0 pb-0">{{ selectedRoutine.name }}</p>
                    </div>
                </section>
                <section class="row italiana text-white px-4">
                    <div class="col-12">
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="text-mint ">{{ (selectedRoutine.playTime/60).toFixed(1) }} Min | Move Count {{ selectedRoutine.moveCount
                            }}</span>
                            <span>
                                <FavoriteUnfavoriteMove :id="selectedRoutine.id" :moveOrRoutine="'routine'" />
                            </span>
                        </div>
                        <div class=" ">
                            <p class="text-mint d-flex justify-content-between ">{{ selectedRoutine.level }}
                                <span></span>
                            </p>
                            <span class="text-mint pe-3 m-2" v-for="focus in selectedRoutine.target.name" :key="focus"> {{ focus
                            }}</span>
                        </div>
                        <div class="mb-3">
                            <p class=" m-0 mt-3 ">Description: </p>
                            <li v-for="description in selectedRoutine.descriptionArray" :key="description">{{ description }}</li>
                        </div>
                        <div class="">
                            <p class="text-mint"> Created by {{ selectedRoutine.creator.name }}</p>
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
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed } from 'vue';
import Pop from "../utils/Pop";
import FavoriteUnfavoriteMove from "./FavoriteUnfavoriteMove.vue";
import { routinesService } from "../services/RoutinesService";
import { Modal } from "bootstrap";

export default {
    setup() {
        return {
            account: computed(() => AppState.account),
            routines: computed(() => AppState.routines),
            selectedRoutine: computed(() => AppState.selectedRoutine),

            async archiveRoutine() {
                try {
                    const yes = await Pop.confirm('Archive the routine?',
                        'The routine will not be deleted, but you can only restore the routine from the account page.')
                    if (!yes) { return }
                    await routinesService.archiveRoutine();
                    Pop.success('The routine has been archived. You can restore it via the account page.')
                }
                catch (error) { Pop.error(error) }
            },

            async unarchiveRoutine() {
                try {
                    const yes = await Pop.confirm('Restore the routine from the archive?', '');
                    if (!yes) { return }
                    await routinesService.unarchiveRoutine();
                    Pop.success('The routine has been unarchived. Enjoy!');
                }
                catch (error) { Pop.error(error) }
            },
            
            async deleteRoutine() {
                try {
                    const yes = await Pop.confirm('Delete the entire routine?');
                    if (!yes) { return }
                    await routinesService.deleteRoutine();
                    Pop.success('The routine has been permanently deleted.');
                    Modal.getOrCreateInstance('#routine-modal').hide();
                }
                catch (error) { Pop.error(error) }
            }
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

.z3{
    z-index: 3;
}
.archivedNote{
    top: 0;
    left: 0;
    width: 100%;
    height: 80%;
    backdrop-filter: blur(5px);
    color: black;
    background-color: #f0f0f042;
}

.hidden{
    right: 0;
    width: 16rem;
    opacity: 0;
    transition: .25s;
}

.onHover{
    opacity: .5;
    transition: .25s;
}

.onHover:hover,.showHidden:hover+.hidden{
    opacity: 1;
}
</style>