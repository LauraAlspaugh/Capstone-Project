<template>
  <div class="container-fluid p-0 sticky-top">
    <section class="row py-2 mx-0 image-border align-items-center justify-content-center filter-height"
      :class="[route.name == 'RoutineDesigner' ? 'cream-bg ' : '']">
      <div class="col-12 justify-content-evenly align-items-center d-flex box p-0">
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
        <div>
          <div v-if="wantsToSeeFavorites == false">
            <p v-if="route.name == 'RoutineDesigner'" @click="swapShowFavoritesAndShowAll()" role="button" type="button"
              class="fs-2 mx-0 my-1"><i class="mdi mdi-heart"></i></p>
            <button v-else @click="swapShowFavoritesAndShowAll()" class="btn white-gb ms-1 me-1 ms-sm-3 me-sm-3 italiana"
              role="button" type="button">my favorites<i class="mdi mdi-heart"></i></button>
          </div>
          <div v-else>
            <p @click="swapShowFavoritesAndShowAll()" role="button" type="button" class="btn white-gb italiana mx-0 my-1">
              all
              moves</p>
          </div>
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
      </div>
    </section>
  </div>
  <div v-if="route.name == 'RoutineDesigner'" class="container-fluid p-0 m-0">
    <section v-if="moves.length > 0" class="row moves-list p-0 m-0">
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
  </div>
  <!-- SECTION catalog page -->
  <div v-else>
    <section v-if="wantsToSeeFavorites">
      <div v-for="move in myFavoriteMovesForCatalog" :key="move.id" class="col-12">
        <MoveCatalogCard :moveProp="move" />
      </div>
    </section>
    <section v-else class="row">
      <div v-if="route.name == 'RoutineDesigner'">
        <div v-for="move in moves" :key="move.id" class="col-12">
          <MoveCatalogCard :moveProp="move" />
        </div>
      </div>
      <div v-else>
        <div v-for="move in movesForCatalog" :key="move.id" class="col-12">
          <MoveCatalogCard :moveProp="move" />
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { movesService } from '../services/MovesService.js';
import { Move } from "../models/Move.js";

export default {

  setup() {

    onMounted(() => {
      if (!AppState.moves.length > 0) {
        getMoves();
      }
      logger.log("Route!", route.name)
    })

    const route = useRoute()
    const levels = ["all", "beginner", "intermediate", "advanced"];
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
      route,

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

      movesForCatalog: computed(() => {
        let filteredMoves = []
        AppState.moves.forEach((move) => {
          if (move.englishName != "Interval") {
            filteredMoves.push(move)
          }
        })
        //if level is anything but "all", filter it by level
        if (editableLevel.value && editableLevel.value != "all") {
          let movesByLevel = filteredMoves.filter(
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
            return filteredMoves.filter(move =>
              editableFocus.value.every(part => move.bodyPart.includes(part)))
          }
          //if level is "all" or unselected and focus is "all" or unselected, return moves from the AppState(no filter)
          else {
            return filteredMoves;
          }
        } else {
          return filteredMoves;
        }
      }),

      myFavoriteMoves: computed(() => {
        let filteredMoves = []
        AppState.myFavoriteMoves.forEach((move) => {
          filteredMoves.push(new Move(move.move))
        })
        return filteredMoves
      }),

      myFavoriteMovesForCatalog: computed(() => {
        let filteredMoves = []
        AppState.myFavoriteMoves.forEach((move) => {
          if (move.move.englishName != "Interval") {
            filteredMoves.push(new Move(move.move))
          }
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
};
</script>


<style lang="scss" scoped>
.cream-bg {
  border: 1px solid #C4D0CC;
  background-color: #e0dddbd5;
  backdrop-filter: blur(3px)
}

.selectedLevel {
  background-color: #0F2D24;
}

.box {
  width: 50vw;
}
</style>