<template>

    <section class="team-section">

        <div class="team-card">

            <!-- =========================
                 Header
            ========================== -->

            <div class="team-header">

                <div>
                    <h4>My Team</h4>

                    <small>
                        Referral Statistics
                    </small>
                </div>

                <div class="team-icon">
                    <i class="bi bi-people-fill"></i>
                </div>

            </div>


            <!-- =========================
                 Level Tabs
            ========================== -->

            <div class="level-tabs">

                <!-- Level 1 -->
                <button
                    type="button"
                    class="level-btn"
                    :class="{
                        active: activeLevel === 1
                    }"
                    @click="activeLevel = 1"
                >

                    <span>
                        Lv.1
                    </span>

                    <small>
                        15%
                    </small>

                </button>


                <!-- Level 2 -->
                <button
                    type="button"
                    class="level-btn"
                    :class="{
                        active: activeLevel === 2
                    }"
                    @click="activeLevel = 2"
                >

                    <span>
                        Lv.2
                    </span>

                    <small>
                        2%
                    </small>

                </button>


                <!-- Level 3 -->
                <button
                    type="button"
                    class="level-btn"
                    :class="{
                        active: activeLevel === 3
                    }"
                    @click="activeLevel = 3"
                >

                    <span>
                        Lv.3
                    </span>

                    <small>
                        1%
                    </small>

                </button>

            </div>


            <!-- =========================
                 Loading
            ========================== -->

            <div
                v-if="loading"
                class="loading-container"
            >

                <div
                    class="spinner-border"
                    role="status"
                    aria-label="Loading"
                ></div>

                <p>
                    Loading team details...
                </p>

            </div>


            <!-- =========================
                 Error
            ========================== -->

            <div
                v-else-if="errorMessage"
                class="error-container"
            >

                <i class="bi bi-exclamation-circle-fill"></i>

                <p>
                    {{ errorMessage }}
                </p>

                <button
                    type="button"
                    class="retry-btn"
                    @click="getTeam"
                >
                    Retry
                </button>

            </div>


            <!-- =========================
                 Main Content
            ========================== -->

            <div v-else>

                <!-- Level Title -->

                <div class="level-title">

                    Level {{ activeLevel }}

                    <span>
                        {{ currentData.commissionRate }}%
                    </span>

                </div>


                <!-- =========================
                     Statistics
                ========================== -->

                <div class="row mt-3 g-3">

                    <!-- Total Members -->

                    <div class="col-6">

                        <div class="stat-card">

                            <div class="stat-icon">
                                <i class="bi bi-people-fill"></i>
                            </div>

                            <h3>
                                {{ currentData.totalMembers }}
                            </h3>

                            <p>
                                Total Members
                            </p>

                        </div>

                    </div>


                    <!-- Active Members -->

                    <div class="col-6">

                        <div class="stat-card">

                            <div class="stat-icon">
                                <i class="bi bi-person-check-fill"></i>
                            </div>

                            <h3>
                                {{ currentData.activeMembers }}
                            </h3>

                            <p>
                                Active Members
                            </p>

                        </div>

                    </div>


                    <!-- Total Recharge -->

                    <div class="col-6">

                        <div class="stat-card">

                            <div class="stat-icon">
                                <i class="bi bi-wallet-fill"></i>
                            </div>

                            <h3>
                                ₹ {{ formatAmount(currentData.totalRecharge) }}
                            </h3>

                            <p>
                                Total Recharge
                            </p>

                        </div>

                    </div>


                    <!-- Total Investment -->

                    <div class="col-6">

                        <div class="stat-card">

                            <div class="stat-icon">
                                <i class="bi bi-graph-up-arrow"></i>
                            </div>

                            <h3>
                                ₹ {{ formatAmount(currentData.totalInvestment) }}
                            </h3>

                            <p>
                                Total Investment
                            </p>

                        </div>

                    </div>


                    <!-- Commission -->

                    <div class="col-12">

                        <div class="stat-card commission-card">

                            <div class="stat-icon">
                                <i class="bi bi-percent"></i>
                            </div>

                            <h3>
                                ₹ {{ formatAmount(currentData.commission) }}
                            </h3>

                            <p>
                                Level {{ activeLevel }}
                                Commission
                                ({{ currentData.commissionRate }}%)
                            </p>

                        </div>

                    </div>

                </div>


                <!-- =========================
                     Information
                ========================== -->

                <div class="commission-info">

                    <i class="bi bi-info-circle-fill"></i>

                    <span>

                        Level {{ activeLevel }} commission is
                        <strong>
                            {{ currentData.commissionRate }}%
                        </strong>
                        of investment only.

                    </span>

                </div>


                <!-- =========================
                     Members Heading
                ========================== -->

                <div class="members-title">

                    <div>
                        <span>
                            Level {{ activeLevel }} Members
                        </span>

                        <small>
                            Referral hierarchy
                        </small>
                    </div>

                    <strong>
                        {{ currentData.totalMembers }}
                    </strong>

                </div>


                <!-- =========================
                     Members Table
                ========================== -->

                <div class="table-responsive">

                    <table class="table table-bordered table-hover">

                        <thead class="table-warning">

                            <tr>

                                <th>
                                    #
                                </th>

                                <th>
                                    Member
                                </th>

                                <th>
                                    Recharge
                                </th>

                                <th>
                                    Investment
                                </th>

                                <th>
                                    Commission
                                </th>

                                <th>
                                    Date
                                </th>

                                <th>
                                    Status
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            <tr
                                v-for="(member, index) in currentMembers"
                                :key="member.id"
                            >

                                <!-- # -->

                                <td>
                                    {{ index + 1 }}
                                </td>


                                <!-- Member -->

                                <td>

                                    <div class="member-info">

                                        <div class="member-avatar">

                                            <i class="bi bi-person-fill"></i>

                                        </div>

                                        <div>

                                            <span class="member-phone">
                                                {{ member.phone }}
                                            </span>

                                            <small>
                                                ID: {{ member.id }}
                                            </small>

                                        </div>

                                    </div>

                                </td>


                                <!-- Recharge -->

                                <td class="recharge-amount">

                                    ₹ {{ formatAmount(member.totalRecharge) }}

                                </td>


                                <!-- Investment -->

                                <td class="investment-amount">

                                    ₹ {{ formatAmount(member.totalInvestment) }}

                                </td>


                                <!-- Commission -->

                                <td class="commission-amount">

                                    ₹ {{ formatAmount(member.commission) }}

                                </td>


                                <!-- Date -->

                                <td>
                                    {{ formatDate(member.createdOn) }}
                                </td>


                                <!-- Status -->

                                <td>

                                    <span
                                        class="status-badge"
                                        :class="getStatusClass(member.status)"
                                    >
                                        {{ member.status || '-' }}
                                    </span>

                                </td>

                            </tr>


                            <!-- No records -->

                            <tr
                                v-if="currentMembers.length === 0"
                            >

                                <td
                                    colspan="7"
                                    class="text-center empty-row"
                                >

                                    <i class="bi bi-people"></i>

                                    <div>
                                        No Record Found
                                    </div>

                                    <small>
                                        No members are available
                                        in this level.
                                    </small>

                                </td>

                            </tr>

                        </tbody>

                    </table>

                </div>


                <!-- =========================
                     Overall Statistics
                ========================== -->

                <div class="overall-section">

                    <div class="overall-title">
                        Overall Team
                    </div>


                    <div class="row g-3">

                        <div class="col-6">

                            <div class="overall-card">

                                <span>
                                    Total Members
                                </span>

                                <strong>
                                    {{ teamData.totalMembers }}
                                </strong>

                            </div>

                        </div>


                        <div class="col-6">

                            <div class="overall-card">

                                <span>
                                    Active Members
                                </span>

                                <strong>
                                    {{ teamData.activeMembers }}
                                </strong>

                            </div>

                        </div>


                        <div class="col-6">

                            <div class="overall-card">

                                <span>
                                    Total Recharge
                                </span>

                                <strong>
                                    ₹ {{ formatAmount(teamData.totalRecharge) }}
                                </strong>

                            </div>

                        </div>


                        <div class="col-6">

                            <div class="overall-card">

                                <span>
                                    Total Investment
                                </span>

                                <strong>
                                    ₹ {{ formatAmount(teamData.totalInvestment) }}
                                </strong>

                            </div>

                        </div>


                        <div class="col-12">

                            <div class="overall-card">

                                <span>
                                    Total Commission
                                </span>

                                <strong>
                                    ₹ {{ formatAmount(teamData.commission) }}
                                </strong>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </section>

