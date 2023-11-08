<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer class="mint-footer">

  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
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
</style>
