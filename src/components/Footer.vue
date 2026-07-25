<template>
  <footer class="footer">

    <div class="container">

      <div class="footer-logo">

        <!-- <img
          src="@/assets/images/logo.png"
          alt="Jaguar"
        /> -->

      </div>
      <!-- Features -->

      <div class="feature-grid">

        <div class="feature-card">

          <i class="bi bi-shield-lock-fill"></i>

          <span>100% Secure</span>

          <small>Robust Security</small>

        </div>

        <div class="feature-card">

          <i class="bi bi-graph-up-arrow"></i>

          <span>High Return</span>

          <small>Best ROI Plans</small>

        </div>

        <div class="feature-card">

          <i class="bi bi-cash-stack"></i>

          <span>Daily Profit</span>

          <small>Daily Earnings</small>

        </div>

        <div class="feature-card">

          <i class="bi bi-people-fill"></i>

          <span>Referral</span>

          <small>Team Income</small>

        </div>

        <div class="feature-card">

          <i class="bi bi-lightning-charge-fill"></i>

          <span>Fast</span>

          <small>Instant Processing</small>

        </div>

        <div class="feature-card">

          <i class="bi bi-headset"></i>

          <span>24/7</span>

          <small>Support</small>

        </div>

      </div>

      <h5 class="company-name">
        Jaguar
      </h5>

      <p class="company-desc">
        Invest Smart • Earn Daily • Build Your Team
      </p>

      <div class="footer-links">

        <RouterLink to="/">
          Home
        </RouterLink>

        <RouterLink to="/recharge">
          Recharge
        </RouterLink>

        <RouterLink to="/team">
          Team
        </RouterLink>

        <RouterLink to="/profile">
          Profile
        </RouterLink>

      </div>

      

      <hr>

      <p class="copyright">
        © {{ currentYear }} Jaguar. All Rights Reserved.
      </p>

    </div>

  </footer>
</template>

<script setup>

const currentYear = new Date().getFullYear();

</script>

<style scoped>
.footer{
    background:#1e1e1e;
    color:#fff;
    text-align:center;

    margin-top:20px;

    padding:46px 12px 6px;

    border-radius:22px 22px 0 0;

    margin-bottom:75px;   /* just enough for bottom menu */
}

.container{
    max-width:500px;   /* Smaller container */
    margin:auto;
}

.footer-logo img{
    width:55px;
    height:55px;
    object-fit:contain;
    margin:auto;
}

.company-name{
    margin-top:8px;
    margin-bottom:4px;
    font-size:22px;
    font-weight:700;
    color:#7f6744;
}

.company-desc{
    color:#cccccc;
    font-size:14px;
    margin:6px 0 16px;
}

.footer-links{
    display:flex;
    justify-content:center;
    flex-wrap:wrap;
    gap:14px;
    margin-bottom:16px;
}

.footer-links a{
    color:#fff;
    text-decoration:none;
    font-size:14px;
    transition:.3s;
}

.footer-links a:hover{
    color:#7f6744;
}

.social-icons{
    display:flex;
    justify-content:center;
    gap:12px;
    margin-bottom:16px;
}

.social-icons a{
    width:36px;
    height:36px;
    border-radius:50%;
    background:#333;
    color:#fff;
    display:flex;
    justify-content:center;
    align-items:center;
    text-decoration:none;
    transition:.3s;
}

.social-icons a:hover{
    background:#7f6744;
}

.social-icons i{
    font-size:17px;
}

hr{
    border-color:#444;
    margin:16px 0;
}

.copyright{
    color:#aaa;
    font-size:13px;
    margin:0;
}
/* ===========================
   Feature Cards
=========================== */

.feature-grid{

    display:grid;

    grid-template-columns:repeat(3,1fr);

    gap:12px;

    margin-bottom:28px;

}

.feature-card{

    background:linear-gradient(145deg,#2b2b2b,#383838);

    border:1px solid rgba(255,255,255,.08);

    border-radius:16px;

    padding:16px 8px;

    transition:.35s;

    cursor:pointer;

}

.feature-card:hover{

    transform:translateY(-5px);

    background:linear-gradient(145deg,#7f6744,#9d8257);

    box-shadow:0 10px 25px rgba(127,103,68,.35);

}

.feature-card i{

    font-size:26px;

    color:#f6c667;

    margin-bottom:10px;

    display:block;

}

.feature-card:hover i{

    color:#fff;

}

.feature-card span{

    display:block;

    color:#fff;

    font-size:14px;

    font-weight:700;

}

.feature-card small{

    display:block;

    margin-top:4px;

    color:#cfcfcf;

    font-size:11px;

    line-height:1.4;

}

.feature-card:hover small{

    color:#f8f8f8;

}

@media(max-width:576px){

    .feature-grid{

        gap:8px;

    }

    .feature-card{

        padding:14px 6px;

    }

    .feature-card i{

        font-size:22px;

    }

    .feature-card span{

        font-size:12px;

    }

    .feature-card small{

        font-size:10px;

    }

}


</style>