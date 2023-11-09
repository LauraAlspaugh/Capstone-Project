<template>
  <div class="container-fluid">
      <section class="row justify-content-center">
        <div class="col-12 d-flex justify-content-center p-3">
          <img src="../assets/img/RootedFlow Logo-lg.png" alt="Rooted Flow Logo" class="bigLogo rounded-circle">
        </div>
      </section>
      <section class="row justify-content-center">
        <div class="col-12 col-md-7 p-3 order-2 order-md-1 d-flex justify-content-center">
          <p class="">text 1</p>
        </div>
        <div class="col-12 col-md-5 p-3 order-1 order-md-2 d-flex justify-content-center">
          <img src="" alt="img for text 1" class="img1">
        </div>
        <div class="col-12 col-md-5 p-3 order-3 order-md-3 d-flex justify-content-center">
          <img src="" alt="img for text 2" class="img2">
        </div>
        <div class="col-12 col-md-7 p-3 order-4 order-md-4 d-flex justify-content-center">
          <p class=""> text 2</p>
        </div>
      </section>
      <section class="row justify-content-center">
        <div class="col-12 col-md-7 p-3 order-2 order-md-1 d-flex justify-content-center">
          <p class=""> text 3</p>
        </div>
        <div class="col-12 col-md-5 p-3 order-1 order-md-2 d-flex justify-content-center">
          <img src="" alt="img for text 3" class="img3">
        </div>
      </section>
    </div>
</template>

<script>
export default {
  setup() {
    return {}
  }
}
</script>

<style scoped lang="scss">
.bigLogo{
  box-shadow: 0 0 1rem .25rem white;
}
</style>
