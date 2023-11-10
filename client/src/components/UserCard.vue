<template>
  <div class="bgColor rounded p-3">
    <h1>{{ profile.name }}</h1>
    <img class="rounded-circle mt-2 mb-3" :src="profile.picture" alt="" />
    <p>{{ profile.email }}</p>
    <div class="d-flex justify-content-center">
      <div class="timestamps">
        <span class="d-flex justify-content-between">
          <p class="mb-0 courier"> Created: </p>
          <p class="mb-0 courier">
            {{ profile.createdAt.toLocaleDateString() + ' @ ' + profile.createdAt.toLocaleTimeString() }}</p>
        </span>
        <span class="d-flex justify-content-between">
          <p class="mb-0 courier">Updated: </p>
          <p class="mb-0 courier">
            {{ profile.updatedAt.toLocaleDateString() + ' @ ' + profile.updatedAt.toLocaleTimeString() }} </p>
        </span>
      </div>
    </div>
    <p class="pt-3">{{ profile.bio }}</p>
    <div class="fs-1 socials d-flex justify-content-center p-3">
      <a :href="profile.github" target="_blank"><i class="p-3 mdi mdi-github" title="icon for github"></i></a>
      <a :href="profile.linkedin" target="_blank"><i class="p-3 mdi mdi-linkedin" title="icon for linked"></i></a>
      <a :href="profile.resume" target="_blank"><i class="p-3 mdi mdi-file-account"
          title="icon for the user's resume"></i></a>
      <a :href="profile.website" target="_blank"><i class="p-3 mdi mdi-web" title="icon for the user's website"></i></a>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed } from 'vue';
import { Account } from "../models/Account.js";

export default {
  props: { profile: { type: Account } },

  setup() {

    return {
      account: computed(() => AppState.account),

    }
  }
};
</script>


<style lang="scss" scoped>
img {
  max-width: 10rem;
}

.bgColor {
  background-color: #12345678;
  backdrop-filter: blur(5px);
}

.courier {
  font-family: 'Courier New', Courier, monospace;
}

.timestamps {
  width: 24rem;
}
</style>