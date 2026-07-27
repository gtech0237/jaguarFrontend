<template>
    <div class="auth-page">

        <!-- Background Overlay -->
        <div class="overlay"></div>

        <div class="auth-wrapper">

            <!-- ===================== -->
            <!-- AUTH CARD -->
            <!-- ===================== -->

            <div class="auth-card">

                <!-- Tabs -->

                <div class="tab-container">

                    <button
                        class="tab-btn"
                        :class="{ active: activeTab === 'login' }"
                        @click="activeTab = 'login'"
                    >
                        <i class="bi bi-box-arrow-in-right me-2"></i>
                        Login
                    </button>

                    <button
                        class="tab-btn"
                        :class="{ active: activeTab === 'register' }"
                        @click="activeTab = 'register'"
                    >
                        <i class="bi bi-person-plus me-2"></i>
                        Register
                    </button>

                </div>

                <!-- ================= LOGIN ================= -->

                <div
                    v-if="activeTab === 'login'"
                    class="form-section"
                >

                    <h2 class="form-title">
                        Welcome Back 👋
                    </h2>

                    <p class="subtitle">
                        Login to your investment account
                    </p>

                    <!-- Phone -->

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

                    <!-- Password -->

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
                                type="button"
                                class="btn eye-btn"
                                @click="showLoginPassword = !showLoginPassword"
                            >

                                <i
                                    class="bi"
                                    :class="showLoginPassword ? 'bi-eye-slash' : 'bi-eye'"
                                ></i>

                            </button>

                        </div>

                    </div>

                    <button
                        class="btn auth-btn w-100"
                        @click="login"
                        :disabled="loading"
                    >

                        <span v-if="loading">
                            Logging in...
                        </span>

                        <span v-else>
                            <i class="bi bi-box-arrow-in-right me-2"></i>
                            Login
                        </span>

                    </button>

                </div>

                <!-- ================= REGISTER ================= -->

                <div
                    v-else
                    class="form-section"
                >

                    <h2 class="form-title">
                        Create Account 🚀
                    </h2>

                    <p class="subtitle">
                        Start earning today
                    </p>

                    <!-- Phone -->

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

                    <!-- Login Password -->

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
                                type="button"
                                class="btn eye-btn"
                                @click="showPassword = !showPassword"
                            >

                                <i
                                    class="bi"
                                    :class="showPassword ? 'bi-eye-slash' : 'bi-eye'"
                                ></i>

                            </button>

                        </div>

                    </div>

                    <!-- Withdraw Password -->

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
                                type="button"
                                class="btn eye-btn"
                                @click="showWithdrawPassword = !showWithdrawPassword"
                            >

                                <i
                                    class="bi"
                                    :class="showWithdrawPassword ? 'bi-eye-slash' : 'bi-eye'"
                                ></i>

                            </button>

                        </div>

                    </div>

                    <!-- Referral -->

                    <div class="mb-4">

                        <label class="form-label">
                            Referral Code
                            <small>(Optional)</small>
                        </label>

                        <div class="input-group">

                            <span class="input-group-text">
                                <i class="bi bi-gift"></i>
                            </span>

                            <input
                                v-model="referralCode"
                                class="form-control"
                                placeholder="Referral Code"
                            >

                        </div>

                    </div>

                    <button
                        class="btn auth-btn w-100"
                        @click="register"
                        :disabled="loading"
                    >

                        <span v-if="loading">
                            Creating Account...
                        </span>

                        <span v-else>
                            <i class="bi bi-person-check me-2"></i>
                            Create Account
                        </span>

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

/* ==========================================
   ACTIVE TAB
========================================== */

const activeTab = ref("login");

/* ==========================================
   REGISTER
========================================== */

const phone = ref("");
const password = ref("");
const withdrawPassword = ref("");
const referralCode = ref("");

/* ==========================================
   LOGIN
========================================== */

const loginPhone = ref("");
const loginPassword = ref("");

/* ==========================================
   PASSWORD TOGGLE
========================================== */

const showPassword = ref(false);
const showWithdrawPassword = ref(false);
const showLoginPassword = ref(false);

/* ==========================================
   LOADING
========================================== */

const loading = ref(false);

/* ==========================================
   CLIENT INFO
========================================== */

const ipAddress = ref("");
const location = ref("");

/* ==========================================
   ON MOUNT
========================================== */

onMounted(async () => {

    const token = localStorage.getItem("token");

    if (token) {

        router.replace("/home");
        return;

    }

    await loadClientInfo();

});

/* ==========================================
   LOAD CLIENT IP
========================================== */

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

/* ==========================================
   REGISTER
========================================== */

