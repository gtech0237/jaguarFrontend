<template>
    <div class="auth-page">

        <!-- Background Shapes -->
        <div class="bg-circle bg-circle-1"></div>
        <div class="bg-circle bg-circle-2"></div>

        <div class="auth-wrapper">

            <!-- Logo -->
            <div class="logo-section">

                <div class="logo-icon">
                    💰
                </div>

                <h1>Jaguar</h1>

                <p>
                    Invest Smart • Earn Daily • Build Your Future
                </p>

            </div>

            <!-- Card -->
            <div class="auth-card">

                <!-- Tabs -->
                <div class="tab-container">

                    <button
                        class="tab-btn"
                        :class="{ active: activeTab === 'login' }"
                        @click="activeTab='login'"
                    >
                        <i class="bi bi-box-arrow-in-right me-2"></i>
                        Login
                    </button>

                    <button
                        class="tab-btn"
                        :class="{ active: activeTab === 'register' }"
                        @click="activeTab='register'"
                    >
                        <i class="bi bi-person-plus me-2"></i>
                        Register
                    </button>

                </div>

                <!-- ================= LOGIN ================= -->

                <div
                    v-if="activeTab==='login'"
                    class="form-section"
                >

                    <h3>
                        Welcome Back 👋
                    </h3>

                    <p class="subtitle">
                        Login to your investment account
                    </p>

                    <div class="mb-3">

                        <label class="form-label">
                            Phone Number
                        </label>

                        <div class="input-group">

                            <span class="input-group-text">
                                <i class="bi bi-phone"></i>
                            </span>

                            <input
                                v-model="loginPhone"
                                type="tel"
                                class="form-control"
                                placeholder="Enter phone number"
                            >

                        </div>

                    </div>

                    <div class="mb-4">

                        <label class="form-label">
                            Password
                        </label>

                        <div class="input-group">

                            <span class="input-group-text">
                                <i class="bi bi-lock"></i>
                            </span>

                            <input
                                :type="showLoginPassword ? 'text' : 'password'"
                                v-model="loginPassword"
                                class="form-control"
                                placeholder="Enter password"
                            >

                            <button
                                class="btn btn-light border"
                                type="button"
                                @click="showLoginPassword=!showLoginPassword"
                            >
                                <i
                                    class="bi"
                                    :class="showLoginPassword ? 'bi-eye-slash' : 'bi-eye'"
                                ></i>
                            </button>

                        </div>

                    </div>

                    <button
                        class="btn btn-warning w-100 auth-btn"
                        @click="login"
                    >
                        <i class="bi bi-box-arrow-in-right me-2"></i>
                        Login
                    </button>

                </div>

                <!-- ================= REGISTER ================= -->

                <div
                    v-else
                    class="form-section"
                >

                    <h3>
                        Create Account 🚀
                    </h3>

                    <p class="subtitle">
                        Start earning today
                    </p>

                    <div class="mb-3">

                        <label class="form-label">
                            Phone Number
                        </label>

                        <div class="input-group">

                            <span class="input-group-text">
                                <i class="bi bi-phone"></i>
                            </span>

                            <input
                                v-model="phone"
                                type="tel"
                                class="form-control"
                                placeholder="Enter phone number"
                            >

                        </div>

                    </div>

                    <div class="mb-3">

                        <label class="form-label">
                            Login Password
                        </label>

                        <div class="input-group">

                            <span class="input-group-text">
                                <i class="bi bi-lock"></i>
                            </span>

                            <input
                                :type="showPassword ? 'text' : 'password'"
                                v-model="password"
                                class="form-control"
                                placeholder="Enter password"
                            >

                            <button
                                class="btn btn-light border"
                                type="button"
                                @click="showPassword=!showPassword"
                            >
                                <i
                                    class="bi"
                                    :class="showPassword ? 'bi-eye-slash' : 'bi-eye'"
                                ></i>
                            </button>

                        </div>

                    </div>

                    <div class="mb-3">

                        <label class="form-label">
                            Withdraw Password
                        </label>

                        <div class="input-group">

                            <span class="input-group-text">
                                <i class="bi bi-shield-lock"></i>
                            </span>

                            <input
                                :type="showWithdrawPassword ? 'text' : 'password'"
                                v-model="withdrawPassword"
                                class="form-control"
                                placeholder="Enter withdraw password"
                            >

                            <button
                                class="btn btn-light border"
                                type="button"
                                @click="showWithdrawPassword=!showWithdrawPassword"
                            >
                                <i
                                    class="bi"
                                    :class="showWithdrawPassword ? 'bi-eye-slash' : 'bi-eye'"
                                ></i>
                            </button>

                        </div>

                    </div>

                    <div class="mb-4">

                        <label class="form-label">
                            Referral Code
                            <small class="text-muted">(Optional)</small>
                        </label>

                        <div class="input-group">

                            <span class="input-group-text">
                                <i class="bi bi-gift"></i>
                            </span>

                            <input
                                v-model="referralCode"
                                type="text"
                                class="form-control"
                                placeholder="Referral code (Optional)"
                            >

                        </div>

                    </div>

                    <button
                        class="btn btn-warning w-100 auth-btn"
                        @click="register"
                    >
                        <i class="bi bi-person-check me-2"></i>
                        Create Account
                    </button>

                </div>

            </div>

            <div class="bottom-text">
                Secure Investment Platform • Jaguar © {{ new Date().getFullYear() }}
            </div>

        </div>

    </div>
