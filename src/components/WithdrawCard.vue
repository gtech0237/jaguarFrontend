<template>

<section class="withdraw-section">

    <!-- ===========================
         Wallet Balance
    ============================ -->

    <div class="balance-card">

        <h6>Available Wallet Balance</h6>

        <h2>{{ walletBalance.toFixed(2) }} USDT</h2>

        <p class="balance-inr">
            ≈ ₹ {{ walletBalanceInr.toFixed(2) }}
        </p>

    </div>

    <!-- ===========================
         Withdraw Card
    ============================ -->

    <div class="card withdraw-card mt-4">

        <div class="card-body">

            <h4 class="text-center mb-4">

                Withdraw Request

            </h4>

            <!-- Withdraw Type -->

            <div class="mb-3">

                <label class="form-label">

                    Withdraw Type

                </label>

                <select
                    class="form-select"
                    v-model="withdrawType"
                >

                    <option value="">
                        Select Withdraw Type
                    </option>

                    <option value="ACCOUNT">
                        Bank Account (INR)
                    </option>

                    <option value="MANUAL">
                        Manual (UPI / USDT Wallet)
                    </option>

                </select>

            </div>

            <!-- =====================================
                 BANK ACCOUNT
            ====================================== -->

            <template v-if="withdrawType === 'ACCOUNT'">

                <div
                    v-if="hasBankAccount"
                    class="bank-card"
                >

                    <div class="bank-title">

                        <i class="bi bi-bank"></i>

                        <span>

                            Registered Bank Account

                        </span>

                    </div>

                    <div class="bank-row">

                        <span>Account Holder</span>

                        <strong>

                            {{ user.accountHolderName }}

                        </strong>

                    </div>

                    <div class="bank-row">

                        <span>Bank Name</span>

                        <strong>

                            {{ user.bankName }}

                        </strong>

                    </div>

                    <div class="bank-row">

                        <span>Account Number</span>

                        <strong>

                            {{ user.accountNumber }}

                        </strong>

                    </div>

                    <div class="bank-row">

                        <span>IFSC Code</span>

                        <strong>

                            {{ user.ifscCode }}

                        </strong>

                    </div>

                </div>

                <!-- No Bank -->

                <div
                    v-else
                    class="alert alert-warning mt-3"
                >

                    <div class="d-flex justify-content-between align-items-center">

                        <span>

                            No bank account found.

                        </span>

                        <button
                            class="btn btn-primary btn-sm"
                            @click="showAccountForm = true"
                        >

                            Add Account

                        </button>

                    </div>

                </div>

                <!-- Add Account -->

                <div
                    v-if="showAccountForm"
                    class="card account-card mt-3"
                >

                    <div class="card-body">

                        <h5 class="mb-3">

                            Add Bank Account

                        </h5>

                        <input
                            class="form-control mb-3"
                            v-model="bank.accountHolderName"
                            placeholder="Account Holder Name"
                        >

                        <input
                            class="form-control mb-3"
                            v-model="bank.bankName"
                            placeholder="Bank Name"
                        >

                        <input
                            class="form-control mb-3"
                            v-model="bank.accountNumber"
                            placeholder="Account Number"
                        >

                        <input
                            class="form-control mb-3"
                            v-model="bank.ifscCode"
                            placeholder="IFSC Code"
                        >

                        <div class="d-flex gap-2">

                            <button
                                class="btn btn-success flex-fill"
                                @click="saveAccount"
                            >

                                Save Account

                            </button>

                            <button
                                class="btn btn-secondary"
                                @click="showAccountForm=false"
                            >

                                Cancel

                            </button>

                        </div>

                    </div>

                </div>

            </template>
                        <!-- =====================================
                 MANUAL WITHDRAW
            ====================================== -->

            <template v-if="withdrawType === 'MANUAL'">

                <!-- Payment Method -->

                <div class="mb-3">

                    <label class="form-label">

                        Payment Method

                    </label>

                    <select
                        class="form-select"
                        v-model="paymentMethod"
                    >

                        <option value="">
                            Select Payment Method
                        </option>

                        <option value="UPI">
                            UPI (INR)
                        </option>

                        <option value="USDT">
                            USDT Wallet
                        </option>

                    </select>

                </div>

                <!-- Account Details -->

                <div class="mb-3">

                    <label class="form-label">

                        {{
                            paymentMethod === "UPI"
                                ? "UPI ID"
                                : "USDT Wallet Address"
                        }}

                    </label>

                    <input
                        class="form-control"
                        v-model="accountDetails"
                        :placeholder="placeholderText"
                    >

                </div>

            </template>

            <!-- =====================================
                 AMOUNT
            ====================================== -->

            <div
                v-if="withdrawType"
                class="mb-3"
            >

                <label class="form-label">

                    Withdraw Amount

                </label>

                <div class="input-group">

                    <span class="input-group-text">

                        {{
                            withdrawType === "ACCOUNT"
                                ? "₹"
                                : paymentMethod === "UPI"
                                    ? "₹"
                                    : "USDT"
                        }}

                    </span>

                    <input
                        class="form-control"
                        type="number"
                        min="1"
                        v-model="amount"
                        :placeholder="amountPlaceholder"
                    >

                </div>

                <small class="text-muted">

                    <template v-if="withdrawType==='ACCOUNT'">

                        Enter amount in INR.

                    </template>

                    <template
                        v-else-if="paymentMethod==='UPI'"
                    >

                        Enter amount in INR.

                    </template>

                    <template
                        v-else-if="paymentMethod==='USDT'"
                    >

                        Enter amount in USDT.

                    </template>

                </small>

            </div>

            <!-- =====================================
                 SUMMARY
            ====================================== -->

            <div
                v-if="Number(amount)>0"
                class="summary-card mb-4"
            >

                <h6 class="mb-3">

                    Withdrawal Summary

                </h6>

                <div class="summary-row">

                    <span>

                        Requested Amount

                    </span>

                    <strong>

                        <template
                            v-if="withdrawType==='ACCOUNT'"
                        >

                            ₹ {{ enteredAmount.toFixed(2) }}

                        </template>

                        <template
                            v-else-if="paymentMethod==='UPI'"
                        >

                            ₹ {{ enteredAmount.toFixed(2) }}

                        </template>

                        <template
                            v-else
                        >

                            {{ enteredAmount.toFixed(2) }} USDT

                        </template>

                    </strong>

                </div>

                <div class="summary-row">

                    <span>

                        Service Fee (10%)

                    </span>

                    <strong class="text-danger">

                        <template
                            v-if="withdrawType==='ACCOUNT'"
                        >

                            ₹ {{ serviceFee.toFixed(2) }}

                        </template>

                        <template
                            v-else-if="paymentMethod==='UPI'"
                        >

                            ₹ {{ serviceFee.toFixed(2) }}

                        </template>

                        <template
                            v-else
                        >

                            {{ serviceFee.toFixed(2) }} USDT

                        </template>

                    </strong>

                </div>

                <div class="summary-row">

                    <span>

                        You Will Receive

                    </span>

                    <strong class="text-success">

                        <template
                            v-if="withdrawType==='ACCOUNT'"
                        >

                            ₹ {{ receiveAmount.toFixed(2) }}

                        </template>

                        <template
                            v-else-if="paymentMethod==='UPI'"
                        >

                            ₹ {{ receiveAmount.toFixed(2) }}

                        </template>

                        <template
                            v-else
                        >

                            {{ receiveAmount.toFixed(2) }} USDT

                        </template>

                    </strong>

                </div>

                <hr>

                <div class="summary-row">

                    <span>

                        Wallet Deduction

                    </span>

                    <strong class="text-primary">

                        {{ walletDeductionUsdt.toFixed(4) }} USDT

                    </strong>

                </div>

                <div
                    class="alert alert-info mt-3 mb-0"
                >

                    <template
                        v-if="withdrawType==='ACCOUNT'"
                    >

                        ₹ {{ enteredAmount.toFixed(2) }}
                        ≈
                        {{ walletDeductionUsdt.toFixed(4) }}
                        USDT

                    </template>

                    <template
                        v-else-if="paymentMethod==='UPI'"
                    >

                        ₹ {{ enteredAmount.toFixed(2) }}
                        ≈
                        {{ walletDeductionUsdt.toFixed(4) }}
                        USDT

                    </template>

                    <template
                        v-else
                    >

                        Wallet deduction will be
                        {{ walletDeductionUsdt.toFixed(4) }}
                        USDT.

                    </template>

                </div>

            </div>

            <!-- =====================================
                 SUBMIT BUTTON
            ====================================== -->

            <button
                class="btn btn-warning withdraw-btn"
                :disabled="loading"
                @click="withdraw"
            >

                <span v-if="loading">

                    <span
                        class="spinner-border spinner-border-sm me-2"
                    ></span>

                    Processing...

                </span>

                <span v-else>

                    Submit Withdraw Request

                </span>

            </button>

        </div>

    </div>

