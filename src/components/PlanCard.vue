<template>

<div class="plan-card">

    <!-- Product Image -->
    <div class="plan-image">

        <img
            :src="productImage"
            :alt="product.productName"
        >

    </div>

    <!-- Product Content -->
    <div class="plan-content">

        <h5 class="plan-title">
            {{ product.productName }}
        </h5>

        <div class="row g-2 mt-3">

            <div class="col-6">

                <div class="info-box">

                    <small>Invest</small>

                    <h6>₹ {{ product.investmentAmount }}</h6>

                </div>

            </div>

            <div class="col-6">

                <div class="info-box">

                    <small>Daily Income</small>

                    <h6>₹ {{ product.dailyIncome }}</h6>

                </div>

            </div>

            <div class="col-6">

                <div class="info-box">

                    <small>Validity</small>

                    <h6>{{ product.durationDays }} Days</h6>

                </div>

            </div>

            <div class="col-6">

                <div class="info-box">

                    <small>Total Income</small>

                    <h6>
                        ₹ {{ Number(product.dailyIncome) * Number(product.durationDays) }}
                    </h6>

                </div>

            </div>

        </div>

        <button
            class="buy-btn"
            @click="buyPlan"
        >
            <i class="bi bi-cart-fill"></i>
            Buy Now
        </button>

    </div>

</div>

</template>

<script setup>

import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import api from "@/services/api";

/* Local Product Image */
import productImage from "@/assets/images/product.jpg";

const router = useRouter();

const props = defineProps({

    product: {

        type: Object,
        required: true

    }

});

async function buyPlan() {

    try {

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {

            await Swal.fire({

                icon: "warning",
                title: "Login Required",
                text: "Please login first."

            });

            router.push("/");

            return;

        }

        const response = await api.post("/investments/invest", {

            userId: user.id,
            productId: props.product.id

        });

        await Swal.fire({

            icon: "success",
            title: "Success",
            text: response.data.message || "Investment purchased successfully!",
            confirmButtonColor: "#28a745"

        });

        router.push("/home");

    }

    catch (error) {

        console.error(error);

        let message = "Something went wrong. Please try again.";

        if (error.response) {

            message =
                error.response.data?.message ||
                error.response.data?.errorMessage ||
                error.response.data?.error ||
                message;

        }

        if (message.toLowerCase().includes("insufficient")) {

            const result = await Swal.fire({

                icon: "warning",
                title: "Insufficient Balance",
                text: message,
                showCancelButton: true,
                confirmButtonText: "Recharge Wallet",
                cancelButtonText: "Cancel",
                confirmButtonColor: "#7f6744"

            });

            if (result.isConfirmed) {

                router.push("/recharge");

            }

        } else {

            await Swal.fire({

                icon: "error",
                title: "Investment Failed",
                text: message,
                confirmButtonColor: "#d33"

            });

        }

    }

}

</script>
<style scoped>

.plan-card{

    background:linear-gradient(145deg,#2b2b2b,#383838);

    border:1px solid rgba(255,255,255,.08);

    border-radius:18px;

    overflow:hidden;

    transition:.35s;

    cursor:pointer;

    height:100%;

    box-shadow:0 8px 20px rgba(0,0,0,.18);

}

.plan-card:hover{

    transform:translateY(-6px);

    background:linear-gradient(145deg,#7f6744,#9d8257);

    box-shadow:0 12px 30px rgba(127,103,68,.35);

}

.plan-image{

    overflow:hidden;

}

.plan-image img{

    width:100%;

    height:160px;

    object-fit:cover;

    transition:.4s;

}

.plan-card:hover .plan-image img{

    transform:scale(1.06);

}

.plan-content{

    padding:16px;

}

.plan-title{

    text-align:center;

    color:#ffffff;

    font-size:18px;

    font-weight:700;

    margin-bottom:14px;

}

.plan-card:hover .plan-title{

    color:#fff;

}

/* =====================
   Info Boxes
===================== */

.info-box{

    background:rgba(255,255,255,.08);

    border:1px solid rgba(255,255,255,.08);

    border-radius:12px;

    padding:12px 8px;

    text-align:center;

    transition:.3s;

    min-height:72px;

}

.plan-card:hover .info-box{

    background:rgba(255,255,255,.15);

}

.info-box small{

    display:block;

    color:#d8d8d8;

    font-size:11px;

    margin-bottom:6px;

}

.info-box h6{

    margin:0;

    font-size:15px;

    font-weight:700;

    color:#f6c667;

}

.plan-card:hover .info-box h6{

    color:#fff;

}

/* =====================
   Buy Button
===================== */

.buy-btn{

    width:100%;

    margin-top:16px;

    padding:12px;

    border:none;

    border-radius:12px;

    display:flex;

    align-items:center;

    justify-content:center;

    gap:8px;

    background:linear-gradient(135deg,#f6c667,#c79b3b);

    color:#222;

    font-size:15px;

    font-weight:700;

    transition:.35s;

}

.buy-btn i{

    font-size:16px;

}

.buy-btn:hover{

    background:#fff;

    color:#7f6744;

    transform:translateY(-2px);

    box-shadow:0 8px 20px rgba(255,255,255,.25);

}

/* =====================
   Mobile
===================== */

@media(max-width:576px){

    .plan-image img{

        height:130px;

    }

    .plan-content{

        padding:12px;

    }

    .plan-title{

        font-size:16px;

    }

    .info-box{

        padding:10px 6px;

        min-height:64px;

    }

    .info-box small{

        font-size:10px;

    }

    .info-box h6{

        font-size:13px;

    }

    .buy-btn{

        font-size:13px;

        padding:10px;

    }

}

</style>