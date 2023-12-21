<template>
  <div v-if="listEntries.length > 0">
    <section v-for="listEntry in listEntries" :key="listEntry.id"
      class="d-flex align-items-center rounded shadow my-1 p-1 showHidden white-gb">

      <span class="d-flex align-items-center" v-if="activeRoutine.edit && listEntry?.move?.imgUrl">

        <i class="fs-4 hidden timer-color mdi mdi-plus selectable darken-20 rounded hidden"
          @click="addToEnd(listEntry.moveId)" type="button" title="Add a copy to the end"></i>

        <i class="fs-4 px-1 timer-color mdi mdi-triangle selectable darken-20 rounded" v-if="listEntry.position != 1"
          @click="changePosition(listEntry.id, (listEntry.position - 1))" type="button" title="Move entry up"></i>
        <i class="fs-4 px-1 invisible mdi mdi-triangle" v-else></i>

        <i class="fs-4 px-1 timer-color mdi mdi-triangle-down selectable darken-20 rounded"
          v-if="listEntry.position != listEntries.length" type="button" title="Move entry down"
          @click="changePosition(listEntry.id, (listEntry.position + 1))"></i>
        <i class="fs-4 px-1 invisible mdi mdi-triangle-down" v-else></i>

      </span>

      <span v-if="listEntry?.move?.imgUrl" class="d-flex align-items-center">
        <input v-if="activeRoutine.edit && listEntry.editPosition" v-model="listEntry.position" type="number"
          class="form-control pos mx-2 p-0" @blur="saveEditPosition(listEntry)" :max="listEntries.length">
        <p v-else-if="activeRoutine.edit && !listEntry.enableEditPosition" type="button"
          class="mb-0 mx-2 border rounded pos px-1" @click="enableEditPosition(listEntry)">
          {{ listEntry.position }}
        </p>
        <p v-else class="mb-0 mx-2 border rounded pos px-1">
          {{ listEntry.position }}
        </p>
        <img :src="listEntry.move.imgUrl" :alt="listEntry.move.englishName || listEntry.name"
          class="img-fluid px-1 thumbnail" :class="listEntry.transition ? 'rounded-circle' : ''">
      </span>

      <p v-if="listEntry.position == 0" class="fs-4 mb-0 text-center">{{ listEntry.name }}</p>
      <p v-else class="fs-4 mb-0 me-auto">{{ listEntry.move.englishName || listEntry.name }}</p>

      <span v-if="listEntry?.move?.imgUrl" class="d-flex align-items-center me-1">
        <i v-if="listEntry.editDuration" class="fs-5 mx-1 mdi mdi-cancel" type="button"
          @click="cancelEditDuration(listEntry)"></i>
        <input v-if="activeRoutine.edit && listEntry.editDuration" v-model="listEntry.duration"
          :placeholder="listEntry.move.defaultTime" type="number" class="form-control duration fs-5 p-0 ps-1"
          @blur="saveEditDuration(listEntry)">
        <p v-else-if="activeRoutine.edit && !listEntry.editDuration" class="mb-0 me-2 fs-5 text-nowrap" type="button"
          @click="enableEditDuration(listEntry)">
          {{ listEntry.duration }} sec
        </p>
        <p v-else class="mb-0 me-2 fs-5 text-nowrap">
          {{ listEntry.duration }} sec
        </p>
      </span>

      <div class="position-relative">
        <i v-if="activeRoutine.edit" class="fs-5 text-danger closeBtn position-absolute mdi mdi-close-circle"
          type="button" @click="removeListEntry(listEntry)"></i>
      </div>
    </section>
  </div>
  <p v-if="listEntries.length == 0" class="fs-4 text-center rounded shadow my-1 py-1 px-5">
    <!-- intro message to draw in until a move is added -->
    Unlock/Add from the pose search list or browse the catalog to add moves
  </p>
</template>


<script>
import { computed } from "vue";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop";
import { listEntriesService } from "../services/ListEntriesService.js"

export default {
  props: {
    keyImage: { type: String }
  },

  setup() {

    return {
      listEntries: computed(() => AppState.listEntries),
      activeRoutine: computed(() => AppState.activeRoutine),

      setKeyImage(moveImgUrl) {
        AppState.activeRoutine.keyImage = moveImgUrl;
      },

      async changePosition(listEntryId, newPosition) {
        try {
          await listEntriesService.changePosition(listEntryId, newPosition);
        }
        catch (error) { Pop.error(error) }
      },

      async addToEnd(moveId) {
        try {
          const routineId = AppState.activeRoutine.id;
          await listEntriesService.createListEntry(routineId, moveId);
        }
        catch (error) { Pop.error(error) }
      },

      async removeListEntry(listEntryObj) {
        try {
          const yes = await Pop.confirm(`Remove '${listEntryObj.move.englishName}'?`);
          if (!yes) { return }
          await listEntriesService.removeListEntry(listEntryObj.id);
        }
        catch (error) { Pop.error(error) }
      },

      enableEditPosition(listEntryObj) {
        listEntryObj.editPosition = true;
        // TODO add auto-focus on field
      },

      saveEditPosition(listEntryObj) {
        listEntryObj.editPosition = false;
        this.changePosition(listEntryObj.id, listEntryObj.position);
      },

      enableEditDuration(listEntryObj) {
        listEntryObj.editDuration = true;
        // TODO add auto-focus on field
      },

      saveEditDuration(listEntryObj) {
        listEntryObj.editDuration = false;
        listEntriesService.changeDuration(listEntryObj);
      },

      cancelEditDuration(listEntryObj) {
        listEntryObj.editDuration = false;
      }


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
  width: 3.5rem;
}

.timer-color {
  color: #85a79d;
}

.pos {
  width: 1.8em;
  text-align: center;
}

.duration {
  width: 3rem;
  text-align: center;
}

.closeBtn {
  bottom: 0;
  right: -.36rem;
  opacity: .05;
  transition: .25s;
}

.closeBtn:hover {
  opacity: .8;
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

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>