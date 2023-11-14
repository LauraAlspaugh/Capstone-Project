<template>
  <div class="component">
    <canvas ref="myCanvas" width="200" height="200" class="timer"></canvas>


  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Timer from "easytimer.js";
import { logger } from '../utils/Logger.js';

export default {
  setup() {

    let myCanvas = ref(null);
    let totalTime = 60;  //total time we want to count down in seconds
    let countdown = ref(totalTime); //time remaining in seconds

    onMounted(() => {
      let canvas = myCanvas.value;

      let ctx = canvas.getContext('2d');


      let numDots = 30
      let outerDotsRadius = 60
      let innerDotsRadius = 50

      const drawCircles = () => {
        ctx.clearRect(25, 20, 150, 140);

        ctx.beginPath()
        ctx.arc(95, 90, 70, 0, 2 * Math.PI);
        ctx.stroke();

        for (let i = 0; i < numDots; i++) {
          let angle = (i / numDots) * Math.PI * 2;
          let x = 95 + outerDotsRadius * Math.cos(angle);
          let y = 90 + outerDotsRadius * Math.sin(angle);

          ctx.beginPath();
          ctx.arc(x, y, 1, 0, 2 * Math.PI);
          ctx.fillStyle = 'grey';
          ctx.fill();
        }

        let dotsToDisappear = Math.floor((countdown.value / totalTime) * numDots);

        for (let i = 0; i < dotsToDisappear; i++) {
          let angle = (-i / numDots) * Math.PI * 2 + Math.PI / 2 + Math.PI;
          let x = 95 + innerDotsRadius * Math.cos(angle);
          let y = 90 + innerDotsRadius * Math.sin(angle);

          ctx.beginPath();
          ctx.arc(x, y, 3, 0, 2 * Math.PI);

          if (i >= dotsToDisappear) {
            ctx.fillStyle = "white";
          } else {
            ctx.fillStyle = "black";
          }

          ctx.fill();
        }
      }

      drawCircles();

      let endTime = new Date().getTime() + countdown.value * 1000;

      let intervalDuration = 50;

      const intervalId = setInterval(() => {
        let currentTime = new Date().getTime()
        countdown.value = Math.max(0, (endTime - currentTime) / 1000)

        if (countdown.value <= 0) {
          clearInterval(intervalId);
          // or perform other actions when countdown reaches 0
        } else {
          drawCircles();
        }
      }, intervalDuration);
    })


    return {
      myCanvas,
      countdown,

    }
  }
};
</script>


<style lang="scss" scoped>
.timer {
  border: 1px solid black;
}
</style>