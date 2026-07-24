<template>
  <section class="recharge-section">

    <!-- Balance -->

    <div class="balance-card">
      <h6>Available Balance</h6>
      <h2>{{ walletBalance.toFixed(2) }} <span class="currency">USDT</span></h2>
    </div>
    <div class="exchange-rate-card">
      <i class="bi bi-currency-exchange"></i>
      <span><strong>1 USDT = ₹100 INR</strong></span>
  </div>
    <!-- Payment Card -->

    <div class="card payment-card mt-4">

      <div class="card-body text-center">

        <h4 class="mb-3">
          USDT Recharge
        </h4>

        <img
          src="/usdt-qr.jpeg"
          class="img-fluid qr-image"
          alt="USDT QR"
        />

        <h6 class="network mt-4">
          Network : BEP20
        </h6>

        <div class="wallet-box mt-3">

          <small>Wallet Address</small>

          <p class="wallet-address">
            {{ walletAddress }}
          </p>

          <button
            class="btn btn-primary btn-sm"
            @click="copyWallet"
          >
            Copy Address
          </button>

        </div>

        <div class="alert alert-warning mt-4">

          <strong>Important</strong><br>

            Send only <b>USDT</b> using the <b>TRC20</b> network.

            Ensure the amount you enter below matches the amount you transferred.

        </div>

      </div>

    </div>

    <!-- Recharge Form -->

    <div class="card recharge-card mt-4">

      <div class="card-body">

        <h5 class="mb-4">
          Submit Recharge
        </h5>

        <label class="form-label">
          Recharge Amount (USDT)
        </label>

        <div class="input-group">
            <span class="input-group-text">USDT</span>
            <input
                type="number"
                class="form-control"
                placeholder="Enter Amount"
                v-model="amount"
            />
        </div>

        <div class="row g-2 mt-3">

          <div
            class="col-4"
            v-for="price in quickAmounts"
            :key="price"
          >

            <button
              class="btn btn-outline-warning w-100"
              @click="selectAmount(price)"
            >

              {{ price }} USDT

            </button>

          </div>

        </div>

        <label class="form-label mt-4">
          Transaction Hash
        </label>

        <input
          class="form-control"
          placeholder="Paste Transaction Hash"
          v-model="transactionId"
        />

        <button
          class="btn btn-warning recharge-btn mt-4"
          @click="submitRecharge"
        >

          Submit USDT Recharge

        </button>

      </div>

    </div>

  </section>
</template>

<script setup>

import { ref,onMounted } from "vue";
import api from "@/services/api";
import Swal from "sweetalert2";

const walletBalance = ref(0);

const amount = ref("");

const transactionId = ref("");

const walletAddress =
"0x8bd6FF569699490f019A03E43F1cbA732Bc441f3";

const quickAmounts=[
10,
20,
50,
100,
200,
500
];

function selectAmount(value){

    amount.value=value;

}

async function copyWallet() {

    await navigator.clipboard.writeText(walletAddress);

    await Swal.fire({
        icon: "success",
        title: "Copied",
        text: "Wallet address copied successfully.",
        timer: 1200,
        showConfirmButton: false
    });

}

