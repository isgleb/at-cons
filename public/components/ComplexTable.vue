<template>

  <div class="card">
    <DataTable
        :value="computedTableData"
        tableStyle="min-width: 50rem"
        paginator :rows="5">
      <template #header>
        <div class="flex justify-content-end" style="display:flex; flex: 4 1; gap: 5px">
            <div class="p-inputgroup w-full md:w-30rem" >
                <MultiSelect
                    v-model="searchColumn"
                    :options="searchColumns"
                    dropdownIcon=""
                    class="success"
                    :showToggleAll=false
                >
                <template v-slot:value>
                  <i class="pi pi-sliders-v" style="color: white" ></i>
                </template>
              </MultiSelect>
              <InputText
                  placeholder="Поиск..."
                  v-model="searchValue"/>
              <Button
                  label="Search"
              />
            </div>
            <MultiSelect
                :options="availableColumns"
                v-model="columns"
                class="w-full md:w-20rem"/>
        </div>
      </template>
      {{columns}}
      <Column v-for="col of columns"  sortable :key="col" :field="col" :header="col"></Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import MultiSelect from 'primevue/multiselect';

const props = defineProps({
  tableData: {type: Array, required: true}
})


import { ref, onMounted } from 'vue';
import { ProductService } from "../services/ProductService"
import {computed} from "#imports";

// const tableData = ref();
const searchValue = ref("")


let availableColumns
const columns = ref()
const columnsToSelect = ref()
const searchColumn = ref()
const searchColumns = ref()

const aColumn = {
  name: "name",
  isActive: true,
  isSearchable: true,
}

onMounted(() => {
  ProductService.getProducts().then((data) => {
    // tableData.value = data
    columns.value = Object.keys(data[0])

    searchColumns.value = [...columns.value]
    columnsToSelect.value = [...columns.value]
    availableColumns = [...columns.value]
  });
});

console.log(props.tableData)

const computedTableData = computed(() => {

  if (searchValue.value != "") {
    return props.tableData?.filter((obj: any) => {
      return searchColumns.value.reduce((presentedInFields: boolean, field: string) => {
        if (obj[field] && typeof obj[field] === "string") {
          return presentedInFields || obj[field]?.includes(searchValue.value.toLowerCase())
        } else return presentedInFields
      }, false)
    })
  } else {
    return props.tableData
  }
})

</script>

<style scoped>
.success{
  background-color: var(--green-500);
}
</style>