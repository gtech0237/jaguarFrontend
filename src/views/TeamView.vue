<template>
  <div class="team-page">

    <Header />

    <TeamSection />

    <Footer />

  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

import Header from "@/components/Header.vue";
import TeamSection from "@/components/TeamSection.vue";
import Footer from "@/components/Footer.vue";

const router = useRouter();

onMounted(() => {

    const token = localStorage.getItem("token");

    if (!token) {

        router.replace("/");
        return;

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