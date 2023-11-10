<template>
<div class="container-fluid">
    <section v-if="activeRoutine" class="row justify-content-center">
      <div class="col-12 col-md-8 py-5 pe-5">
        <!-- ROUTINE COMPONENT  -->
        <RoutineEditor />
      </div>
      <div v-if="settings.editRoutine" class="col-12 col-md-3 pt-2 pb-5 searchBox">
        <!-- MOVE SEARCH/FILTER COMPONENT -->
        <MoveSearchComponent />
      </div>
    </section>
    <section v-else class="row justify-content-center">
      <div class="col-4 mt-5">
        <p class="p-2 mb-4 fs-3 fw-bold text-center rounded bgColor">My Favorite Routines</p>
        <!-- ROUTINE FAVORITES LIST -->
        <RoutineFavs />
      </div>
    </section>
  </div>


</template>


<script>
import { AppState } from '../AppState';
import { computed, onMounted } from 'vue';
import RoutineEditor from "../components/RoutineEditor.vue";
import RoutineFavs from "../components/RoutineFavs.vue";
import MoveSearchComponent from "../components/MoveSearchComponent.vue";

export default {
  setup() {

    onMounted(() => {
    })

    return {
      settings:computed(()=>AppState.settings),
      activeRoutine:computed(()=>AppState.activeRoutine),
      
    }
  },
  components: { RoutineEditor, RoutineFavs, MoveSearchComponent }

};
</script>


<style lang="scss" scoped>

.bgColor{
  background-color: #6B8373b9;
}
.searchBox{
  height: 69dvh;
}
</style>