</section>

</template>
<script setup>

import { ref, computed, onMounted } from "vue";
import api from "@/services/api";
import Swal from "sweetalert2";

/* ===========================================
   SweetAlert Toast
=========================================== */

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true
});

/* ===========================================
   Constants
=========================================== */

// Temporary fixed rate.
// Later you can load it from backend.
const usdtRate = ref(100);

/* ===========================================
   Reactive Variables
=========================================== */

const loading = ref(false);

const walletBalance = ref(0);      // Stored in USDT

const user = ref({});

const amount = ref("");

const withdrawType = ref("");

const paymentMethod = ref("");

const accountDetails = ref("");

const showAccountForm = ref(false);

const bank = ref({

    accountHolderName: "",

    bankName: "",

    accountNumber: "",

    ifscCode: ""

});

/* ===========================================
   Computed Properties
=========================================== */

// Wallet Balance in INR

const walletBalanceInr = computed(() => {

    return walletBalance.value * usdtRate.value;

});

// Bank account exists

const hasBankAccount = computed(() => {

    return !!(

        user.value.accountHolderName &&
        user.value.bankName &&
        user.value.accountNumber &&
        user.value.ifscCode

    );

});

// Placeholder

const placeholderText = computed(() => {

    if(paymentMethod.value === "UPI"){

        return "Enter UPI ID";

    }

    if(paymentMethod.value === "USDT"){

        return "Enter USDT Wallet Address";

    }

    return "Enter Details";

});

