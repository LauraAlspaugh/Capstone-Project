<template>
  <form @submit.prevent="createRoutine()">
    <span class="d-flex mb-3">
      <div class="mx-3 w-50">
        <label for="name">Routine Name</label>
        <input v-model="routineForm.name" type="text" name="name" id="name" class="form-control" required>
      </div>
      <div class="mx-3 w-50">
        <label for="name">Cover Image</label>
        <input v-model="routineForm.keyImage" type="text" name="keyImage" id="keyImage" class="form-control" required
          placeholder="(URL)">
      </div>
    </span>
    <div class="mx-3">
      <label for="name">Routine Description</label>
      <textarea v-model="routineForm.shortDescription" name="description" id="description" rows="6"
        class="form-control" required></textarea>
    </div>
    <div class="modal-footer">
      <button type="submit" class="btn btn-primary me-3">Create New Routine</button>
    </div>
  </form>
  <hr>
  <div class="container-fluid">
    <section class="row justify-content-center">
      <div class="col-9 col-md-10 col-lg-6 noClicky">
        <RoutineCatalogCard :routineProp="routineForm" />
      </div>
    </section>
  </div>
</template>


<script>
import { computed, ref } from 'vue';
import { useRouter } from "vue-router";
import { Modal } from "bootstrap";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { routinesService } from "../services/RoutinesService";
import RoutineCatalogCard from "./RoutineCatalogCard.vue";
import { AppState } from "../AppState";

export default {
    setup() {
        const router = useRouter();
        const routineForm = ref({
          name: 'Routine Name',
          // description: 'Description of this routine', // defined upon creation
          // keyImage: 'img URL',
          playTime: 0,
          level: '',
          shortDescription: 'Description of this routine', // used for drawing through prop
          creator: {name:AppState.account?.name}
        });
        return {
            routineForm,
            keyImage: computed(() => `url(${routineForm.value.keyImage})`),

            async createRoutine() {
              try {
                  routineForm.value.description = routineForm.value.shortDescription
                  routineForm.value.shortDescription = routineForm.value.shortDescription.slice(0, 50)
                  routineForm.value.level = 'beginner'
                  await routinesService.createRoutine(routineForm.value);
                  Modal.getOrCreateInstance('#createNewRoutineModal').hide();
                  router.push({ name: 'RoutineDesigner' });
                }
                catch (error) {
                    logger.error(error);
                    Pop.error(error);
                }
            }
        };
    },
    components: { RoutineCatalogCard }
};
</script>


<style lang="scss" scoped>
.keyImage{
  object-fit: cover;
}

.noClicky{
pointer-events: none;
user-select: none;
}
</style>