async function register() {

    if (

        !phone.value ||
        !password.value ||
        !withdrawPassword.value

    ) {

        await Swal.fire({

            icon: "warning",

            title: "Missing Details",

            text: "Please fill all required fields."

        });

        return;

    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone.value)) {

        await Swal.fire({
            icon: "warning",
            title: "Invalid Phone Number",
            text: "Phone number must contain exactly 10 digits."
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

        await Swal.fire({

            icon: "error",

            title: "Registration Failed",

            text: message

        });

    }

    finally {

        loading.value = false;

    }

}

/* ==========================================
   LOGIN
========================================== */

async function login() {

    if (

        !loginPhone.value ||
        !loginPassword.value

    ) {

        await Swal.fire({

            icon: "warning",

            title: "Missing Details",

            text: "Please enter phone number and password."

        });

        return;

    }
    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(loginPhone.value)) {

        await Swal.fire({
            icon: "warning",
            title: "Invalid Phone Number",
            text: "Phone number must contain exactly 10 digits."
        });

        return;

    }

    try {

        loading.value = true;

        const response = await loginApi({

            phone: loginPhone.value,

            password: loginPassword.value

        });

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

        await Swal.fire({

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

/* =====================================================
   BACKGROUND
===================================================== */

.auth-page{

    position:relative;

    width:100%;

    min-height:100vh;

    display:flex;

    justify-content:center;

    align-items:center;

    overflow:hidden;

    background:url("@/assets/images/adminLogin.png") no-repeat center center;

    background-size:cover;

}

/* =====================================================
   OVERLAY
===================================================== */

.overlay{

    position:absolute;

    inset:0;

    background:rgba(0,0,0,.45);

    backdrop-filter:blur(1px);

    z-index:1;

}

/* =====================================================
   WRAPPER
===================================================== */

.auth-wrapper{

    position:relative;

    z-index:2;

    width:100%;

    max-width:460px;

    margin:auto;

    display:flex;

    flex-direction:column;

    justify-content:center;

    align-items:center;

    padding:20px;

}

/* =====================================================
   CARD
===================================================== */

.auth-card{

    width:100%;

    background:rgba(18,18,18,.82);

    backdrop-filter:blur(15px);

    -webkit-backdrop-filter:blur(15px);

    border:1px solid rgba(214,176,96,.25);

    border-radius:24px;

    padding:30px;

    box-shadow:0 15px 40px rgba(0,0,0,.55);

}

/* =====================================================
   TABS
===================================================== */

.tab-container{

    display:flex;

    background:#1d1d1d;

    border-radius:15px;

    padding:5px;

    margin-bottom:28px;

}

.tab-btn{

    flex:1;

    border:none;

    background:transparent;

    color:#cfcfcf;

    padding:14px;

    border-radius:12px;

    font-size:16px;

    font-weight:700;

    transition:.25s;

}

.tab-btn.active{

    background:linear-gradient(135deg,#d5a53d,#80653d);

    color:#fff;

}

.tab-btn:hover{

    color:#fff;

}

/* =====================================================
   TITLES
===================================================== */

.form-title{

    text-align:center;

    color:#fff;

    font-size:34px;

    font-weight:800;

    margin-bottom:6px;

}

.subtitle{

    text-align:center;

    color:#bfbfbf;

    margin-bottom:28px;

    font-size:15px;

}

/* =====================================================
   FORM
===================================================== */

.form-label{

    color:#e4c16d;

    font-weight:700;

    margin-bottom:8px;

    display:block;

}

.form-label small{

    color:#b5b5b5;

}

/* =====================================================
   INPUT GROUP
===================================================== */

.input-group{

    margin-bottom:18px;

}

.input-group-text{

    background:#151515;

    color:#d6b060;

    border:1px solid #5f4d2d;

    border-right:none;

    min-width:55px;

    justify-content:center;

    border-radius:14px 0 0 14px;

}

.form-control{

    height:56px;

    background:#151515;

    color:#fff;

    border:1px solid #5f4d2d;

    border-left:none;

    border-radius:0 14px 14px 0;

    font-size:15px;

}

.form-control::placeholder{

    color:#888;

}

.form-control:focus{

    background:#151515;

    color:#fff;

    border-color:#d6b060;

    box-shadow:none;

}

.eye-btn{

    background:#151515;

    color:#bdbdbd;

    border:1px solid #5f4d2d;

    border-left:none;

    border-radius:0 14px 14px 0;

}

.eye-btn:hover{

    color:#fff;

    background:#1c1c1c;

}

/* =========================================================
   BACKGROUND
========================================================= */

.auth-page{
    position:relative;
    width:100%;
    min-height:100vh;

    display:flex;
    justify-content:center;
    align-items:flex-start;

    overflow:hidden;

    background:url("@/assets/images/adminLogin.png") center top / cover no-repeat;
}

.overlay{
    position:absolute;
    inset:0;
    background:rgba(0,0,0,.45);
}

/* =========================================================
   WRAPPER
========================================================= */

.auth-wrapper{
    position:relative;
    z-index:5;

    width:100%;
    max-width:470px;

    margin-top:70px;      /* Move form upward */
    margin-bottom:40px;

    padding:0 15px;
}

/* =========================================================
   CARD
========================================================= */
.auth-card{

    background: transparent;

    backdrop-filter: none;

    -webkit-backdrop-filter: none;

    border: none;

    border-radius: 22px;

    padding: 30px;

    box-shadow: none;

}

/* =========================================================
   TABS
========================================================= */

.tab-container{

    display:flex;

    background:#202020;

    border-radius:14px;

    padding:5px;

    margin-bottom:28px;

}

.tab-btn{

    flex:1;

    border:none;

    background:transparent;

    color:#d7d7d7;

    font-size:16px;

    font-weight:700;

    padding:14px;

    border-radius:12px;

    transition:.25s;

}

.tab-btn.active{

    background:linear-gradient(135deg,#d9b14b,#816739);

    color:#fff;

}

/* =========================================================
   TITLES
========================================================= */

.form-title{

    text-align:center;

    color:#fff;

    font-size:30px;

    font-weight:800;

    margin-bottom:8px;

}

.subtitle{

    text-align:center;

    color:#d2d2d2;

    margin-bottom:28px;

}

/* =========================================================
   LABEL
========================================================= */

.form-label{

    color:#e0bd6b;

    font-weight:700;

    margin-bottom:8px;

}

.form-label small{

    color:#bbbbbb;

}

/* =========================================================
   INPUT
========================================================= */

.input-group{

    margin-bottom:18px;

}

.input-group-text{

    background:#181818;

    color:#d7b15c;

    border:1px solid #5b4727;

    border-right:none;

    border-radius:14px 0 0 14px;

}

.form-control{

    height:56px;

    background:#181818;

    border:1px solid #5b4727;

    border-left:none;

    color:#fff;

    border-radius:0 14px 14px 0;

}

.form-control::placeholder{

    color:#8c8c8c;

}

.form-control:focus{

    background:#181818;

    color:#fff;

    border-color:#d4aa43;

    box-shadow:none;

}

.eye-btn{

    background:#181818;

    color:#cfcfcf;

    border:1px solid #5b4727;

    border-left:none;

    border-radius:0 14px 14px 0;

}

.eye-btn:hover{

    background:#181818;

    color:#fff;

}

/* =========================================================
   BUTTON
========================================================= */

.auth-btn{

    width:100%;

    height:56px;

    border:none;

    border-radius:14px;

    background:linear-gradient(135deg,#d7b04c,#7f6744);

    color:#fff;

    font-size:17px;

    font-weight:700;

    transition:.2s;

}

.auth-btn:hover{

    opacity:.95;

    color:#fff;

}

/* =========================================================
   FOOTER
========================================================= */

.bottom-text{

    text-align:center;

    margin-top:18px;

    color:#eeeeee;

    font-size:13px;

}

/* =========================================================
   REMOVE ALL HOVER MOVEMENT
========================================================= */

.input-group:hover{
    transform:none;
}

.auth-card:hover{
    box-shadow:0 18px 40px rgba(0,0,0,.45);
}

button:hover{
    transform:none;
}

/* =========================================================
   ANIMATION
========================================================= */

.auth-card{
    animation:fade .45s ease;
}

@keyframes fade{

    from{
        opacity:0;
        transform:translateY(12px);
    }

    to{
        opacity:1;
        transform:translateY(0);
    }

}

/* =========================================================
   MOBILE
========================================================= */

@media(max-width:768px){

    .auth-wrapper{

        margin-top:45px;

        max-width:100%;

    }

    .auth-card{

        padding:24px;

    }

    .form-title{

        font-size:26px;

    }

    .tab-btn{

        font-size:15px;

    }

}

@media(max-width:576px){

    .auth-page{

        align-items:flex-start;

    }

    .auth-wrapper{

        margin-top:25px;

    }

    .auth-card{

        padding:20px;

        border-radius:18px;

    }

    .form-title{

        font-size:23px;

    }

    .subtitle{

        font-size:13px;

    }

    .form-control{

        height:50px;

    }

    .auth-btn{

        height:52px;

    }

}

</style>