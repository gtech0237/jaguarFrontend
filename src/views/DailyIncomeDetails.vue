<template>

 

<div class="summary-container">


    <!-- Total Investments -->

    <div class="summary-card">

        <div class="summary-icon blue">

            <i class="bi bi-bar-chart-line"></i>

        </div>


        <div class="summary-content">

            <span>
                Total Investments
            </span>


            <h3>
                {{ totalInvestments }}
            </h3>

        </div>


    </div>



    <!-- Active Investments -->

    <div class="summary-card">


        <div class="summary-icon green">

            <i class="bi bi-check-circle"></i>

        </div>


        <div class="summary-content">


            <span>
                Active Investments
            </span>


            <h3>
                {{ activeInvestments }}
            </h3>


        </div>


    </div>



    <!-- Total Invested Amount -->

    <div class="summary-card">


        <div class="summary-icon gold">

            <i class="bi bi-currency-dollar"></i>

        </div>


        <div class="summary-content">


            <span>
                Total Invested
            </span>


            <h3>

                INR
                {{ totalInvestedAmount }}

            </h3>


        </div>


    </div>



    <!-- Total Daily Income -->

    <div class="summary-card">


        <div class="summary-icon purple">

            <i class="bi bi-graph-up-arrow"></i>

        </div>


        <div class="summary-content">


            <span>
                Daily Income
            </span>


            <h3>

                INR
                {{ totalDailyIncome }}

            </h3>


        </div>


    </div>



</div>

<!-- =====================================================
     SEARCH SECTION
====================================================== -->
<div class="search-section">

    <div class="search-box">

        <i class="bi bi-search"></i>

        <input
            type="text"
            class="form-control"
            v-model="search"
            placeholder="Search by User ID, Phone, Plan, Product or Status"
        />

    </div>

    <div class="date-filter">

        <label>Filter by Date</label>

        <input
            type="date"
            class="form-control"
            v-model="selectedDate"
        />

    </div>

</div>
<!-- =====================================================
     DAILY INCOME TABLE
====================================================== -->

<div class="card content-card">


    <div class="card-body">


        <div class="section-header">


            <div>

                <h4>

                    User Investment Details

                </h4>


                <small>

                    View investment plans and daily income information

                </small>


            </div>


            <span class="count-pill">

                {{ filteredIncomeDetails.length }}

                Records

            </span>


        </div>




        <div
            class="table-responsive"
            v-if="filteredIncomeDetails.length"
        >


            <table class="table table-hover align-middle">


                <thead>

                <tr>

                    <th>
                        Investment ID
                    </th>

                    <th>
                        User ID
                    </th>

                    <th>
                        Phone
                    </th>

                    <th>
                        Plan
                    </th>

                    <th>
                        Product
                    </th>

                    <th>
                        Invested
                    </th>

                    <th>
                        Daily Income
                    </th>

                    <th>
                        Duration
                    </th>

                    <th>
                        Start Date
                    </th>

                    <th>
                        End Date
                    </th>

                    <th>
                        Completed Days
                    </th>

                    <th>
                        Days Left
                    </th>

                    <th>
                        Wallet Balance
                    </th>

                    <th>
                        Total Generated
                    </th>

                    <th>
                        Status
                    </th>

                </tr>

                </thead>


                <tbody>



                <tr

                    v-for="item in filteredIncomeDetails"

                    :key="item.investmentId"

                >



                    <!-- Investment ID -->

                    <td>

                        <span class="user-badge">

                            #{{ item.investmentId }}

                        </span>

                    </td>




                    <!-- User ID -->

                    <td>

                        <span class="user-badge">

                            #{{ item.userId }}

                        </span>

                    </td>




                    <!-- Phone -->

                    <td>

                        <strong>

                            {{ item.phone }}

                        </strong>

                    </td>




                    <!-- Plan -->

                    <td>

                        <span class="method-pill">

                            {{ item.planName }}

                        </span>

                    </td>




                    <!-- Product -->

                    <td>

                        {{ item.productName }}

                    </td>




                    <!-- Investment Amount -->

                    <td>

                        <strong>

                            INR
                            {{ item.investmentAmount }}

                        </strong>

                    </td>




                    <!-- Daily Income -->

                    <td>

                        <span class="income-text">

                            INR
                            {{ item.dailyIncome }}

                            / Day

                        </span>

                    </td>




                    <!-- Duration -->

                    <td>

                        {{ item.durationDays }}

                        Days

                    </td>




                    <!-- Start Date -->

                    <td>

                        {{ formatDateOnly(item.purchaseDate) }}

                    </td>




                    <!-- End Date -->

                    <td>

                        {{ formatDateOnly(item.endDate) }}

                    </td>
                    <!-- Days Passed -->

                    <td>

                        <span class="days-pill">

                            {{ item.completedDays }}

                            Days

                        </span>

                    </td>



                    <!-- Days Left -->

                    <td>

                        <span
                            class="days-left-pill"
                            :class="{

                                expired:
                                item.daysRemaining === 0

                            }"
                        >

                            {{ item.daysRemaining }}

                            Days

                        </span>

                    </td>



                    <!-- Wallet Balance -->

                    <td>

                        <strong>

                            $
                            {{ item.availableBalance }}

                        </strong>

                    </td>



                    <!-- Total Generated -->

                    <td>

                        <span class="income-text">

                            INR
                            {{ item.totalIncomePaid }}

                        </span>

                    </td>



                    <!-- Status -->

                    <td>

                        <span

                            class="badge"

                            :class="{

                                'bg-success':
                                item.status === 'ACTIVE',


                                'bg-danger':
                                item.status === 'COMPLETED',


                                'bg-warning':
                                item.status !== 'ACTIVE'
                                &&
                                item.status !== 'COMPLETED'

                            }"

                        >

                            {{ item.status }}

                        </span>

                    </td>


                </tr>


                </tbody>


            </table>


        </div>



        <!-- =====================================================
             EMPTY STATE
        ====================================================== -->

        <div

            v-else

            class="empty-box"

        >


            <i class="bi bi-bar-chart-line"></i>


            <h5>

                No Investment Details Found

            </h5>


            <p>

                No active user investments available.

            </p>


        </div>



    </div>


