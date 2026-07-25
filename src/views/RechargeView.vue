<template>
  <div class="container-fluid px-3 pb-3">

    <!-- Header -->
    <Header />

    <!-- Tabs -->
    <div class="tabs mt-3">

      <button
        class="tab-btn"
        :class="{ active: activeTab === 'recharge' }"
        @click="changeTab('recharge')"
      >
        Recharge
      </button>

      <button
        class="tab-btn"
        :class="{ active: activeTab === 'withdraw' }"
        @click="changeTab('withdraw')"
      >
        Withdraw
      </button>

    </div>

    <!-- Content -->
    <RechargeCard v-if="activeTab === 'recharge'" />

    <WithdrawCard v-else />

    <!-- Footer -->
    <Footer />

  </div>
</template>

<script setup>

import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

import Header from "@/components/Header.vue";
import RechargeCard from "@/components/RechargeCard.vue";
import WithdrawCard from "@/components/WithdrawCard.vue";
import Footer from "@/components/Footer.vue";
import Swal from "sweetalert2";

const router = useRouter();
const route = useRoute();

const activeTab = ref("recharge");

/* --------------------------
   Change Tab
--------------------------- */

function changeTab(tab) {

    activeTab.value = tab;

    router.replace({

        path: "/recharge",

        query: {

            tab

        }

    });

    if (tab === "withdraw") {

        showWithdrawWarning();

    }

}

function showWithdrawWarning() {

    Swal.fire({

        toast: true,

        position: "top-end",

        icon: "warning",

        title: "⚠ Use BEP20 network only.",

        showConfirmButton: false,

        timer: 3000,

        timerProgressBar: true,

        width: "280px",

        padding: "0.6rem",

        background: "#2b2b2b",

        color: "#f6c667"

    });

}

/* --------------------------
   Initialize Page
--------------------------- */

onMounted(() => {

    const token = localStorage.getItem("token");

    if (!token) {

        router.replace("/");
        return;

    }

    if (route.query.tab === "withdraw") {

        activeTab.value = "withdraw";

        showWithdrawWarning();

    } else {

        activeTab.value = "recharge";

    }

    });

/* --------------------------
   Watch URL Changes
--------------------------- */

watch(
    () => route.query.tab,
    (tab) => {

        if (tab === "withdraw") {

            activeTab.value = "withdraw";

        } else {

            activeTab.value = "recharge";

        }

    }
);

</script>
<style scoped>

/* ===========================
   Page Background
=========================== */

.container-fluid{

    min-height:100vh;

    padding-bottom:100px;

    background:linear-gradient(
        180deg,
        #151515,
        #222
    );

}



/* ===========================
   Tabs Container
=========================== */

.tabs{

    display:flex;

    margin:20px 15px;

    background:linear-gradient(
        145deg,
        #2b2b2b,
        #383838
    );

    border-radius:16px;

    overflow:hidden;

    border:1px solid rgba(255,255,255,.08);

    box-shadow:
    0 8px 20px rgba(0,0,0,.3);

}



/* ===========================
   Tab Button
=========================== */

.tab-btn{


    flex:1;

    border:none;

    padding:14px;

    background:transparent;

    color:#d8d8d8;

    font-size:15px;

    font-weight:700;

    cursor:pointer;

    transition:.3s;


}



/* Hover */

.tab-btn:hover{

    color:#f6c667;

    background:rgba(246,198,103,.08);

}



/* Active */

.tab-btn.active{


    background:linear-gradient(
        135deg,
        #f6c667,
        #c79b3b
    );


    color:#222;


    box-shadow:

    0 5px 15px rgba(246,198,103,.35);


}



/* ===========================
   Mobile
=========================== */


@media(max-width:576px){


    .tabs{

        margin:15px 10px;

        border-radius:14px;

    }


    .tab-btn{

        padding:12px;

        font-size:14px;

    }


}

</style>