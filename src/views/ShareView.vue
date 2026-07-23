<template>
  <div class="team-page">

    <Header />

    <ShareSection />

    <Footer />

  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

import Header from "@/components/Header.vue";
import ShareSection from "@/components/ShareSection.vue";
import Footer from "@/components/Footer.vue";

const router = useRouter();

onMounted(() => {

    const token = localStorage.getItem("token");

    if (!token) {
        router.replace("/");
    }

});
</script>

<style scoped>
.team-page{
    min-height:100vh;
    background:#f4f7fc;
    padding-bottom:80px;
}
</style>