</template>

<script setup>

import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
    register as registerApi,
    login as loginApi
} from "@/services/authService";
import Swal from "sweetalert2";

const router = useRouter();

/* ===========================
   Tabs
=========================== */

const activeTab = ref("login");

/* ===========================
   Registration
=========================== */

const phone = ref("");
const password = ref("");
const withdrawPassword = ref("");
const referralCode = ref("");

/* ===========================
   Login
=========================== */

const loginPhone = ref("");
const loginPassword = ref("");

/* ===========================
   Password Toggle
=========================== */

const showPassword = ref(false);
const showWithdrawPassword = ref(false);
const showLoginPassword = ref(false);

/* ===========================
   Loading
=========================== */

const loading = ref(false);

/* ===========================
   Client Info
=========================== */

const ipAddress = ref("");
const location = ref("");

/* ===========================
   Mounted
=========================== */

onMounted(async () => {

    const token = localStorage.getItem("token");

    if (token) {

        router.replace("/home");

        return;

    }

    await loadClientInfo();

});

/* ===========================
   Load IP & Location
=========================== */

async function loadClientInfo() {

    try {

        const response = await fetch("https://ipapi.co/json/");

        const data = await response.json();

        ipAddress.value = data.ip || "";

        location.value = [
            data.city,
            data.region,
            data.country_name
        ]
            .filter(Boolean)
            .join(", ");

    }

    catch (error) {

        console.log(error);

    }

}

/* ===========================
   Register
=========================== */

async function register() {

    if (
        !phone.value ||
        !password.value ||
        !withdrawPassword.value
    ) {

        Swal.fire({

            icon: "warning",

            title: "Missing Details",

            text: "Please fill all required fields."

        });

        return;

    }

    try {

        loading.value = true;

        const response = await registerApi({

            phone: phone.value,

            password: password.value,

            withdrawPassword: withdrawPassword.value,

            referralCode: referralCode.value || null,

            ipAddress: ipAddress.value,

            location: location.value

        });

        await Swal.fire({

            icon: "success",

            title: "Registration Successful",

            text: response.data,

            timer: 1800,

            showConfirmButton: false

        });

        activeTab.value = "login";

        loginPhone.value = phone.value;

        phone.value = "";
        password.value = "";
        withdrawPassword.value = "";
        referralCode.value = "";

    }

    catch (error) {

        let message = "Registration Failed";

        if (error.response) {

            message =
                error.response.data?.message ||
                error.response.data?.errorMessage ||
                error.response.data ||
                message;

        }

        Swal.fire({

            icon: "error",

            title: "Registration Failed",

            text: message

        });

    }

    finally {

        loading.value = false;

    }

}

/* ===========================
   Login
=========================== */

async function login() {

    if (
        !loginPhone.value ||
        !loginPassword.value
    ) {

        Swal.fire({

            icon: "warning",

            title: "Missing Details",

            text: "Please enter phone number and password."

        });

        return;

    }

    try {

        loading.value = true;

        const response = await loginApi({

            phone: loginPhone.value,

            password: loginPassword.value

        });

        /* Save Login */

        localStorage.setItem(
            "token",
            response.data.token
        );

        localStorage.setItem(
            "user",
            JSON.stringify(response.data.user)
        );

        await Swal.fire({

            icon: "success",

            title: "Login Successful",

            text: `Welcome ${response.data.user.phone}`,

            timer: 1500,

            showConfirmButton: false

        });

        router.replace("/home");

    }

    catch (error) {

        let message = "Invalid Phone Number or Password";

        if (error.response) {

            message =
                error.response.data?.message ||
                error.response.data?.errorMessage ||
                error.response.data ||
                message;

        }

        Swal.fire({

            icon: "error",

            title: "Login Failed",

            text: message

        });

    }

    finally {

        loading.value = false;

    }

}

</script>

<style scoped>

/* ===========================
   Background
=========================== */

