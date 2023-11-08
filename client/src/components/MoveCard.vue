<template>
    <img :src="moveProp.imgUrl" alt="moveProp.englishName">
    <p>{{ moveProp.englishName }}</p>
    <p>{{ moveProp.description }}</p>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Move } from '../models/Move.js';
export default {
    props: {moveProp: {type: Move, required: true}},
    setup(){
    return {  }
    }
};
</script>


<style lang="scss" scoped>

</style>