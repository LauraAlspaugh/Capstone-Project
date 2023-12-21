<template>
  <header class="sticky-top">
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>

  <!-- Modals -->
  <!-- if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard -->
  <div class="modal fade" id="move-modal" tabindex="-1" data-bs-keyboard="false" role="dialog"
    aria-labelledby="modalTitleId" aria-hidden="true">
    <div class="modal-dialog modal-dialog-top modal-dialog-scrollable modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-body p-0" v-if="activeMove">
          <MoveDetailCard />
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="routine-modal" tabindex="-1" data-bs-keyboard="false" role="dialog"
    aria-labelledby="modalTitleId" aria-hidden="true">
    <div class="modal-dialog modal-dialog-top modal-dialog-scrollable modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-body p-0" v-if="selectedRoutine">
          <RoutineDetailCard />
        </div>
      </div>
    </div>
  </div>

  <div class="modal modal-lg fade" id="createOrEditRoutineModal" data-bs-backdrop="static" data-bs-keyboard="false"
    tabindex="-1" aria-labelledby="createOrEditRoutineModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 v-if="editRoutine" class="modal-title fs-5" id="createOrEditRoutineModalLabel">Update Routine Details</h1>
          <h1 v-else class="modal-title fs-5" id="createOrEditRoutineModalLabel">Create New Routine</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <CreateOrEditRoutineModal />
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="expand-modal" tabindex="-1" data-bs-keyboard="false" role="dialog"
    aria-labelledby="modalTitleId" aria-hidden="true">
    <div class="modal-dialog modal-dialog-top modal-dialog-scrollable modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-body p-0" v-if="selectedPic != null">
          <ExpandPicModal />
        </div>
      </div>
    </div>
  </div>

  <!-- Full screen modal -->
  <div class="modal modal-lg fade" id="openPlayer" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="openPlayerLabel" aria-hidden="true">
    <div class="modal-dialog modal-fullscreen">
      <div class="modal-content">
        <div class="modal-body" v-if="activeRoutine?.id && listEntries.length > 0">
          <RoutinePlayComponent />
        </div>
      </div>
    </div>
  </div>


  <!-- <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel"></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          ...
        </div>
      </div>
    </div>
  </div> -->
</template>



<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import MoveDetailCard from "./components/MoveDetailCard.vue"
import RoutineDetailCard from "./components/RoutineDetailCard.vue"
import CreateOrEditRoutineModal from "./components/CreateOrEditRoutineModal.vue"
import RoutinePlayComponent from './components/RoutinePlayComponent.vue'
import ExpandPicModal from "./components/ExpandPicModal.vue"

export default {
  setup() {
    return {
      appState: computed(() => AppState),
      activeMove: computed(() => AppState.activeMove),
      activeRoutine: computed(() => AppState.activeRoutine),
      editRoutine: computed(() => AppState.editRoutine),
      selectedRoutine: computed(() => AppState.selectedRoutine),
      listEntries: computed(() => AppState.listEntries),
      selectedPic: computed(() => AppState.selectedPic)
    }
  },
  components: { Navbar, MoveDetailCard, RoutineDetailCard, CreateOrEditRoutineModal, RoutinePlayComponent, ExpandPicModal }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 6rem);
}

body {
  background-image: url(./assets/img/Eucalyptus-bg.png);
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 60% -20%;
  background-color: white;
}

.mint-footer {
  background-color: #C4D0CC;
}

.italiana {
  font-family: 'Italiana', sans-serif;
}

.bodoni {
  font-family: 'Bodoni Moda', serif;
}

.philosopher {
  font-family: 'Philosopher', sans-serif;
}

.poretOne {
  font-family: 'Poiret One', sans-serif;
}

.white-gb {
  background: rgba(255, 255, 255, 0.38);
  border-radius: 8px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5.6px);
  -webkit-backdrop-filter: blur(5.6px);
}
</style>
