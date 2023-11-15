<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-5">
        <canvas ref="myCanvas" width="190" height="190" class="timer"></canvas>
        <button @click="resetTimer()" class="btn btn-success">Reset timer</button>
        <button @click="pauseTimer()" class="btn btn-info">Pause timer</button>
        <button @click="resumeTimer()" class="btn btn-warning">Restart timer</button>
      </div>
    </section>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { logger } from '../utils/Logger.js';
import { movesService } from '../services/MovesService.js'

export default {
  setup() {
    let myCanvas = ref(null);
    let totalTime = 10;  //total time we want to count down in seconds
    let countdown = ref(totalTime); //time remaining in seconds

    let intervalId;

    let numDots = 30
    let outerDotsRadius = 60
    let innerDotsRadius = 50

    const drawCircles = () => {
      let canvas = myCanvas.value;

      let ctx = canvas.getContext('2d');

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

    const startTimer = () => {
      let endTime = new Date().getTime() + countdown.value * 1000;
      let intervalDuration = 50;

      if (intervalId == null) {
        intervalId = setInterval(() => {
          let currentTime = new Date().getTime()
          countdown.value = Math.max(0, (endTime - currentTime) / 1000)

          if (countdown.value <= 0) {
            clearInterval(intervalId);
            movesService.finishMove();
            // or perform other actions when countdown reaches 0
          } else {
            drawCircles();
          }
        }, intervalDuration);
      }
    }

    const pauseTimer = () => {
      clearInterval(intervalId);
      intervalId = null;  // Reset intervalId to null when paused
    };

    const resumeTimer = () => {
      startTimer();
    };

    const resetTimer = () => {
      clearInterval(intervalId);
      intervalId = null;
      countdown.value = totalTime;
      drawCircles();
      startTimer();
    };

    onMounted(() => {
      drawCircles();
      startTimer();
    })


    return {
      myCanvas,
      countdown,
      resetTimer,
      pauseTimer,
      resumeTimer,
    }

  }

};

</script>


<style lang="scss" scoped>
.timer {
  border: 1px solid black;
}
</style>