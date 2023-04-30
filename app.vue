<template>
  <div class="exercises">
    <link-input/>
    <TimePicker/>
    <ClearableMultiselect :options="cities"/>
    <cell-table/>
  </div>
</template>
<script setup lang="ts">
import LinkInput from 'public/components/LinkInput.vue'
import TimePicker from "public/components/TimePicker.vue";
import ClearableMultiselect from "public/components/ClearableMultiselect.vue";
import CellTable from "public/components/CellTable.vue";

const cities = [
  {name: "Москва", value: false},
  {name:"Рим", value: false},
  {name: "Париж", value: false},
  {name: "Берлин", value: false}
]
</script>

<style>
.exercises{
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
