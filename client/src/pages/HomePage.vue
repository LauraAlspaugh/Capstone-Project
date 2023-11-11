<template>
  <div class="container-fluid">
    <section class="row justify-content-center">
      <div class="col-12 d-flex justify-content-center py-5">
        <img src="../assets/img/RootedFlow Logo-lg.png" alt="Rooted Flow Logo" class="bigLogo rounded-circle pt-5 px-3">
      </div>
    </section>
    <section class="row justify-content-center align-items-center pt-3">
      <div class="col-12 col-md-7 py-3 px-5 order-2 order-md-1 d-flex justify-content-center">
        <p class="fs-5 p-2 rounded">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis veniam temporibus quod,
          tenetur accusantium alias voluptas? Iure, vel magni. Mollitia maiores vero totam, quaerat rem a rerum accusamus
          minima saepe.</p>
      </div>
      <div class="col-12 col-md-5 p-3 order-1 order-md-2 d-flex justify-content-center">
        <img src="" alt="img for text 1" class="img border p-2">
      </div>
      <div class="col-12 col-md-5 p-3 order-3 order-md-3 d-flex justify-content-center">
        <img src="" alt="img for text 2" class="img border p-2">
      </div>
      <div class="col-12 col-md-7 py-3 px-5 order-4 order-md-4 d-flex justify-content-center">
        <p class="fs-5 p-2 rounded"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae vel a ipsum sunt
          necessitatibus, architecto aliquid vero provident accusamus ad distinctio nemo consequatur recusandae officiis
          non veniam, est cum? Quasi.</p>
      </div>
    </section>
    <section class="row justify-content-center align-items-center">
      <div class="col-12 col-md-7 py-3 px-5 order-2 order-md-1 d-flex justify-content-center">
        <p class="fs-5 p-2 rounded">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus amet ipsa nisi
          voluptates asperiores quaerat, repellat id ut totam expedita, neque dolorem error perspiciatis. Fugit aperiam
          animi veritatis unde non.</p>
      </div>
      <div class="col-12 col-md-5 p-3 order-1 order-md-2 d-flex justify-content-center">
        <img src="" alt="img for text 3" class="img border p-2">
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
img {
  box-shadow:
    0 0 1rem .25rem white,
    0 0 2rem .5rem white inset;
  background-color: #ffffffa8;
}

.img {
  height: 16rem;
}

.bigLogo {
  box-shadow:
    0 0 1rem .25rem white,
    0 0 2rem .5rem white inset;
  background-color: #ffffffa8;
  backdrop-filter: blur(2px);
}
</style>
