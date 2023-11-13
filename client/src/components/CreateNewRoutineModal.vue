<template>
  <div class="modal modal-lg fade" id="createNewRoutineModal" data-bs-backdrop="static" data-bs-keyboard="false"
    tabindex="-1" aria-labelledby="createNewRoutineModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="createNewRoutineModalLabel">Create New Routine</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createRoutine()">
            <span class="d-flex mb-3">
              <div class="mx-3 w-50">
                <label for="name">Routine Name</label>
                <input v-model="eventForm.name" type="text" name="name" id="name" class="form-control" required>
              </div>
              <div class="mx-3 w-50">
                <label for="name">Cover Image</label>
                <input v-model="routineForm.imgUrl" type="text" name="imgUrl" id="imgUrl" class="form-control" required
                  placeholder="(URL)">
              </div>
            </span>
            <div class="mx-3">
              <label for="name">Routine Description</label>
              <textarea v-model="routineForm.description" name="description" id="description" rows="6"
                class="form-control" required></textarea>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary me-3">Create New Routine</button>
            </div>
          </form>
          <hr>
          <div class="container-fluid rounded">
            <section class="row">
              <div class="col-12 coverImg rounded position-relative">
                <section class="row bgBlur rounded shadow px-3 py-4">
                  <div class="col-12 col-md-4">
                    <img v-if="routineForm.coverImg" :src="routineForm.coverImg" :alt="routineForm.name"
                      class="rounded shadow eventImg">
                  </div>
                  <div class="col-12 col-md-8 ps-2 pt-2">
                    <section class="">
                      <span class="d-flex justify-content-between align-items-end">
                        <span class="d-block">
                          <p class="mb-0 fs-3 fw-bold">{{ routineForm.name }}</p>
                        </span>
                      </span>
                      <p class="mt-3 mb-4">{{ routineForm.description }}</p>

                    </section>
                  </div>
                </section>
              </div>
            </section>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>


<script>
import { useRouter } from "vue-router";
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { routinesService } from "../services/RoutinesService";
import { Modal } from "bootstrap";
export default {
  setup() {
    const router = useRouter()
    const routineForm = ref({
      name: 'Routine Name',
      description: 'Description of this routine',
      // imgUrl: 'img URL'
    })
    return {
      routineForm,
      imgUrl: computed(() => `url(${routineForm.value.imgUrl})`),
      async createRoutine() {
        try {
          const newRoutine = await routinesService.createRoutine(routineForm.value)
          Modal.getOrCreateInstance('#createNewEventModal').hide()
          router.push({ name: 'Routine Name', params: { routineId: newRoutine.id } })
        } catch (error) {
          logger.error(error)
          Pop.error(error)
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped></style>