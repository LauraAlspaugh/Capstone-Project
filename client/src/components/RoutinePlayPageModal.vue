<template>
    <div class="container-fluid">
        <section class="row">
            <div class="col-12 text-end">
                
                <i class=" fs-3 mdi mdi-heart"></i>
<p>{{ routine.level }}</p>
</div>
        </section>
<section class="row">
    <div class="col-12">
        <p class="fs-3">Description: </p>
    </div>
</section>
<section class="row">
    <div class="col-12">
        <p class="fs-3">Benefits: </p>
    </div>
</section>

    <!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        
Launch demo modal
</button> -->
        
    </div>


<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog">
    <div class="modal-content">
    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{{ routine.level }}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
    
    <p>{{ routine.level }}</p>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
    </div>
    </div>
</div>
</div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
export default {
    setup(){
    return { 
        routine: computed(()=> AppState.routines)
    }
    }
};
</script>


<style lang="scss" scoped>

</style>