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
            <input v-model="editable.name" class="ms-2 form-control" type="text" id="name" maxlength="128">
          </div>
          <div class="m-3 mt-0">
            <label for="picture">User Picture URL</label>
            <input v-model="editable.picture" class="ms-2 form-control" type="url" id="picture" maxlength="256">
          </div>
          <div class="m-3 mt-0">
            <label for="website">Website</label>
            <input v-model="editable.website" class="ms-2 form-control" type="text" id="website" maxlength="128">
          </div>
        </section>
      </div>
      <div class="col-12 col-md-6">
        <section class="socials">
          <div class="m-3 mt-0">
            <label for="github">Github</label>
            <input v-model="editable.github" class="ms-2 form-control" type="url" id="github" maxlength="128">
          </div>
          <div class="m-3 mt-0">
            <label for="linkedin">LinkedIn</label>
            <input v-model="editable.linkedin" class="ms-2 form-control" type="url" id="linkedin" maxlength="128">
          </div>
          <div class="m-3 mt-0">
            <label for="resume">Resume</label>
            <input v-model="editable.resume" class="ms-2 form-control" type="url" id="resume" maxlength="128">
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
      <section class="d-flex py-2 position-relative">
        <p class="preference fw-bold fs-4 position-absolute">Preferences</p>
        <section class="preferences d-flex w-100 ps-5 pe-3">
          <span class="w-50">
            <div class="m-3 mt-0 d-flex align-items-center">
              <label for="useCustomLogo">Use Custom Logo</label>
              <input v-model="editable.useCustomLogo" class="ms-4" type="checkbox" id="useCustomLogo">
            </div>
            <div class="m-3 mt-0">
              <label for="customLogoUrl">Custom Logo URL</label>
              <input v-model="editable.customLogoUrl" class="ms-2 form-control" id="customLogoUrl" type="url"
                maxlength="300" :disabled="!editable.useCustomLogo">
            </div>
          </span>
          <span class="w-50">
            <div class="m-3 mt-0 d-flex align-items-center">
              <label for="enableAudio">Use Custom Audio</label>
              <input v-model="editable.enableAudio" class="ms-4" type="checkbox" id="enableAudio">
            </div>
            <div class="m-3 mt-0">
              <label for="customAudioId">Custom Audio</label>
              <select v-model="editable.customAudioId" class="ms-2 form-select" id="customAudioId"
                :disabled="!editable.enableAudio">
                <option value="default">Default</option>
              </select>
            </div>
          </span>
        </section>
      </section>
      <hr>

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


<style lang="scss" scoped>
input[type='checkbox'] {
  height: 1.2rem;
  width: 1.2rem;
}

.preference {
  height: 3rem;
  rotate: -90deg;
  top: 2.3rem;
  left: -1.5rem;
}
</style>