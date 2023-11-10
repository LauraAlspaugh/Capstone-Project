<template>
  <section class="row">
    <div v-if="move?.imgUrl" class="col-4">
<img :src="moveBasicProp.imgUrl" alt="move picture">
    </div>
    <div v-if="move?.englishName" class="col-8">
<p>{{ moveBasicProp.englishName }}</p>
    </div>
  </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Move } from '../models/Move.js';
export default {
  props: { moveBasicProp: { type: Move } },
  setup() {
    return {
      moves: computed(() => AppState.moves),
      //     move: new Move ({
      //         "time": 45,
      // "_id": "654a8bc57407b2b1be8ac694",
      // "level": "intermediate",
      // "imgUrl": "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHlvZ2F8ZW58MHx8MHx8fDA%3D",
      // "bodyPart": [
      //     "core",
      //     "glutes",
      //     "shoulder"
      // ],
      // "description": "From a supine position, the upper back rests on the earth with the hips and legs revolved back over the torso above and beyond the head towards the earth. The torso is perpendicular to the earth. The legs are fully extended with no bend at the knees as the toes reach for the earth. The hands are either supporting the lower back or extended behind the back on the earth with extended elbows and fingers interlaced (as flexibility allows), opening the shoulders. The neck is straight. The chin tucked. Do not look to the side as this may injure the neck. The gaze is inward.",
      // "englishName": "Plow",
      // "sanskritName": "Halāsana",
      // "benefits": "Calms the brain. Stimulates the abdominal organs and the thyroid glands. Stretches the shoulders and spine. Helps relieve the symptoms of menopause. Reduces stress and fatigue. Therapeutic for backache, headache, infertility, insomnia, and sinusitis.",
      // "category": "inversion yoga",
      // "defaultTime": 45,
      // "creatorId": "65498111bdea0e58936412eb",
      // "createdAt": "2023-11-07T19:11:01.582Z",
      // "updatedAt": "2023-11-08T22:38:53.447Z",
      // "__v": 0,
      // "useageCount": 1,
      // "totalCount": 2,
      // "creator": {
      //     "_id": "65498111bdea0e58936412eb",
      //     "name": "cori",
      //     "picture": "https://s.gravatar.com/avatar/acedcc47b3b3f63b48ee7c245e5d2a7c?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fco.png",
      //     "id": "65498111bdea0e58936412eb"
      // },
      // "id": "654a8bc57407b2b1be8ac694" 
      //     })
    }
  }
}


</script>


<style lang="scss" scoped></style>