<template>
  <div class="exercises">
    <link-input class="max-width"/>
    <time-picker v-model:time="time" class="max-width"/>
    <clearable-multiselect :options="cities" class="max-width"/>
    <cell-table :cell-string="logString" class="max-width"/>
    <complex-table :tableData="products"/>
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

const time = ref()

const logString = "[13:36:53] Расчетное время: 9 мин[13:36:58] Открыть клапан откачки К1[13:36:58] Включить вакуумный насос[13:36:58] Закрыть клапан К5[13:36:58] Закрыть клапан дистилляции К2[13:36:58] Ожидание: 8 с[13:37:06] Заливка 2.2мл. в испаритель[13:37:06] Заданно 26.50602409638554 шагов[13:37:09] Заливка перекиси завершена[13:37:09] Открыть клапан дистилляции К2[13:42:09] Включить нагрев испарителя[13:42:09] Закрыть клапан дистилляции К2[13:42:09] конечное давление1.0960040758227925 торр[13:42:09] Выпаривание через К2[13:42:09] Выпаривание длилось5 мин[13:42:09] Откачка до 1 торр[13:42:15] Закрыть клапан откачки К1[13:43:09] Открыть клапан откачки К1[13:43:14] Аппаратное смещение 0 денсит. = -0.313683180809021[13:43:14] Закрыть клапан дистилляции К2"

const products = ref()
products.value = ProductService.getProductsData()

</script>

<style>
.exercises{
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.max-width{
  max-width: 400px;
}
</style>
