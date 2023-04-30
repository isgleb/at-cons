<template>
  <div class="card">
    <DataTable
        :value="filteredTableData"
        tableStyle="min-width: 50rem"
        paginator :rows="5">
      <template #header>
        <div class="flex justify-content-end" style="display:flex; flex: 4 1; gap: 5px">
            <div class="p-inputgroup w-full md:w-30rem" >
                <MultiSelect
                    v-model="searchColumns"
                    :options="selectedColumns"
                    dropdownIcon=""
                    class="success"
                >
                <template v-slot:value>
                  <i class="pi pi-sliders-v" style="color: white" ></i>
                </template>
              </MultiSelect>
              <InputText
                  placeholder="Поиск..."
                  v-model="searchValue"/>
              <Button
                  @click="filterTable"
                  label="Search"
              />
            </div>
            <MultiSelect
                :options="availableColumns"
                v-model="selectedColumns"
                class="w-full md:w-20rem"/>
        </div>
      </template>
      {{selectedColumns}}
      {{searchColumns}}
      <Column v-for="col of selectedColumns"  sortable :key="col" :field="col" :header="col"></Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import MultiSelect from 'primevue/multiselect';
import {ref} from 'vue';
import {watch} from "#imports";
import {PropType} from "@vue/runtime-core";

const props = defineProps({
  tableData: {type: Array as PropType<Array<Object>>, required: true}
})

let availableColumns
const searchColumns = ref()
const selectedColumns = ref()

const searchValue = ref("")
const filteredTableData = ref()

watch(props, () => {
  if (props.tableData) {
    filteredTableData.value = props.tableData
    availableColumns = Object.keys(props.tableData[0])
    searchColumns.value = [...availableColumns]
    selectedColumns.value = [...availableColumns]
  }
})

watch(selectedColumns, () => {
  searchColumns.value = searchColumns.value.filter((searchColumn: string) => {
    return selectedColumns.value?.includes(searchColumn)
  })
})

function filterTable(){
  if (searchValue.value != "") {
    const substring = searchValue.value.toLowerCase();

    filteredTableData.value = props.tableData?.filter((obj: any) => {
      for (const column of searchColumns.value) {
        const field = obj[column]
        if (field && typeof field === "string" && field.includes(substring)) {
          return true;
        }
      }
      return false;
    })
  }
}

function cleanFilter() {
  searchValue.value = ""
  filteredTableData.value = props.tableData
}

</script>

<style scoped>
.success{
  background-color: var(--green-500);
}
</style>