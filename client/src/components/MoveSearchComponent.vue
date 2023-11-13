<template>
    <section class="row">
        <div class="col-12">
            <p class="fs-1 pr-4 m-0 fw-bold italiana">Pose Search</p>
        </div>
    </section>
    <section class="row py-2 image-border align-items-center filter-height">
        <div class="col-12 justify-content-evenly align-items-center d-flex">
            <div v-if="!wantsToSeeFavorites" class="dropdown me-sm-3">
                <button class="btn white-gb dropdown-toggle italiana fw-bold" type="button" id="dropdownMenu2"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    level
                </button>
                <ul class="dropdown-menu bg-white" aria-labelledby="dropdownMenu2">
                    <li class="ps-3" v-for="level in levels" :key="level">
                        <div class="form-check">
                            <label class="form-check-label italiana" for="flexRadioDefault">
                                <input v-model="editableLevel" class="form-check-input" type="radio" name="radio"
                                    @change="changeLevel(level)" :class="{ 'selectedLevel': level == selectedLevel }"
                                    value="${editableLevel}" id="flexRadioDefault">
                                {{ level }}
                            </label>
                        </div>
                    </li>
                </ul>
            </div>
            <div v-else></div>
            <div v-if="!wantsPoses && wantsToSeeFavorites == false">
                <p @click="swapShowFavoritesAndShowAll()" role="button" type="button" class="fs-2 mx-0 my-1"><i
                        class="mdi mdi-heart"></i></p>
            </div>
            <div v-else>
                <p @click="swapShowFavoritesAndShowAll()" role="button" type="button"
                    class="btn white-gb italiana mx-0 my-1">all
                    moves</p>
            </div>
            <div v-if="!wantsToSeeFavorites" class="dropdown ms-sm-3">
                <button class="btn white-gb dropdown-toggle italiana fw-bold" type="button" id="dropdownMenu2"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    focus
                </button>
                <ul class="dropdown-menu bg-white" aria-labelledby="dropdownMenu2">
                    <li class="ps-3" v-for="focus in focuses" :key="focus">
                        <div class="form-check">
                            <input v-model="editableFocus" class="form-check-input" type="checkbox" :value="focus"
                                id="flexCheckDefault" @change="uncheckIfAll(focus)">
                            <label class="form-check-label italiana" for="flexCheckDefault">
                                {{ focus }}
                            </label>
                        </div>
                    </li>
                </ul>
            </div>
            <div v-else></div>
        </div>
    </section>
    <section v-if="moves.length > 0" class="row moves-list">
        <div v-if="!wantsToSeeFavorites" class="col-12 p-0">
            <div v-for="move in moves" :key="move.id" class="">
                <MoveBasicCard :moveBasicProp="move" />
            </div>
        </div>
        <div v-else class="col-12 p-0">
            <div v-for="move in myFavoriteMoves" :key="move.id" class="">
                <MoveBasicCard :moveBasicProp="move" />
            </div>
        </div>
    </section>
</template>


<script>
import { computed, onMounted, ref } from 'vue';
import { AppState } from '../AppState';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import MoveBasicCard from './MoveBasicCard.vue';
import { movesService } from '../services/MovesService.js';
import { Move } from "../models/Move.js";

export default {

    setup() {

        onMounted(() => {
            getMoves()
        })

        const levels = ["all", "beginner", "intermediate", "expert"];
        const focuses = ["all", "arms", "chest", "core", "neck", "glutes", "hamstrings", "hips", "inner thighs", "lower Back", "quads", "shoulder", "upper back"];

        let editableLevel = ref("");
        let editableFocus = ref([]);
        let selectedLevel = ref("");
        let wantsToSeeFavorites = ref(false);

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
            levels,
            focuses,
            editableLevel,
            editableFocus,
            selectedLevel,
            wantsToSeeFavorites,

            moves: computed(() => {
                //if level is anything but "all", filter it by level
                if (editableLevel.value && editableLevel.value != "all") {
                    let movesByLevel = AppState.moves.filter(
                        (move) => move.level == editableLevel.value.toLocaleLowerCase()
                    );
                    //and if focus is anything but "all", filter it even more by bodypart
                    if (editableFocus.value && !editableFocus.value.includes("all")) {
                        return movesByLevel.filter(move =>
                            editableFocus.value.every(part => move.bodyPart.includes(part)))
                    } else { //if level is anything but "all" and focus is "all" or unselected, just return what was filtered by level
                        return movesByLevel
                    }
                }
                //else if level is "all" or unselected, no filters for level
                else if (!editableLevel.value || editableLevel.value == "all") {
                    //if focus is anything but "all", filter it just by body part
                    if (editableFocus.value && !editableFocus.value.includes("all")) {
                        return AppState.moves.filter(move =>
                            editableFocus.value.every(part => move.bodyPart.includes(part)))
                    }
                    //if level is "all" or unselected and focus is "all" or unselected, return moves from the AppState(no filter)
                    else {
                        return AppState.moves;
                    }
                } else {
                    return AppState.moves;
                }
            }),

            myFavoriteMoves: computed(() => {
                let filteredMoves = []
                AppState.myFavoriteMoves.forEach((move) => {
                    filteredMoves.push(new Move(move.move))
                })
                return filteredMoves
            }),

            swapShowFavoritesAndShowAll() {
                wantsToSeeFavorites.value = !wantsToSeeFavorites.value;
            },

            changeLevel(level) {
                editableLevel.value = level;
                selectedLevel.value = level;
            },

            uncheckIfAll(selection) {
                if (selection == "all") {
                    this.editableFocus = [selection]
                    this.focuses.forEach((focus) => {
                        if (focus != "all" && this.editableFocus.indexOf(focus) != -1) {
                            this.editableFocus.splice(this.editableFocus.indexOf(focus))
                        }
                    })
                } else {
                    this.editableFocus.forEach((focus) => {
                        if (focus == "all" && this.editableFocus.indexOf(focus) != -1) {
                            this.editableFocus.splice(this.editableFocus.indexOf(focus), 1)
                        }
                    })
                }
            },

        };
    },
    components: { MoveBasicCard }
};
</script>


<style lang="scss" scoped>
.selectedLevel {
    background-color: #0F2D24;
}

.image-border {
    border: 2px solid #D7DBDB;
    background-color: #e3e0de5b;
}

.filter-height {
    height: 4.8rem;
}

.moves-list {
    overflow-y: auto;
    max-height: 40rem;
}
</style>