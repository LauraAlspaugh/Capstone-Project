<template>
    <section class="row justify-content-center">
        <div v-if="activeRoutine?.keyImage" class="col-6 active-move">
<section class="row justify-content-center">
    <div class="col-12 col-md-10 mt-5 pt-3 pb-0">
<img :src="activeRoutine.keyImage" alt="activeRoutine name">
<p class="text-center name-text italiana  pt-3 pb-0">{{ activeRoutine.name }}</p>
    </div>
</section>
<section class="row  italiana text-white px-4">
    <div class="col-12">
        <p class="text-mint ">{{ activeRoutine.playTime }} Min  |  Move Count {{ activeRoutine.moveCount }}</p>
        <div class=" ">
        <p class="text-mint m-2 d-flex justify-content-between ">{{ activeRoutine.level }} <span><i class="mdi mdi-heart  fs-4"></i></span></p>
        <span class="text-mint pe-3 m-2" v-for="focus in activeRoutine.target.name" :key="focus"> {{ focus }}</span>
        </div>
        <div class="mb-3">
        <p class=" m-0 mt-3 ">Description: </p>
        <li  v-for="description in activeRoutine.descriptionArray" :key="description">{{ description }}</li>
    </div>
    <div>
    <p class="text-mint"> Created by {{ activeRoutine.creator.name }}</p>  
    </div>
    <div class="p-2 mb-5">
        <Button class="btn btn-outline-light p-2 text-white">Open Full Routine</Button>
    </div>
    
    </div>

    
    </section>
</div>
    </section>


