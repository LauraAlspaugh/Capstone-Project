<template>
  <nav class="navbar navbar-expand-lg navbar-grey px-3 ">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <img class="logo-nav" alt="logo" src="../assets/img/RootedFlow Logo-only.png" />
      </div>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li>
          <router-link :to="{ name: 'RoutineDesigner' }" class="fs-5 me-1 btn text-black lighten-30 selectable text-uppercase">
            Routine Designer
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Catalog' }" class="fs-5 mx-1 btn text-black lighten-30 selectable text-uppercase">
            Catalog
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'About' }" class="fs-5 ms-1 btn text-black lighten-30 selectable text-uppercase">
            About
          </router-link>
        </li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
</template>

<script>
import Login from './Login.vue';
export default {
  setup() {
    return {}
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-dark);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.navbar-grey {
  background-color: #E0DDDB;
  /* height: 60px; */
}

.logo-nav {
  height: 155px;
}

nav {
  height: 133px;
}

@media screen and (min-width: 768px) {
  nav {
    height: 133px;
  }


}
</style>