</template>


<script setup>

import {
    ref,
    computed,
    onMounted
} from "vue";

import api from "@/services/api";


/*
|--------------------------------------------------------------------------
| Active Level
|--------------------------------------------------------------------------
*/

const activeLevel = ref(1);


/*
|--------------------------------------------------------------------------
| Loading
|--------------------------------------------------------------------------
*/

const loading = ref(false);


/*
|--------------------------------------------------------------------------
| Error
|--------------------------------------------------------------------------
*/

const errorMessage = ref("");


/*
|--------------------------------------------------------------------------
| Team Data
|--------------------------------------------------------------------------
*/

const teamData = ref({

    totalMembers: 0,

    activeMembers: 0,

    totalRecharge: 0,

    totalInvestment: 0,

    commission: 0,

    level1: {

        totalMembers: 0,

        activeMembers: 0,

        totalRecharge: 0,

        totalInvestment: 0,

        commission: 0,

        commissionRate: 15

    },

    level2: {

        totalMembers: 0,

        activeMembers: 0,

        totalRecharge: 0,

        totalInvestment: 0,

        commission: 0,

        commissionRate: 2

    },

    level3: {

        totalMembers: 0,

        activeMembers: 0,

        totalRecharge: 0,

        totalInvestment: 0,

        commission: 0,

        commissionRate: 1

    },

    members: []

});