// Amount placeholder

const amountPlaceholder = computed(() => {

    if(withdrawType.value === "ACCOUNT"){

        return "Enter Amount (INR)";

    }

    if(paymentMethod.value === "UPI"){

        return "Enter Amount (INR)";

    }

    if(paymentMethod.value === "USDT"){

        return "Enter Amount (USDT)";

    }

    return "Enter Amount";

});

// Entered amount

const enteredAmount = computed(() => {

    return Number(amount.value) || 0;

});

// Wallet deduction (always USDT)

const walletDeductionUsdt = computed(() => {

    if(!enteredAmount.value){

        return 0;

    }

    // INR -> USDT

    if(

        withdrawType.value === "ACCOUNT" ||

        paymentMethod.value === "UPI"

    ){

        return enteredAmount.value / usdtRate.value;

    }

    // Already USDT

    return enteredAmount.value;

});

// Service Fee

const serviceFee = computed(() => {

    return enteredAmount.value * 0.10;

});

// Receive Amount

const receiveAmount = computed(() => {

    return enteredAmount.value - serviceFee.value;

});

/* ===========================================
   Lifecycle
=========================================== */

onMounted(async () => {

    await loadUser();

});

/* ===========================================
   Load Logged-in User
=========================================== */

async function loadUser() {

    try {

        const response = await api.get("/users/me");

        user.value = response.data;

        // Wallet balance is stored in USDT
        walletBalance.value = Number(response.data.balance || 0);

    } catch (error) {

        console.error(error);

        Toast.fire({
            icon: "error",
            title: "Unable to load user details."
        });

    }

}

/* ===========================================
   Save Bank Account
=========================================== */

async function saveAccount() {

    // Validation

    if (!bank.value.accountHolderName?.trim()) {

        Toast.fire({
            icon: "warning",
            title: "Enter Account Holder Name"
        });

        return;

    }

    if (!bank.value.bankName?.trim()) {

        Toast.fire({
            icon: "warning",
            title: "Enter Bank Name"
        });

        return;

    }

    if (!bank.value.accountNumber?.trim()) {

        Toast.fire({
            icon: "warning",
            title: "Enter Account Number"
        });

        return;

    }

    if (!bank.value.ifscCode?.trim()) {

        Toast.fire({
            icon: "warning",
            title: "Enter IFSC Code"
        });

        return;

    }

    try {

        loading.value = true;

        const response = await api.post(

            "/users/bank-account",

            {

                accountHolderName: bank.value.accountHolderName,

                bankName: bank.value.bankName,

                accountNumber: bank.value.accountNumber,

                ifscCode: bank.value.ifscCode

            }

        );

        // Refresh logged in user

        user.value = response.data;

        walletBalance.value = Number(response.data.balance || 0);

        // Hide form

        showAccountForm.value = false;

        // Clear fields

        bank.value = {

            accountHolderName: "",

            bankName: "",

            accountNumber: "",

            ifscCode: ""

        };

        Toast.fire({

            icon: "success",

            title: "Bank account saved successfully."

        });

    } catch (error) {

        console.error(error);

        Toast.fire({

            icon: "error",

            title:
                error.response?.data?.message ||
                "Unable to save bank account."

        });

    } finally {

        loading.value = false;

    }

}
/* ===========================================
   Withdraw
=========================================== */

