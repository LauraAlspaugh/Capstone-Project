<template>
  <div class="container-fluid">
    <section class="row justify-content-center">
      <div class="col-12 d-flex justify-content-center py-5">
        <img :src="logo" alt="Rooted Flow Logo" class="bigLogo rounded-circle pt-5 px-3">
      </div>
    </section>
    <section class="row justify-content-center align-items-center pt-3">
      <div class="col-12 col-md-7 py-3 px-5 order-2 order-md-1 d-flex justify-content-center">
        <p @click="test" class="fs-5 p-3 rounded white-gb">At Rooted Flow, we believe everyone should have the tools to
          create
          their own custom
          yoga routine. We want to empower everyone, from beginner to expert, to take responsibility for their body
          health. Within the Catalog page of this application, you learn more about many different yoga poses and their
          benefits. You can favorite these poses for quick access when creating a routine. The Catalog page also provides
          Rooted Flow and community routines that have already been designed for use. Once you create your own custom
          routine or favorite a routine, these will appear in your favorites list.</p>
      </div>
      <div @click="selectedPic(homeImgs[0])" class="col-12 col-md-5 p-3 order-1 order-md-2 d-flex justify-content-center">
        <img type="button" :src="homeImgs[0].img" :alt="homeImgs[0].alt" class="img border p-2"
          title="Catalog screenshot">
      </div>
      <div @click="selectedPic(homeImgs[1])" class="col-12 col-md-5 p-3 order-3 order-md-3 d-flex justify-content-center">
        <img type="button" :src="homeImgs[1].img" :alt="homeImgs[1].alt" class="img border p-2"
          title="Routine designer screenshot">
      </div>
      <div class="col-12 col-md-7 py-3 px-5 order-4 order-md-4 d-flex justify-content-center">
        <p class="fs-5 p-3 rounded white-gb"> Visit our Routine Designer Page to create and customize your own routine.
          Here, users
          can choose a previously favorited routine, or create a new routine, from our drop-down menu. Click the lock
          icon and your routine will be unlocked for you to access. This will enable users to change the order of poses in
          your routine, as well as delete a pose from a routine entirely.
          A side panel on your right will allow you as the user to search through poses, based on your level or preference
          of pose. Users can click on each of these individual poses to see a pop-up with more details on that particular
          pose. In the bottom left-hand corner you can access the play button, which will direct you to another page to
          start your routine. </p>
      </div>
    </section>
    <section class="row justify-content-center align-items-center">
      <div class="col-12 col-md-7 py-3 px-5 order-2 order-md-1 d-flex justify-content-center">
        <p class="fs-5 p-3 rounded white-gb">Welcome to your Routine Play Page. Here, you will be guided through your
          routine with
          a timer, and an order of your poses. The larger image shows your current pose, and the smaller image in the
          right-hand corner shows your the upcoming pose. This allows you as the user to prepare for the next pose. When
          you reach an interval, you will receive a message and an image of the next pose. Click on the vertical dots to
          see a detailed description of each move. At Rooted Flow, we allow users to find the routine that best fits their
          needs. </p>
      </div>
      <div @click="selectedPic(homeImgs[2])" class="col-12 col-md-5 p-3 order-1 order-md-2 d-flex justify-content-center">
        <img :src="homeImgs[2].img" :alt="homeImgs[2].alt" class="img border p-2" title="Routine play page screenshot">
      </div>
    </section>
  </div>
</template>

<script>
import { Modal } from "bootstrap";
import { AppState } from "../AppState";
import logo from '../assets/img/RootedFlow-Logo-lg.png'

export default {
  setup() {
    const homeImgs = [
      { img: 'src/assets/img/CatalogSnapshot.png', alt: 'Catalog Snapshot' },
      { img: 'src/assets/img/RoutineDesignerPage.png', alt: 'Routine Designer Page Snapshot' },
      { img: 'src/assets/img/RoutinePlayPageImage.jpg', alt: 'Routine Play Page Snapshot' }
    ]
    return {
      logo,
      homeImgs,
      selectedPic(imgObj) {
        AppState.selectedPic = imgObj
        Modal.getOrCreateInstance('#expand-modal').show()
      },
      test() {
        const sound = new Audio('/sounds/chimes-14_By_bliind.wav')
        sound.play()
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
  max-height: 22rem;
}

@media screen and (max-width: 992px) {
  .bigLogo {
    height: 13rem;
    width: 13rem;
  }

}
</style>