/*
|--------------------------------------------------------------------------
| Current Level Data
|--------------------------------------------------------------------------
*/

const currentData = computed(() => {

    if (activeLevel.value === 1) {

        return teamData.value.level1;

    }

    if (activeLevel.value === 2) {

        return teamData.value.level2;

    }

    return teamData.value.level3;

});


/*
|--------------------------------------------------------------------------
| Current Level Members
|--------------------------------------------------------------------------
*/

const currentMembers = computed(() => {

    return teamData.value.members.filter(
        (member) =>
            Number(member.level) === activeLevel.value
    );

});


/*
|--------------------------------------------------------------------------
| Get Team
|--------------------------------------------------------------------------
*/

const getTeam = async () => {

    loading.value = true;

    errorMessage.value = "";

    try {

        const response =
            await api.get("/users/team");

        console.log(
            "Team API Response:",
            response.data
        );

        const data =
            response.data || {};

        teamData.value = {

            totalMembers:
                data.totalMembers ?? 0,

            activeMembers:
                data.activeMembers ?? 0,

            totalRecharge:
                data.totalRecharge ?? 0,

            totalInvestment:
                data.totalInvestment ?? 0,

            commission:
                data.commission ?? 0,

            level1: {

                totalMembers:
                    data.level1?.totalMembers ?? 0,

                activeMembers:
                    data.level1?.activeMembers ?? 0,

                totalRecharge:
                    data.level1?.totalRecharge ?? 0,

                totalInvestment:
                    data.level1?.totalInvestment ?? 0,

                commission:
                    data.level1?.commission ?? 0,

                commissionRate:
                    data.level1?.commissionRate ?? 15

            },

            level2: {

                totalMembers:
                    data.level2?.totalMembers ?? 0,

                activeMembers:
                    data.level2?.activeMembers ?? 0,

                totalRecharge:
                    data.level2?.totalRecharge ?? 0,

                totalInvestment:
                    data.level2?.totalInvestment ?? 0,

                commission:
                    data.level2?.commission ?? 0,

                commissionRate:
                    data.level2?.commissionRate ?? 2

            },

            level3: {

                totalMembers:
                    data.level3?.totalMembers ?? 0,

                activeMembers:
                    data.level3?.activeMembers ?? 0,

                totalRecharge:
                    data.level3?.totalRecharge ?? 0,

                totalInvestment:
                    data.level3?.totalInvestment ?? 0,

                commission:
                    data.level3?.commission ?? 0,

                commissionRate:
                    data.level3?.commissionRate ?? 1

            },

            members:
                Array.isArray(data.members)
                    ? data.members
                    : []

        };

    } catch (error) {

        console.error(
            "Team API Error:",
            error
        );

        errorMessage.value =
            error?.response?.data?.message ||
            "Unable to load team details.";

    } finally {

        loading.value = false;

    }

};


