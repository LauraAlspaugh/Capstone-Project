<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-5">
        <canvas ref="myCanvas" class="timer"></canvas>
      </div>
    </section>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref, watch } from 'vue';
import { movesService } from '../services/MovesService.js'

export default {
  setup() {
    // let canvasWidth = 450;
    // let canvasHeight = 450;

    // const scaledWidth = computed(() => canvasWidth * scale);
    // const scaledHeight = computed(() => canvasHeight * scale);

    // let scale = window.devicePixelRatio;

    let moveNumber = ref(0);

    watch(moveNumber, () => {
      if (moveNumber.value) {
        countdown.value = AppState.activeRoutine.listEntry[moveNumber.value].duration
      }
    });

    let myCanvas = ref(null);

    let totalTime = computed(() => {
      return AppState.activeRoutine.listEntry[moveNumber.value].duration;
    }); //total time we want to count down in seconds

    let countdown = ref(AppState.activeRoutine.listEntry[moveNumber.value].duration); //time remaining in seconds, gets updated whenever moveNumber changes due to watch

    let intervalId;

    let numDots = 30
    let outerDotsRadius = 120
    let innerDotsRadius = 100

    const drawCircles = () => {

      let canvas = myCanvas.value;

      let ctx = canvas.getContext('2d');

      // let canvasWidth = 290;
      // let canvasHeight = 290;

      canvas.width = 320;
      canvas.height = 320;

      // const scaledWidth = computed(() => canvasWidth * scale);
      // const scaledHeight = computed(() => canvasHeight * scale);


      // let scale = window.devicePixelRatio;
      // canvas.width = scaledWidth.value;
      // canvas.height = scaledHeight.value;
      // canvas.width = canvasWidth * scale;
      // canvas.height = canvasHeight * scale;

      // ctx.scale(scale, scale);

      ctx.clearRect(25, 20, 150, 140);

      ctx.beginPath()
      ctx.arc(160, 160, 130, 0, 2 * Math.PI);
      ctx.fillStyle = 'black';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      for (let i = 0; i < numDots; i++) {
        let angle = (i / numDots) * Math.PI * 2;
        let x = 160 + outerDotsRadius * Math.cos(angle);
        let y = 160 + outerDotsRadius * Math.sin(angle);

        ctx.beginPath();
        ctx.arc(x, y, 1, 0, 2 * Math.PI);
        ctx.lineWidth = .25;
        ctx.fillStyle = 'black';
        ctx.fill();
      }

      let dotsToDisappear = Math.floor((countdown.value / totalTime.value) * numDots);

      for (let i = 0; i < dotsToDisappear; i++) {
        let angle = (-i / numDots) * Math.PI * 2 + Math.PI / 2 + Math.PI;
        let x = 160 + innerDotsRadius * Math.cos(angle);
        let y = 160 + innerDotsRadius * Math.sin(angle);

        ctx.beginPath();
        ctx.arc(x, y, 7, 0, 2 * Math.PI);
        ctx.lineWidth = .25;

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
            moveNumber.value++
            resetTimer();
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
      countdown.value = totalTime.value;
      drawCircles();
      startTimer();
      setTimeout(() => {
        movesService.startMove();
      }, 100);
    }

    onMounted(() => {
      drawCircles();
      // startTimer();
    })


    return {
      myCanvas,
      countdown,
      resetTimer,
      pauseTimer,
      resumeTimer,
      startTimer,
      // scaledWidth,
      // scaledHeight,
    }

  }

};

</script>


<style lang="scss" scoped>
.timer {
  border: 1px solid black;
  width: 50%;
  height: auto;
  transform-origin: 0 0;
  transform: scale(1); // The scaling is applied through width and height
}
</style>