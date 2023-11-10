<template>
    <section class="row">
        <div class="col-12">
            <p class="fs-1 pr-4 m-0 italiana">Pose Search</p>
        </div>
    </section>
    <section class="row py-2 image-border">
        <div class="col-12 justify-content-around align-items-center d-flex ">
            <div class="dropdown me-sm-3">
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
            <!-- <p class="fs-4 m-0 ">Level</p> -->
            <!-- <p class="text-dark">{{ moves.englishName }}</p> -->
            <p class="fs-2 m-0"><i class="mdi mdi-heart"></i></p>
            <!-- <p class="fs-4 justify-content-end m-0">Focus</p> -->
            <div class="dropdown ms-sm-3">
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
        </div>
    </section>
    <section v-if="moves.length > 0" class="row moves-list">
        <div class="col-12 p-0">
            <div v-for="move in moves" :key="move.id" class="">
                <MoveBasicCard :moveBasicProp="move" />
            </div>
        </div>
    </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, onMounted, ref } from 'vue';
import MoveBasicCard from './MoveBasicCard.vue';
import { movesService } from '../services/MovesService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';



export default {
    // props: { moveSearchProp: { type: Move, required: true } },
    setup() {
        onMounted(() => {
            getMoves()
        })
        const levels = ["all", "beginner", "intermediate", "expert"];
        const focuses = ["all", "arms", "chest", "core", "neck", "glutes", "hamstrings", "hips", "inner thighs", "lower Back", "quads", "shoulder", "upper back"];
        let editableLevel = ref("");
        let editableFocus = ref([]);
        let selectedLevel = ref("");
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


            changeLevel(level) {
                editableLevel.value = level;
                selectedLevel.value = level
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

.moves-list {
    overflow-y: scroll;
    height: 100%;
}
</style>