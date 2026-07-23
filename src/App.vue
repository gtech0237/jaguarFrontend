<template>
  <div id="app">

    <!-- Main Router View -->
    <router-view />

    <BottomMenu v-if="showBottomMenu" />

  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import BottomMenu from "@/components/BottomMenu.vue";

const route = useRoute();

const showBottomMenu = computed(() => {
  const hiddenRoutes = ["/", "/admin/login", "/admin/dashboard"];
  return !hiddenRoutes.includes(route.path);
});

// import { onMounted } from "vue";

// onMounted(() => {

//   document.addEventListener("contextmenu", (e) => {
//     e.preventDefault();
//   });

//   document.addEventListener("keydown", (e) => {

//     if (
//       e.key === "F12" ||
//       (e.ctrlKey && e.shiftKey && e.key === "I") ||
//       (e.ctrlKey && e.shiftKey && e.key === "J") ||
//       (e.ctrlKey && e.shiftKey && e.key === "C") ||
//       (e.ctrlKey && e.key === "U")
//     ) {
//       e.preventDefault();
//     }

//   });

//   setInterval(() => {

//     if (
//       window.outerWidth - window.innerWidth > 160 ||
//       window.outerHeight - window.innerHeight > 160
//     ) {

//       alert("Developer tools detected.");

//     }

//   }, 1000);

// });
</script>

<style>
/* Global Styles */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#app {
  width: 100%;
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(135deg, #fff8e1, #eef6ff);
  overflow-x: hidden;
}

body {
  color: #1f2937;
}

#app {
  width: 100%;
  max-width: 520px;
  margin: 0 auto;
  /* padding-bottom: 80px; */
  position: relative;
}

router-view {
  display: block;
}

@keyframes pageFade {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes cardLift {
  from {
    opacity: 0;
    transform: translateY(12px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

a {
  text-decoration: none;
}

button {
  cursor: pointer;
  outline: none;
  border: none;
}

img {
  max-width: 100%;
  display: block;
}

.container {
  max-width: 100%;
  margin: auto;
}

.card,
.form-card,
.summary-card,
.menu-list,
.history-card,
.tabs,
.tab-container,
.profile-banner {
  animation: cardLift 0.5s ease both;
  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.08);
}

.card,
.form-card,
.summary-card,
.menu-list,
.history-card,
.tabs,
.tab-container {
  border: 1px solid rgba(255, 255, 255, 0.85);
  background: rgba(255, 255, 255, 0.92);
}

h1,
h2,
h3,
h4,
h5,
h6,
p,
span,
label,
small,
button,
input,
select {
  color: #1f2937;
}
</style>