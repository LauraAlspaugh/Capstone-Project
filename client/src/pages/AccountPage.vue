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
    <section class="row" v-if="myRoutines.length > 0">
      <div class="col-12 p-3">
        <p class="fs-1 mb-0">My Routines</p>
      </div>
      <div v-for="routine in myRoutines" :key="routine.id" class="col-12 col-md-6 col-lg-4 p-3">
        <RoutineCatalogCard :routineProp="routine" />
      </div>

    </section>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import EditAccountForm from "../components/EditAccountForm.vue";
import UserCard from "../components/UserCard.vue";
import { routinesService } from "../services/RoutinesService";
import Pop from "../utils/Pop";
import RoutineCatalogCard from "../components/RoutineCatalogCard.vue";

export default {
  setup() {

    async function _getMyRoutines() {
      try {
        await routinesService.getMyRoutines();
      }
      catch (error) { Pop.error(error) }
    }

    onMounted(() => {
      _getMyRoutines();
    })

    return {
      account: computed(() => AppState.account),
      myRoutines: computed(() => AppState.myRoutines),


    }
  },
  components: { EditAccountForm, UserCard, RoutineCatalogCard }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
