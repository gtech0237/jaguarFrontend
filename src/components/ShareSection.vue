<template>
    <section class="share-section">

        <div class="invite-card">

            <h4>Invite Friends</h4>

            <p class="text-muted">
                Share your referral code with friends and earn rewards when they join.
            </p>

            <!-- QR -->
            <div class="qr-box">

                <img
                    v-if="qrImage"
                    :src="qrImage"
                    alt="Referral QR"
                />

                <i
                    v-else
                    class="bi bi-qr-code display-1 text-warning"
                ></i>

            </div>

            <!-- Referral Code -->

            <div class="referral-box mt-4">

                <label class="form-label">
                    My Referral Code
                </label>

                <div class="input-group">

                    <input
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

import { ref, computed, onMounted } from "vue";
import Swal from "sweetalert2";

const referralCode = ref("");

const qrImage = ref("");

onMounted(() => {

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    referralCode.value = user.myReferralCode || "";

});

const referralLink = computed(() => {

    return `${window.location.origin}/?ref=${referralCode.value}`;

});

async function copyCode() {

    await navigator.clipboard.writeText(referralCode.value);

    Swal.fire({

        icon: "success",

        title: "Copied",

        text: "Referral code copied.",

        timer: 1200,

        showConfirmButton: false

    });

}

async function copyLink() {

    await navigator.clipboard.writeText(referralLink.value);

    Swal.fire({

        icon: "success",

        title: "Copied",

        text: "Referral link copied.",

        timer: 1200,

        showConfirmButton: false

    });

}

async function shareReferral() {

    if (navigator.share) {

        await navigator.share({

            title: "Jaguar Investment",

            text: `Join Jaguar using my referral code ${referralCode.value}`,

            url: referralLink.value

        });

    }

    else {

        copyLink();

    }

}

</script>

<style scoped>

.share-section{

    min-height:100vh;

    background:linear-gradient(180deg,#151515,#222);

    padding:20px;

}

.invite-card{

    max-width:700px;

    margin:auto;

    background:linear-gradient(145deg,#2b2b2b,#383838);

    border-radius:20px;

    padding:30px;

    border:1px solid rgba(255,255,255,.08);

    box-shadow:0 8px 20px rgba(0,0,0,.35);

}

.invite-card h4{

    text-align:center;

    color:#f6c667;

    font-weight:800;

}

.invite-card p{

    text-align:center;

    color:#bdbdbd !important;

}

.qr-box{

    width:220px;

    height:220px;

    margin:25px auto;

    border:2px dashed #f6c667;

    border-radius:18px;

    display:flex;

    justify-content:center;

    align-items:center;

    background:rgba(246,198,103,.08);

}

.qr-box img{

    width:180px;

    height:180px;

    object-fit:contain;

}

.form-label{

    color:#f6c667;

    font-weight:600;

}

.form-control{

    background:#222;

    color:#fff;

    border:1px solid rgba(255,255,255,.15);

}

.form-control:focus{

    background:#222;

    color:#fff;

    border-color:#f6c667;

    box-shadow:none;

}

.form-control[readonly]{

    color:#f6c667;

}

.btn-warning{

    background:linear-gradient(135deg,#f6c667,#c79b3b);

    border:none;

    color:#222;

}

.btn-success{

    background:linear-gradient(135deg,#f6c667,#c79b3b);

    border:none;

    color:#222;

    font-weight:700;

}

.btn-success:hover{

    color:#222;

}

.btn-outline-warning{

    border:1px solid #f6c667;

    color:#f6c667;

}

.btn-outline-warning:hover{

    background:#f6c667;

    color:#222;

}

.d-grid .btn{

    height:50px;

    border-radius:12px;

    font-weight:700;

}

@media(max-width:576px){

    .invite-card{

        padding:18px;

    }

    .qr-box{

        width:160px;

        height:160px;

    }

}

</style>