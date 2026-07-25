<template>
  <section class="banner-section">

    <div
      id="bannerCarousel"
      class="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="3000"
    >

      <!-- Indicators -->
      <div class="carousel-indicators">

        <button
          v-for="(banner,index) in banners"
          :key="index"
          type="button"
          data-bs-target="#bannerCarousel"
          :data-bs-slide-to="index"
          :class="{ active: index === 0 }"
        ></button>

      </div>

      <!-- Slides -->
      <div class="carousel-inner">

        <div
          v-for="(banner,index) in banners"
          :key="index"
          class="carousel-item"
          :class="{ active: index === 0 }"
        >

          <img
            :src="banner.image"
            class="d-block w-100 banner-image"
            :alt="banner.title"
          />

        </div>

      </div>

    </div>

  </section>
</template>

<script setup>

import banner1 from '@/assets/images/banner.png'
import banner2 from '@/assets/images/banner.png'
import banner3 from '@/assets/images/banner.png'

const banners = [

    {
        title: "Banner 1",
        image: banner1
    },

    {
        title: "Banner 2",
        image: banner2
    },

    {
        title: "Banner 3",
        image: banner3
    }

]

</script>

<style scoped>

.banner-section{
    margin-top:10px;
}

.banner-image{

    width:100%;
    height:190px;
    object-fit:cover;
    border-radius:15px;

}

.carousel-indicators button{

    width:8px;
    height:8px;
    border-radius:50%;

}

</style>