<template>
  <div class="card">
    <DataTable
        :value="filteredTableData"
        tableStyle="min-width: 50rem"
        paginator :rows="5">
      <template #header>
        <span class="header-wrapper">
            <span class="p-inputgroup">
                <MultiSelect
                    v-model="searchColumns"
                    :options="tableColumns"
                    class="selector-custom-button"
                    dropdownIcon="pi pi-sliders-v"
                >
              </MultiSelect>
              <span class="p-input-icon-right input-block">
                <i class="pi pi-times" @click="cleanFilter" v-if="true"/>
                <InputText
                    placeholder="Поиск..."
                    v-model="searchValue"/>
              </span>
              <Button
                  @click="filterTable"
                  label="Search"
              />
            </span>
            <MultiSelect
                :options="availableColumns"
                v-model="selectedColumns"
                placeholder="Поля таблицы"
                style="flex-grow: 2"
                :maxSelectedLabels="0"
                selectedItemsLabel="{0} пол."
            />
        </span>
      </template>
      <Column v-for="col of tableColumns"  sortable :key="col" :field="col" :header="col"></Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import MultiSelect from 'primevue/multiselect';
import InputText from 'primevue/inputtext'
import {ref} from 'vue';
import {watch} from "#imports";
import {PropType} from "@vue/runtime-core";

const props = defineProps({
  tableData: {type: Array as PropType<Array<Object>>, required: true}
})

const searchValue = ref("")
const filteredTableData = ref()

let availableColumns: string[]
const searchColumns = ref()
const selectedColumns = ref()

// this variable is introduced to keep columns order when selected columns change
const tableColumns = ref()

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

  tableColumns.value = availableColumns.filter((column) => {
    return selectedColumns.value.includes(column)
  })
})

function filterTable(){
  if (searchValue.value != "") {
    const substring = searchValue.value.toLowerCase();

    filteredTableData.value = props.tableData?.filter((obj: any) => {
      for (const column of searchColumns.value) {
        const field = obj[column]

        if (typeof field === "string" && field.includes(substring)) {
          return true;
        }
        if (typeof field === "number" && field.toString().includes(substring)) {
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

<style lang="scss">

.header-wrapper{
  display:flex;
  gap: 5px;

  .p-multiselect{
    width: 20%;
  }
}

.input-block{
  width: 100%;
  .p-inputtext{
    border-radius: 0 !important;
    width: 100%;
  }
}
.selector-custom-button{
  background-color: var(--green-500);
  flex: none !important;
  width: 3rem !important;

  .p-multiselect-trigger{
    color: #ffffff !important;
  }
  .p-multiselect-label-container {
    display: none !important;
  }
}
</style>