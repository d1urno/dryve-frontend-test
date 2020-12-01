<template>
  <svg width="45%" height="45%" viewBox="0 0 42 42" class="donut">
    <circle
      class="donut-hole"
      cx="21"
      cy="21"
      r="15.91549430918954"
      fill="#fff"
    ></circle>
    <circle
      class="donut-ring"
      cx="21"
      cy="21"
      r="15.91549430918954"
      fill="transparent"
      stroke="#f7d154"
      stroke-width="3"
    ></circle>
    <circle
      class="donut-segment"
      cx="21"
      cy="21"
      r="15.91549430918954"
      fill="transparent"
      stroke="#ec4c47"
      stroke-width="3"
      stroke-dasharray="20 80"
      stroke-dashoffset="85"
    ></circle>
    <circle
      class="donut-segment"
      cx="21"
      cy="21"
      r="15.91549430918954"
      fill="transparent"
      stroke="#377bbc"
      stroke-width="3"
      stroke-dasharray="30 70"
      stroke-dashoffset="70"
    ></circle>
    <!-- unused 10% -->
  </svg>
</template>

<script lang="ts">
export default {
  name: 'PieChart'
}
</script>
