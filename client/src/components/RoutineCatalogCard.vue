<template>
<img :src="routineProp.keyImage" alt="routineProp.name">
<p>{{ routineProp.name }}</p>
<p>{{ routineProp.description }}</p>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Routine } from '../models/Routine.js';
export default {
    props: { routineProp: { type: Routine, required: true } },
    setup(){
    return {  }
    }
};
</script>


<style lang="scss" scoped>

</style>