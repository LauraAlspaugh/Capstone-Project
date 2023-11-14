<template>
  <div class="component">
    <canvas ref="myCanvas" width="200" height="200" style="border:1px solid #00000"></canvas>


  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
export default {
  setup() {

    let myCanvas = ref(null);

    onMounted(() => {
      let canvas = myCanvas.value;

      let ctx = canvas.getContext('2d');

      ctx.beginPath()
      ctx.arc(95, 90, 70, 0, 2 * Math.PI);
      ctx.stroke();

      let numDots = 30
      let outerDotsRadius = 60
      let innerDotsRadius = 50

      for (let i = 0; i < numDots; i++) {
        let angle = (i / numDots) * Math.PI * 2;
        let x = 95 + outerDotsRadius * Math.cos(angle);
        let y = 90 + outerDotsRadius * Math.sin(angle);

        ctx.beginPath();
        ctx.arc(x, y, 1, 0, 2 * Math.PI);
        ctx.fillStyle = 'grey';
        ctx.fill();
      }

      for (let i = 0; i < numDots; i++) {
        let angle = (i / numDots) * Math.PI * 2;
        let x = 95 + innerDotsRadius * Math.cos(angle);
        let y = 90 + innerDotsRadius * Math.sin(angle);

        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fillStyle = 'black';
        ctx.fill();
      }

    })


    return {
      myCanvas,

      // drawCircle() {
      //   let canvas = this.$refs.timerCanvas
      //   if (!canvas) return
      //   let timerContext = canvas.getContext("2d")
      //   timerContext.clearRect(0, 0, canvas.height, canvas.width)

      //   timerContext.beginPath();
      //   timerContext.arc(95, 50, 40, 0, 2 * Math.PI);
      //   timerContext.stroke();
      // }
    }
  }
};
</script>


<style lang="scss" scoped></style>