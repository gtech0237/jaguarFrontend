<template>
  <div class="plan-tabs">

    <button
      v-for="plan in plans"
      :key="plan.id"
      class="tab-btn"
      :class="{ active: modelValue === plan.id }"
      @click="$emit('update:modelValue', plan.id)"
    >
      {{ plan.planName }}
    </button>

  </div>
</template>

<script setup>

defineProps({
  plans: {
    type: Array,
    default: () => []
  },
  modelValue: {
    type: Number,
    default: null
  }
});

defineEmits(["update:modelValue"]);

</script>
<style scoped>

/* ===========================
   Plan Tabs
=========================== */

.plan-tabs{

    display:flex;

    justify-content:center;

    gap:14px;

    margin:22px 15px;

    overflow-x:auto;

    padding:4px;

    scrollbar-width:none;

}


.plan-tabs::-webkit-scrollbar{

    display:none;

}



/* ===========================
   Tab Button
=========================== */

.tab-btn{


    padding:14px 28px;


    border:none;


    border-radius:14px;



    background:

    linear-gradient(145deg,#2b2b2b,#383838);



    border:1px solid rgba(255,255,255,.08);



    color:#f6c667 !important;



    font-size:14px;


    font-weight:700;


    white-space:nowrap;


    cursor:pointer;


    transition:.35s;



    box-shadow:

    0 6px 18px rgba(0,0,0,.25);


}



/* ===========================
   Hover
=========================== */

.tab-btn:hover{


    transform:translateY(-4px);



    background:

    linear-gradient(145deg,#7f6744,#9d8257);



    color:#ffffff !important;



    box-shadow:

    0 10px 24px rgba(127,103,68,.45);



}



/* ===========================
   Active
=========================== */

.tab-btn.active{


    background:

    linear-gradient(135deg,#f6c667,#c79b3b);



    color:#222 !important;



    box-shadow:

    0 10px 25px rgba(246,198,103,.45);



}



/* Active Hover */

.tab-btn.active:hover{


    background:

    linear-gradient(135deg,#ffffff,#f6c667);



    color:#7f6744 !important;



}



/* ===========================
   Focus
=========================== */

.tab-btn:focus{


    outline:none;


}



/* ===========================
   Mobile
=========================== */

@media(max-width:576px){


    .plan-tabs{


        justify-content:flex-start;


        gap:10px;


        margin:18px 10px;



    }



    .tab-btn{


        padding:12px 20px;


        font-size:13px;


        border-radius:12px;



    }



}

</style>