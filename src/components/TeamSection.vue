<template>
  <section class="team-section">
    <div class="team-card">

      <!-- Header -->
      <div class="team-header">
        <div>
          <h4>My Team</h4>
          <small>Referral Statistics</small>
        </div>

        <div class="team-icon">
          <i class="bi bi-people-fill"></i>
        </div>
      </div>

      <!-- Level Tabs -->
      <div class="level-tabs">

        <button
          class="level-btn"
          :class="{ active: activeLevel === 1 }"
          @click="activeLevel = 1"
        >
          Lv.1
          <small>25%</small>
        </button>

        <button
          class="level-btn"
          :class="{ active: activeLevel === 2 }"
          @click="activeLevel = 2"
        >
          Lv.2
          <small>3%</small>
        </button>

        <button
          class="level-btn"
          :class="{ active: activeLevel === 3 }"
          @click="activeLevel = 3"
        >
          Lv.3
          <small>2%</small>
        </button>

      </div>

      <!-- Heading -->
      <div class="level-title">
        View All Lv.{{ activeLevel }} Subordinate Recharge
      </div>

      <!-- Statistics -->
      <div class="row mt-3 g-3">

        <div class="col-6">
          <div class="stat-card">
            <h3>{{ currentData.totalMembers }}</h3>
            <p>Total Members</p>
          </div>
        </div>

        <div class="col-6">
          <div class="stat-card">
            <h3>{{ currentData.activeMembers }}</h3>
            <p>Active Members</p>
          </div>
        </div>

        <div class="col-6">
          <div class="stat-card">
            <h3>₹ {{ currentData.teamIncome }}</h3>
            <p>Total Recharge</p>
          </div>
        </div>

        <div class="col-6">
          <div class="stat-card">
            <h3>₹ {{ currentData.commission }}</h3>
            <p>Commission</p>
          </div>
        </div>

      </div>

      <!-- Members Table -->
      <div class="table-responsive">

        <table class="table table-bordered table-hover">

          <thead class="table-warning">

            <tr>
              <th>#</th>
              <th>Member</th>
              <th>Recharge</th>
              <th>Commission</th>
              <th>Date</th>
            </tr>

          </thead>

          <tbody>

            <tr
              v-for="(member,index) in currentData.members"
              :key="index"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ member.name }}</td>
              <td>₹ {{ member.recharge }}</td>
              <td>₹ {{ member.commission }}</td>
              <td>{{ member.date }}</td>
            </tr>

            <tr v-if="currentData.members.length==0">
              <td colspan="5" class="text-center">
                No Record Found
              </td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";

/*
|--------------------------------------------------------------------------
| Current Selected Level
|--------------------------------------------------------------------------
*/
const activeLevel = ref(1);

/*
|--------------------------------------------------------------------------
| Sample Team Data
| Replace this with API data later.
|--------------------------------------------------------------------------
*/
const levelData = {
  1: {
    totalMembers: 12,
    activeMembers: 8,
    teamIncome: 24500,
    commission: 6125,
    members: [
      {
        name: "Rahul Kumar",
        recharge: 1000,
        commission: 250,
        date: "03-Jul-2026"
      },
      {
        name: "Rockey Das",
        recharge: 500,
        commission: 125,
        date: "02-Jul-2026"
      },
      {
        name: "Sujal Sharma",
        recharge: 2000,
        commission: 500,
        date: "01-Jul-2026"
      },
      {
        name: "Vikash",
        recharge: 3000,
        commission: 750,
        date: "30-Jun-2026"
      }
    ]
  },

  2: {
    totalMembers: 20,
    activeMembers: 14,
    teamIncome: 12000,
    commission: 360,
    members: [
      {
        name: "jitendra",
        recharge: 1000,
        commission: 30,
        date: "03-Jul-2026"
      },
      {
        name: "Akash",
        recharge: 1500,
        commission: 45,
        date: "02-Jul-2026"
      },
      {
        name: "Ramesh",
        recharge: 2500,
        commission: 75,
        date: "01-Jul-2026"
      }
    ]
  },

  3: {
    totalMembers: 30,
    activeMembers: 22,
    teamIncome: 8500,
    commission: 170,
    members: [
      {
        name: "himanshu kumar",
        recharge: 1000,
        commission: 20,
        date: "03-Jul-2026"
      },
      {
        name: "Pankaj",
        recharge: 1500,
        commission: 30,
        date: "02-Jul-2026"
      },
      {
        name: "Ankit",
        recharge: 2000,
        commission: 40,
        date: "01-Jul-2026"
      }
    ]
  }
};

