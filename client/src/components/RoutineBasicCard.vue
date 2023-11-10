<template>
  <section v-for="listEntry in listEntries" :key="listEntry.id" class="d-flex align-items-center rounded shadow my-1 p-1">
    <span class="d-flex align-items-center me-3">
      <i class="fs-4 pe-2 hidden text-primary mdi mdi-plus" 
        @click="addToEnd()" type="button" title="Add a copy to the end"></i>
      <i class="fs-3 px-1 text-primary mdi mdi-triangle" v-if="listEntry.position != 1"
        @click="moveUp()" type="button" title="Move entry up"></i>
        <i class="fs-3 px-1 invisible mdi mdi-triangle-down" v-else></i>
      <i class="fs-3 px-1 text-primary mdi mdi-triangle-down" v-if="listEntry.position != listEntries.length-1"
        @click="moveDown()" type="button" title="Move entry down"></i>
      <i class="fs-3 px-1 invisible mdi mdi-triangle-down" v-else></i>
    </span>
    <span class="d-flex align-items-center me-auto">
      <p class="mb-0 me-3 border rounded px-1">
        {{ listEntry.position }}
      </p>
      <img src="" alt="" class="img-fluid thumbnail">
      <p class="mb-0 fs-4">{{ listEntry.move.englishName || listEntry.name  }}</p>
    </span>
    <span class="d-flex align-items-center">
      <p class="mb-0 me-2 fs-5">{{ listEntry.duration }} sec</p>
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