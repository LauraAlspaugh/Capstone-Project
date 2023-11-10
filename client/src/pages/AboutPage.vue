<template>
    <div class="container-fluid">
        <section class="row justify-content-center p-3">
          <div class="col-12 d-flex justify-content-center text-center py-3 px-5">
            <p class="">About the App & Devs <br> Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati nostrum, ab sequi architecto rem accusamus? Repellat voluptatibus repudiandae, unde dicta cum incidunt? Quibusdam explicabo distinctio repellendus consequatur tenetur numquam deleniti.</p>
          </div>
        </section>
        <section class="row justify-content-center p-3">
          <div class="col-12 col-md-5 p-3 my-2 order-1 order-md-1 d-flex justify-content-center">
            <img src="" alt="img for dev 1" class="img1">
          </div>
          <div class="col-12 col-md-7 p-3 my-2 rounded order-2 order-md-2 d-flex justify-content-center desc">
            <p class="">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime itaque iusto numquam, excepturi facilis voluptatibus voluptates vero in? Iste voluptatem praesentium consequuntur nobis. Ad, officiis quisquam. Totam quaerat dignissimos eius!</p>
          </div>
          <div class="col-12 col-md-7 p-3 my-2 rounded order-4 order-md-3 d-flex justify-content-center desc">
            <p class="">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci, architecto. Fuga ad animi earum culpa expedita dignissimos mollitia vitae, molestiae tempore. Quibusdam adipisci autem voluptate est at accusamus aperiam ipsa.</p>
          </div>
          <div class="col-12 col-md-5 p-3 my-2 order-3 order-md-4 d-flex justify-content-center">
            <img src="" alt="img for dev 2" class="img2">
          </div>
        </section>
        <section class="row justify-content-center">
          <div class="col-12 col-md-5 p-3 my-2 order-1 order-md-1 d-flex justify-content-center">
            <img src="" alt="img for dev 3" class="img3">
          </div>
          <div class="col-12 col-md-7 p-3 my-2 rounded order-2 order-md-2 d-flex justify-content-center desc">
            <p class="">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique, itaque accusantium. Fugiat cumque vel nesciunt alias sed vero temporibus a repellat eius iste suscipit quibusdam esse repudiandae fugit, unde in.</p>
          </div>
          <div class="col-12 col-md-7 p-3 my-2 rounded order-4 order-md-3 d-flex justify-content-center desc">
            <p class="">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit cumque officia placeat nihil nostrum, perferendis amet ducimus, similique recusandae voluptatibus aspernatur culpa error quaerat ut, ipsa facere? Similique, recusandae adipisci.</p>
          </div>
          <div class="col-12 col-md-5 p-3 my-2 order-3 order-md-4 d-flex justify-content-center">
            <img src="" alt="img for dev 2" class="img2">
          </div>
        </section>
      </div>
      <MoveDetailCard/>
      <div class="mb-4"></div>
      <RoutineDetailCard/>
      <div class="mb-4"></div>
      <MoveSearchComponent/>
</template>

<script>

import MoveDetailCard from '../components/MoveDetailCard.vue';
import MoveSearchComponent from '../components/MoveSearchComponent.vue';
import RoutineDetailCard from '../components/RoutineDetailCard.vue';

export default {
    setup() {
        return {};
    },
    components: { MoveDetailCard, RoutineDetailCard, MoveSearchComponent }
}
</script>

<style scoped lang="scss">
.desc{
  background-color: #ffffff69;
}
</style>