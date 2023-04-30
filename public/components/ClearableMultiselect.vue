<template>
  <div class="p-inputgroup flex-1">
    <MultiSelect
        :options="options"
        :showToggleAll=false
        optionLabel="name"
        v-model="selectedOptions"
        class="w-full md:w-20rem"/>
    <Button
        v-if="!isSelectedEmpty"
        @click="clear"
        icon="pi pi-times"
        severity="danger"
    />
  </div>

</template>

<script setup lang="ts">
import MultiSelect from 'primevue/multiselect';
import {PropType} from "@vue/runtime-core";
import {computed, ref} from "#imports";

const selectedOptions = ref<Array<string>>()

const isSelectedEmpty = computed(()=>{
  return !(selectedOptions.value && selectedOptions.value.length > 0)
})

const props = defineProps({
  options: {type: Array as PropType<string[]>}
})

function clear() {
  selectedOptions.value = []
}

</script>

<style scoped>

</style>