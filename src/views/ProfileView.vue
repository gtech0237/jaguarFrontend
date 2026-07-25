<template>

<div class="container-fluid profile-page pb-3">


<!-- ================= PROFILE BANNER ================= -->

<div class="profile-banner">

    <div class="profile-image">
        <i class="bi bi-person-circle"></i>
    </div>


    <h4 class="mt-2">
        Welcome {{ user.phone }}
    </h4>


    <small>
        User ID : {{ user.id }}
    </small>

</div>



<!-- ================= SUMMARY ================= -->

<div class="row mt-4 g-3">


<div class="col-4">

<div class="summary-card">

<i class="bi bi-wallet2"></i>

<h6>Balance</h6>

<h5>
{{ formatAmount(user.balance) }} USDT
</h5>

</div>

</div>



<div class="col-4">

<div class="summary-card">

<i class="bi bi-graph-up-arrow"></i>

<h6>Income</h6>

<h5>
{{ formatAmount(user.totalIncome) }} INR
</h5>

</div>

</div>



<div class="col-4">

<div class="summary-card">

<i class="bi bi-cash-stack"></i>

<h6>Recharge</h6>

<h5>
{{ formatAmount(user.totalRecharge) }} INR
</h5>

</div>

</div>


</div>





<!-- ================= MENU ================= -->


<div class="menu-list mt-4">



<!-- ================= RECHARGE ================= -->

<div
class="menu-item"
@click="toggleRechargeHistory"
>

<div>

<i class="bi bi-credit-card"></i>

Recharge Details

</div>


<i
:class="
showRechargeHistory
?'bi bi-chevron-up'
:'bi bi-chevron-down'
"
/>

</div>



<div
v-if="showRechargeHistory"
class="menu-content"
>


<div
v-if="rechargeHistory.length===0"
class="empty-box"
>

No successful recharge found.

</div>



<div
v-for="item in rechargeHistory"
:key="item.id"
class="history-card"
>


<div class="history-left">


<div class="history-amount">

{{formatAmount(item.amount)}} USDT

</div>


<small>

{{formatDate(item.createdOn)}}

</small>


</div>



<span
class="badge"
:class="
item.status==='SUCCESS'
?'bg-success'
:'bg-danger'
"
>

{{item.status}}

</span>


</div>


</div>






<!-- ================= WITHDRAW ================= -->


<div
class="menu-item"
@click="toggleWithdraw"
>


<div>

<i class="bi bi-cash"></i>

Withdraw Details

</div>


<i
:class="
showWithdraw
?'bi bi-chevron-up'
:'bi bi-chevron-down'
"
/>


</div>




<div
v-if="showWithdraw"
class="menu-content"
>



<div
v-if="withdrawHistory.length===0"
class="empty-box"
>

No withdraw history found.

</div>




<div
v-for="item in withdrawHistory"
:key="item.id"
class="history-card"
>


<div class="history-left">


<div class="history-title">

Wallet Deduction

</div>


<div class="history-amount">

{{formatAmount(item.requestedAmountUsdt)}} USDT

</div>


<small>

Equivalent :
₹{{formatAmount(item.requestedAmountInr)}}

</small>


<small>

Fee :
{{formatAmount(item.serviceFee)}}
{{item.currency}}

</small>


<small>

Pay User :
{{formatAmount(item.payableAmount)}}
{{item.currency}}

</small>


<small>

{{item.paymentMethod}}

</small>


<small>

{{formatDate(item.createdOn)}}

</small>


</div>



<span
class="badge"
:class="{

'bg-warning':item.status==='PENDING',

'bg-success':item.status==='APPROVED',

'bg-danger':item.status==='REJECTED'

}"
>

{{item.status}}

</span>



</div>


</div>







<!-- ================= INVESTMENT PLANS ================= -->


<div
class="menu-item"
@click="togglePlans"
>


<div>

<i class="bi bi-graph-up"></i>

Plans

</div>


<i
:class="
showPlans
?'bi bi-chevron-up'
:'bi bi-chevron-down'
"
/>


</div>





<div
v-if="showPlans"
class="menu-content"
>



<div
v-if="investmentPlans.length===0"
class="empty-box"
>

No investment plans found.

</div>





<div
v-for="item in investmentPlans"
:key="item.investmentId"
class="history-card"
>


<div class="history-left">



<div class="history-title">

{{item.productName}}

</div>



<div class="history-amount">

INR {{item.investmentAmount}}

</div>



<small>

Purchase Date :
{{formatDate(item.startDate)}}

</small>



<small>

Daily Income :
INR {{item.dailyIncome}} / Day

</small>



<small>

Duration :
{{item.durationDays}} Days

</small>



<small>

End Date :
{{formatDate(item.endDate)}}

</small>



</div>




