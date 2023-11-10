<template>
  <section v-for="move in routine" :key="move.id" class="d-flex align-items-center">
    <span class="d-flex">
      <i class="fs-1 text-primary mdi mdi-plus-thick"></i>
      <i class="fs-1 text-primary mdi mdi-triangle"></i>
      <i class="fs-1 text-primary mdi mdi-triangle-down"></i>
    </span>
    <span class="d-flex me-auto">
      <img src="" alt="" class="img-fluid thumbnail">
      <p class="mb-0">{{ move.name }}</p>
    </span>
    <span class="d-flex">
      <p class="mb-0">{{ move.time }} sec</p>
      <i class="mdi mdi-star-outline"></i>
      <i class="mdi mdi-star"></i>
    </span>
  </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, onMounted } from 'vue';
import { Routine } from "../models/Routine";

export default {
  props: { routine: { type: Routine } },
  
  setup(props) {
    return {

    }
  }
};
</script>


<style lang="scss" scoped></style>