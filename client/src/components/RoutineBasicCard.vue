<template>
  <div class="component">


  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Routine } from "../models/Routine";

export default {
  props: { routine: { type: Routine } },
  
  setup(props) {
    return {

    }
  }
};
</script>


<style lang="scss" scoped></style>