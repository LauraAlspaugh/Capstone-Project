<template>
  <div class="">
    <button type="button" class="btn-close btn-close p-3" data-bs-dismiss="modal" aria-label="Close"></button>
    <img class="img-fluid" :src="selectedPic.img" :alt="selectedPic.alt">

  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed } from 'vue';

export default {
  setup() {
    return {

      selectedPic: computed(() => AppState.selectedPic)
    }
  }
};
</script>


<style lang="scss" scoped></style>