<template>

<div class="container-fluid py-3">

    <!-- ==========================
         Header
    =========================== -->

    <div
        class="d-flex justify-content-between align-items-center mb-4"
    >

        <div>

            <h3 class="fw-bold text-primary mb-1">
                Registered Users
            </h3>

            <small class="text-muted">
                View all registered users and their referral network
            </small>

        </div>

        

    </div>



    <!-- ==========================
         Search
    =========================== -->

    <div class="card shadow-sm border-0 mb-4">

        <div class="card-body">

            <div class="row">

                <div class="col-md-4">

                    <input

                        v-model="search"

                        class="form-control"

                        placeholder="Search by Phone or User ID"

                    >

                </div>

            </div>

        </div>

    </div>



    <!-- ==========================
         Registered Users Table
    =========================== -->

    <div class="card shadow border-0">

        <div class="card-header bg-primary text-white">

            <h5 class="mb-0">

                <i class="bi bi-people-fill me-2"></i>

                Registered Users

            </h5>

        </div>

        <div class="table-responsive">

            <table
                class="table table-hover align-middle mb-0"
            >

                <thead class="table-light">

                <tr>

                    <th>ID</th>

                    <th>Phone</th>

                    <th>Referral Code</th>

                    <th>Referred By</th>

                    <th>Balance</th>

                    <th>Total Income</th>

                    <th>Total Recharge</th>

                    <th>Total Withdraw</th>

                    <th>Status</th>

                    <th>Referral Count</th>

                    <th width="120">
                        Referral List
                    </th>

                </tr>

                </thead>

                <tbody>

                <tr
                    v-for="user in filteredUsers"
                    :key="user.id"
                >

                    <td>{{ user.id }}</td>

                    <td>{{ user.phone }}</td>

                    <td>

                        <span class="badge bg-info">

                            {{ user.myReferralCode }}

                        </span>

                    </td>

                    <td>

                        {{ user.referredByPhone || "-" }}

                    </td>

                    <td>

                        {{ user.balance }}

                    </td>

                    <td>

                        {{ user.totalIncome }}

                    </td>

                    <td>

                        {{ user.totalRecharge }}

                    </td>

                    <td>

                        {{ user.totalWithdraw }}

                    </td>

                    <td>

                        <span
                            class="badge"
                            :class="
                                user.status === 'ACTIVE'
                                    ? 'bg-success'
                                    : 'bg-danger'
                            "
                        >

                            {{ user.status }}

                        </span>

                    </td>

                    <td>

                        <span class="badge bg-warning text-dark">

                            {{ user.referralCount }}

                        </span>

                    </td>

                    <td>

                        <button

                            class="btn btn-primary btn-sm"

                            @click="openReferralModal(user)"

                        >

                            <i class="bi bi-info-circle me-1"></i>

                            View

                        </button>

                    </td>

                </tr>

                <tr
                    v-if="filteredUsers.length === 0"
                >

                    <td
                        colspan="11"
                        class="text-center py-5"
                    >

                        No Users Found

                    </td>

                </tr>

                </tbody>

            </table>

        </div>

    </div>
        <!-- ==========================================
         Referral Popup (Vue Modal)
    =========================================== -->

    <div
        v-if="showModal"
        class="custom-modal"
        @click.self="closeModal"
    >

        <div class="custom-dialog">

            <div class="custom-content">

                <!-- Header -->

                <div class="modal-header bg-primary text-white">

                    <div>

                        <h5 class="modal-title mb-1">

                            <i class="bi bi-diagram-3-fill me-2"></i>

                            Referral List

                        </h5>

                        <small>

                            User :
                            {{ selectedUser.phone }}

                            &nbsp; | &nbsp;

                            Total Referrals :
                            {{ selectedUser.referralCount }}

                        </small>

                    </div>

                    <button
                        type="button"
                        class="btn-close btn-close-white"
                        @click="closeModal"
                    ></button>

                </div>



                <!-- Body -->

                <div class="modal-body">

                    <!-- Loading -->

                    <div
                        v-if="loadingReferral"
                        class="text-center py-5"
                    >

                        <div
                            class="spinner-border text-primary"
                        ></div>

                        <p class="mt-3 mb-0">

                            Loading referral users...

                        </p>

                    </div>



                    <!-- No Data -->

                    <div
                        v-else-if="referralUsers.length === 0"
                        class="alert alert-warning text-center"
                    >

                        <i
                            class="bi bi-exclamation-circle me-2"
                        ></i>

                        No Referral Users Found

                    </div>



                    <!-- Referral Table -->

                    <div
                        v-else
                        class="table-responsive"
                    >

                        <table
                            class="table table-bordered table-hover align-middle"
                        >

                            <thead class="table-primary">

                            <tr>

                                <th>ID</th>

                                <th>Phone</th>

                                <th>Balance</th>

                                <th>Total Income</th>

                                <th>Total Recharge</th>

                                <th>Total Withdraw</th>

                                <th>Status</th>

                            </tr>

                            </thead>

                            <tbody>

                            <tr
                                v-for="item in referralUsers"
                                :key="item.id"
                            >

                                <td>

                                    {{ item.id }}

                                </td>

                                <td>

                                    {{ item.phone }}

                                </td>

                                <td>

                                    {{ item.balance }}

                                </td>

                                <td>

                                    {{ item.totalIncome }}

                                </td>

                                <td>

                                    {{ item.totalRecharge }}

                                </td>

                                <td>

                                    {{ item.totalWithdraw }}

                                </td>

                                <td>

                                    <span
                                        class="badge"
                                        :class="
                                            item.status === 'ACTIVE'
                                                ? 'bg-success'
                                                : 'bg-danger'
                                        "
                                    >

                                        {{ item.status }}

                                    </span>

                                </td>

                            </tr>

                            </tbody>

                        </table>

                    </div>

                </div>



                <!-- Footer -->

                <div class="modal-footer">

                    <button
                        class="btn btn-secondary"
                        @click="closeModal"
                    >

                        Close

                    </button>

                </div>

            </div>

        </div>

    </div>

