<template>
    <section class="row">
        <div class="col-12 d-block white-gb">
            <img class="img-fluid" :src="routineProp.keyImage" alt="routineProp.name">
            <div>
                <span> {{ routineProp.name }}</span>
            </div>
            <div>
                <span>{{ routineProp.playTime }} sec</span>
                <span>{{ routineProp.level }}</span>
                <span>{{ routineProp.target }}</span>
            </div>
        </div>
    </section>
    <!-- <p>{{ routineProp.name }}</p> -->
    <!-- <p>{{ routineProp.description }}</p> -->
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Routine } from '../models/Routine.js';
export default {
    props: { routineProp: { type: Routine, required: true } },
    setup() {
        return {}
    }
};
</script>


<style lang="scss" scoped>
img {
    // max-height: 10rem;
    // max-width: 15rem;
}
</style>