<template>

<div
    v-if="showPopup"
    class="popup-overlay"
>

    <div class="popup-card">

        <!-- Close -->

        <button
            class="close-btn"
            @click="closePopup"
        >
            <i class="bi bi-x-lg"></i>
        </button>

        <!-- Header -->

        <div class="popup-header">

            <div class="icon-circle">

                <i class="bi bi-megaphone-fill"></i>

            </div>

            <h2>Grand Launch</h2>

            <p>Official Launch • 27 July 2026</p>

        </div>

        <!-- Offer 3 -->

        <div class="offer-item">

            <div class="offer-icon">

                <i class="bi bi-lightning-charge-fill"></i>

            </div>

            <div>

                <strong>Fast Withdraw</strong>

                <p>Daily Withdraw Available</p>

            </div>

        </div>

        <!-- Offer 4 -->

        <!-- Platform Feature -->

            <div class="offer-item">

                <div class="offer-icon">

                    <i class="bi bi-currency-bitcoin"></i>

                </div>

                <div>

                    <strong>Invest in USDT</strong>

                    <p>Start investing with secure USDT plans.</p>

                </div>

            </div>

<!-- Withdraw -->

<div class="offer-item">

    <div class="offer-icon">

        <i class="bi bi-cash-stack"></i>

    </div>

    <div>

        <strong>Multiple Withdrawal Options</strong>

        <p>Withdraw to your bank account or USDT wallet.</p>

    </div>

</div>

<!-- Support -->

<div class="offer-item">

    <div class="offer-icon">

        <i class="bi bi-headset"></i>

    </div>

    <div>
        <strong>24×7 Support</strong>
    </div>

</div>

        <!-- Telegram -->

        <a
            href="https://t.me/+Qy7KDU2YTv1lYjU1"
            target="_blank"
            class="telegram-btn"
        >

            <i class="bi bi-telegram"></i>

            Join Premium Channel

        </a>

    </div>

</div>

</template>

<script setup>

import { ref,onMounted } from "vue";

const showPopup = ref(false);

onMounted(()=>{

    showPopup.value = true;

});

function closePopup(){

    showPopup.value = false;

}

</script>

<style scoped>

/* ==========================
   Overlay
========================== */

.popup-overlay{

    position:fixed;

    inset:0;

    display:flex;

    justify-content:center;

    align-items:center;

    padding:20px;

    background:rgba(0,0,0,.70);

    backdrop-filter:blur(8px);

    z-index:99999;

}

/* ==========================
   Card
========================== */
.popup-card{

    width:90%;

    max-width:320px;

    background:#2b2b2b;

    border-radius:22px;

    overflow:hidden;

    border:1px solid rgba(246,198,103,.20);

    box-shadow:0 20px 60px rgba(0,0,0,.50);

    animation:popup .35s ease;

    position:relative;

}

/* ==========================
   Header
========================== */

.popup-header{

    background:linear-gradient(135deg,#f6c667,#c79b3b);

    text-align:center;

    padding:28px 20px;

    color:#222;

}

.icon-circle{

    width:70px;

    height:70px;

    margin:auto;

    border-radius:18px;

    background:rgba(255,255,255,.35);

    display:flex;

    justify-content:center;

    align-items:center;

    font-size:34px;

}

.popup-header h2{

    margin-top:14px;

    margin-bottom:6px;

    font-size:24px;

    font-weight:800;

}

.popup-header p{

    margin:0;

    font-size:14px;

    font-weight:600;

}

/* ==========================
   Close
========================== */

.close-btn{

    position:absolute;

    top:12px;

    right:12px;

    width:34px;

    height:34px;

    border:none;

    border-radius:50%;

    background:rgba(0,0,0,.18);

    color:#222;

    display:flex;

    justify-content:center;

    align-items:center;

    cursor:pointer;

    transition:.3s;

}

.close-btn:hover{

    transform:rotate(90deg);

}

/* ==========================
   Offer
========================== */

.offer-item{

    margin:14px;

    padding:14px;

    border-radius:14px;

    background:#383838;

    border:1px solid rgba(246,198,103,.15);

    display:flex;

    gap:14px;

    align-items:center;

}

.offer-icon{

    width:48px;

    height:48px;

    border-radius:12px;

    background:rgba(246,198,103,.15);

    color:#f6c667;

    display:flex;

    justify-content:center;

    align-items:center;

    font-size:22px;

    flex-shrink:0;

}

.offer-item strong{

    display:block;

    color:#ffffff;

    font-size:16px;

    font-weight:700;

}

.offer-item p{

    margin:3px 0 0;

    color:#f6c667;

    font-size:14px;

    font-weight:600;

}

/* ==========================
   Telegram
========================== */

.telegram-btn{

    margin:16px 14px 18px;

    height:52px;

    border-radius:14px;

    background:linear-gradient(135deg,#f6c667,#c79b3b);

    color:#222;

    font-size:17px;

    font-weight:800;

    text-decoration:none;

    display:flex;

    justify-content:center;

    align-items:center;

    gap:10px;

    transition:.25s;

}

.telegram-btn i{

    font-size:22px;

}

.telegram-btn:hover{

    color:#222;

    transform:translateY(-2px);

}

/* ==========================
   Animation
========================== */

@keyframes popup{

    from{

        opacity:0;

        transform:scale(.80);

    }

    to{

        opacity:1;

        transform:scale(1);

    }

}

/* ==========================
   Mobile
========================== */
/* ==========================
   Desktop
========================== */

@media(min-width:992px){

    .popup-card{

        max-width:300px;

    }

    .popup-header{

        padding:20px 18px;

    }

    .popup-header h2{

        font-size:20px;

    }

    .offer-item{

        margin:10px;

        padding:10px;

    }

    .offer-icon{

        width:40px;

        height:40px;

        font-size:18px;

    }

    .offer-item strong{

        font-size:14px;

    }

    .offer-item p{

        font-size:12px;

    }

    .telegram-btn{

        height:46px;

        font-size:15px;

    }

}

/* ==========================
   Mobile
========================== */

@media(max-width:576px){

    .popup-card{

        max-width:350px;

    }

}

</style>