<template>
  <nav class="bottom-menu">

    <RouterLink
  to="/home"
  class="menu-item"
  :class="{ active: $route.path === '/home' }"
>
  <i class="bi bi-house-door-fill"></i>
  <span>Home</span>
</RouterLink>

    <RouterLink
      to="/recharge"
      class="menu-item"
      :class="{ active: $route.path === '/recharge' }"
    >
      <i class="bi bi-wallet2"></i>
      <span>Recharge</span>
    </RouterLink>

    <RouterLink
      to="/share"
      class="menu-item center-btn"
      :class="{ active: $route.path === '/share' }"
    >
      <div class="center-icon">
        <i class="bi bi-cash-stack"></i>
      </div>
      <span>Share</span>
    </RouterLink>

    <RouterLink
      to="/team"
      class="menu-item"
      :class="{ active: $route.path === '/team' }"
    >
      <i class="bi bi-people-fill"></i>
      <span>Team</span>
    </RouterLink>

    <RouterLink
      to="/profile"
      class="menu-item"
      :class="{ active: $route.path === '/profile' }"
    >
      <i class="bi bi-person-circle"></i>
      <span>Profile</span>
    </RouterLink>

  </nav>
</template>

<script setup>
import { useRoute } from "vue-router";

const $route = useRoute();
</script>
<style scoped>

.bottom-menu{

    position:fixed;

    left:50%;

    bottom:10px;

    transform:translateX(-50%);


    width:min(calc(100% - 16px),520px);

    height:68px;


    background:linear-gradient(145deg,#2b2b2b,#383838);


    display:flex;

    justify-content:space-around;

    align-items:center;


    border-radius:22px;


    border:1px solid rgba(255,255,255,.08);


    box-shadow:

    0 8px 25px rgba(0,0,0,.35),

    0 0 20px rgba(246,198,103,.15);


    z-index:1000;

}



/* =====================
   Menu Item
===================== */

.menu-item{

    flex:1;


    display:flex;

    flex-direction:column;

    align-items:center;

    justify-content:center;


    text-decoration:none !important;


    color:#f6c667 !important;


    font-size:12px;

    font-weight:600;


    transition:.35s;


}



/* Icon */

.menu-item i{

    font-size:22px;

    margin-bottom:4px;


    color:#f6c667 !important;


    transition:.35s;

}



/* Text */

.menu-item span{


    color:#f6c667 !important;


    font-size:12px;


    font-weight:600;


}



/* =====================
   Hover Effect
===================== */

.menu-item:hover,
.menu-item:hover span,
.menu-item:hover i{


    color:#ffffff !important;


}



.menu-item:hover i{


    transform:translateY(-4px);


}



/* =====================
   Active Menu
===================== */

.menu-item.active,
.menu-item.active span,
.menu-item.active i{


    color:#f6c667 !important;


    font-weight:700;


}



.menu-item.active i{


    text-shadow:

    0 0 10px rgba(246,198,103,.8);


    transform:translateY(-3px);


}



/* =====================
   Center Share Button
===================== */

.center-btn{


    position:relative;


}



.center-icon{


    width:52px;

    height:52px;


    margin-top:-38px;


    border-radius:50%;


    display:flex;

    justify-content:center;

    align-items:center;



    background:

    linear-gradient(135deg,#f6c667,#c79b3b);



    border:4px solid #2b2b2b;



    box-shadow:

    0 8px 20px rgba(246,198,103,.45);



    transition:.35s;


}



.center-icon i{


    color:#222 !important;


    font-size:24px;


    margin:0;


}



.center-btn span{


    margin-top:5px;


    color:#f6c667 !important;


}



/* Center Hover */

.center-btn:hover .center-icon{


    transform:translateY(-6px) scale(1.05);


}



/* Center Active */

.center-btn.active .center-icon{


    background:

    linear-gradient(135deg,#ffffff,#f6c667);


}



/* =====================
   Mobile
===================== */

@media(max-width:576px){


    .bottom-menu{


        height:64px;


        border-radius:20px;


    }



    .menu-item i{


        font-size:20px;


    }



    .menu-item span{


        font-size:11px;


    }



    .center-icon{


        width:48px;

        height:48px;


    }



}

</style>