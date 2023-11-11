<template>
  <section v-for="listEntry in listEntries" :key="listEntry.id" class="d-flex align-items-center rounded shadow my-1 p-1">
    <span class="d-flex align-items-center me-2">
      <i class="fs-4 me-1 hidden timer-color mdi mdi-plus selectable darken-20 rounded" 
        @click="addToEnd()" type="button" title="Add a copy to the end"></i>
      <i class="fs-4 px-1 timer-color mdi mdi-triangle selectable darken-20 rounded" v-if="listEntry.position != 1"
        @click="moveUp()" type="button" title="Move entry up"></i>
        <i class="fs-4 px-1 invisible mdi mdi-triangle-down" v-else></i>
      <i class="fs-4 px-1 timer-color mdi mdi-triangle-down selectable darken-20 rounded" v-if="listEntry.position != listEntries.length"
        @click="moveDown()" type="button" title="Move entry down"></i>
      <i class="fs-4 px-1 invisible mdi mdi-triangle-down" v-else></i>
    </span>
    <span class="d-flex align-items-center me-auto">
      <p class="mb-0 me-2 border rounded px-1">
        {{ listEntry.position < 10 ? '&nbsp;' + listEntry.position + '&nbsp;'  : listEntry.position }}
      </p>
      <img :src="listEntry.move.imgUrl" :alt="listEntry.move.englishName" class="img-fluid px-1 thumbnail">
      <p class="mb-0 fs-4">{{ listEntry.move.englishName || listEntry.name }}</p>
    </span>
    <span class="d-flex align-items-center">
      <p class="mb-0 me-2 fs-5">{{ listEntry.duration }} sec</p>
      <input v-if="listEntry.edit" v-model="listEntry.duration" :placeholder="listEntry.move.defaultTime" type="number" class="w-25" >
      <i v-if="true" class="fs-3 mdi mdi-star"></i>
      <i v-else class="fs-3 mdi mdi-star-outline" :class="true ? 'invisible' : '' "></i>
    </span>
  </section>
</template>


<script>
import { Move } from "../models/Move";

export default {
  props: { listEntries: { move: { type: Move } } },
  
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

.thumbnail{
  height: 3rem;
}
.timer-color{
  color: #85a79d;
}
</style>