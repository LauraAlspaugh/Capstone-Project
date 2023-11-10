<template>
  <form class="container-fluid card bg-light p-3" @submit.prevent="updateProfile()">
    <section class="row justify-content-between">
      <div class="col-12">
        <p class="fs-3 text-center">Edit profile</p>
        <hr>
      </div>

      <div class="col-12 col-md-6">
        <section class="user">
          <div class="m-3 mt-0">
            <label for="name">Name</label>
            <input v-model="editable.name" class="ms-2 form-control" type="text" id="name" maxlength="96">
          </div>
          <div class="m-3 mt-0">
            <label for="picture">User Picture URL</label>
            <input v-model="editable.picture" class="ms-2 form-control" type="url" id="picture" maxlength="256">
          </div>
          <div class="m-3 mt-0">
            <label for="website">Website</label>
            <input v-model="editable.website" class="ms-2 form-control" type="text" id="website" maxlength="64">
          </div>
        </section>
      </div>
      <div class="col-12 col-md-6">
        <section class="socials">
          <div class="m-3 mt-0">
            <label for="github">Github</label>
            <input v-model="editable.github" class="ms-2 form-control" type="url" id="github" maxlength="64">
          </div>
          <div class="m-3 mt-0">
            <label for="linkedin">LinkedIn</label>
            <input v-model="editable.linkedin" class="ms-2 form-control" type="url" id="linkedin" maxlength="64">
          </div>
          <div class="m-3 mt-0">
            <label for="resume">Resume</label>
            <input v-model="editable.resume" class="ms-2 form-control" type="url" id="resume" maxlength="64">
          </div>
        </section>
      </div>
      <div class="col-12">
        <div class="mx-3 mt-0 mb-4">
          <label for="bio">Bio</label>
          <textarea v-model="editable.bio" class="ms-2 form-control" name="bio" id="bio" rows="4"
            maxlength="500"></textarea>
        </div>
        <hr>
      </div>

      <div class="d-flex justify-content-center pe-3">
        <button class="btn btn-success">Submit Changes</button>
      </div>
    </section>
  </form>
</template>


<script>
import { ref, watchEffect } from "vue";
import { AppState } from "../AppState";
import { accountService } from "../services/AccountService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";

export default {
  setup() {

    const editable = ref({});

    watchEffect(() => {
      if (AppState.account) {
        editable.value = { ...AppState.account };
      }
      else {
        editable.value = {};
      }
    });

    return {
      editable,

      async updateProfile() {
        try {
          await accountService.updateProfile(editable.value);
        }
        catch (error) {
          logger.error(error);
          Pop.error(error);
        }
      }

    }
  }
};
</script>


<style lang="scss" scoped></style>