</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Routine } from '../models/Routine.js';
export default {
    setup(){
    return { 
        routines: computed(()=> AppState.routines),
        activeRoutine: new Routine({
            
    // "_id": "654aaaa4dd97bee01b12ae23",
    // "name": "Saturday Refresh Kick",
    // "description": "A refreshing class for all levels, this vinyasa flow class continues to build on the foundation established in Beginner Yoga. Working with the needs of the class, more attention is placed on alignment, breath work, and coordination. Participants begin to explore more challenging asanas (poses) with plenty of options for everyone. This is an excellent class for beginning through experienced students.",
    // "category": [
    //     "core yoga"
    // ],
    // "target": ["shoulder",
    //     "glutes"],
    // "isPrivate": true,
    // "isArchived": true,
    // "playCount": 0,
    // "playTime": 0,
    // "creatorId": "652ef49aff9881f8395eb350",
    // "level": "beginner",
    // "moves": [
    //     "654bc9c161ddf2156392cd66",
    //     "654bbd499ae5b82890ab0232",
    //     "654bc9d73f55b45d7b0f3ea9",
    //     "654bd73d864646380792d6e5",
    //     "654bd673864646380792d6d5",
    //     "654bd69d864646380792d6d9",
    //     "654bd727864646380792d6df",
    //     "654bd75e864646380792d6e9",
    //     "654bd781864646380792d6ed",
    //     "654bd799864646380792d6f1",
    //     "654bd7b4864646380792d6f5",
    //     "654bd7cc864646380792d6f9",
    //     "654bd7e5864646380792d6fd",
    //     "654bd7fd864646380792d701",
    //     "654bd814864646380792d705"
    // ],
    // "createdAt": "2023-11-07T21:22:44.148Z",
    // "updatedAt": "2023-11-09T17:58:51.905Z",
    // "__v": 2,
    // "isExample": false,
    // "keyImage": "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHlvZ2F8ZW58MHx8MHx8fDA%3D",
    // "creator": {
    //     "_id": "652ef49aff9881f8395eb350",
    //     "name": "lauraalspaugh2002",
    //     "picture": "https://s.gravatar.com/avatar/adb1a81448fd211a1c2107bc4dbd9772?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fla.png",
    //     "id": "652ef49aff9881f8395eb350"
    // },
    // "listEntry": [
    //     {
    //         "_id": "654bbd499ae5b82890ab0232",
    //         "name": "Weekend",
    //         "duration": 60,
    //         "position": 2,
    //         "transition": true,
    //         "routineId": "654aaaa4dd97bee01b12ae23",
    //         "moveId": "654a8bc57407b2b1be8ac694",
    //         "creatorId": "652ef49aff9881f8395eb350",
    //         "createdAt": "2023-11-08T16:54:33.764Z",
    //         "updatedAt": "2023-11-08T16:54:33.764Z",
    //         "__v": 0,
    //         "id": "654bbd499ae5b82890ab0232"
    //     },
    //     {
    //         "_id": "654bc9c161ddf2156392cd66",
    //         "duration": 60,
    //         "position": 1,
    //         "transition": false,
    //         "routineId": "654aaaa4dd97bee01b12ae23",
    //         "moveId": "654a8c757407b2b1be8ac6ac",
    //         "creatorId": "652ef49aff9881f8395eb350",
    //         "createdAt": "2023-11-08T17:47:45.253Z",
    //         "updatedAt": "2023-11-08T17:47:45.253Z",
    //         "__v": 0,
    //         "id": "654bc9c161ddf2156392cd66"
    //     },
    //     {
    //         "_id": "654bc9d73f55b45d7b0f3ea9",
    //         "duration": 60,
    //         "position": 3,
    //         "transition": false,
    //         "routineId": "654aaaa4dd97bee01b12ae23",
    //         "moveId": "654a8c757407b2b1be8ac6ac",
    //         "creatorId": "652ef49aff9881f8395eb350",
    //         "createdAt": "2023-11-08T17:48:07.498Z",
    //         "updatedAt": "2023-11-08T17:51:05.099Z",
    //         "__v": 0,
    //         "id": "654bc9d73f55b45d7b0f3ea9"
    //     },
    //     {
    //         "_id": "654bd673864646380792d6d5",
    //         "duration": 45,
    //         "position": 5,
    //         "transition": false,
    //         "routineId": "654aaaa4dd97bee01b12ae23",
    //         "moveId": "654a8bc57407b2b1be8ac694",
    //         "creatorId": "652ef49aff9881f8395eb350",
    //         "createdAt": "2023-11-08T18:41:55.602Z",
    //         "updatedAt": "2023-11-08T18:41:55.602Z",
    //         "__v": 0,
    //         "id": "654bd673864646380792d6d5"
    //     },
    //     {
    //         "_id": "654bd69d864646380792d6d9",
    //         "duration": 90,
    //         "position": 6,
    //         "transition": false,
    //         "routineId": "654aaaa4dd97bee01b12ae23",
    //         "moveId": "654a8be97407b2b1be8ac69a",
    //         "creatorId": "652ef49aff9881f8395eb350",
    //         "createdAt": "2023-11-08T18:42:37.018Z",
    //         "updatedAt": "2023-11-08T18:42:37.018Z",
    //         "__v": 0,
    //         "id": "654bd69d864646380792d6d9"
    //     },
    //     {
    //         "_id": "654bd727864646380792d6df",
    //         "duration": 120,
    //         "position": 7,
    //         "transition": false,
    //         "routineId": "654aaaa4dd97bee01b12ae23",
    //         "moveId": "654a8bff7407b2b1be8ac69e",
    //         "creatorId": "652ef49aff9881f8395eb350",
    //         "createdAt": "2023-11-08T18:44:55.308Z",
    //         "updatedAt": "2023-11-08T18:44:55.308Z",
    //         "__v": 0,
    //         "id": "654bd727864646380792d6df"
    //     },
    //     {
    //         "_id": "654bd73d864646380792d6e5",
    //         "duration": 120,
    //         "position": 4,
    //         "transition": false,
    //         "routineId": "654aaaa4dd97bee01b12ae23",
    //         "moveId": "654a8bff7407b2b1be8ac69e",
    //         "creatorId": "652ef49aff9881f8395eb350",
    //         "createdAt": "2023-11-08T18:45:17.662Z",
    //         "updatedAt": "2023-11-08T18:45:17.662Z",
    //         "__v": 0,
    //         "id": "654bd73d864646380792d6e5"
    //     },
    //     {
    //         "_id": "654bd75e864646380792d6e9",
    //         "duration": 120,
    //         "position": 8,
    //         "transition": false,
    //         "routineId": "654aaaa4dd97bee01b12ae23",
    //         "moveId": "654a8c157407b2b1be8ac6a2",
    //         "creatorId": "652ef49aff9881f8395eb350",
    //         "createdAt": "2023-11-08T18:45:50.923Z",
    //         "updatedAt": "2023-11-08T18:45:50.923Z",
    //         "__v": 0,
    //         "id": "654bd75e864646380792d6e9"
    //     },
    //     {
    //         "_id": "654bd781864646380792d6ed",
    //         "duration": 30,
    //         "position": 9,
    //         "transition": false,
    //         "routineId": "654aaaa4dd97bee01b12ae23",
    //         "moveId": "654a8c617407b2b1be8ac6a8",
    //         "creatorId": "652ef49aff9881f8395eb350",
    //         "createdAt": "2023-11-08T18:46:25.090Z",
    //         "updatedAt": "2023-11-08T18:46:25.090Z",
    //         "__v": 0,
    //         "id": "654bd781864646380792d6ed"
    //     },
    //     {
    //         "_id": "654bd799864646380792d6f1",
    //         "duration": 30,
    //         "position": 10,
    //         "transition": false,
    //         "routineId": "654aaaa4dd97bee01b12ae23",
    //         "moveId": "654a8c757407b2b1be8ac6ac",
    //         "creatorId": "652ef49aff9881f8395eb350",
    //         "createdAt": "2023-11-08T18:46:49.873Z",
    //         "updatedAt": "2023-11-08T18:46:49.873Z",
    //         "__v": 0,
    //         "id": "654bd799864646380792d6f1"
    //     },
    //     {
    //         "_id": "654bd7b4864646380792d6f5",
    //         "duration": 30,
    //         "position": 11,
    //         "transition": false,
    //         "routineId": "654aaaa4dd97bee01b12ae23",
    //         "moveId": "654a8c7f7407b2b1be8ac6b0",
    //         "creatorId": "652ef49aff9881f8395eb350",
    //         "createdAt": "2023-11-08T18:47:16.040Z",
    //         "updatedAt": "2023-11-08T18:47:16.040Z",
    //         "__v": 0,
    //         "id": "654bd7b4864646380792d6f5"
    //     },
    //     {
    //         "_id": "654bd7cc864646380792d6f9",
    //         "duration": 30,
    //         "position": 12,
    //         "transition": false,
    //         "routineId": "654aaaa4dd97bee01b12ae23",
    //         "moveId": "654a8c9b7407b2b1be8ac6b6",
    //         "creatorId": "652ef49aff9881f8395eb350",
    //         "createdAt": "2023-11-08T18:47:40.012Z",
    //         "updatedAt": "2023-11-08T18:47:40.012Z",
    //         "__v": 0,
    //         "id": "654bd7cc864646380792d6f9"
    //     },
    //     {
    //         "_id": "654bd7e5864646380792d6fd",
    //         "duration": 30,
    //         "position": 13,
    //         "transition": false,
    //         "routineId": "654aaaa4dd97bee01b12ae23",
    //         "moveId": "654a8ca57407b2b1be8ac6ba",
    //         "creatorId": "652ef49aff9881f8395eb350",
    //         "createdAt": "2023-11-08T18:48:05.050Z",
    //         "updatedAt": "2023-11-08T18:48:05.050Z",
    //         "__v": 0,
    //         "id": "654bd7e5864646380792d6fd"
    //     },
    //     {
    //         "_id": "654bd7fd864646380792d701",
    //         "duration": 30,
    //         "position": 14,
    //         "transition": false,
    //         "routineId": "654aaaa4dd97bee01b12ae23",
    //         "moveId": "654aad15e27786d158ce50f9",
    //         "creatorId": "652ef49aff9881f8395eb350",
    //         "createdAt": "2023-11-08T18:48:29.258Z",
    //         "updatedAt": "2023-11-08T18:48:29.258Z",
    //         "__v": 0,
    //         "id": "654bd7fd864646380792d701"
    //     },
    //     {
    //         "_id": "654bd814864646380792d705",
    //         "duration": 30,
    //         "position": 15,
    //         "transition": false,
    //         "routineId": "654aaaa4dd97bee01b12ae23",
    //         "moveId": "654ab25f75947260e0a029f4",
    //         "creatorId": "652ef49aff9881f8395eb350",
    //         "createdAt": "2023-11-08T18:48:52.660Z",
    //         "updatedAt": "2023-11-08T18:48:52.660Z",
    //         "__v": 0,
    //         "id": "654bd814864646380792d705"
    //     }
    // ],
    // "id": "654aaaa4dd97bee01b12ae23"
    
    "_id": "654aaaa4dd97bee01b12ae23",
    "name": "Saturday Refresh Kick",
    "description": "A refreshing class for all levels, this vinyasa flow class continues to build on the foundation established in Beginner Yoga. Working with the needs of the class, more attention is placed on alignment, breath work, and coordination. Participants begin to explore more challenging asanas (poses) with plenty of options for everyone. This is an excellent class for beginning through experienced students.",
    "category": [
        "core yoga"
    ],
    "target": [
        {
            "core": {
                "name": "core",
                "count": 6
            }
        },
        {
            "glutes": {
                "name": "glutes",
                "count": 5
            }
        },
        {
            "shoulder": {
                "name": "shoulder",
                "count": 7
            }
        },
        {
            "upper back": {
                "name": "upper back",
                "count": 9
            }
        },
        {
            "neck": {
                "name": "neck",
                "count": 5
            }
        },
        {
            "inner thighs": {
                "name": "inner thighs",
                "count": 1
            }
        },
        {
            "quads": {
                "name": "quads",
                "count": 1
            }
        },
        {
            "hips": {
                "name": "hips",
                "count": 1
            }
        },
        {
            "hamstrings": {
                "name": "hamstrings",
                "count": 4
            }
        },
        {
            "arms": {
                "name": "arms",
                "count": 3
            }
        },
        {
            "lower back": {
                "name": "lower back",
                "count": 4
            }
        },
        {
            "chest": {
                "name": "chest",
                "count": 1
            }
        }
    ],
    "isPrivate": true,
    "isArchived": true,
    "playCount": 0,
    "playTime": 0,
    "creatorId": "652ef49aff9881f8395eb350",
    "level": "beginner",
    "moves": [
        "654bc9c161ddf2156392cd66",
        "654bbd499ae5b82890ab0232",
        "654bc9d73f55b45d7b0f3ea9",
        "654bd73d864646380792d6e5",
        "654bd673864646380792d6d5",
        "654bd69d864646380792d6d9",
        "654bd727864646380792d6df",
        "654bd75e864646380792d6e9",
        "654bd781864646380792d6ed",
        "654bd799864646380792d6f1",
        "654bd7b4864646380792d6f5",
        "654bd7cc864646380792d6f9",
        "654bd7e5864646380792d6fd",
        "654bd7fd864646380792d701",
        "654bd814864646380792d705"
    ],
    "createdAt": "2023-11-07T21:22:44.148Z",
    "updatedAt": "2023-11-09T22:13:12.398Z",
    "__v": 3,
    "isExample": false,
    "keyImage": "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHlvZ2F8ZW58MHx8MHx8fDA%3D",
    "creator": {
        "_id": "652ef49aff9881f8395eb350",
        "name": "lauraalspaugh2002",
        "picture": "https://s.gravatar.com/avatar/adb1a81448fd211a1c2107bc4dbd9772?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fla.png",
        "id": "652ef49aff9881f8395eb350"
    },
    "moveCount": 14,
    "listEntry": [
        {
            "_id": "654bbd499ae5b82890ab0232",
            "name": "Weekend",
            "duration": 60,
            "position": 2,
            "transition": true,
            "routineId": "654aaaa4dd97bee01b12ae23",
            "moveId": "654a8bc57407b2b1be8ac694",
            "move": {
                "_id": "654a8bc57407b2b1be8ac694",
                "imgUrl": "https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483088/yoga-api/27_m4yux9.svg",
                "bodyPart": [
                    "core",
                    "glutes",
                    "shoulder"
                ],
                "englishName": "Plow",
                "id": "654a8bc57407b2b1be8ac694"
            },
            "id": "654bbd499ae5b82890ab0232"
        },
        {
            "_id": "654bc9c161ddf2156392cd66",
            "duration": 60,
            "position": 1,
            "transition": false,
            "routineId": "654aaaa4dd97bee01b12ae23",
            "moveId": "654a8c757407b2b1be8ac6ac",
            "move": {
                "_id": "654a8c757407b2b1be8ac6ac",
                "imgUrl": "https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483073/yoga-api/2_ozh7sv.svg",
                "bodyPart": [
                    "core",
                    "upper back",
                    "neck"
                ],
                "englishName": "Half Boat",
                "id": "654a8c757407b2b1be8ac6ac"
            },
            "id": "654bc9c161ddf2156392cd66"
        },
        {
            "_id": "654bc9d73f55b45d7b0f3ea9",
            "duration": 60,
            "position": 3,
            "transition": false,
            "routineId": "654aaaa4dd97bee01b12ae23",
            "moveId": "654a8c757407b2b1be8ac6ac",
            "move": {
                "_id": "654a8c757407b2b1be8ac6ac",
                "imgUrl": "https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483073/yoga-api/2_ozh7sv.svg",
                "bodyPart": [
                    "core",
                    "upper back",
                    "neck"
                ],
                "englishName": "Half Boat",
                "id": "654a8c757407b2b1be8ac6ac"
            },
            "id": "654bc9d73f55b45d7b0f3ea9"
        },
        {
            "_id": "654bd673864646380792d6d5",
            "duration": 45,
            "position": 5,
            "transition": false,
            "routineId": "654aaaa4dd97bee01b12ae23",
            "moveId": "654a8bc57407b2b1be8ac694",
            "move": {
                "_id": "654a8bc57407b2b1be8ac694",
                "imgUrl": "https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483088/yoga-api/27_m4yux9.svg",
                "bodyPart": [
                    "core",
                    "glutes",
                    "shoulder"
                ],
                "englishName": "Plow",
                "id": "654a8bc57407b2b1be8ac694"
            },
            "id": "654bd673864646380792d6d5"
        },
        {
            "_id": "654bd69d864646380792d6d9",
            "duration": 90,
            "position": 6,
            "transition": false,
            "routineId": "654aaaa4dd97bee01b12ae23",
            "moveId": "654a8be97407b2b1be8ac69a",
            "move": {
                "_id": "654a8be97407b2b1be8ac69a",
                "imgUrl": "https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483084/yoga-api/17_l9joyu.svg",
                "bodyPart": [
                    "inner thighs",
                    "core",
                    "glutes",
                    "quads",
                    "hips"
                ],
                "englishName": "Extended Hand to Toe",
                "id": "654a8be97407b2b1be8ac69a"
            },
            "id": "654bd69d864646380792d6d9"
        },
        {
            "_id": "654bd727864646380792d6df",
            "duration": 120,
            "position": 7,
            "transition": false,
            "routineId": "654aaaa4dd97bee01b12ae23",
            "moveId": "654a8bff7407b2b1be8ac69e",
            "move": {
                "_id": "654a8bff7407b2b1be8ac69e",
                "imgUrl": "https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483080/yoga-api/14_k9lr9a.svg",
                "bodyPart": [
                    "hamstrings",
                    "shoulder",
                    "arms",
                    "upper back"
                ],
                "englishName": "Dolphin",
                "id": "654a8bff7407b2b1be8ac69e"
            },
            "id": "654bd727864646380792d6df"
        },
        {
            "_id": "654bd73d864646380792d6e5",
            "duration": 120,
            "position": 4,
            "transition": false,
            "routineId": "654aaaa4dd97bee01b12ae23",
            "moveId": "654a8bff7407b2b1be8ac69e",
            "move": {
                "_id": "654a8bff7407b2b1be8ac69e",
                "imgUrl": "https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483080/yoga-api/14_k9lr9a.svg",
                "bodyPart": [
                    "hamstrings",
                    "shoulder",
                    "arms",
                    "upper back"
                ],
                "englishName": "Dolphin",
                "id": "654a8bff7407b2b1be8ac69e"
            },
            "id": "654bd73d864646380792d6e5"
        },
        {
            "_id": "654bd75e864646380792d6e9",
            "duration": 120,
            "position": 8,
            "transition": false,
            "routineId": "654aaaa4dd97bee01b12ae23",
            "moveId": "654a8c157407b2b1be8ac6a2",
            "move": {
                "_id": "654a8c157407b2b1be8ac6a2",
                "imgUrl": "https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483085/yoga-api/20_uogrfq.svg",
                "bodyPart": [
                    "hamstrings",
                    "shoulder",
                    "neck",
                    "lower back"
                ],
                "englishName": "Forward Bend with Shoulder Opener",
                "id": "654a8c157407b2b1be8ac6a2"
            },
            "id": "654bd75e864646380792d6e9"
        },
        {
            "_id": "654bd781864646380792d6ed",
            "duration": 30,
            "position": 9,
            "transition": false,
            "routineId": "654aaaa4dd97bee01b12ae23",
            "moveId": "654a8c617407b2b1be8ac6a8",
            "move": {
                "_id": "654a8c617407b2b1be8ac6a8",
                "imgUrl": "https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483072/yoga-api/3_aa0fgk.svg",
                "bodyPart": [
                    "chest",
                    "upper back",
                    "lower back",
                    "glutes"
                ],
                "englishName": "Bow",
                "id": "654a8c617407b2b1be8ac6a8"
            },
            "id": "654bd781864646380792d6ed"
        },
        {
            "_id": "654bd799864646380792d6f1",
            "duration": 30,
            "position": 10,
            "transition": false,
            "routineId": "654aaaa4dd97bee01b12ae23",
            "moveId": "654a8c757407b2b1be8ac6ac",
            "move": {
                "_id": "654a8c757407b2b1be8ac6ac",
                "imgUrl": "https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483073/yoga-api/2_ozh7sv.svg",
                "bodyPart": [
                    "core",
                    "upper back",
                    "neck"
                ],
                "englishName": "Half Boat",
                "id": "654a8c757407b2b1be8ac6ac"
            },
            "id": "654bd799864646380792d6f1"
        },
        {
            "_id": "654bd7b4864646380792d6f5",
            "duration": 30,
            "position": 11,
            "transition": false,
            "routineId": "654aaaa4dd97bee01b12ae23",
            "moveId": "654a8c7f7407b2b1be8ac6b0",
            "move": {
                "_id": "654a8c7f7407b2b1be8ac6b0",
                "imgUrl": "https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483077/yoga-api/8_wi10sn.svg",
                "bodyPart": [
                    "upper back",
                    "lower back",
                    "shoulder",
                    "neck"
                ],
                "englishName": "Cow",
                "id": "654a8c7f7407b2b1be8ac6b0"
            },
            "id": "654bd7b4864646380792d6f5"
        },
        {
            "_id": "654bd7cc864646380792d6f9",
            "duration": 30,
            "position": 12,
            "transition": false,
            "routineId": "654aaaa4dd97bee01b12ae23",
            "moveId": "654a8c9b7407b2b1be8ac6b6",
            "move": {
                "_id": "654a8c9b7407b2b1be8ac6b6",
                "imgUrl": "https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483078/yoga-api/11_dczyrp.png",
                "bodyPart": [],
                "englishName": "Corpse",
                "id": "654a8c9b7407b2b1be8ac6b6"
            },
            "id": "654bd7cc864646380792d6f9"
        },
        {
            "_id": "654bd7e5864646380792d6fd",
            "duration": 30,
            "position": 13,
            "transition": false,
            "routineId": "654aaaa4dd97bee01b12ae23",
            "moveId": "654a8ca57407b2b1be8ac6ba",
            "move": {
                "_id": "654a8ca57407b2b1be8ac6ba",
                "imgUrl": "https://plus.unsplash.com/premium_photo-1669914071313-23485490344b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "bodyPart": [],
                "englishName": "Interval",
                "id": "654a8ca57407b2b1be8ac6ba"
            },
            "id": "654bd7e5864646380792d6fd"
        },
        {
            "_id": "654bd7fd864646380792d701",
            "duration": 30,
            "position": 14,
            "transition": false,
            "routineId": "654aaaa4dd97bee01b12ae23",
            "moveId": "654aad15e27786d158ce50f9",
            "move": {
                "_id": "654aad15e27786d158ce50f9",
                "imgUrl": "https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483081/yoga-api/15_vkviqn.svg",
                "bodyPart": [
                    "hamstrings",
                    "lower back",
                    "shoulder",
                    "upper back"
                ],
                "englishName": "Downward-Facing Dog",
                "id": "654aad15e27786d158ce50f9"
            },
            "id": "654bd7fd864646380792d701"
        },
        {
            "_id": "654bd814864646380792d705",
            "duration": 30,
            "position": 15,
            "transition": false,
            "routineId": "654aaaa4dd97bee01b12ae23",
            "moveId": "654ab25f75947260e0a029f4",
            "move": {
                "_id": "654ab25f75947260e0a029f4",
                "imgUrl": "https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483097/yoga-api/48_unoav6.svg",
                "bodyPart": [
                    "upper back",
                    "arms",
                    "glutes"
                ],
                "englishName": "Wild Thing",
                "id": "654ab25f75947260e0a029f4"
            },
            "id": "654bd814864646380792d705"
        }
    ],
    "id": "654aaaa4dd97bee01b12ae23"

        })
    }
    }
};
</script>


<style lang="scss" scoped>
.active-move{
background-color: #0F2D24;
}
img{
border: solid black 2px;
border-radius: 3px;
width: 580px; 
height: 350px;
box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.412);
object-fit: cover;
position: center;
    
}
.name-text{
color: white;
font-size: 50px;

}
.text-mint{
  color: #BCC8C4;
}
</style>