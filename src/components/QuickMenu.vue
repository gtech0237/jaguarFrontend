<template>
  <section class="quick-menu">
    <div class="row g-3">
      <div
        class="col-3"
        v-for="menu in menus"
        :key="menu.title"
      >
        <!-- External Link -->
        <a
          v-if="menu.external"
          :href="menu.route"
          target="_blank"
          rel="noopener noreferrer"
          class="menu-item"
        >
          <div class="menu-icon">
            <i :class="menu.icon"></i>
          </div>

          <span>{{ menu.title }}</span>
        </a>

        <!-- Internal Route -->
        <RouterLink
          v-else
          :to="menu.route"
          class="menu-item"
        >
          <div class="menu-icon">
            <i :class="menu.icon"></i>
          </div>

          <span>{{ menu.title }}</span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
const menus = [
  {
    title: "Recharge",
    icon: "bi bi-wallet2",
    route: "/recharge?tab=recharge"
  },
  {
    title: "Withdraw",
    icon: "bi bi-cash-stack",
    route: "/recharge?tab=withdraw"
  },
  {
    title: "Support",
    icon: "bi bi-headset",
    route: "https://t.me/+Qy7KDU2YTv1lYjU1",
    external: true
  },
  {
    title: "Profile",
    icon: "bi bi-person-circle",
    route: "/profile"
  }
];
</script>

/* ===========================
   Quick Menu Container
=========================== */
<style scoped>
.quick-menu{

    padding:15px;

}



/* ===========================
   Menu Card
=========================== */

.menu-item{


    display:flex;

    flex-direction:column;

    align-items:center;

    justify-content:center;



    background:

    linear-gradient(145deg,#2b2b2b,#383838);



    border-radius:15px;



    padding:15px 10px;



    text-decoration:none !important;



    color:#f6c667 !important;



    border:1px solid rgba(255,255,255,.08);



    transition:.35s;



    box-shadow:

    0 6px 18px rgba(0,0,0,.25);



}



/* Hover */

.menu-item:hover{


    transform:translateY(-6px);



    background:

    linear-gradient(145deg,#7f6744,#9d8257);



    box-shadow:

    0 12px 25px rgba(127,103,68,.45);



}



/* ===========================
   Icon Circle
=========================== */

.menu-icon{


    width:55px;


    height:55px;



    border-radius:50%;



    background:

    linear-gradient(135deg,#f6c667,#c79b3b);



    color:#222;



    display:flex;



    align-items:center;



    justify-content:center;



    margin-bottom:10px;



    transition:.35s;



    box-shadow:

    0 8px 18px rgba(246,198,103,.35);



}



.menu-icon i{


    font-size:24px;


    color:#222 !important;


}



/* Icon Hover */

.menu-item:hover .menu-icon{


    transform:scale(1.08);


    background:

    linear-gradient(135deg,#ffffff,#f6c667);



}



/* ===========================
   Menu Text
=========================== */

.menu-item span{


    font-size:13px;



    font-weight:700;



    text-align:center;



    color:#f6c667 !important;



}



/* Hover Text */

.menu-item:hover span{


    color:#ffffff !important;



}



/* ===========================
   Mobile
=========================== */

@media(max-width:576px){


    .quick-menu{


        padding:12px;


    }



    .menu-item{


        padding:12px 8px;


        border-radius:14px;



    }



    .menu-icon{


        width:50px;


        height:50px;



    }



    .menu-icon i{


        font-size:22px;


    }



    .menu-item span{


        font-size:12px;


    }



}

</style>