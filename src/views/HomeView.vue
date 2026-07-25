<template>

<div class="home-page">

    <AnnouncementPopup />
    <Header/>

    <Banner/>

    <QuickMenu/>

    <PlanTabs
        :plans="plans"
        v-model="selectedPlan"
    />

    <div class="row g-3 product-list">

        <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="col-6"
        >

            <PlanCard
                :product="product"
            />

        </div>

    </div>

    <Footer/>

</div>

</template>

<script setup>

import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "@/services/api";

import Header from "@/components/Header.vue";
import Banner from "@/components/Banner.vue";
import QuickMenu from "@/components/QuickMenu.vue";
import PlanTabs from "@/components/PlanTabs.vue";
import PlanCard from "@/components/PlanCard.vue";
import Footer from "@/components/Footer.vue";
import AnnouncementPopup from "@/components/AnnouncementPopup.vue";

const router = useRouter();

const plans = ref([]);
const products = ref([]);
const selectedPlan = ref(null);

const loadPlans = async () => {

    try {

        const response = await api.get("/plans/all");

        plans.value = response.data;

        if (plans.value.length > 0) {
            selectedPlan.value = plans.value[0].id;
        }

    } catch (error) {

        console.error(error);

        if (error.response?.status === 401) {

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            router.replace("/");

        }

    }

};

const loadProducts = async () => {

    try {

        const response = await api.get("/products");

        products.value = response.data;

    } catch (error) {

        console.error(error);

        if (error.response?.status === 401) {

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            router.replace("/");

        }

    }

};

onMounted(async () => {

    const token = localStorage.getItem("token");

    if (!token) {

        router.replace("/");
        return;

    }

    await loadPlans();
    await loadProducts();

});

const filteredProducts = computed(() => {

    return products.value.filter(
        x => x.planId === selectedPlan.value
    );

});

</script>
<style scoped>

/* ===========================
   Home Layout
=========================== */

.home-page{

    min-height:100vh;

    background:linear-gradient(
        180deg,
        #151515,
        #222
    );

    padding-bottom:90px;

}



/* ===========================
   Product Section
=========================== */


.product-list{

    padding:10px 15px;

    margin:0;

}



/* Product column spacing */

.product-list > div{

    display:flex;

}



/* ===========================
   Mobile
=========================== */


@media(max-width:576px){


    .home-page{

        padding-bottom:100px;

    }


    .product-list{

        padding:8px 10px;

    }


}



/* ===========================
   Extra Small Device
=========================== */


@media(max-width:360px){


    .product-list{

        padding:5px;

    }


}

</style>