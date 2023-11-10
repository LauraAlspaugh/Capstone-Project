<template>
<div class="container-fluid">
    <section class="row justify-content-around">
      <div class="col-12 col-md-8 py-5">
        <!-- ROUTINE COMPONENT  -->
        <RoutineEditor />
      </div>
      <div v-if="settings.editRoutine" class="col-12 col-md-3 py-5">
        <p class="mb-0 fs-1">Pose Search</p>
        <!-- MOVE SEARCH/FILTER COMPONENT -->
      </div>
    </section>
  </div>


</template>


<script>
import { AppState } from '../AppState';
import { computed, onMounted } from 'vue';
import Pop from "../utils/Pop";
import RoutineEditor from "../components/RoutineEditor.vue";

export default {
  setup() {

    onMounted(() => {
    })

    return {
      settings:computed(()=>AppState.settings),
      
    }
  },
  components: { RoutineEditor }

};
</script>


<style lang="scss" scoped>
</style>