/*
|--------------------------------------------------------------------------
| Format Amount
|--------------------------------------------------------------------------
*/

const formatAmount = (amount) => {

    const number =
        Number(amount || 0);

    return number.toLocaleString(
        "en-IN",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    );

};


/*
|--------------------------------------------------------------------------
| Format Date
|--------------------------------------------------------------------------
*/

const formatDate = (date) => {

    if (!date) {
        return "-";
    }

    const parsed =
        new Date(date);

    if (
        Number.isNaN(
            parsed.getTime()
        )
    ) {
        return date;
    }

    return parsed.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

};


/*
|--------------------------------------------------------------------------
| Status Class
|--------------------------------------------------------------------------
*/

const getStatusClass = (status) => {

    if (
        status &&
        status.toUpperCase() === "ACTIVE"
    ) {
        return "status-active";
    }

    return "status-inactive";

};


/*
|--------------------------------------------------------------------------
| Load API
|--------------------------------------------------------------------------
*/

onMounted(() => {

    getTeam();

});

</script>


<style scoped>

/* =========================================================
   MAIN SECTION
========================================================= */

.team-section {
    padding: 20px;
    padding-bottom: 90px;
    min-height: 100vh;

    background:
        linear-gradient(
            180deg,
            #151515,
            #222
        );
}


/* =========================================================
   MAIN CARD
========================================================= */

.team-card {
    max-width: 1200px;
    margin: auto;
    padding: 25px;

    background:
        linear-gradient(
            145deg,
            #2b2b2b,
            #383838
        );

    border-radius: 20px;

    border: 1px solid rgba(255,255,255,.08);

    box-shadow:
        0 8px 25px rgba(0,0,0,.35);
}


/* =========================================================
   HEADER
========================================================= */

.team-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 20px;
}

.team-header h4 {
    margin: 0;
    font-weight: 800;
    color: #f6c667 !important;
}

.team-header small {
    color: #aaa !important;
}

.team-icon {
    width: 60px;
    height: 60px;

    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    background:
        linear-gradient(
            135deg,
            #f6c667,
            #c79b3b
        );

    box-shadow:
        0 8px 18px rgba(246,198,103,.35);
}

.team-icon i {
    font-size: 28px;
    color: #222 !important;
}


/* =========================================================
   LEVEL TABS
========================================================= */

.level-tabs {
    display: flex;
    gap: 12px;
    margin: 20px 0;
}

.level-btn {
    flex: 1;
    min-height: 68px;
    padding: 12px 14px;

    border: 1px solid rgba(255,255,255,.08);
    border-radius: 12px;

    background:
        linear-gradient(
            145deg,
            #222,
            #333
        );

    color: #fff !important;

    font-weight: 700;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    transition:
        transform .25s ease,
        background .25s ease,
        box-shadow .25s ease;
}