<span
class="badge"
:class="
item.status==='ACTIVE'
?'bg-success'
:'bg-danger'
"
>

{{item.status}}

</span>



</div>



</div>







<!-- ================= PERSONAL INFO ================= -->


<div
class="menu-item"
@click="togglePersonalInfo"
>


<div>

<i class="bi bi-person"></i>

Personal Information

</div>


<i
:class="
showPersonalInfo
?'bi bi-chevron-up'
:'bi bi-chevron-down'
"
/>


</div>




<div
v-if="showPersonalInfo"
class="personal-info"
>


<div class="info-row">

<span>
Phone
</span>

<strong>
{{user.phone}}
</strong>

</div>



<div class="info-row">

<span>
Referral Code
</span>

<strong>
{{user.referralCode || '-'}}
</strong>

</div>



<div class="info-row">

<span>
Status
</span>

<strong>
{{user.status}}
</strong>

</div>



<div class="info-row">

<span>
Member Since
</span>

<strong>
{{formatDate(user.createdOn)}}
</strong>

</div>



</div>







<!-- ================= ABOUT ================= -->


<div
class="menu-item"
@click="toggleAbout"
>


<div>

<i class="bi bi-info-circle"></i>

About Us

</div>


<i
:class="
showAbout
?'bi bi-chevron-up'
:'bi bi-chevron-down'
"
/>


</div>




<div
v-if="showAbout"
class="about-box"
>


<h6>
Investment Platform
</h6>


<p>

Welcome to our investment platform. Our mission is to provide users with a secure, reliable, and easy-to-use experience for managing investments and earnings.

</p>



<hr>


<p>

<strong>
Version:
</strong>

1.0.0

</p>



<p>

<strong>
Email:
</strong>

support@investment.com

</p>



</div>





<!-- ================= LOGOUT ================= -->


<div
class="menu-item logout-menu"
@click="logout"
>


<div>

<i class="bi bi-box-arrow-right"></i>

Logout

</div>



<i class="bi bi-chevron-right"></i>


</div>



</div>




<Footer />


</div>


</template>
<script setup>

import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "@/services/api";

import Footer from "@/components/Footer.vue";

const router = useRouter();

const user = ref({});
const rechargeHistory = ref([]);

const showRechargeHistory = ref(false);
const showWithdraw = ref(false);
const showPersonalInfo = ref(false);
const showAbout = ref(false);
const investmentPlans = ref([]);

const showPlans = ref(false);

const token = localStorage.getItem("token");
const withdrawHistory = ref([]);

/* -------------------------------
   Load Logged In User
--------------------------------*/

