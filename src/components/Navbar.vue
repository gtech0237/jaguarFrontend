<template>
  <nav class="navbar-section">

    <div class="container-fluid">

      <div class="row text-center">

        <div class="col">
          <RouterLink
            to="/"
            class="nav-item"
            active-class="active"
          >
            <i class="bi bi-house-door-fill"></i>
            <span>Home</span>
          </RouterLink>
        </div>

        <div class="col">
          <RouterLink
            to="/recharge"
            class="nav-item"
            active-class="active"
          >
            <i class="bi bi-wallet2"></i>
            <span>Recharge</span>
          </RouterLink>
        </div>

        <div class="col">
          <RouterLink
            to="/team"
            class="nav-item"
            active-class="active"
          >
            <i class="bi bi-people-fill"></i>
            <span>Team</span>
          </RouterLink>
        </div>

        <div class="col">
          <RouterLink
            to="/wallet"
            class="nav-item"
            active-class="active"
          >
            <i class="bi bi-person-circle"></i>
            <span>Profile</span>
          </RouterLink>
        </div>

      </div>

    </div>

  </nav>
</template>

<script setup>
// No JavaScript required
</script>
<style scoped>

/* ===========================
   Navigation Bar
=========================== */

.navbar-section{

    width:100%;

    background:linear-gradient(145deg,#2b2b2b,#383838);

    border-bottom:1px solid rgba(255,255,255,.08);

    padding:12px 0;

    box-shadow:0 6px 18px rgba(0,0,0,.18);

}

/* ===========================
   Navigation Item
=========================== */

.nav-item{

    display:flex;

    flex-direction:column;

    align-items:center;

    justify-content:center;

    gap:5px;

    text-decoration:none;

    color:#cfcfcf;

    padding:10px 0;

    margin:0 3px;

    border-radius:14px;

    transition:.35s;

}

.nav-item i{

    font-size:22px;

    color:#f6c667;

    transition:.35s;

}

.nav-item span{

    font-size:12px;

    font-weight:600;

    transition:.35s;

}

/* ===========================
   Hover
=========================== */

.nav-item:hover{

    background:linear-gradient(145deg,#7f6744,#9d8257);

    color:#fff;

    transform:translateY(-4px);

    box-shadow:0 8px 18px rgba(127,103,68,.35);

}

.nav-item:hover i{

    color:#fff;

}

/* ===========================
   Active
=========================== */

.active{

    background:linear-gradient(145deg,#7f6744,#9d8257);

    color:#fff;

    box-shadow:0 8px 18px rgba(127,103,68,.35);

}

.active i{

    color:#fff;

}

.active span{

    font-weight:700;

}

/* ===========================
   Mobile
=========================== */

@media(max-width:576px){

    .navbar-section{

        padding:10px 0;

    }

    .nav-item{

        padding:8px 0;

    }

    .nav-item i{

        font-size:20px;

    }

    .nav-item span{

        font-size:11px;

    }

}

</style>