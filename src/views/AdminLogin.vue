<template>

<div class="login-page">

    <div class="login-card">

        <div class="login-header">

            <div class="icon-box">
                🔒
            </div>

            <h2>Admin Portal</h2>

            <p>Sign in to continue</p>

        </div>

        <div class="mb-3">

            <label class="form-label">
                Username
            </label>

            <input
                class="form-control"
                placeholder="Enter username"
                v-model="username"
            >

        </div>

        <div class="mb-4">

            <label class="form-label">
                Password
            </label>

            <div class="password-box">

                <input
                    :type="showPassword ? 'text' : 'password'"
                    class="form-control"
                    placeholder="Enter password"
                    v-model="password"
                >

                <button
                    class="toggle-btn"
                    @click="showPassword=!showPassword"
                    type="button"
                >
                    {{ showPassword ? "🙈" : "👁" }}
                </button>

            </div>

        </div>

        <button
            class="btn btn-warning login-btn"
            @click="login"
            :disabled="loading"
        >

            <span v-if="loading">

                Logging in...

            </span>

            <span v-else>

                Login

            </span>

        </button>

    </div>

</div>

</template>

<script setup>

import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "@/services/api";
import Swal from "sweetalert2";

const router = useRouter();

const username = ref("");

const password = ref("");

const showPassword = ref(false);

const loading = ref(false);

async function login(){

    if(!username.value || !password.value){

        await Swal.fire({

            icon:"warning",

            title:"Missing Details",

            text:"Enter username and password."

        });

        return;

    }

    loading.value=true;

    try{

        const response=await api.post("/admin/login",{

            username:username.value,

            password:password.value

        });

        localStorage.setItem("adminToken",response.data.token);

        localStorage.setItem("role","ADMIN");

        await Swal.fire({

            icon:"success",

            title:"Welcome Admin",

            text:"Login Successful",

            timer:1500,

            showConfirmButton:false

        });

        router.replace("/admin/dashboard");

    }

    catch(error){

        let message="Invalid username or password.";

        if(error.response){

            message=
                error.response.data?.message ||
                error.response.data ||
                message;

        }

        await Swal.fire({

            icon:"error",

            title:"Login Failed",

            text:message

        });

    }

    finally{

        loading.value=false;

    }

}

</script>

<style scoped>

.login-page{

    min-height:100vh;

    display:flex;

    justify-content:center;

    align-items:center;

    background:linear-gradient(135deg,#1f2937,#111827);

    padding:20px;

}

.login-card{

    width:100%;

    max-width:420px;

    background:white;

    border-radius:20px;

    padding:35px;

    box-shadow:0 20px 45px rgba(0,0,0,.25);

}

.login-header{

    text-align:center;

    margin-bottom:30px;

}

.icon-box{

    width:80px;

    height:80px;

    margin:auto;

    border-radius:50%;

    background:linear-gradient(135deg,#7f6744,#5a4d2e);

    display:flex;

    align-items:center;

    justify-content:center;

    font-size:38px;

    margin-bottom:18px;

}

.login-header h2{

    font-weight:700;

    color:#222;

}

.login-header p{

    color:#777;

    margin-top:6px;

}

.form-label{

    font-weight:600;

    margin-bottom:6px;

}

.form-control{

    height:50px;

    border-radius:12px;

    border:1px solid #ddd;

    font-size:15px;

}

.form-control:focus{

    border-color:#7f6744;

    box-shadow:0 0 0 .2rem rgba(127,103,68,.25);

}

.password-box{

    position:relative;

}

.toggle-btn{

    position:absolute;

    right:12px;

    top:50%;

    transform:translateY(-50%);

    border:none;

    background:none;

    cursor:pointer;

    font-size:18px;

}

.login-btn{

    width:100%;

    height:52px;

    border-radius:12px;

    font-size:17px;

    font-weight:700;

}

.login-btn:disabled{

    opacity:.8;

    cursor:not-allowed;

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