const loadUser = async () => {

    if (!token) {

        router.replace("/");
        return;

    }

    try {

        const response = await api.get("/users/me", {

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        user.value = response.data;

        localStorage.setItem(
            "user",
            JSON.stringify(response.data)
        );

    } catch (error) {

        console.error(error);

        logout();

    }

};

/* -------------------------------
   Recharge History
--------------------------------*/

const loadRechargeHistory = async () => {

    try {

        const response = await api.get("/recharge/history", {

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        rechargeHistory.value = response.data;

    } catch (error) {

        console.error(error);

    }

};

/* -------------------------------
   Withdraw History
*/

const loadWithdrawHistory = async () => {

    try {

        const response = await api.get("/withdraw/history", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        withdrawHistory.value = response.data;

    } catch (error) {

        console.error(error);

    }

};
/* -------------------------------
   Toggle Sections
--------------------------------*/

const toggleRechargeHistory = async () => {

    showRechargeHistory.value = !showRechargeHistory.value;

    if (showRechargeHistory.value && rechargeHistory.value.length === 0) {

        await loadRechargeHistory();

    }

};
const toggleWithdraw = async () => {

    showWithdraw.value = !showWithdraw.value;

    if (
        showWithdraw.value &&
        withdrawHistory.value.length === 0
    ) {
        await loadWithdrawHistory();
    }

};

const togglePersonalInfo = () => {

    showPersonalInfo.value = !showPersonalInfo.value;

};

/* -------------------------------
   Investment Plans
--------------------------------*/

const loadInvestmentPlans = async () => {

    try {


        const response = await api.get(

            `/investments/investMentDetails/${user.value.id}`,

            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }

        );


        investmentPlans.value = response.data;


    } catch(error){

        console.error(
            "Investment Plan Error",
            error
        );

    }

};
const togglePlans = async()=>{


    showPlans.value =
        !showPlans.value;



    if(
        showPlans.value &&
        investmentPlans.value.length === 0
    ){

        await loadInvestmentPlans();

    }


};

const toggleAbout = () => {

    showAbout.value = !showAbout.value;

};

/* -------------------------------
   Utility Functions
--------------------------------*/

const formatAmount = (amount) => {

    return Number(amount || 0).toFixed(2);

};

const formatDate = (date) => {

    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {

        day: "2-digit",
        month: "short",
        year: "numeric"

    });

};

/* -------------------------------
   Logout
--------------------------------*/

const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    router.replace("/");

};

onMounted(() => {

    loadUser();

});

</script>
<style scoped>

/* ===========================
   Profile Layout
=========================== */

.profile-page{

    min-height:100vh;

    padding:15px;

    padding-bottom:100px;

    background:linear-gradient(
        180deg,
        #151515,
        #222
    );

}



/* ===========================
   Profile Banner
=========================== */


.profile-banner{

    background:linear-gradient(
        135deg,
        #f6c667,
        #7f6744
    );

    border-radius:20px;

    color:#222;

    text-align:center;

    padding:30px 20px;

    box-shadow:
    0 10px 25px rgba(0,0,0,.35);

}


.profile-image{

    font-size:75px;

}


.profile-banner h4{

    font-weight:800;

}



.profile-banner small{

    color:#333;

    font-weight:600;

}



/* ===========================
   Summary Cards
=========================== */


.summary-card{

    height:100%;

    background:
    linear-gradient(
        145deg,
        #2b2b2b,
        #383838
    );

    border-radius:16px;

    padding:18px 10px;

    text-align:center;

    border:1px solid rgba(255,255,255,.08);

    box-shadow:
    0 8px 20px rgba(0,0,0,.25);

    transition:.3s;

}



.summary-card:hover{

    transform:translateY(-5px);

}



.summary-card i{

    font-size:28px;

    color:#f6c667;

}



.summary-card h6{

    color:#ccc;

    margin-top:10px;

    font-size:13px;

}



.summary-card h5{

    color:#f6c667;

    font-weight:800;

    font-size:15px;

}



/* ===========================
   Menu Container
=========================== */


.menu-list{


    background:#2b2b2b;

    border-radius:18px;

    overflow:hidden;

    border:1px solid rgba(255,255,255,.08);

    box-shadow:
    0 8px 20px rgba(0,0,0,.3);


}



/* ===========================
   Menu Item
=========================== */


.menu-item{


    display:flex;

    justify-content:space-between;

    align-items:center;

    padding:18px;

    color:#fff;

    border-bottom:
    1px solid rgba(255,255,255,.08);

    cursor:pointer;

    transition:.3s;


}



.menu-item:hover{

    background:rgba(246,198,103,.08);

}



.menu-item div{

    display:flex;

    align-items:center;

    gap:12px;

    font-weight:600;

}



.menu-item i:first-child{

    color:#f6c667;

    font-size:22px;

}



.menu-item i:last-child{

    color:#f6c667;

}



/* ===========================
   Expand Area
=========================== */


.menu-content,
.personal-info,
.about-box{


    background:#222;

    padding:15px;


}



/* ===========================
   History Card
=========================== */


.history-card{


    display:flex;

    justify-content:space-between;

    align-items:center;

    background:#2b2b2b;

    padding:15px;

    border-radius:14px;

    margin-bottom:12px;

    border:1px solid rgba(255,255,255,.08);


}



.history-amount{


    color:#f6c667;

    font-size:16px;

    font-weight:800;


}



.history-left small{


    color:#ccc;

    margin-top:5px;


}



.pay-user{

    color:#4caf50 !important;

}



.badge{

    padding:8px 12px;

    border-radius:30px;

    font-weight:700;

}



/* ===========================
   Empty Box
=========================== */


.empty-box{


    text-align:center;

    padding:20px;

    background:#2b2b2b;

    color:#ccc;

    border-radius:12px;


}



/* ===========================
   Personal Information
=========================== */


.info-row{


    display:flex;

    justify-content:space-between;

    padding:14px 0;

    border-bottom:
    1px solid rgba(255,255,255,.08);


}



.info-row span{

    color:#ccc;

}



.info-row strong{

    color:#f6c667;

}



/* ===========================
   About
=========================== */


.about-box h6{


    color:#f6c667;

    font-weight:800;


}



.about-box p{


    color:#ddd;

    line-height:1.6;


}



.about-box strong{

    color:#f6c667;

}



/* ===========================
   Logout
=========================== */


.logout-menu{

    color:#ff6b6b;

}



.logout-menu i:first-child{

    color:#ff6b6b;

}

.history-title {
    color: #ffffff;
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 6px;
}

/* ===========================
   Mobile
=========================== */


@media(max-width:576px){


    .profile-page{

        padding:12px;

    }



    .profile-image{

        font-size:65px;

    }



    .summary-card h5{

        font-size:13px;

    }



    .summary-card h6{

        font-size:12px;

    }



    .menu-item{

        padding:15px;

        font-size:14px;

    }



    .history-card{

        flex-direction:column;

        align-items:flex-start;

        gap:10px;

    }


}

</style>