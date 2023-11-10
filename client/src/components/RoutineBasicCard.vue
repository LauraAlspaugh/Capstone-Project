<template>
  <section v-for="move in routine" :key="move.id" class="d-flex align-items-center">
    <span class="d-flex">
      <i class="fs-1 text-primary mdi mdi-plus-thick"></i>
      <i class="fs-1 text-primary mdi mdi-triangle"></i>
      <i class="fs-1 text-primary mdi mdi-triangle-down"></i>
    </span>
    <span class="d-flex me-auto">
      <img src="" alt="" class="img-fluid thumbnail">
      <p class="mb-0 fs-5">{{ move.name }}</p>
    </span>
    <span class="d-flex">
      <p class="mb-0 fs-4">{{ move.time }} sec</p>
      <i class="mdi mdi-star-outline"></i>
      <i class="mdi mdi-star"></i>
    </span>
  </section>
</template>


<script>
import { Move } from "../models/Move";

export default {
  props: { listEntry: { move: { type: Move} } },
  
  setup() {
    return {

    }
  }
};
</script>

<style lang="scss" scoped>
.bgColor{
  background-color: #6B8373;
}
</style>