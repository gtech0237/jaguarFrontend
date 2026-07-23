```vue
<template>

<div class="admin-page">

    <!-- =====================================================
         HEADER
    ====================================================== -->

    <div class="dashboard-header">

        <div>

            <h2 class="page-title">
                Admin Dashboard
            </h2>

            <p class="page-subtitle">
                Manage recharge and withdraw requests
            </p>

        </div>

        <button
            class="btn btn-danger logout-btn"
            @click="logout"
        >
            Logout
        </button>

    </div>



    <!-- =====================================================
         TABS
    ====================================================== -->

    <div class="tab-wrapper">

        <button

            class="tab-btn"

            :class="{
                active: activeTab==='recharge'
            }"

            @click="activeTab='recharge'"

        >

            <i class="bi bi-wallet2"></i>

            Pending Recharge

            <span
                class="badge rounded-pill bg-warning text-dark"
            >
                {{ pendingRechargeCount }}
            </span>

        </button>



        <button

            class="tab-btn"

            :class="{
                active: activeTab==='withdraw'
            }"

            @click="activeTab='withdraw'"

        >

            <i class="bi bi-cash-stack"></i>

            Pending Withdraw

            <span
                class="badge rounded-pill bg-warning text-dark"
            >
                {{ pendingWithdrawCount }}
            </span>

        </button>
        <button

            class="tab-btn"

            :class="{
                active: activeTab==='income'
            }"

            @click="activeTab='income'"

        >

            <i class="bi bi-graph-up-arrow"></i>

            Daily Income Details

        </button>

    </div>



    <!-- =====================================================
         SEARCH
    ====================================================== -->

    <div class="search-section">

        <div class="search-box">

            <i class="bi bi-search"></i>

            <input

                v-if="activeTab==='recharge'"

                type="text"

                class="form-control"

                v-model="rechargeSearch"

                placeholder="Search by Phone or Transaction Hash"

            />

            <input

                v-else

                type="text"

                class="form-control"

                v-model="withdrawSearch"

                placeholder="Search by Phone or Account Details"

            />

        </div>

    </div>



    <!-- =====================================================
         CONTENT CARD
    ====================================================== -->

    <div class="card content-card">

        <div class="card-body">



            <!-- =============================================
                 RECHARGE TAB
            ============================================== -->

            <div v-if="activeTab==='recharge'">

                <div class="section-header">

                    <div>

                        <h4>
                            Pending Recharge Requests
                        </h4>

                        <small>
                            Review and approve recharge requests.
                        </small>

                    </div>

                    <span class="count-pill">

                        {{ filteredRechargeRequests.length }}

                        Pending

                    </span>

                </div>



                <div
                    class="table-responsive"
                    v-if="filteredRechargeRequests.length"
                >

                    <table
                        class="table table-hover align-middle"
                    >

                        <thead>

                        <tr>

                            <th>User ID</th>

                            <th>Phone</th>

                            <th>Amount</th>

                            <th>Transaction Hash</th>

                            <th>Method</th>

                            <th>Status</th>

                            <th>Created</th>

                            <th width="180">
                                Action
                            </th>

                        </tr>

                        </thead>

                        <tbody>

                        <tr

                            v-for="request in filteredRechargeRequests"

                            :key="request.id"

                        >

                            <td>

                                <span class="user-badge">

                                    #{{ request.userId }}

                                </span>

                            </td>

                            <td>

                                {{ request.phone }}

                            </td>

                            <td>

                                <strong>

                                    $ {{ request.amount }}

                                </strong>

                            </td>

                            <td>

                                <span
                                    class="hash-text"
                                    :title="request.transactionId"
                                >

                                    {{
                                            request.transactionId
                                    }}

                                </span>

                            </td>

                            <td>

                                <span class="method-pill">

                                    {{
                                        request.paymentMethod
                                    }}

                                </span>

                            </td>

                            <td>

                                <span
                                    class="badge bg-warning text-dark"
                                >

                                    {{
                                        request.status
                                    }}

                                </span>

                            </td>

                            <td>

                                {{
                                    formatDate(
                                        request.createdOn
                                    )
                                }}

                            </td>

                            <td>

                                <div class="action-group">

                                    <button

                                        class="btn btn-success btn-sm"

                                        @click="
                                            approveRecharge(
                                                request.id
                                            )
                                        "

                                    >

                                        Approve

                                    </button>

                                    <button

                                        class="btn btn-danger btn-sm"

                                        @click="
                                            rejectRecharge(
                                                request.id
                                            )
                                        "

                                    >

                                        Reject

                                    </button>

                                </div>

                            </td>

                        </tr>

                        </tbody>

                    </table>

                </div>



                <div
                    v-else
                    class="empty-box"
                >

                    <i
                        class="bi bi-wallet2"
                    ></i>

                    <h5>
                        No Pending Recharge Requests
                    </h5>

                    <p>

                        All recharge requests have been processed.

                    </p>

                </div>

            </div>
            <div v-else-if="activeTab==='income'">

                <DailyIncomeDetails />

            </div>



            <!-- =============================================
                 WITHDRAW TAB
            ============================================== -->

            <div v-else>

                <div class="section-header">

                    <div>

                        <h4>

                            Pending Withdraw Requests

                        </h4>

                        <small>

                            Review and approve withdrawal requests.

                        </small>

                    </div>

                    <span class="count-pill">

                        {{ filteredWithdrawRequests.length }}

                        Pending

                    </span>

                </div>



                <div
                    class="table-responsive"
                    v-if="filteredWithdrawRequests.length"
                >

                    <table
                        class="table table-hover align-middle"
                    >

                        <thead>

                        <tr>

                            <th>User</th>

                            <th>Phone</th>

                            <th>Wallet</th>

                            <th>INR</th>

                            <th>Fee</th>

                            <th>Pay User</th>

                            <th>Type</th>

                            <th>Method</th>

                            <th>Account</th>

                            <th>Status</th>

                            <th>Created</th>

                            <th width="180">

                                Action

                            </th>

                        </tr>

                        </thead>

                        <tbody>

                        <tr

                            v-for="item in filteredWithdrawRequests"

                            :key="item.id"

                        >

                            <td>

                                <span class="user-badge">

                                    #{{ item.userId }}

                                </span>

                            </td>

                            <td>

                                {{ item.phone }}

                            </td>

                            <td>

                                {{ item.requestedAmountUsdt }}

                                USDT

                            </td>

                            <td>

                                ₹{{ item.requestedAmountInr }}

                            </td>

                            <td>

                                {{ item.serviceFee }}

                                {{ item.currency }}

                            </td>

                            <td>

                                {{ item.payableAmount }}

                                {{ item.currency }}

                            </td>

                            <td>

                                <span class="method-pill">

                                    {{ item.withdrawType }}

                                </span>

                            </td>

                            <td>

                                {{ item.paymentMethod }}

                            </td>

                            <td>

                                <span
                                    class="account-text"
                                >

                                    {{ item.accountDetails }}

                                </span>

                            </td>

                            <td>

                                <span

                                    class="badge"

                                    :class="{

                                        'bg-warning':
                                        item.status==='PENDING',

                                        'bg-success':
                                        item.status==='APPROVED',

                                        'bg-danger':
                                        item.status==='REJECTED'

                                    }"

                                >

                                    {{ item.status }}

                                </span>

                            </td>

                            <td>

                                {{
                                    formatDate(
                                        item.createdOn
                                    )
                                }}

                            </td>

                            <td>

                                <div class="action-group">

                                    <button

                                        class="btn btn-success btn-sm"

                                        @click="
                                            approveWithdraw(
                                                item.id
                                            )
                                        "

                                    >

                                        Approve

                                    </button>

                                    <button

                                        class="btn btn-danger btn-sm"

                                        @click="
                                            rejectWithdraw(
                                                item.id
                                            )
                                        "

                                    >

                                        Reject

                                    </button>

                                </div>

                            </td>

                        </tr>

                        </tbody>

                    </table>

                </div>



                <div
                    v-else
                    class="empty-box"
                >

                    <i
                        class="bi bi-cash-stack"
                    ></i>

                    <h5>

                        No Pending Withdraw Requests

                    </h5>

                    <p>

                        All withdrawal requests have been processed.

                    </p>

                </div>

            </div>

        </div>

    </div>

</div>

</template>

<script setup>

import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import api from "@/services/api";
import DailyIncomeDetails from "./DailyIncomeDetails.vue";

const router = useRouter();


const activeTab = ref("recharge");

const rechargeRequests = ref([]);
const withdrawRequests = ref([]);

const rechargeSearch = ref("");
const withdrawSearch = ref("");

const pendingRechargeCount = ref(0);
const pendingWithdrawCount = ref(0);

const loading = ref(false);

let refreshTimer = null;

const Toast = Swal.mixin({

    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true

});

function adminHeaders() {

    return {

        Authorization:
            `Bearer ${localStorage.getItem("adminToken")}`

    };

}

async function loadDashboard() {

    loading.value = true;

    await Promise.all([

        loadPendingRechargeRequests(),

        loadPendingWithdrawRequests()

    ]);

    loading.value = false;

}

async function loadPendingRechargeRequests() {

    try {

        const response = await api.get(

            "/admin/payments/pending",

            {
                headers: adminHeaders()
            }

        );

        rechargeRequests.value = response.data;

        pendingRechargeCount.value =
            response.data.length;

    }

    catch (error) {

        console.error(
            "Recharge Load Error",
            error
        );

    }

}

async function loadPendingWithdrawRequests() {

    try {

        const response = await api.get(

            "/admin/withdraw/pending",

            {
                headers: adminHeaders()
            }

        );

        withdrawRequests.value =
            response.data;

        pendingWithdrawCount.value =
            response.data.length;

    }

    catch (error) {

        console.error(
            "Withdraw Load Error",
            error
        );

    }

}


const filteredRechargeRequests = computed(() => {

    const search =
        rechargeSearch.value
            .trim()
            .toLowerCase();

    if (!search)
        return rechargeRequests.value;

    return rechargeRequests.value.filter(item => {

        return (

            String(item.userId)
                .includes(search)

            ||

            String(item.id)
                .includes(search)

            ||

            (item.phone || "")
                .toLowerCase()
                .includes(search)

            ||

            (item.transactionId || "")
                .toLowerCase()
                .includes(search)

            ||

            (item.paymentMethod || "")
                .toLowerCase()
                .includes(search)

        );

    });

});


const filteredWithdrawRequests = computed(() => {

    const search =
        withdrawSearch.value
            .trim()
            .toLowerCase();

    if (!search)
        return withdrawRequests.value;

    return withdrawRequests.value.filter(item => {

        return (

            String(item.userId)
                .includes(search)

            ||

            String(item.id)
                .includes(search)

            ||

            (item.phone || "")
                .toLowerCase()
                .includes(search)

            ||

            (item.accountDetails || "")
                .toLowerCase()
                .includes(search)

            ||

            (item.paymentMethod || "")
                .toLowerCase()
                .includes(search)

            ||

            (item.withdrawType || "")
                .toLowerCase()
                .includes(search)

        );

    });

});

/*
|--------------------------------------------------------------------------
| Approve Recharge
|--------------------------------------------------------------------------
*/
async function approveRecharge(id) {

    try {

        const response = await api.post(

            `/admin/payments/${id}/approve`,

            {},

            {
                headers: adminHeaders()
            }

        );

        Toast.fire({

            icon: "success",

            title: response.data || "Recharge Approved"

        });

        await loadDashboard();

    }

    catch (error) {

        Toast.fire({

            icon: "error",

            title:
                error.response?.data ||
                error.response?.data?.message ||
                "Approval Failed"

        });

    }

}


/*
|--------------------------------------------------------------------------
| Reject Recharge
|--------------------------------------------------------------------------
*/
async function rejectRecharge(id) {

    const result = await Swal.fire({

        title: "Reject Recharge?",

        text: "This recharge request will be rejected.",

        icon: "warning",

        showCancelButton: true,

        confirmButtonText: "Reject",

        cancelButtonText: "Cancel",

        confirmButtonColor: "#d33"

    });

    if (!result.isConfirmed)
        return;

    try {

        const response = await api.post(

            `/admin/payments/${id}/reject`,

            {},

            {
                headers: adminHeaders()
            }

        );

        Toast.fire({

            icon: "success",

            title: response.data || "Recharge Rejected"

        });

        await loadDashboard();

    }

    catch (error) {

        Toast.fire({

            icon: "error",

            title:
                error.response?.data ||
                error.response?.data?.message ||
                "Reject Failed"

        });

    }

}


/*
|--------------------------------------------------------------------------
| Approve Withdraw
|--------------------------------------------------------------------------
*/
async function approveWithdraw(id) {

    try {

        const response = await api.post(

            `/admin/withdraw/${id}/approve`,

            {},

            {
                headers: adminHeaders()
            }

        );

        Toast.fire({

            icon: "success",

            title: response.data || "Withdraw Approved"

        });

        await loadDashboard();

    }

    catch (error) {

        Toast.fire({

            icon: "error",

            title:
                error.response?.data ||
                error.response?.data?.message ||
                "Approval Failed"

        });

    }

}


/*
|--------------------------------------------------------------------------
| Reject Withdraw
|--------------------------------------------------------------------------
*/
async function rejectWithdraw(id) {

    const result = await Swal.fire({

        title: "Reject Withdraw?",

        text: "User will not receive the payment.",

        icon: "warning",

        showCancelButton: true,

        confirmButtonText: "Reject",

        cancelButtonText: "Cancel",

        confirmButtonColor: "#d33"

    });

    if (!result.isConfirmed)
        return;

    try {

        const response = await api.post(

            `/admin/withdraw/${id}/reject`,

            {},

            {
                headers: adminHeaders()
            }

        );

        Toast.fire({

            icon: "success",

            title: response.data || "Withdraw Rejected"

        });

        await loadDashboard();

    }

    catch (error) {

        Toast.fire({

            icon: "error",

            title:
                error.response?.data ||
                error.response?.data?.message ||
                "Reject Failed"

        });

    }

}



function formatDate(date) {

    if (!date)
        return "-";

    return new Date(date).toLocaleString(

        "en-IN",

        {

            day: "2-digit",

            month: "short",

            year: "numeric",

            hour: "2-digit",

            minute: "2-digit"

        }

    );

}


function logout() {

    localStorage.removeItem("adminToken");

    localStorage.removeItem("role");

    router.replace("/admin/login");

}


onMounted(() => {

    loadDashboard();

    refreshTimer = setInterval(() => {

        loadDashboard();

    }, 30000);

});

onUnmounted(() => {

    clearInterval(refreshTimer);

});
</script>
<style scoped>


.admin-page{

    min-height:100vh;

    background:#f4f7fb;

    padding:30px;

}



/* =========================================================
   HEADER
========================================================= */

.dashboard-header{

    display:flex;

    justify-content:space-between;

    align-items:center;

    margin-bottom:28px;

    gap:20px;

    flex-wrap:wrap;

}



.dashboard-header h2{

    margin:0;

    font-size:30px;

    font-weight:700;

    color:#2b2b2b;

    letter-spacing:.3px;

}



.dashboard-header .btn{

    border-radius:12px;

    padding:10px 24px;

    font-weight:600;

}



/* =========================================================
   TAB SECTION
========================================================= */

.tab-container{

    display:flex;

    gap:18px;

    flex-wrap:wrap;

    margin-bottom:25px;

}



/* =========================================================
   TAB CARD
========================================================= */

.tab-btn{

    flex:1;

    min-width:320px;

    border:none;

    background:#fff;

    border-radius:18px;

    padding:22px;

    text-align:left;

    transition:.30s;

    box-shadow:

        0 6px 20px rgba(0,0,0,.08);

    position:relative;

    cursor:pointer;

}



.tab-btn:hover{

    transform:translateY(-4px);

    box-shadow:

        0 10px 28px rgba(0,0,0,.12);

}



.tab-btn.active{

    background:linear-gradient(

        135deg,

        #7f6744,

        #9c7d54

    );

    color:#fff;

}



/* =========================================================
   TAB TITLE
========================================================= */

.tab-title{

    display:flex;

    align-items:center;

    justify-content:space-between;

    margin-bottom:18px;

}



.tab-title h5{

    margin:0;

    font-size:18px;

    font-weight:700;

}



.tab-title .badge{

    font-size:13px;

    padding:7px 12px;

    border-radius:30px;

}



/* =========================================================
   SEARCH BOX
========================================================= */

.search-box{

    margin-top:10px;

}



.search-box input{

    width:100%;

    height:46px;

    border-radius:12px;

    border:1px solid #ddd;

    padding:0 18px;

    font-size:14px;

    transition:.25s;

    background:#fff;

}



.search-box input:focus{

    outline:none;

    border-color:#7f6744;

    box-shadow:

        0 0 0 4px rgba(127,103,68,.12);

}



/* Active search inside selected tab */

.tab-btn.active .search-box input{

    background:rgba(255,255,255,.15);

    border:1px solid rgba(255,255,255,.35);

    color:#fff;

}



.tab-btn.active .search-box input::placeholder{

    color:rgba(255,255,255,.8);

}



/* =========================================================
   CONTENT CARD
========================================================= */

.content-card{

    border:none;

    border-radius:22px;

    overflow:hidden;

    background:#fff;

    box-shadow:

        0 10px 30px rgba(0,0,0,.08);

}



.card-body{

    padding:28px;

}



/* =========================================================
   SECTION TITLE
========================================================= */

.section-title{

    display:flex;

    justify-content:space-between;

    align-items:center;

    margin-bottom:22px;

    flex-wrap:wrap;

    gap:12px;

}



.section-title h4{

    margin:0;

    font-size:24px;

    font-weight:700;

    color:#2b2b2b;

}



/* =========================================================
   SUMMARY INFO
========================================================= */

.summary-bar{

    display:flex;

    gap:15px;

    flex-wrap:wrap;

    margin-bottom:22px;

}



.summary-item{

    background:#f8f9fc;

    border-radius:14px;

    padding:14px 18px;

    min-width:180px;

    border:1px solid #ececec;

}



.summary-item label{

    display:block;

    font-size:12px;

    color:#777;

    margin-bottom:5px;

}



.summary-item strong{

    font-size:18px;

    color:#2b2b2b;

}



/* =========================================================
   TABLE WRAPPER
========================================================= */

.table-wrapper{

    background:#fff;

    border-radius:18px;

    overflow:hidden;

    box-shadow:

        0 6px 18px rgba(0,0,0,.05);

}



.table-responsive{

    width:100%;

    overflow-x:auto;

    -webkit-overflow-scrolling:touch;

}



/* =========================================================
   EMPTY STATE
========================================================= */

.empty-box{

    text-align:center;

    padding:70px 20px;

    color:#888;

}



.empty-box i{

    font-size:50px;

    margin-bottom:15px;

    color:#bbb;

    display:block;

}



.empty-box h5{

    margin-bottom:10px;

    font-weight:700;

}



.empty-box p{

    margin:0;

    color:#999;

}



/* =========================================================
   LOADING
========================================================= */

.loading-box{

    padding:60px;

    display:flex;

    justify-content:center;

    align-items:center;

}



/* =========================================================
   SCROLLBAR
========================================================= */

.table-responsive::-webkit-scrollbar{

    height:8px;

}



.table-responsive::-webkit-scrollbar-thumb{

    background:#7f6744;

    border-radius:30px;

}



.table-responsive::-webkit-scrollbar-track{

    background:#efefef;

}

/* =========================================================
   TABLE
========================================================= */

.table{

    width:100%;

    margin:0;

    min-width:1200px;

    border-collapse:separate;

    border-spacing:0;

    background:#fff;

}



.table thead th{

    background:#fff7df;

    color:#6d542d;

    font-weight:700;

    text-align:center;

    padding:16px;

    white-space:nowrap;

    border-bottom:2px solid #f1e5bf;

    font-size:14px;

}



.table tbody td{

    padding:16px;

    text-align:center;

    vertical-align:middle;

    white-space:nowrap;

    font-size:14px;

    color:#444;

    border-bottom:1px solid #f2f2f2;

}



.table tbody tr{

    transition:.25s;

}



.table tbody tr:hover{

    background:#fcfaf6;

}



/* =========================================================
   USER BADGE
========================================================= */

.user-badge{

    display:inline-flex;

    align-items:center;

    justify-content:center;

    min-width:70px;

    padding:8px 14px;

    border-radius:25px;

    background:#eef3ff;

    color:#2354d4;

    font-weight:700;

}



/* =========================================================
   PHONE
========================================================= */

.phone-text{

    font-weight:600;

    color:#444;

}



/* =========================================================
   HASH
========================================================= */

.hash-text{

    display:block;

    max-width:240px;

    overflow-x:auto;

    overflow-y:hidden;

    white-space:nowrap;

    margin:auto;

    padding:8px 10px;

    border-radius:10px;

    background:#f5f5f5;

    font-size:13px;

    color:#444;

}



.hash-text::-webkit-scrollbar{

    height:5px;

}



.hash-text::-webkit-scrollbar-thumb{

    background:#7f6744;

    border-radius:20px;

}



/* =========================================================
   ACCOUNT
========================================================= */

.account-text{

    display:block;

    max-width:220px;

    margin:auto;

    overflow-x:auto;

    white-space:nowrap;

    padding:8px 10px;

    border-radius:10px;

    background:#f8f8f8;

    font-size:13px;

}



.account-text::-webkit-scrollbar{

    height:5px;

}



.account-text::-webkit-scrollbar-thumb{

    background:#7f6744;

}



/* =========================================================
   STATUS
========================================================= */

.badge{

    border-radius:25px;

    padding:8px 14px;

    font-size:12px;

    font-weight:700;

    letter-spacing:.3px;

}



.bg-warning{

    background:#fff4cf !important;

    color:#8b6200 !important;

}



.bg-success{

    background:#dff7e8 !important;

    color:#198754 !important;

}



.bg-danger{

    background:#ffe0e0 !important;

    color:#d11a2a !important;

}



/* =========================================================
   ACTION BUTTONS
========================================================= */

.action-group{

    display:flex;

    justify-content:center;

    align-items:center;

    gap:10px;

}



.btn-sm{

    border-radius:10px;

    min-width:90px;

    padding:8px 14px;

    font-weight:600;

}



.btn-success{

    background:#198754;

    border:none;

}



.btn-success:hover{

    background:#157347;

}



.btn-danger{

    border:none;

}



.btn-danger:hover{

    background:#bb2d3b;

}



/* =========================================================
   TABLE TITLE
========================================================= */

h4{

    font-size:24px;

    font-weight:700;

    color:#333;

}



/* =========================================================
   RESPONSIVE
========================================================= */

@media(max-width:1200px){

    .table{

        min-width:1150px;

    }

}



@media(max-width:992px){

    .admin-page{

        padding:20px;

    }



    .dashboard-header{

        flex-direction:column;

        align-items:flex-start;

    }



    .dashboard-header .btn{

        width:100%;

    }



    .table{

        min-width:1050px;

    }



    .action-group{

        flex-direction:column;

    }



    .btn-sm{

        width:100%;

    }

}



@media(max-width:768px){

    .admin-page{

        padding:15px;

    }



    .dashboard-header h2{

        font-size:24px;

    }



    .content-card{

        border-radius:16px;

    }



    .card-body{

        padding:16px;

    }



    .table{

        min-width:1000px;

    }



    .table thead th{

        font-size:13px;

    }



    .table tbody td{

        font-size:13px;

        padding:12px;

    }



    .hash-text{

        max-width:170px;

    }



    .account-text{

        max-width:170px;

    }

}



@media(max-width:576px){

    .admin-page{

        padding:10px;

    }



    .dashboard-header h2{

        font-size:22px;

    }



    .table{

        min-width:950px;

    }



    .btn-sm{

        min-width:70px;

        font-size:12px;

        padding:7px 10px;

    }



    .badge{

        font-size:11px;

    }



    .user-badge{

        min-width:55px;

        padding:6px 10px;

        font-size:12px;

    }

}



@media(max-width:400px){

    .dashboard-header h2{

        font-size:20px;

    }



    .table{

        min-width:900px;

    }

}

</style>