.level-btn span {
    display: block;
    color: #fff !important;
    font-size: 15px;
    font-weight: 800;
    line-height: 1.2;
    opacity: 1 !important;
    visibility: visible !important;
}

.level-btn small {
    display: block !important;
    margin-top: 4px;
    color: #ccc !important;
    font-size: 12px;
    font-weight: 600;
    line-height: 1.2;
    opacity: 1 !important;
    visibility: visible !important;
}

.level-btn.active {
    background:
        linear-gradient(
            135deg,
            #f6c667,
            #c79b3b
        ) !important;

    color: #222 !important;

    border-color: #f6c667 !important;

    box-shadow:
        0 8px 20px rgba(246,198,103,.35);
}

.level-btn.active span {
    display: block !important;
    color: #222 !important;
    font-weight: 800 !important;
    opacity: 1 !important;
    visibility: visible !important;
}

.level-btn.active small {
    display: block !important;
    color: #222 !important;
    font-size: 12px !important;
    font-weight: 700 !important;
    opacity: 1 !important;
    visibility: visible !important;
}

.level-btn:hover {
    transform: translateY(-3px);
}


/* =========================================================
   LEVEL TITLE
========================================================= */

.level-title {
    margin-top: 15px;
    text-align: center;
    color: #f6c667 !important;
    font-size: 18px;
    font-weight: 700;
}

.level-title span {
    display: inline-block;
    margin-left: 8px;
    padding: 4px 10px;
    border-radius: 20px;
    background: rgba(246,198,103,.15);
    color: #f6c667 !important;
    font-size: 12px;
}


/* =========================================================
   STATISTICS CARDS
========================================================= */

.stat-card {
    height: 100%;
    padding: 20px;
    text-align: center;

    background: rgba(255,255,255,.08);

    border: 1px solid rgba(255,255,255,.08);

    border-radius: 15px;

    transition: .35s;
}

.stat-card:hover {
    transform: translateY(-4px);
    background: rgba(246,198,103,.12);
}

.stat-icon {
    width: 42px;
    height: 42px;
    margin: 0 auto 10px;

    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    background: rgba(246,198,103,.15);
}

.stat-icon i {
    color: #f6c667 !important;
    font-size: 18px;
}

.stat-card h3 {
    margin: 0;
    color: #f6c667 !important;
    font-size: 24px;
    font-weight: 800;
}

.stat-card p {
    margin: 5px 0 0;
    color: #bbb !important;
    font-size: 14px;
}

.commission-card h3 {
    font-size: 28px;
}


/* =========================================================
   COMMISSION INFO
========================================================= */

.commission-info {
    margin-top: 20px;
    padding: 12px 15px;

    display: flex;
    align-items: center;
    gap: 10px;

    border-radius: 12px;

    background: rgba(246,198,103,.08);
    border: 1px solid rgba(246,198,103,.15);

    color: #bbb !important;
    font-size: 13px;
}

.commission-info i {
    color: #f6c667 !important;
}

.commission-info strong {
    color: #f6c667 !important;
}


/* =========================================================
   MEMBERS TITLE
========================================================= */

.members-title {
    margin-top: 30px;
    margin-bottom: 15px;

    display: flex;
    align-items: center;
    justify-content: space-between;
}

.members-title span {
    display: block;
    color: #f6c667 !important;
    font-size: 18px;
    font-weight: 700;
}

.members-title small {
    display: block;
    margin-top: 3px;
    color: #999 !important;
}

.members-title strong {
    color: #f6c667 !important;
    font-size: 20px;
}


/* =========================================================
   TABLE CONTAINER
========================================================= */

.table-responsive {
    width: 100%;
    margin-top: 10px;

    overflow-x: auto;
    overflow-y: hidden;

    border-radius: 15px;

    background: #252525;

    border: 1px solid rgba(255,255,255,.08);

    -webkit-overflow-scrolling: touch;
}


