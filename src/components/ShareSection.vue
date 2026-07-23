<template>
  <section class="share-section">

    <!-- Invite Card -->
    <div class="invite-card">

      <h4>Invite Friends</h4>

      <p class="text-muted">
        Share your referral link and earn unlimited commission.
      </p>

      <!-- QR Code -->
      <div class="qr-box">

        <!-- <img
          src="@/assets/images/qr-code.png"
          alt="QR Code"
        /> -->

      </div>

      <!-- Referral Code -->

      <div class="referral-box mt-4">

        <label class="form-label">
          Referral Code
        </label>

        <div class="input-group">

          <input
            type="text"
            class="form-control"
            v-model="referralCode"
            readonly
          />

          <button
            class="btn btn-warning"
            @click="copyCode"
          >
            <i class="bi bi-copy"></i>
          </button>

        </div>

      </div>

      <!-- Referral Link -->

      <div class="referral-box mt-3">

        <label class="form-label">
          Referral Link
        </label>

        <div class="input-group">

          <input
            type="text"
            class="form-control"
            v-model="referralLink"
            readonly
          />

          <button
            class="btn btn-warning"
            @click="copyLink"
          >
            <i class="bi bi-link-45deg"></i>
          </button>

        </div>

      </div>

      <!-- Buttons -->

      <div class="d-grid gap-2 mt-4">

        <button
          class="btn btn-success"
          @click="shareReferral"
        >
          <i class="bi bi-share-fill me-2"></i>
          Share Now
        </button>

        <button
          class="btn btn-outline-warning"
          @click="copyLink"
        >
          <i class="bi bi-clipboard me-2"></i>
          Copy Link
        </button>

      </div>

    </div>

  </section>
</template>

<script setup>

import { ref } from "vue";

const referralCode = ref("JAG123456");

const referralLink = ref(
  "https://jaguar.com/register?ref=JAG123456"
);

function copyCode() {

  navigator.clipboard.writeText(referralCode.value);

  alert("Referral code copied.");

}

function copyLink() {

  navigator.clipboard.writeText(referralLink.value);

  alert("Referral link copied.");

}

async function shareReferral() {

  if (navigator.share) {

    await navigator.share({

      title: "Join Jaguar",

      text: "Join Jaguar using my referral link.",

      url: referralLink.value

    });

  } else {

    copyLink();

  }

}

</script>
<style scoped>

/* ===========================
   Main Section
=========================== */

.share-section{

    padding:20px;

    min-height:100vh;


    background:

    linear-gradient(180deg,#151515,#222);


}



/* ===========================
   Invite Card
=========================== */

.invite-card{


    max-width:700px;


    margin:auto;



    background:

    linear-gradient(145deg,#2b2b2b,#383838);



    border-radius:20px;



    padding:30px;



    border:1px solid rgba(255,255,255,.08);



    box-shadow:

    0 8px 20px rgba(0,0,0,.35);



}



.invite-card h4{


    text-align:center;


    font-weight:800;



    color:#f6c667;



    margin-bottom:10px;


}



.invite-card p{


    text-align:center;


    color:#bdbdbd !important;



    font-size:14px;


}



/* ===========================
   QR Box
=========================== */

.qr-box{


    width:220px;


    height:220px;



    margin:25px auto;



    border:2px dashed #f6c667;



    border-radius:18px;



    display:flex;



    justify-content:center;



    align-items:center;



    background:

    rgba(246,198,103,.08);



}



.qr-box img{


    width:180px;


    height:180px;


    object-fit:contain;


}



/* ===========================
   Referral Box
=========================== */

.referral-box{


    margin-top:20px;


}



.referral-box label{


    color:#f6c667;



    font-weight:600;



    margin-bottom:8px;



}



/* ===========================
   Inputs
=========================== */

.input-group{


    flex-wrap:nowrap;


}



.form-control{


    min-width:0;


    overflow:hidden;


    text-overflow:ellipsis;


    white-space:nowrap;



    height:48px;



    background:#222;



    border:1px solid rgba(255,255,255,.15);



    color:#fff;



}



.form-control:focus{


    background:#222;



    color:#fff;



    border-color:#f6c667;



    box-shadow:

    0 0 0 .2rem rgba(246,198,103,.18);



}



.form-control[readonly]{


    color:#f6c667;


}



/* ===========================
   Copy Buttons
=========================== */

.btn-warning{


    background:

    linear-gradient(135deg,#f6c667,#c79b3b);



    border:none;



    color:#222;



    font-weight:700;



}



.btn-warning:hover{


    background:

    linear-gradient(135deg,#ffffff,#f6c667);



    color:#222;


}



/* ===========================
   Main Buttons
=========================== */

.d-grid .btn{


    height:50px;


    font-size:16px;


    font-weight:700;


    border-radius:12px;


}



/* Share Button */

.btn-success{


    background:

    linear-gradient(135deg,#f6c667,#c79b3b);



    border:none;



    color:#222;



}



.btn-success:hover{


    background:

    linear-gradient(135deg,#ffffff,#f6c667);



    color:#222;



}



/* Copy Link Button */

.btn-outline-warning{


    color:#f6c667 !important;



    border:1px solid #f6c667 !important;



    background:transparent;



}



.btn-outline-warning:hover{


    background:#f6c667 !important;



    color:#222 !important;



}



/* ===========================
   Tablet
=========================== */

@media(max-width:768px){


    .invite-card{


        padding:22px;


    }



    .qr-box{


        width:180px;


        height:180px;


    }



    .qr-box img{


        width:140px;


        height:140px;


    }


}



/* ===========================
   Mobile
=========================== */

@media(max-width:576px){


    .share-section{


        padding:12px;


    }



    .invite-card{


        padding:18px;


        border-radius:16px;


    }



    .invite-card h4{


        font-size:22px;


    }



    .invite-card p{


        font-size:13px;


    }



    .qr-box{


        width:150px;


        height:150px;


        margin:20px auto;


    }



    .qr-box img{


        width:120px;


        height:120px;


    }



    .form-control{


        font-size:13px;


        padding:10px;


    }



    .input-group .btn{


        padding:0 14px;


    }



    .d-grid .btn{


        height:46px;


        font-size:15px;


    }


}



/* ===========================
   Very Small Phones
=========================== */

@media(max-width:360px){


    .invite-card{


        padding:14px;


    }



    .invite-card h4{


        font-size:20px;


    }



    .qr-box{


        width:130px;


        height:130px;


    }



    .qr-box img{


        width:100px;


        height:100px;


    }



    .form-control{


        font-size:12px;


    }



    .d-grid .btn{


        font-size:14px;


    }


}

</style>