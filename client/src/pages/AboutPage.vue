<template>
  <div class="container-fluid">
    <section class="row justify-content-center p-3 ">
      <div class="col-12 text-center p-3 my-5 white-gb w-50 intro-page">
        <p class="fs-1 p-3 rounded">About the App & Devs </p>
        <p class="fs-5 p-2 rounded">A special thank you to all the developers who helped to create Rooted
          Flow. All
          the
          time and effort was well worth it. And the opportunity to work together made for many memories. </p>
        <p class="fs-5 p-2 rounded">Express Node.js, Vue 3, Bootstrap 5, Mongoose, MongoDB (...)</p>
      </div>
    </section>
    <section class="row justify-content-center align-items-center px-5">
      <div class="col-12 col-md-5 p-3 my-2 order-1 order-md-1 d-flex justify-content-center">
        <img src="/img/DJ.jpg" alt="DJ Aaron" class="img border p-2">
        <div class="fs-1 socials d-flex flex-column justify-content-center mx-3 p-3">
          <a href="https://github.com/koreangeekman" target="_blank"><i class="p-3 mdi mdi-github"
              title="icon for github"></i></a>
          <a href="https://www.linkedin.com/in/djaaron/" target="_blank"><i class="p-3 mdi mdi-linkedin"
              title="icon for linked"></i></a>
          <a href="https://koreangeekman.info/" target="_blank"><i class="p-3 mdi mdi-web"
              title="icon for the user's website"></i></a>
        </div>
      </div>
      <div class="col-12 col-md-7 p-3 my-2 rounded order-2 order-md-2 d-flex justify-content-center desc">
        <p class="fs-5 p-2 rounded white-gb">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime itaque iusto
          numquam, excepturi facilis voluptatibus voluptates vero in? Iste voluptatem praesentium consequuntur nobis. Ad,
          officiis quisquam. Totam quaerat dignissimos eius!</p>
      </div>
      <div class="col-12 col-md-7 p-3 my-2 rounded order-4 order-md-3 d-flex justify-content-center desc">
        <p class="fs-5 p-2 rounded white-gb">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci,
          architecto. Fuga ad animi earum culpa expedita dignissimos mollitia vitae, molestiae tempore. Quibusdam adipisci
          autem voluptate est at accusamus aperiam ipsa.</p>
      </div>
      <div class="col-12 col-md-5 p-3 my-2 order-3 order-md-4 d-flex justify-content-center">
        <div class="fs-1 socials d-flex flex-column justify-content-center mx-3 p-3">
          <a href="https://github.com/3rinmae" target="_blank"><i class="p-3 mdi mdi-github"
              title="icon for github"></i></a>
          <a href="https://www.linkedin.com/in/erin-shiffler-8aa702296/" target="_blank"><i class="p-3 mdi mdi-linkedin"
              title="icon for linked"></i></a>
          <a href="#" target="_blank"><i class="p-3 mdi mdi-web" title="icon for the user's website"></i></a>
        </div>
        <img src="/img/Erin.jpeg" alt="Erin Mae Shiffler" class="img border p-2">
      </div>
    </section>
    <section class="row justify-content-center align-items-center px-5">
      <div class="col-12 col-md-5 p-3 my-2 order-1 order-md-1 d-flex justify-content-center">
        <img src="/img/lauraimage.jpg" alt="Laura Alspaugh" class="img border p-2">
        <div class="fs-1 socials d-flex flex-column justify-content-center mx-3 p-3">
          <a href="https://github.com/LauraAlspaugh" target="_blank"><i class="p-3 mdi mdi-github"
              title="icon for github"></i></a>
          <a href="https://www.linkedin.com/in/laura-alspaugh/" target="_blank"><i class="p-3 mdi mdi-linkedin"
              title="icon for linked"></i></a>
          <a href="#" target="_blank"><i class="p-3 mdi mdi-web" title="icon for the user's website"></i></a>
        </div>
      </div>
      <div class="col-12 col-md-7 p-3 my-2 rounded order-2 order-md-2 d-flex justify-content-center desc">
        <p class="fs-5 p-2 rounded white-gb">Hi everyone, and thank you for visiting our site. My name is Laura, and I
          came
          to CodeWorks in the fall of 2023. Since my introduction to web development a few years prior, I have always had
          a passion for writing code. It's been an amazing experience working on this project with my classmates. Also a
          special thank you to all the teachers at Code Works who helped us with this project. </p>
      </div>
      <div class="col-12 col-md-7 p-3 my-2 rounded order-4 order-md-3 d-flex justify-content-center desc">
        <p class="fs-5 p-2 rounded white-gb">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit cumque
          officia placeat nihil nostrum, perferendis amet ducimus, similique recusandae voluptatibus aspernatur culpa
          error quaerat ut, ipsa facere? Similique, recusandae adipisci.</p>
      </div>
      <div class="col-12 col-md-5 p-3 my-2 order-3 order-md-4 d-flex justify-content-center">
        <div class="fs-1 socials d-flex flex-column justify-content-center mx-3 p-3">
          <a href="https://github.com/kyndrill" target="_blank"><i class="p-3 mdi mdi-github"
              title="icon for github"></i></a>
          <a href="https://www.linkedin.com/in/corinna-bolon-690003297/" target="_blank"><i class="p-3 mdi mdi-linkedin"
              title="icon for linked"></i></a>
          <a href="#" target="_blank"><i class="p-3 mdi mdi-web" title="icon for the user's website"></i></a>
        </div>
        <img src="" alt="Corinna Bolon" class="img border p-2">
      </div>
    </section>
  </div>
</template>

<script>


export default {
  setup() {
    return {};
  },
  // components: { MoveDetailCard, RoutineDetailCard, MoveSearchComponent }
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

@media screen and (max-width: 992px) {
  .intro-page {
    margin: 0rem;
    width: 100%;

    padding: 0rem;
  }

}</style>