/* =========================================================
   TABLE
========================================================= */

.table {
    width: 100%;
    min-width: 1000px;
    margin-bottom: 0 !important;

    border-collapse: separate !important;
    border-spacing: 0 !important;

    background: #292929 !important;
    color: #fff !important;
}


/* =========================================================
   TABLE HEADER
========================================================= */

.table thead {
    background:
        linear-gradient(
            135deg,
            #f6c667,
            #c79b3b
        ) !important;
}

.table thead.table-warning {
    --bs-table-bg: transparent !important;
    --bs-table-color: #222 !important;

    background:
        linear-gradient(
            135deg,
            #f6c667,
            #c79b3b
        ) !important;
}

.table thead th {
    padding: 14px 12px !important;

    background:
        linear-gradient(
            135deg,
            #f6c667,
            #c79b3b
        ) !important;

    color: #222 !important;

    font-size: 13px;
    font-weight: 800;

    text-align: center;
    vertical-align: middle;
    white-space: nowrap;

    border: none !important;
    border-bottom: 1px solid #b58d37 !important;
}


/* =========================================================
   TABLE BODY
========================================================= */

.table tbody {
    background: #292929 !important;
}

.table tbody tr {
    background: #292929 !important;
    color: #fff !important;
    transition: background .2s ease;
}

.table tbody tr:nth-child(even) {
    background: #303030 !important;
}

.table tbody tr:hover {
    background: rgba(246,198,103,.12) !important;
}

.table tbody td {
    padding: 13px 12px !important;

    background: transparent !important;
    color: #e5e5e5 !important;

    font-size: 13px;
    font-weight: 500;

    text-align: center;
    vertical-align: middle;
    white-space: nowrap;

    border-top: none !important;
    border-left: none !important;
    border-right: 1px solid rgba(255,255,255,.07) !important;
    border-bottom: 1px solid rgba(255,255,255,.07) !important;
}

.table tbody td:last-child {
    border-right: none !important;
}


/* =========================================================
   MEMBER INFORMATION
========================================================= */

.member-info {
    min-width: 180px;

    display: flex;
    align-items: center;
    gap: 10px;
}

.member-avatar {
    flex-shrink: 0;

    width: 38px;
    height: 38px;

    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    background:
        linear-gradient(
            135deg,
            #f6c667,
            #c79b3b
        );
}

.member-avatar i {
    color: #222 !important;
    font-size: 16px;
}

.member-phone {
    display: block;
    color: #fff !important;
    font-size: 13px;
    font-weight: 700;
    text-align: left;
}

.member-info small {
    display: block;
    margin-top: 2px;
    color: #999 !important;
    font-size: 11px;
    text-align: left;
    opacity: 1 !important;
}


/* =========================================================
   AMOUNT COLORS
========================================================= */

.recharge-amount {
    color: #f6c667 !important;
    font-weight: 700 !important;
}

.investment-amount {
    color: #8ab4ff !important;
    font-weight: 700 !important;
}

.commission-amount {
    color: #8fdf9f !important;
    font-weight: 700 !important;
}


/* =========================================================
   STATUS
========================================================= */

.status-badge {
    display: inline-block;
    padding: 5px 12px;
    border-radius: 20px;

    font-size: 12px;
    font-weight: 700;
    white-space: nowrap;
}

.status-active {
    color: #8fdf9f !important;
    background: rgba(40,167,69,.15) !important;
    border: 1px solid rgba(40,167,69,.25);
}

.status-inactive {
    color: #ff9999 !important;
    background: rgba(220,53,69,.15) !important;
    border: 1px solid rgba(220,53,69,.25);
}


/* =========================================================
   EMPTY TABLE
========================================================= */