</div>

</template>
<script setup>

import { ref, computed, onMounted } from "vue";
import api from "@/services/api";

const users = ref([]);
const referralUsers = ref([]);

const search = ref("");

const loading = ref(false);
const loadingReferral = ref(false);

const showModal = ref(false);

const selectedUser = ref({

    id: null,

    phone: "",

    referralCount: 0

});


/* ============================================
   Admin JWT Header
============================================ */

function adminHeaders() {

    return {

        Authorization:
            `Bearer ${localStorage.getItem("adminToken")}`

    };

}


/* ============================================
   Filter Users
============================================ */

const filteredUsers = computed(() => {

    if (!search.value.trim()) {

        return users.value;

    }

    const keyword = search.value.toLowerCase();

    return users.value.filter(user =>

        String(user.id).includes(keyword)

        ||

        (user.phone || "")
            .toLowerCase()
            .includes(keyword)

        ||

        (user.myReferralCode || "")
            .toLowerCase()
            .includes(keyword)

    );

});


/* ============================================
   Load Registered Users
============================================ */

const loadUsers = async () => {

    loading.value = true;

    try {

        const response = await api.get(

            "/admin/users",

            {

                headers: adminHeaders()

            }

        );

        users.value = response.data;

    }

    catch (error) {

        console.error(error);

        alert("Unable to load registered users.");

    }

    finally {

        loading.value = false;

    }

};


/* ============================================
   Load Referral Users
============================================ */

const loadReferralUsers = async (userId) => {

    loadingReferral.value = true;

    try {

        const response = await api.get(

            `/admin/users/${userId}/referrals`,

            {

                headers: adminHeaders()

            }

        );

        referralUsers.value = response.data;

    }

    catch (error) {

        console.error(error);

        referralUsers.value = [];

    }

    finally {

        loadingReferral.value = false;

    }

};


/* ============================================
   Open Modal
============================================ */

const openReferralModal = async (user) => {

    selectedUser.value = {

        id: user.id,

        phone: user.phone,

        referralCount: user.referralCount

    };

    referralUsers.value = [];

    showModal.value = true;

    await loadReferralUsers(user.id);

};


/* ============================================
   Close Modal
============================================ */

const closeModal = () => {

    showModal.value = false;

    referralUsers.value = [];

    selectedUser.value = {

        id: null,

        phone: "",

        referralCount: 0

    };

};


/* ============================================
   ESC Key Support
============================================ */

const handleEscape = (event) => {

    if (event.key === "Escape") {

        closeModal();

    }

};


/* ============================================
   Mounted
============================================ */

onMounted(async () => {

    document.addEventListener(

        "keydown",

        handleEscape

    );

    await loadUsers();

});

</script>

/* =====================================================
   PAGE
===================================================== */

.container-fluid{
    padding:20px;
    animation:fadeIn .3s ease;
    background:#f8f9fc;
    min-height:100vh;
}