.auth-page{

    min-height:100vh;

    background:linear-gradient(135deg,#fff8e1,#eef6ff);

    display:flex;

    justify-content:center;

    align-items:center;

    padding:30px 18px;

    position:relative;

    overflow:hidden;

}

/* Decorative Circles */

.bg-circle{

    position:absolute;

    border-radius:50%;

    filter:blur(70px);

    opacity:.35;

    z-index:0;

}

.bg-circle-1{

    width:260px;

    height:260px;

    background:linear-gradient(135deg,#7f6744,#5a4d2e);

    top:-80px;

    left:-80px;

}

.bg-circle-2{

    width:320px;

    height:320px;

    background:#4dabff;

    bottom:-120px;

    right:-100px;

}

/* ===========================
   Wrapper
=========================== */

.auth-wrapper{

    width:100%;

    max-width:420px;

    position:relative;

    z-index:2;

}

/* ===========================
   Logo
=========================== */

.logo-section{

    text-align:center;

    margin-bottom:25px;

}

.logo-icon{

    width:90px;

    height:90px;

    border-radius:50%;

    margin:auto;

    background:linear-gradient(135deg,#7f6744,#5a4d2e);

    display:flex;

    justify-content:center;

    align-items:center;

    font-size:42px;

    color:#fff;

    box-shadow:0 15px 35px rgba(255,152,0,.35);

}

.logo-section h1{

    margin-top:18px;

    font-size:34px;

    font-weight:800;

    color:#7f6744;

    letter-spacing:1px;

}

.logo-section p{

    margin-top:8px;

    color:#666;

    font-size:15px;

}

/* ===========================
   Card
=========================== */

.auth-card{

    background:rgba(255,255,255,.92);

    backdrop-filter:blur(15px);

    border-radius:24px;

    padding:28px;

    box-shadow:0 20px 50px rgba(0,0,0,.12);

    border:1px solid rgba(255,255,255,.4);

}

/* ===========================
   Tabs
=========================== */

.tab-container{

    display:flex;

    background:#f0f0f0;

    border-radius:14px;

    padding:5px;

    margin-bottom:30px;

}

.tab-btn{

    flex:1;

    border:none;

    background:transparent;

    padding:13px;

    border-radius:10px;

    font-weight:600;

    color:#666;

    transition:.3s;

}

.tab-btn:hover{

    color:#7f6744;

}

.tab-btn.active{

    background:#7f6744;

    color:#fff;

    box-shadow:0 8px 18px rgba(127,103,68,.3);

}

/* ===========================
   Form
=========================== */

.form-section h3{

    text-align:center;

    font-weight:700;

    color:#222;

}

.subtitle{

    text-align:center;

    color:#777;

    margin-top:6px;

    margin-bottom:28px;

    font-size:14px;

}

.form-label{

    font-weight:600;

    color:#555;

    margin-bottom:6px;

}

.input-group{

    margin-bottom:4px;

}

.input-group-text{

    background:#fff;

    border-right:none;

    border-radius:12px 0 0 12px;

    color:#7f6744;

}

.form-control{

    height:52px;

    border-left:none;

    border-radius:0 12px 12px 0;

    font-size:15px;

}

.form-control:focus{

    border-color:#7f6744;

    box-shadow:0 0 0 .2rem rgba(127,103,68,.18);

}

.btn-light{

    border-left:none;

    border-radius:0 12px 12px 0;

}

.auth-btn{

    height:54px;

    border-radius:14px;

    font-size:17px;

    font-weight:700;

    transition:.3s;

}

.auth-btn:hover{

    transform:translateY(-2px);

    box-shadow:0 12px 24px rgba(255,152,0,.3);

}

/* ===========================
   Footer
=========================== */

.bottom-text{

    margin-top:20px;

    text-align:center;

    font-size:13px;

    color:#666;

}

/* ===========================
   Responsive
=========================== */

@media(max-width:576px){

    .auth-page{

        padding:20px 14px;

    }

    .auth-card{

        padding:22px;

        border-radius:20px;

    }

    .logo-icon{

        width:75px;

        height:75px;

        font-size:34px;

    }

    .logo-section h1{

        font-size:28px;

    }

    .tab-btn{

        padding:11px;

        font-size:14px;

    }

    .form-control{

        height:48px;

        font-size:14px;

    }

    .auth-btn{

        height:50px;

        font-size:16px;

    }

}

/* ===========================
   Animation
=========================== */

.auth-card{

    animation:fadeUp .7s ease;

}

@keyframes fadeUp{

    from{

        opacity:0;

        transform:translateY(30px);

    }

    to{

        opacity:1;

        transform:translateY(0);

    }

}
.btn-warning {
    --bs-btn-color: #ffffff;
    --bs-btn-bg: #7f6744;
    --bs-btn-border-color: #7f6744;

    --bs-btn-hover-color: #ffffff;
    --bs-btn-hover-bg: #6d593c;
    --bs-btn-hover-border-color: #6d593c;

    --bs-btn-focus-shadow-rgb: 127, 103, 68;

    --bs-btn-active-color: #ffffff;
    --bs-btn-active-bg: #5c4b33;
    --bs-btn-active-border-color: #5c4b33;

    --bs-btn-active-shadow: inset 0 3px 5px rgba(0,0,0,.15);

    --bs-btn-disabled-color: #ffffff;
    --bs-btn-disabled-bg: #a38c68;
    --bs-btn-disabled-border-color: #a38c68;
}

</style>