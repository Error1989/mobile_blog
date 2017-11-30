<template>
    <div id="slide">
      <!--轮播图-->
      <yd-slider autoplay="5000" speed="500">
        <yd-slider-item>
          <img src="../assets/img/slide1.png">
        </yd-slider-item>
        <yd-slider-item>
          <img src="../assets/img/slide2.jpg">
        </yd-slider-item>
        <yd-slider-item>
          <img src="../assets/img/slide3.jpg">
        </yd-slider-item>
        <yd-slider-item>
          <img src="../assets/img/slide4.jpg">
        </yd-slider-item>
        <yd-slider-item>
          <img src="../assets/img/slide5.jpg">
        </yd-slider-item>
      </yd-slider>
    </div>
</template>

<script>
    export default {
        name: 'slide',
        data () {
            return {

            }
        }
    }
</script>

<style scoped>

</style>