@keyframes fadeIn{
    from{
        opacity:0;
        transform:translateY(10px);
    }
    to{
        opacity:1;
        transform:translateY(0);
    }
}

/* =====================================================
   HEADER
===================================================== */

h3{
    font-weight:700;
    color:#1f2937;
}

small{
    color:#6b7280;
}

.btn{
    border-radius:10px;
    font-weight:600;
}

/* =====================================================
   CARD
===================================================== */

.card{
    border:none;
    border-radius:16px;
    overflow:hidden;
    box-shadow:0 8px 25px rgba(0,0,0,.08);
}

.card-header{
    font-weight:700;
    padding:16px 22px;
}

/* =====================================================
   SEARCH
===================================================== */

.form-control{
    height:45px;
    border-radius:10px;
    border:1px solid #ddd;
}

.form-control:focus{
    border-color:#0d6efd;
    box-shadow:0 0 0 .2rem rgba(13,110,253,.15);
}

/* =====================================================
   TABLE
===================================================== */

.table-responsive{
    overflow-x:auto;
}

.table{
    min-width:1250px;
    margin:0;
    white-space:nowrap;
}

.table thead th{
    position:sticky;
    top:0;
    z-index:5;

    background:#f5f7fb;

    text-align:center;

    font-size:14px;

    font-weight:700;

    color:#555;

    vertical-align:middle;
}

.table td{
    text-align:center;
    vertical-align:middle;
    font-size:14px;
}

.table tbody tr:hover{
    background:#fafafa;
}

/* =====================================================
   BADGES
===================================================== */

.badge{
    padding:7px 12px;
    border-radius:20px;
    font-size:12px;
}

/* =====================================================
   MODAL
===================================================== */

.modal-dialog{
    max-width:95vw !important;
    width:95vw;
    margin:1rem auto;
}

.modal-content{
    border:none;
    border-radius:18px;
    overflow:hidden;

    height:90vh;
}

.modal-header{
    border-bottom:none;
    padding:18px 24px;
}

.modal-footer{
    border-top:none;
    padding:18px;
}

/* =====================================================
   MODAL BODY
===================================================== */

.modal-body{
    flex:1;

    overflow:auto;

    padding:20px;

    max-height:calc(90vh - 130px);
}

/* =====================================================
   REFERRAL TABLE
===================================================== */

.modal-body .table-responsive{

    overflow:auto;

    max-height:100%;
}

.modal-body table{

    min-width:900px;
}

.modal-body thead th{

    position:sticky;

    top:0;

    background:#0d6efd;

    color:white;

    z-index:20;
}

/* =====================================================
   SCROLLBAR
===================================================== */

.table-responsive::-webkit-scrollbar,
.modal-body::-webkit-scrollbar{
    width:10px;
    height:10px;
}

.table-responsive::-webkit-scrollbar-thumb,
.modal-body::-webkit-scrollbar-thumb{
    background:#bdbdbd;
    border-radius:20px;
}

.table-responsive::-webkit-scrollbar-thumb:hover,
.modal-body::-webkit-scrollbar-thumb:hover{
    background:#888;
}

.table-responsive::-webkit-scrollbar-track,
.modal-body::-webkit-scrollbar-track{
    background:#f1f1f1;
}

/* =====================================================
   LOADING
===================================================== */

.spinner-border{
    width:3rem;
    height:3rem;
}

/* =====================================================
   EMPTY
===================================================== */

.alert{
    border-radius:12px;
}

/* =====================================================
   MOBILE
===================================================== */

@media(max-width:992px){

    .modal-dialog{

        width:98vw;

        max-width:98vw;
    }

    .modal-content{

        height:92vh;
    }

    .modal-body{

        max-height:calc(92vh - 120px);
    }

    .table{

        min-width:1100px;
    }

}

@media(max-width:768px){

    .container-fluid{

        padding:12px;
    }

    h3{

        font-size:22px;
    }

    .table{

        min-width:1000px;
    }

    .table th,
    .table td{

        font-size:12px;
    }

    .btn{

        font-size:12px;
        padding:6px 12px;
    }

    .modal-dialog{

        width:100vw;

        max-width:100vw;

        margin:0;
    }

    .modal-content{

        border-radius:0;

        height:100vh;
    }

    .modal-body{

        max-height:calc(100vh - 120px);
    }

}

@media(max-width:576px){

    .table{

        min-width:900px;
    }

    .badge{

        font-size:11px;
    }

    .btn{

        font-size:11px;
    }

}