<template>
  <section class="row justify-content-center">


    <div v-if="activeMove?.imgUrl" class="col-12 active-move">
      <section class="row justify-content-center">
        <div class="col-10 mt-5 pt-3 pb-0 ">
          <img :src="activeMove.imgUrl" alt="activeMove.englishName">
          <p class="text-center m-0 name-text  italiana pt-3 pb-0">{{ activeMove.englishName }}</p>
        </div>
      </section>
      <section class="row italiana text-white px-4">
        <div class="col-12 ">
          <p class="text-mint m-2 d-flex justify-content-between ">{{ activeMove.level }} <span><i
                class="mdi mdi-heart  fs-4"></i></span></p>
          <span class="text-mint pe-3 m-2" v-for="focus in activeMove.bodyPart" :key="focus"> {{ focus }}</span>
          <div class="mb-3">
            <p class=" m-0 mt-3 ">Description: </p>
            <li v-for="description in activeMove.descriptionArray" :key="description">{{ description }}</li>
          </div>
          <div class="mb-5">
            <p class=" m-0">Benefits: </p>
            <li v-for="benefit in activeMove.benefitsArray" :key="benefit">{{ benefit }}</li>
          </div>
        </div>
      </section>
    </div>

  </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed } from 'vue';
export default {
  setup() {

    return {
      moves: computed(() => AppState.moves),
      activeMove: computed(() => AppState.activeMove)
    }
  }
};
</script>


<style lang="scss" scoped>
.active-move {
  background-color: #0F2D24;
}

.name-text {
  color: white;
  font-size: 50px;

}

.more-text {
  color: white;

}

.text-mint {
  color: #BCC8C4;
}

img {
  border: solid black 2px;
  border-radius: 3px;
  width: 580px;
  height: 350px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.412);
  object-fit: cover;
  position: center;

}
</style>