</div>
</template>

<script setup>

import {
    ref,
    computed,
    onMounted,
    onUnmounted
} from "vue";

import {
    useRouter
} from "vue-router";

import Swal from "sweetalert2";

import api from "@/services/api";



const router = useRouter();



/*
|--------------------------------------------------------------------------
| STATE
|--------------------------------------------------------------------------
*/


const incomeDetails = ref([]);


const search = ref("");
const selectedDate = ref("");
const loading = ref(false);


let refreshTimer = null;



/*
|--------------------------------------------------------------------------
| TOAST
|--------------------------------------------------------------------------
*/


const Toast = Swal.mixin({

    toast:true,

    position:"top-end",

    showConfirmButton:false,

    timer:2500,

    timerProgressBar:true

});



/*
|--------------------------------------------------------------------------
| ADMIN HEADER
|--------------------------------------------------------------------------
*/


function adminHeaders(){

    return {

        Authorization:
        `Bearer ${localStorage.getItem("adminToken")}`

    };

}



/*
|--------------------------------------------------------------------------
| LOAD DAILY INCOME DETAILS
|--------------------------------------------------------------------------
*/

async function loadDailyIncomeDetails() {
    try {
        loading.value = true;

        const response = await api.get(
            "/admin/daily-income",
            {
                headers: adminHeaders()
            }
        );

        incomeDetails.value = response.data;

    } catch (error) {
        console.error(error);

        Toast.fire({
            icon: "error",
            title: error.response?.data || "Failed to load income details"
        });

    } finally {
        loading.value = false;
    }
}





/*
|--------------------------------------------------------------------------
| SEARCH FILTER
|--------------------------------------------------------------------------
*/

const filteredIncomeDetails = computed(() => {

    const keyword =
        search.value
            .trim()
            .toLowerCase();

    return incomeDetails.value.filter(item => {

        // Search filter
        const matchesSearch =
            !keyword ||

            String(item.investmentId)
                .includes(keyword)

            ||

            String(item.userId)
                .includes(keyword)

            ||

            (item.phone || "")
                .toLowerCase()
                .includes(keyword)

            ||

            (item.planName || "")
                .toLowerCase()
                .includes(keyword)

            ||

            (item.productName || "")
                .toLowerCase()
                .includes(keyword)

            ||

            (item.status || "")
                .toLowerCase()
                .includes(keyword);


        // Date filter
        const matchesDate =
            !selectedDate.value ||

            (
                item.purchaseDate &&
                new Date(item.purchaseDate)
                    .toISOString()
                    .split("T")[0]
                === selectedDate.value
            );


        return matchesSearch && matchesDate;

    });

});



/*
|--------------------------------------------------------------------------
| SUMMARY CARDS
|--------------------------------------------------------------------------
*/


const totalInvestments = computed(()=>{


    return incomeDetails.value.length;


});




const activeInvestments = computed(()=>{


    return incomeDetails.value.filter(

        item =>
        item.status === "ACTIVE"

    ).length;


});





