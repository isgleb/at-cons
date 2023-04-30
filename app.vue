<template>
  <div class="exercises">
    <link-input/>
    <TimePicker/>
    <ClearableMultiselect :options="cities"/>
    <cell-table/>
    <ComplexTable :tableData="products"/>
  </div>
</template>
<script setup lang="ts">
import LinkInput from 'public/components/LinkInput.vue'
import TimePicker from "public/components/TimePicker.vue";
import ClearableMultiselect from "public/components/ClearableMultiselect.vue";
import CellTable from "public/components/CellTable.vue";
import ComplexTable from "public/components/ComplexTable.vue";
import {ProductService} from "public/services/ProductService";
import {onMounted, ref} from "#imports";

const cities = [
  {name: "Москва", value: false},
  {name:"Рим", value: false},
  {name: "Париж", value: false},
  {name: "Берлин", value: false}
]


const products = ref([])

onMounted(() => {
  // ProductService.getProductsMini().then((data) => (products.value = data));
  products.value = ProductService.getProductsData()
  console.log(products)
});

</script>

<style>
.exercises{
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
