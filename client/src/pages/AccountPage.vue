<template>
  <div class="container-fluid">
    <section class="row justify-content-evenly align-items-center pt-5">

      <div class="col-12 col-md-6 mt-5 mt-md-0 text-center text-light d-flex justify-content-center">
        <UserCard :profile="account" />
      </div>

      <div v-if="account.id" class="col-12 col-lg-6 col-xxl-5 py-5 pe-xl-5">
        <EditAccountForm />
      </div>
    </section>
  </div>
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState';
import EditAccountForm from "../components/EditAccountForm.vue";
import UserCard from "../components/UserCard.vue";

export default {
  setup() {
    return {
      account: computed(() => AppState.account),

    }
  },
  components: { EditAccountForm, UserCard }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
