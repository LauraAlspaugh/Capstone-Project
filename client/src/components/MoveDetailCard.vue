<template>
  <section class="row justify-content-center">

 
  <div v-if="activeMove?.imgUrl" class="col-8 active-move">
    <section class="row justify-content-center">
      <div class="col-10 mt-5 pt-3 pb-0 ">
        <img :src="activeMove.imgUrl" alt="activeMove.englishName">
        <p class="text-center m-0 name-text  italiana pt-3 pb-0">{{ activeMove.englishName }}</p>
      </div>
    </section>
    <section class="row italiana text-white px-4">
      <div class="col-12 ">
        <p class="text-mint m-2 d-flex justify-content-between ">{{ activeMove.level }} <span><i class="mdi mdi-heart  fs-4"></i></span></p>
        <span class="text-mint pe-3 m-2" v-for="focus in activeMove.bodyPart" :key="focus"> {{ focus }}</span>
        <div class="mb-3">
        <p class=" m-0 mt-3 ">Description: </p>
        <li  v-for="description in activeMove.descriptionArray" :key="description">{{ description }}</li>
      </div>
      <div>
        <p class=" m-0">Benefits: </p>
        <li  v-for="benefit in activeMove.benefitsArray" :key="benefit">{{ benefit }}</li>
      </div>
      </div>
    </section>
  </div>

</section>
  
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import {Move} from '../models/Move.js'
export default {
  setup() {
    
    return {
      // activeMove: computed(()=> AppState.activeMove),
      moves: computed(()=> AppState.moves),
      activeMove: new Move({
    "time": 45,
    "_id": "654a8bc57407b2b1be8ac694",
    "level": "intermediate",
    "imgUrl": "https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483088/yoga-api/27_m4yux9.svg",
    "bodyPart": [
        "core",
        "glutes",
        "shoulder"
    ],
    "description": "From a supine position, the upper back rests on the earth with the hips and legs revolved back over the torso above and beyond the head towards the earth. The torso is perpendicular to the earth. The legs are fully extended with no bend at the knees as the toes reach for the earth. The hands are either supporting the lower back or extended behind the back on the earth with extended elbows and fingers interlaced (as flexibility allows), opening the shoulders. The neck is straight. The chin tucked. Do not look to the side as this may injure the neck. The gaze is inward.",
    "englishName": "Plow",
    "sanskritName": "Halāsana",
    "benefits": "Calms the brain. Stimulates the abdominal organs and the thyroid glands. Stretches the shoulders and spine. Helps relieve the symptoms of menopause. Reduces stress and fatigue. Therapeutic for backache, headache, infertility, insomnia, and sinusitis.",
    "category": "inversion yoga",
    "defaultTime": 45,
    "creatorId": "65498111bdea0e58936412eb",
    "createdAt": "2023-11-07T19:11:01.582Z",
    "updatedAt": "2023-11-08T22:38:53.447Z",
    "__v": 0,
    "useageCount": 1,
    "totalCount": 2,
    "creator": {
        "_id": "65498111bdea0e58936412eb",
        "name": "cori",
        "picture": "https://s.gravatar.com/avatar/acedcc47b3b3f63b48ee7c245e5d2a7c?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fco.png",
        "id": "65498111bdea0e58936412eb"
    },
    "id": "654a8bc57407b2b1be8ac694"
})
    }
  }
};
</script>


<style lang="scss" scoped>

.active-move{
  background-color: #0F2D24;
}
.name-text{
  color: white;
  font-size: 50px;
  
}
.more-text{
  color: white; 

}
.text-mint{
  color: #BCC8C4;
}
img{
  border: solid black 2px;
  border-radius: 3px;
  width: 525px; 
  height: 350px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.412);
    
}
</style>