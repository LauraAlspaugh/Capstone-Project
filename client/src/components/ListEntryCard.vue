<template>
  <div v-if="listEntries.length > 0">
    <section v-for="listEntry in listEntries" :key="listEntry.id"
      class="d-flex align-items-center rounded shadow my-1 p-1 showHidden">
      <span class="d-flex align-items-center me-2" v-if="!editRoutine">

        <i class="fs-4 me-1 hidden timer-color mdi mdi-plus selectable darken-20 rounded hidden" @click="addToEnd(listEntry.moveId)"
          type="button" title="Add a copy to the end"></i>

        <i class="fs-4 px-1 timer-color mdi mdi-triangle selectable darken-20 rounded" v-if="listEntry.position != 1"
          @click="changePosition(listEntry.id, (listEntry.position - 1))" type="button" title="Move entry up"></i>
        <i class="fs-4 px-1 invisible mdi mdi-triangle" v-else></i>

        <i class="fs-4 px-1 timer-color mdi mdi-triangle-down selectable darken-20 rounded"
          v-if="listEntry.position != listEntries.length" type="button" title="Move entry down" 
          @click="changePosition(listEntry.id, (listEntry.position + 1))" ></i>
        <i class="fs-4 px-1 invisible mdi mdi-triangle-down" v-else></i>

      </span>

      <span v-if="listEntry?.move?.imgUrl" class="d-flex align-items-center me-auto">
        <p class="mb-0 me-2 border rounded px-1">
          {{ listEntry.position < 10 ? '&nbsp;' + listEntry.position + '&nbsp;' : listEntry.position }} 
        </p>
        <img :src="listEntry.move.imgUrl" :alt="listEntry.move.englishName" class="img-fluid px-1 thumbnail">
        <p class="mb-0 fs-4">{{ listEntry.move.englishName || listEntry.name }}</p>
      </span>

      <span class="d-flex align-items-center">
        <p class="mb-0 me-2 fs-5">{{ listEntry.duration }} sec</p>
        <input v-if="listEntry.edit" v-model="listEntry.duration" :placeholder="listEntry.move.defaultTime" type="number"
          class="w-25">
      </span>

      <!-- <span class="d-flex align-items-center" v-if="editRoutine">
        <i v-if="keyImage == listEntry.move.imgUrl" class="fs-3 mdi mdi-star"></i>
        <i v-else class="fs-3 mdi mdi-star-outline hidden" type="button" @click="setKeyImage(listEntry.move.imgUrl)"></i>
      </span> -->
    </section>
  </div>
</template>


<script>
import { computed } from "vue";
import { AppState } from "../AppState.js";
// import { Move } from "../models/Move";
import Pop from "../utils/Pop";
import {listEntriesService} from "../services/ListEntriesService.js"

export default {
  props: {
    // listEntries: { move: { type: Move } },
    keyImage: { type: String }
  },

  setup() {

    return {
      listEntries: computed(() => AppState.listEntries),
      editRoutine: computed(() => AppState.editRoutine),

      setKeyImage(moveImgUrl) {
        AppState.activeRoutine.keyImage = moveImgUrl;
      },

      async changePosition(listEntryId,newPosition) {
        try {
          await listEntriesService.changePosition(listEntryId, newPosition);
        } catch (error) {
          Pop.error(error)
        }
      },
      

      async addToEnd(moveId) {
        try {
          const routineId = AppState.activeRoutine.id;
          await listEntriesService.createListEntry(routineId, moveId);
        } catch (error) {
          Pop.error(error)
        }
      },


    }
  }
};
</script>

<style lang="scss" scoped>
.bgColor {
  background-color: #6B8373;
}

.thumbnail {
  height: 3rem;
}

.timer-color {
  color: #85a79d;
}

.hidden {
  opacity: .05;
  transition: .25s;
}

.hidden:hover {
  opacity: 1;
}

.showHidden:hover+.hidden {
  opacity: 1;
}
</style>