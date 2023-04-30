<template>
  <div>
    <link-input/>
    <TimePicker/>
    <ClearableMultiselect :options="cities"/>
  </div>
</template>
<script setup lang="ts">
import LinkInput from 'public/components/LinkInput.vue'
import TimePicker from "public/components/TimePicker.vue";
import ClearableMultiselect from "public/components/ClearableMultiselect.vue";

const cities = [
  {name: "Москва", value: false},
  {name:"Рим", value: false},
  {name: "Париж", value: false},
  {name: "Берлин", value: false}
]
</script>
