<template>
    <div class="container-fluid">
        <section class="row justify-content-center">
          <div class="col-12 d-flex justify-content-center p-3">
            <p class="">About the App & Devs</p>
          </div>
        </section>
        <section class="row justify-content-center">
          <div class="col-12 col-md-5 p-3 order-1 order-md-1 d-flex justify-content-center">
            <img src="" alt="img for dev 1" class="img1">
          </div>
          <div class="col-12 col-md-7 p-3 order-2 order-md-2 d-flex justify-content-center">
            <p class="">dev 1</p>
          </div>
          <div class="col-12 col-md-7 p-3 order-4 order-md-3 d-flex justify-content-center">
            <p class=""> dev 2</p>
          </div>
          <div class="col-12 col-md-5 p-3 order-3 order-md-4 d-flex justify-content-center">
            <img src="" alt="img for dev 2" class="img2">
          </div>
        </section>
        <section class="row justify-content-center">
          <div class="col-12 col-md-5 p-3 order-1 order-md-1 d-flex justify-content-center">
            <img src="" alt="img for dev 3" class="img3">
          </div>
          <div class="col-12 col-md-7 p-3 order-2 order-md-2 d-flex justify-content-center">
            <p class=""> dev 3</p>
          </div>
          <div class="col-12 col-md-7 p-3 order-4 order-md-3 d-flex justify-content-center">
            <p class=""> dev 2</p>
          </div>
          <div class="col-12 col-md-5 p-3 order-3 order-md-4 d-flex justify-content-center">
            <img src="" alt="img for dev 2" class="img2">
          </div>
        </section>
      </div>
      <MoveDetailCard/>
</template>

<script>
import MoveDetailCard from '../components/MoveDetailCard.vue';

export default {
    setup() {
        return {};
    },
    components: { MoveDetailCard }
}
</script>
