<template>
  <div class="container-fluid">
    <section class="row justify-content-center">
      <div class="col-12 d-flex justify-content-center py-5">
        <img src="../assets/img/RootedFlow Logo-lg.png" alt="Rooted Flow Logo" class="bigLogo rounded-circle pt-5 px-3">
      </div>
    </section>
    <section class="row justify-content-center align-items-center pt-3">
      <div class="col-12 col-md-7 py-3 px-5 order-2 order-md-1 d-flex justify-content-center">
        <p class="fs-5 p-2 rounded">At Rooted Flow, we believe everyone should have the tools to create their own custom
          yoga routine. We want to empower everyone, from beginner to expert, to take responsibility for their body
          health. Within the Catalog page of this application, you learn more about many different yoga poses and their
          benefits. You can favorite these poses for quick access when creating a routine. The Catalog page also provides
          Rooted Flow and community routines that have already been designed for use. Once you create your own custom
          routine or favorite a routine, these will appear in your favorites list.</p>
      </div>
      <div @click="selectedPic(homeImgs[0])" class="col-12 col-md-5 p-3 order-1 order-md-2 d-flex justify-content-center">
        <img type="button" :src="homeImgs[0].img" :alt="homeImgs[0].alt" class="img border p-2">
      </div>
      <div @click="selectedPic(homeImgs[1])" class="col-12 col-md-5 p-3 order-3 order-md-3 d-flex justify-content-center">
        <img type="button" :src="homeImgs[1].img" :alt="homeImgs[1].alt" class="img border p-2">
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
      <div @click="selectedPic(homeImgs[2])" class="col-12 col-md-5 p-3 order-1 order-md-2 d-flex justify-content-center">
        <img :src="homeImgs[2].img" :alt="homeImgs[2].alt" class="img border p-2">
      </div>
    </section>
  </div>
</template>

<script>
import { Modal } from "bootstrap";
import { AppState } from "../AppState";

export default {
  setup() {
    const homeImgs = [
      { img: '/src/assets/img/CatalogSnapshot.png', alt: 'Catalog Snapshot' },
      { img: '', alt: '' },
      { img: '', alt: '' }
    ]
    return {
      homeImgs,
      selectedPic(imgObj) {
        AppState.selectedPic = imgObj
        Modal.getOrCreateInstance('#expand-modal').show()
      }
    }
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
