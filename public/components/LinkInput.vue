<template>
  <div>
    <div class="p-inputgroup flex-1" style="width: 300px">
      <button class="link-button" v-if="isLink" >
        <a :href="placeHolder + url">{{value}}</a>
      </button>
      <InputText
          :placeholder="placeHolder"
          :class="{'p-invalid': !isValid}"
          v-model="value"
          @focus="focusIn"
          v-else="isLink"
          @focusout="focusOut"/>
      <Button
          v-if="showEdit"
          @click="setEditing"
          :icon="icon"
          severity="danger"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import 'primeicons/primeicons.css';
import {computed} from "#imports";

const placeHolder = "https://"
const value = ref("")
const url = ref("")
const showEdit = ref(false)
const isValid = ref(true)
const isLoading = ref(false)
const isLink = ref(false)

const icon = computed(()=>{
  return isLoading.value ? "pi pi-spin pi-spinner" : "pi pi-pencil"
})

function setEditing(){
  value.value = url.value
  isLink.value = false
}

function focusIn() {
  showEdit.value = false
  isValid.value = true
  // value.value = url.value
}

async function focusOut() {
  url.value = value.value
  showEdit.value = true

  const params = {
    url: placeHolder + value.value
  }

  isLoading.value = true
  isValid.value = true
  try {
    const title = await $fetch<string>('/api/page-title', { params: params } )
    value.value = title
    isLink.value = true
  } catch(error) {
    isValid.value = false
  } finally {
    isLoading.value = false
  }

}
</script>
<style>
.link-button{
  background-color: white;
  border: 1px solid #ced4da;
  padding: 0.75rem 0.75rem;
}
</style>