const totalInvestedAmount = computed(()=>{


    return incomeDetails.value.reduce(

        (sum,item)=>

            sum +
            Number(
                item.investmentAmount || 0
            ),

        0

    );


});





const totalDailyIncome = computed(()=>{


    return incomeDetails.value.reduce(

        (sum,item)=>

            sum +
            Number(
                item.dailyIncome || 0
            ),

        0

    );


});





/*
|--------------------------------------------------------------------------
| DATE FORMAT
|--------------------------------------------------------------------------
*/


function formatDateOnly(date){


    if(!date)

        return "-";



    return new Date(date)
        .toLocaleDateString(

            "en-IN",

            {

                day:"2-digit",

                month:"short",

                year:"numeric"

            }

        );


}






onMounted(()=>{


    loadDailyIncomeDetails();



    refreshTimer = setInterval(()=>{


        loadDailyIncomeDetails();



    },30000);



});




onUnmounted(()=>{


    clearInterval(
        refreshTimer
    );


});

</script>

<style scoped>


/* =========================================================
   PAGE
========================================================= */
 



/* =========================================================
   HEADER
========================================================= */

 



.page-title{

    margin:0;

    font-size:30px;

    font-weight:700;

    color:#2b2b2b;

}



.page-subtitle{

    margin-top:8px;

    color:#777;

    font-size:15px;

}



.header-actions{

    display:flex;

    gap:12px;

}



.header-actions .btn{

    border-radius:12px;

    padding:10px 22px;

    font-weight:600;

}



.back-btn{

    background:#7f6744;

    color:white;

    border:none;

}



.back-btn:hover{

    background:#665136;

}





/* =========================================================
   SUMMARY CARDS
========================================================= */


.summary-container{

    display:grid;

    grid-template-columns:

    repeat(4,1fr);

    gap:20px;

    margin-bottom:25px;

}



.summary-card{

    background:white;

    border-radius:18px;

    padding:22px;

    display:flex;

    align-items:center;

    gap:18px;

    box-shadow:

    0 8px 25px rgba(0,0,0,.08);

    transition:.3s;

}



.summary-card:hover{

    transform:translateY(-5px);

}



.summary-icon{

    width:55px;

    height:55px;

    border-radius:50%;

    display:flex;

    align-items:center;

    justify-content:center;

    font-size:25px;

}



.summary-icon.blue{

    background:#e6efff;

    color:#2463eb;

}



.summary-icon.green{

    background:#ddf8e8;

    color:#198754;

}



.summary-icon.gold{

    background:#fff2c9;

    color:#9c7d00;

}



.summary-icon.purple{

    background:#eee3ff;

    color:#7b3fe4;

}



.summary-content span{

    display:block;

    color:#777;

    font-size:13px;

}



.summary-content h3{

    margin:5px 0 0;

    font-size:24px;

    font-weight:700;

    color:#333;

}





/* =========================================================
   SEARCH
========================================================= */
.search-section {
    margin-bottom: 25px;
    display: flex;
    gap: 15px;
    align-items: end;
}

.search-box {
    position: relative;
    flex: 1;
}

.date-filter {
    width: 220px;
}

.date-filter label {
    display: block;
    margin-bottom: 6px;
    font-size: 13px;
    font-weight: 600;
    color: #666;
}

.date-filter input {
    height: 48px;
    border-radius: 14px;
    border: 1px solid #ddd;
    background: white;
}

.date-filter input:focus {
    border-color: #7f6744;
    box-shadow: 0 0 0 4px rgba(127,103,68,.12);
}



.search-box i{

    position:absolute;

    left:18px;

    top:14px;

    color:#777;

}



.search-box input{

    height:48px;

    padding-left:45px;

    border-radius:14px;

    border:1px solid #ddd;

    background:white;

}



.search-box input:focus{

    border-color:#7f6744;

    box-shadow:

    0 0 0 4px rgba(127,103,68,.12);

}





/* =========================================================
   CONTENT CARD
========================================================= */


.content-card{

    border:none;

    border-radius:22px;

    background:white;

    box-shadow:

    0 10px 30px rgba(0,0,0,.08);

}



.card-body{

    padding:28px;

}




.section-header{

    display:flex;

    justify-content:space-between;

    align-items:center;

    margin-bottom:20px;

    flex-wrap:wrap;

}



.section-header h4{

    margin:0;

    font-size:24px;

    font-weight:700;

}



.section-header small{

    color:#777;

}



.count-pill{

    background:#fff4d5;

    color:#8b6200;

    padding:8px 16px;

    border-radius:30px;

    font-weight:700;

}





