<template>
  <header class="sticky-top">
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>

  <!-- Modal Body -->
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
        <div class="modal-body p-0" v-if="activeRoutine">
          <RoutineDetailCard />
        </div>
      </div>

    </div>
  </div>
</template>



<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import MoveDetailCard from "./components/MoveDetailCard.vue"
import RoutineDetailCard from "./components/RoutineDetailCard.vue"

export default {
  setup() {
    return {
      appState: computed(() => AppState),
      activeMove: computed(() => AppState.activeMove),
      activeRoutine: computed(() => AppState.activeRoutine)
    }
  },
  components: { Navbar, MoveDetailCard, RoutineDetailCard }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}

body {
  background-image: url(./assets/img/Eucalyptus-bg.png);
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 60% -20%;
  background-color: white;
}



footer {
  display: grid;
  place-content: center;
  height: 32px;
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
  /* From https://css.glass */
  background: rgba(255, 255, 255, 0.38);
  border-radius: 8px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5.6px);
  -webkit-backdrop-filter: blur(5.6px);
}
</style>
