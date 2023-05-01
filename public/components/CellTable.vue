<template>
    <DataTable :value="products">
      <Column field="value" header="value" style="text-wrap: none"></Column>
    </DataTable>
</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

import {ref} from 'vue';
import {computed} from "#imports";

const props = defineProps({
  cellString: {
    type: String,
    required: true
  }
})

const formattedString = computed( ()=>{
  const searchRegExp = /\[\d{2}:\d{2}:\d{2}\]/g;
  const replaceWith = '<br>$&';

  return props.cellString.replaceAll(searchRegExp, replaceWith)
})

const products = ref();
products.value = [
  {value: formattedString}
]
</script>