/*
|--------------------------------------------------------------------------
| Selected Level Data
|--------------------------------------------------------------------------
*/
const currentData = computed(() => levelData[activeLevel.value]);
</script>
<style scoped>

/* ===========================
   Main Section
=========================== */

.team-section{

    padding:20px;

    padding-bottom:90px;


    min-height:100vh;


    background:

    linear-gradient(180deg,#151515,#222);


}



/* ===========================
   Main Card
=========================== */

.team-card{


    max-width:1200px;


    margin:auto;



    background:

    linear-gradient(145deg,#2b2b2b,#383838);



    border-radius:20px;



    padding:25px;



    border:1px solid rgba(255,255,255,.08);



    box-shadow:

    0 8px 25px rgba(0,0,0,.35);



}



/* ===========================
   Header
=========================== */

.team-header{


    display:flex;



    justify-content:space-between;



    align-items:center;



    margin-bottom:20px;



}



.team-header h4{


    margin:0;



    font-weight:800;



    color:#f6c667;



}



.team-header small{


    color:#aaa;



}



.team-icon{


    width:60px;


    height:60px;



    border-radius:50%;



    display:flex;



    align-items:center;



    justify-content:center;



    background:

    linear-gradient(135deg,#f6c667,#c79b3b);



    box-shadow:

    0 8px 18px rgba(246,198,103,.35);



}



.team-icon i{


    font-size:28px;



    color:#222;



}



/* ===========================
   Level Tabs
=========================== */

.level-tabs{


    display:flex;



    gap:12px;



    margin:20px 0;



}



.level-btn{


    flex:1;



    border:none;



    border-radius:12px;



    padding:14px;



    background:

    linear-gradient(145deg,#222,#333);



    color:#f6c667;



    border:1px solid rgba(255,255,255,.08);



    font-weight:700;



    transition:.35s;



    display:flex;



    flex-direction:column;



    align-items:center;



}



.level-btn:hover{


    transform:translateY(-3px);



}



.level-btn.active{


    background:

    linear-gradient(135deg,#f6c667,#c79b3b);



    color:#222;



    box-shadow:

    0 8px 20px rgba(246,198,103,.35);



}



.level-btn small{


    font-size:12px;


}



/* ===========================
   Level Title
=========================== */

.level-title{


    text-align:center;



    color:#f6c667;



    font-weight:700;



    margin-top:15px;



}



/* ===========================
   Statistics Cards
=========================== */

.stat-card{


    background:

    rgba(255,255,255,.08);



    border-radius:15px;



    padding:20px;



    text-align:center;



    height:100%;



    border:1px solid rgba(255,255,255,.08);



    transition:.35s;



}



.stat-card:hover{


    transform:translateY(-4px);



    background:

    rgba(246,198,103,.12);



}



.stat-card h3{


    color:#f6c667;



    font-weight:800;



    font-size:24px;



}



.stat-card p{


    margin:0;



    color:#bbb;



    font-size:14px;



}



/* ===========================
   Table
=========================== */

.table-responsive{


    margin-top:25px;



    overflow-x:auto;



    border-radius:15px;



}



.table{


    min-width:700px;



    margin-bottom:0;



    color:#fff;



}



.table thead{


    background:

    linear-gradient(135deg,#f6c667,#c79b3b);



}



.table thead th{


    color:#222;



    white-space:nowrap;



    text-align:center;



    border:none;



}



.table tbody tr{


    background:

    rgba(255,255,255,.05);



}



.table tbody td{


    text-align:center;



    vertical-align:middle;



    color:#ddd;



    border-color:rgba(255,255,255,.08);



}



.table tbody tr:hover{


    background:

    rgba(246,198,103,.1);



}



/* Empty */

.text-center{


    color:#f6c667;



}



/* ===========================
   Mobile
=========================== */

@media(max-width:768px){


    .team-section{


        padding:12px;


    }



    .team-card{


        padding:18px;


    }



    .team-header{


        flex-direction:column;


        text-align:center;


    }



    .level-tabs{


        flex-direction:column;


    }



    .level-btn{


        width:100%;


    }



    .stat-card{


        padding:15px;


    }



    .stat-card h3{


        font-size:20px;


    }



}



@media(max-width:576px){


    .team-card{


        padding:15px;


        border-radius:16px;


    }



    .team-header h4{


        font-size:22px;


    }



    .team-icon{


        width:50px;


        height:50px;


    }



    .team-icon i{


        font-size:22px;


    }



    .level-btn{


        font-size:14px;


        padding:12px;


    }



    .stat-card{


        padding:12px;


    }



    .stat-card h3{


        font-size:18px;


    }



    .stat-card p{


        font-size:12px;


    }



    .table{


        font-size:12px;


    }


}

</style>