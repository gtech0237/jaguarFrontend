<template>
  <header class="header">

    <div class="container-fluid px-3">

      <div class="d-flex justify-content-between align-items-center">

        <!-- Logo -->
        <div class="logo-section">

          <img
            src="@/assets/images/logo.jpg"
            alt="Jaguar Logo"
            class="logo"
          />

        </div>

        <!-- Right Icons -->
        <div class="header-icons">

          <button class="icon-btn">

            <i class="bi bi-headset"></i>

          </button>

          <button class="icon-btn ms-2">

            <i class="bi bi-bell"></i>

          </button>

        </div>

      </div>

    </div>

  </header>
</template>

<script setup>

// No JavaScript Required

</script>
<style scoped>

.header{
    width:100%;
    background:#ffffff;
    box-shadow:0 2px 10px rgba(0,0,0,.08);
    position:sticky;
    top:0;
    left:0;
    z-index:1000;
    padding:12px 0;
}

.logo{
    height:42px;
    object-fit:contain;
}

/* Logo hover */

.logo-section{
    display:flex;
    align-items:center;
}

.logo{
    height:42px;
    object-fit:contain;
    transition:.35s ease;
    cursor:pointer;
}

.logo:hover{
    transform:scale(1.05);
}

/* Icons */

.header-icons{
    display:flex;
    align-items:center;
    gap:12px;
}

.icon-btn{

    width:44px;
    height:44px;

    display:flex;
    align-items:center;
    justify-content:center;

    border:none;
    outline:none;

    border-radius:50%;

    background:#ffffff;

    color:#7f6744;

    box-shadow:0 4px 12px rgba(0,0,0,.08);

    transition:all .35s ease;

    cursor:pointer;

}

.icon-btn i{

    font-size:20px;

    transition:.35s;

}

.icon-btn:hover{

    background:#7f6744;

    color:#ffffff;

    transform:translateY(-3px);

    box-shadow:0 8px 18px rgba(127,103,68,.35);

}

.icon-btn:hover i{

    transform:scale(1.15);

}

.icon-btn:active{

    transform:scale(.95);

}

/* Mobile */

@media (max-width:576px){

    .header{
        padding:10px 0;
    }

    .logo{
        height:38px;
    }

    .icon-btn{

        width:40px;
        height:40px;

    }

    .icon-btn i{

        font-size:18px;

    }

}

</style>