onMounted(async () => {

    const token = localStorage.getItem("token");

    if (!token) return;

    try {

        const response = await api.get("/users/me", {

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        walletBalance.value = Number(response.data.balance);

        localStorage.setItem(
            "user",
            JSON.stringify(response.data)
        );

    } catch (e) {

        console.log(e);

    }

});

async function submitRecharge() {

    if (!amount.value) {

        await Swal.fire({
            icon: "warning",
            title: "Amount Required",
            text: "Please enter the recharge amount."
        });

        return;
    }
    if (Number(amount.value) < 10) {

        await Swal.fire({
            icon: "warning",
            title: "Minimum Recharge",
            text: "Minimum recharge amount is 10 USDT.",
            confirmButtonColor: "#7f6744"
        });

        return;
    }


    if (!transactionId.value) {

        await Swal.fire({
            icon: "warning",
            title: "Transaction Hash Required",
            text: "Please enter the transaction hash."
        });

        return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {

        await Swal.fire({
            icon: "error",
            title: "Login Required",
            text: "Please login to continue."
        });

        return;
    }

    try {

        const response = await api.post("/payments/request", {

            userId: user.id,
            amount: Number(amount.value),
            transactionId: transactionId.value,
            paymentMethod: "USDT",
            screenshotUrl: null

        });

        await Swal.fire({
            icon: "success",
            title: "Recharge Submitted",
            text: response.data,
            timer: 1800,
            showConfirmButton: false
        });

        amount.value = "";
        transactionId.value = "";

    } catch (error) {

        await Swal.fire({
            icon: "error",
            title: "Recharge Failed",
            text: error.response?.data || "Something went wrong. Please try again."
        });

    }

}

</script>
<style scoped>

/* ===========================
   Main Section
=========================== */

.recharge-section{

    padding:20px;

    min-height:100vh;


    background:

    linear-gradient(180deg,#151515,#222);


}



/* ===========================
   Balance Card
=========================== */

.balance-card{


    background:

    linear-gradient(135deg,#f6c667,#c79b3b);



    color:#222;



    border-radius:18px;



    padding:20px;



    text-align:center;



    box-shadow:

    0 8px 20px rgba(246,198,103,.25);



}



.balance-card h6{


    font-size:14px;

    font-weight:600;


}



.balance-card h2{


    margin-top:10px;


    font-weight:800;


}



.currency{


    font-size:18px;


}



/* ===========================
   Exchange Rate
=========================== */

.exchange-rate-card{


    margin-top:12px;



    background:#2b2b2b;



    border:1px solid rgba(246,198,103,.25);



    border-radius:14px;



    padding:12px;



    display:flex;



    align-items:center;



    justify-content:center;



    gap:10px;



    color:#f6c667;



    box-shadow:0 5px 15px rgba(0,0,0,.25);


}



.exchange-rate-card i{


    font-size:20px;


    color:#f6c667;


}



/* ===========================
   Cards
=========================== */

.payment-card,
.recharge-card{


    border:none;


    border-radius:20px;



    background:

    linear-gradient(145deg,#2b2b2b,#383838);



    color:#fff;



    box-shadow:

    0 8px 20px rgba(0,0,0,.35);



    max-width:500px;



    margin:auto;



}



.payment-card .card-body,
.recharge-card .card-body{


    padding:25px;


}



/* Title */

.payment-card h4,
.recharge-card h5{


    color:#f6c667;



    font-weight:700;


}



/* ===========================
   QR Code
=========================== */

.qr-image{


    width:260px;


    max-width:100%;



    background:#fff;



    padding:12px;



    border-radius:16px;



    margin:20px auto;



}



/* Network */

.network{


    color:#f6c667;



    font-weight:700;



}



/* ===========================
   Wallet Box
=========================== */

.wallet-box{


    background:rgba(255,255,255,.08);



    border:1px solid rgba(255,255,255,.1);



    border-radius:14px;



    padding:15px;



}



.wallet-box small{


    color:#bbb;


}



.wallet-address{


    margin:12px 0;



    word-break:break-all;



    color:#f6c667;



    font-weight:700;



    font-size:14px;



}



/* Copy Button */

.wallet-box .btn{


    background:#f6c667;



    border:none;



    color:#222;



    font-weight:700;



    border-radius:10px;



}



/* ===========================
   Alert
=========================== */

.alert-warning{


    background:rgba(246,198,103,.12);



    border:1px solid rgba(246,198,103,.3);



    color:#f6c667;



    border-radius:14px;



}



/* ===========================
   Labels
=========================== */

.form-label{


    color:#f6c667;



    font-weight:600;


}



/* ===========================
   Inputs
=========================== */

.input-group-text{


    background:#f6c667;



    color:#222;



    border:none;



    font-weight:700;


}



.form-control{


    height:48px;



    background:#222;



    border:1px solid rgba(255,255,255,.15);



    color:#fff;



    border-radius:10px;



}



.form-control::placeholder{


    color:#999;


}



.form-control:focus{


    background:#222;



    color:#fff;



    border-color:#f6c667;



    box-shadow:0 0 0 .2rem rgba(246,198,103,.2);



}



/* ===========================
   Quick Amount Buttons
=========================== */

.btn-outline-warning{


    background:transparent !important;



    color:#f6c667 !important;



    border:1px solid #f6c667 !important;



    font-weight:700;



    border-radius:10px;



}



.btn-outline-warning:hover,
.btn-outline-warning:active{


    background:#f6c667 !important;



    color:#222 !important;



}



/* ===========================
   Submit Button
=========================== */

.recharge-btn{


    width:100%;



    padding:14px;



    border:none;



    border-radius:12px;



    background:

    linear-gradient(135deg,#f6c667,#c79b3b);



    color:#222;



    font-size:17px;



    font-weight:800;



    transition:.3s;



}



.recharge-btn:hover{


    background:

    linear-gradient(135deg,#ffffff,#f6c667);



    transform:translateY(-2px);



    box-shadow:

    0 8px 20px rgba(246,198,103,.35);



}



/* ===========================
   Mobile
=========================== */

@media(max-width:576px){


    .recharge-section{


        padding:15px;


    }



    .payment-card .card-body,
    .recharge-card .card-body{


        padding:18px;


    }



    .qr-image{


        width:220px;


    }


}

</style>