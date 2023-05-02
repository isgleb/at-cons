<template>
  <div class="p-inputgroup flex-1">
    <MultiSelect
        :options="options"
        :showToggleAll=false
        optionLabel="name"
        v-model="selectedOptions"/>
    <Button
        v-if="!isSelectedEmpty"
        @click="clear"
        icon="pi pi-times"
        severity="danger"
    />
  </div>
</template>

<script setup lang="ts">
import {PropType} from "@vue/runtime-core";
import {computed, ref} from "#imports";

const props = defineProps({
  options: {type: Array as PropType<string[]>}
})

const selectedOptions = ref<Array<string>>()

const isSelectedEmpty = computed(()=>{
  return !(selectedOptions.value && selectedOptions.value.length > 0)
})

function clear() {
  selectedOptions.value = []
}

</script>

<style scoped>

</style>