async function withdraw() {

    // -----------------------------
    // Withdraw Type
    // -----------------------------

    if (!withdrawType.value) {

        Toast.fire({
            icon: "warning",
            title: "Please select withdraw type."
        });

        return;

    }

    // -----------------------------
    // Amount
    // -----------------------------

    if (!amount.value) {

        Toast.fire({
            icon: "warning",
            title: "Please enter withdraw amount."
        });

        return;

    }

    if (Number(amount.value) <= 0) {

        Toast.fire({
            icon: "warning",
            title: "Invalid withdraw amount."
        });

        return;

    }
    if (
        (withdrawType.value === "ACCOUNT" || paymentMethod.value === "UPI") &&
        Number(amount.value) < 300
    ) {

        Toast.fire({
            icon: "warning",
            title: "Minimum withdrawal is ₹300."
        });

        return;

    }
    if (
        withdrawType.value === "MANUAL" &&
        paymentMethod.value === "USDT" &&
        Number(amount.value) < 3
    ) {

        Toast.fire({
            icon: "warning",
            title: "Minimum withdrawal is 3 USDT."
        });

        return;

    }

    // --------------------------------
    // ACCOUNT
    // --------------------------------

    if (withdrawType.value === "ACCOUNT") {

        await loadUser();

        if (!hasBankAccount.value) {

            Toast.fire({
                icon: "warning",
                title: "Please add your bank account first."
            });

            return;

        }

    }

    // --------------------------------
    // MANUAL
    // --------------------------------

    if (withdrawType.value === "MANUAL") {

        if (!paymentMethod.value) {

            Toast.fire({
                icon: "warning",
                title: "Please select payment method."
            });

            return;

        }

        if (!accountDetails.value.trim()) {

            Toast.fire({
                icon: "warning",
                title: "Please enter account details."
            });

            return;

        }

    }

    // --------------------------------
    // Request
    // --------------------------------
    if (walletDeductionUsdt.value > walletBalance.value) {

        Toast.fire({
            icon: "error",
            title: "Insufficient wallet balance."
        });

        return;

    }

    try {

        loading.value = true;

        const payload = {

            userId: user.value.id,

            amount: Number(amount.value),

            withdrawType: withdrawType.value,

            paymentMethod:
                withdrawType.value === "ACCOUNT"
                    ? "BANK"
                    : paymentMethod.value,

            accountDetails:
                withdrawType.value === "ACCOUNT"
                    ? null
                    : accountDetails.value

        };

        const response = await api.post(

            "/withdraw/request",

            payload

        );

        Toast.fire({

            icon: "success",

            title:
                response.data.message ||
                "Withdraw request submitted successfully."

        });

        // --------------------------
        // Reset Form
        // --------------------------

        amount.value = "";

        withdrawType.value = "";

        paymentMethod.value = "";

        accountDetails.value = "";

        // Refresh User

        await loadUser();

    } catch (error) {

        console.error(error);

        Toast.fire({

            icon: "error",

            title:
                error.response?.data?.message ||
                error.response?.data ||
                "Withdraw request failed."

        });

    } finally {

        loading.value = false;

    }

}
</script>
<style scoped>

/* ===========================
   Layout
=========================== */

