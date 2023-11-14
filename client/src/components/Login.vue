<template>
  <span class="navbar-text">

    <button class="btn selectable text-black lighten-30 text-uppercase my-2 my-lg-0" @click="login"
      v-if="!user.isAuthenticated">
      Login
    </button>

    <div v-else>
      <div class="dropdown my-2 my-lg-0">

        <section class="d-flex justify-content-center">
          <div type="button" class="border-0 selectable no-select rounded p-1" data-bs-toggle="dropdown"
          aria-expanded="false">
            <span class="d-flex align-items-center">
              <div v-if="account.picture || user.picture">
                <img :src="account.picture || user.picture" alt="account photo" class="rounded picture" />
              </div>
              <p class="mb-0 ms-3 d-inline d-lg-none">{{ account.name }}</p>
            </span>
          </div>
        
          <div class="dropdown-menu dropdown-menu-lg-end dropdown-menu-end p-0" aria-labelledby="authDropdown">
            <div class="list-group">
              
              <router-link :to="{ name: 'Account' }">
                <div class="list-group-item dropdown-item list-group-item-action">
                  Manage Account
                </div>
              </router-link>

              <div class="list-group-item dropdown-item list-group-item-action text-danger selectable" @click="logout">
                <i class="mdi mdi-logout"></i>
                logout
              </div>
              
            </div>
          </div>
        </section>

      </div>
    </div>

  </span>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.picture {
  height: 4rem;
}
</style>
