<template>
  <section v-for="listEntry in listEntries" :key="listEntry.id" class="d-flex align-items-center rounded shadow my-1 px-2 py-1">
    <span class="d-flex align-items-center me-3">
      <i class="fs-4 text-primary mdi mdi-plus-thick"></i>
      <i class="fs-3 text-primary mdi mdi-triangle"></i>
      <i class="fs-3 text-primary mdi mdi-triangle-down"></i>
    </span>
    <span class="d-flex me-auto">
      <img src="" alt="" class="img-fluid thumbnail">
      <p class="mb-0 fs-4">{{ listEntry.name || listEntry.move.englishName }}</p>
    </span>
    <span class="d-flex align-items-center">
      <p class="mb-0 me-2 fs-5">{{ listEntry.time }} sec</p>
      <i class="fs-3 mdi mdi-star-outline"></i>
      <i class="fs-3 mdi mdi-star"></i>
    </span>
  </section>
</template>


<script>
import { Move } from "../models/Move";

export default {
  props: { listEntries: { move: { type: Move} } },
  
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