.withdraw-section{

    padding:20px;

    max-width:700px;

    margin:auto;

    min-height:100vh;

    background:linear-gradient(180deg,#151515,#222);

}



/* ===========================
   Balance
=========================== */

.balance-card{

    background:linear-gradient(135deg,#f6c667,#c79b3b);

    color:#222;

    border-radius:18px;

    padding:24px;

    text-align:center;

    box-shadow:0 8px 20px rgba(246,198,103,.25);

}


.balance-card h6{

    font-weight:700;

}


.balance-card h2{

    margin-top:10px;

    font-size:34px;

    font-weight:800;

}


.balance-inr{

    margin:0;

    font-weight:600;

}



/* ===========================
   Card
=========================== */

.withdraw-card{

    border:none;

    border-radius:20px;

    background:linear-gradient(145deg,#2b2b2b,#383838);

    border:1px solid rgba(255,255,255,.08);

    box-shadow:0 8px 25px rgba(0,0,0,.35);

}


.card-body{

    padding:25px;

}



.withdraw-card h4{

    color:#f6c667;

    font-weight:800;

}



/* ===========================
   Labels
=========================== */

.form-label{

    color:#f6c667 !important;

    font-weight:700;

}



/* ===========================
   Inputs
=========================== */

.form-control,
.form-select{


    height:50px;

    background:#222 !important;

    color:#fff !important;

    border:1px solid rgba(255,255,255,.18);

    border-radius:12px;


}


.form-control::placeholder{

    color:#999 !important;

}



.form-control:focus,
.form-select:focus{


    background:#222 !important;

    color:#fff !important;

    border-color:#f6c667;

    box-shadow:0 0 0 .2rem rgba(246,198,103,.18);


}



.form-select option{

    background:#222;

    color:#fff;

}



.input-group-text{

    background:#f6c667;

    color:#222;

    border:none;

    font-weight:700;

}



/* ===========================
   IMPORTANT FIX
   Helper text visible
=========================== */


.text-muted{

    color:#d8d8d8 !important;

    font-size:13px;

    font-weight:500;

}



small.text-muted{

    display:block;

    margin-top:8px;

    color:#f6c667 !important;

}



/* ===========================
   Bank Card
=========================== */

.bank-card{


    margin-top:20px;

    padding:18px;

    border-radius:15px;

    background:rgba(255,255,255,.08);

    border:1px solid rgba(255,255,255,.12);

}



.bank-title{


    display:flex;

    gap:10px;

    align-items:center;

    color:#f6c667;

    font-weight:700;

}



.bank-row{


    display:flex;

    justify-content:space-between;

    padding:10px 0;

    border-bottom:1px solid rgba(255,255,255,.08);

}



.bank-row:last-child{

    border-bottom:none;

}



.bank-row span{

    color:#ccc;

}



.bank-row strong{

    color:#f6c667;

}



/* ===========================
   Summary
=========================== */


.summary-card{


    background:rgba(246,198,103,.08);

    border:1px solid rgba(246,198,103,.25);

    border-radius:15px;

    padding:20px;


}



.summary-card h6{

    color:#f6c667;

    font-weight:800;

}



.summary-row{


    display:flex;

    justify-content:space-between;

    margin-bottom:12px;

    color:#ddd;

}



.summary-row strong{


    color:#f6c667;

}



/* ===========================
   Alert
=========================== */


.alert{


    border-radius:12px;

    font-weight:600;

}



.alert-warning,
.alert-info{


    background:rgba(246,198,103,.12);

    border:1px solid rgba(246,198,103,.25);

    color:#f6c667 !important;


}



/* ===========================
   Buttons
=========================== */


.btn-warning,
.btn-success,
.btn-primary{


    background:linear-gradient(135deg,#f6c667,#c79b3b);

    color:#222;

    border:none;

    font-weight:700;


}



.btn-secondary{


    background:#444;

    border:none;

}



.withdraw-btn{


    width:100%;

    height:52px;

    border-radius:12px;

    background:linear-gradient(135deg,#f6c667,#c79b3b);

    color:#222;

    border:none;

    font-size:17px;

    font-weight:800;

}



.withdraw-btn:hover{


    background:linear-gradient(135deg,#fff,#f6c667);

}



/* ===========================
   Mobile
=========================== */


@media(max-width:768px){


    .withdraw-section{

        padding:12px;

    }



    .card-body{

        padding:18px;

    }



    .bank-row{

        flex-direction:column;

        gap:5px;

    }


}



@media(max-width:480px){


    .balance-card h2{

        font-size:24px;

    }


    .form-control,
    .form-select{

        height:46px;

    }


}

/* ===========================
   Text Visibility Fix
=========================== */


/* All normal text inside withdraw card */

.withdraw-card span,
.withdraw-card p,
.withdraw-card label,
.withdraw-card small{

    color:#e8e8e8 !important;

}


/* Headings */

.withdraw-card h4,
.withdraw-card h5,
.withdraw-card h6{

    color:#f6c667 !important;

}



/* Summary Section */

.summary-card{

    background:rgba(255,255,255,.06);

    border:1px solid rgba(246,198,103,.25);

}



.summary-card h6{

    color:#f6c667 !important;

    font-weight:800;

}



.summary-row span{

    color:#ffffff !important;

    font-weight:600;

}



.summary-row strong{

    color:#f6c667 !important;

    font-weight:800;

}



/* Bank Account Section */

.bank-title span{

    color:#f6c667 !important;

    font-weight:700;

}



.bank-row span{

    color:#ddd !important;

}



.bank-row strong{

    color:#ffffff !important;

}



/* Select placeholder */

.form-select{

    color:#ffffff !important;

}



.form-select option{

    color:#ffffff !important;

    background:#222;

}



/* Alert Text */

.alert span,
.alert strong{

    color:#f6c667 !important;

}



/* Helper text */

.text-muted,
small.text-muted{

    color:#d8d8d8 !important;

}



/* Buttons text */

.btn{

    color:#222 !important;

    font-weight:700;

}

</style>