/* =========================================================
   TABLE
========================================================= */


.table-responsive{

    overflow-x:auto;

}



.table{

    width:100%;

    min-width:1500px;

}



.table thead th{

    background:#fff7df;

    color:#6d542d;

    text-align:center;

    padding:16px;

    font-size:14px;

    white-space:nowrap;

    border-bottom:2px solid #f1e5bf;

}



.table tbody td{

    text-align:center;

    padding:15px;

    font-size:14px;

    white-space:nowrap;

    border-bottom:1px solid #eee;

}



.table tbody tr:hover{

    background:#fcfaf6;

}





/* =========================================================
   BADGES
========================================================= */


.user-badge{

    background:#eef3ff;

    color:#2354d4;

    padding:7px 14px;

    border-radius:25px;

    font-weight:700;

}



.method-pill{

    background:#f5eee5;

    color:#7f6744;

    padding:7px 14px;

    border-radius:25px;

    font-weight:600;

}



.income-text{

    color:#198754;

    font-weight:700;

}



.days-pill{

    background:#e9f3ff;

    color:#2463eb;

    padding:7px 12px;

    border-radius:20px;

}



.days-left-pill{

    background:#fff3cd;

    color:#856404;

    padding:7px 12px;

    border-radius:20px;

}



.days-left-pill.expired{

    background:#ffe0e0;

    color:#d11a2a;

}





/* =========================================================
   STATUS
========================================================= */


.badge{

    padding:8px 15px;

    border-radius:25px;

    font-weight:700;

}



.bg-success{

    background:#dff7e8!important;

    color:#198754!important;

}



.bg-warning{

    background:#fff4cf!important;

    color:#8b6200!important;

}



.bg-danger{

    background:#ffe0e0!important;

    color:#d11a2a!important;

}





/* =========================================================
   EMPTY STATE
========================================================= */


.empty-box{

    padding:70px 20px;

    text-align:center;

    color:#888;

}



.empty-box i{

    font-size:55px;

    display:block;

    margin-bottom:15px;

    color:#bbb;

}



.empty-box h5{

    font-weight:700;

}

/* =========================================================
   RESPONSIVE
========================================================= */

/* =========================
   LARGE TABLET / LAPTOP
========================= */

@media (max-width: 1200px) {

    .summary-container {

        grid-template-columns:
        repeat(2, 1fr);

    }

    .search-section {

        gap: 12px;

    }

    .date-filter {

        width: 200px;

    }

}


/* =========================
   TABLET / MOBILE
========================= */

@media (max-width: 768px) {

    /* Header */

    .header-actions {

        width: 100%;

        display: flex;

        gap: 10px;

    }


    .header-actions button {

        flex: 1;

    }


    /* Summary Cards */

    .summary-container {

        grid-template-columns: 1fr;

    }


    /* Search + Date Filter */

    .search-section {

        display: flex;

        flex-direction: column;

        align-items: stretch;

        gap: 12px;

    }


    .search-box {

        width: 100%;

    }


    .date-filter {

        width: 100%;

    }


    .date-filter label {

        font-size: 13px;

        margin-bottom: 6px;

    }


    .date-filter input {

        width: 100%;

    }


    /* Card */

    .card-body {

        padding: 15px;

    }


    /* Table */

    .table-responsive {

        overflow-x: auto;

        -webkit-overflow-scrolling: touch;

    }


    .table {

        min-width: 1400px;

    }

}


/* =========================
   SMALL MOBILE
========================= */

@media (max-width: 576px) {

    .summary-card {

        padding: 18px;

    }


    .summary-icon {

        width: 48px;

        height: 48px;

        font-size: 21px;

    }


    .summary-content h3 {

        font-size: 21px;

    }


    .search-section {

        gap: 10px;

    }


    .search-box input {

        height: 46px;

        font-size: 13px;

    }


    .date-filter input {

        height: 46px;

        font-size: 13px;

    }


    .card-body {

        padding: 12px;

    }


    .table {

        min-width: 1400px;

    }

}


/* =========================
   VERY SMALL MOBILE
========================= */

@media (max-width: 400px) {

    .summary-card {

        padding: 15px;

        gap: 12px;

    }


    .summary-icon {

        width: 44px;

        height: 44px;

        font-size: 19px;

    }


    .summary-content span {

        font-size: 12px;

    }


    .summary-content h3 {

        font-size: 19px;

    }


    .search-box input,
    .date-filter input {

        height: 44px;

        font-size: 12px;

    }


    .table {

        min-width: 1400px;

    }

}
    </style>