.empty-row {
    min-height: 200px;
    padding: 50px 20px !important;

    color: #f6c667 !important;
    background: #292929 !important;

    text-align: center !important;
}

.empty-row i {
    display: block;
    margin-bottom: 10px;
    color: #f6c667 !important;
    font-size: 35px;
}

.empty-row div {
    color: #f6c667 !important;
    font-weight: 700;
}

.empty-row small {
    display: block;
    margin-top: 6px;
    color: #999 !important;
}


/* =========================================================
   OVERALL SECTION
========================================================= */

.overall-section {
    margin-top: 30px;
    padding-top: 20px;

    border-top: 1px solid rgba(255,255,255,.08);
}

.overall-title {
    margin-bottom: 15px;
    color: #f6c667 !important;
    font-size: 18px;
    font-weight: 700;
}

.overall-card {
    padding: 15px;
    border-radius: 12px;
    text-align: center;

    background: rgba(255,255,255,.06);
    border: 1px solid rgba(255,255,255,.06);
}

.overall-card span {
    display: block;
    margin-bottom: 5px;
    color: #aaa !important;
    font-size: 13px;
}

.overall-card strong {
    color: #f6c667 !important;
    font-size: 20px;
}


/* =========================================================
   LOADING
========================================================= */

.loading-container {
    padding: 60px 20px;
    text-align: center;
    color: #aaa !important;
}

.loading-container .spinner-border {
    margin-bottom: 15px;
    color: #f6c667 !important;
}


/* =========================================================
   ERROR
========================================================= */

.error-container {
    padding: 50px 20px;
    text-align: center;
    color: #aaa !important;
}

.error-container i {
    display: block;
    margin-bottom: 10px;
    color: #ff9999 !important;
    font-size: 35px;
}

.error-container p {
    margin-bottom: 15px;
    color: #aaa !important;
}

.retry-btn {
    padding: 10px 20px;

    border: none;
    border-radius: 10px;

    color: #222 !important;

    background:
        linear-gradient(
            135deg,
            #f6c667,
            #c79b3b
        );

    font-weight: 700;
    cursor: pointer;
}


/* =========================================================
   MOBILE - TABLE
========================================================= */

@media (max-width: 768px) {

    .team-section {
        padding: 12px;
        padding-bottom: 90px;
    }

    .team-card {
        padding: 18px;
    }

    .team-header {
        flex-direction: column;
        gap: 15px;
        text-align: center;
    }

    .level-tabs {
        flex-direction: column;
        gap: 10px;
    }

    .level-btn {
        width: 100%;
        min-height: 62px;
    }

    .level-btn span {
        font-size: 15px;
    }

    .level-btn small {
        font-size: 12px;
    }

    .stat-card {
        padding: 15px;
    }

    .stat-card h3 {
        font-size: 20px;
    }

    .members-title {
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;
    }

    .table-responsive {
        width: 100%;
        margin-left: 0;
        margin-right: 0;
        border-radius: 12px;
    }

    .table {
        min-width: 1000px;
    }

    .table thead th {
        padding: 12px 10px !important;
        font-size: 12px;
    }

    .table tbody td {
        padding: 11px 10px !important;
        font-size: 12px;
    }

    .member-info {
        min-width: 170px;
    }

}


/* =========================================================
   SMALL MOBILE
========================================================= */

@media (max-width: 576px) {

    .team-card {
        padding: 15px;
        border-radius: 16px;
    }

    .team-header h4 {
        font-size: 22px;
    }

    .team-icon {
        width: 50px;
        height: 50px;
    }

    .team-icon i {
        font-size: 22px;
    }

    .stat-card {
        padding: 12px;
    }

    .stat-card h3 {
        font-size: 18px;
    }

    .stat-card p {
        font-size: 12px;
    }

    .level-title {
        font-size: 16px;
    }

    .commission-info {
        align-items: flex-start;
        font-size: 12px;
    }

    .table {
        min-width: 1000px;
    }

}

</style>
