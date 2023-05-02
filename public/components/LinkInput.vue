<template>
  <div>
    <div class="p-inputgroup">
      <button class="link-button" v-if="titleMode" >
        <a :href="placeHolder + link">{{title}}</a>
      </button>
      <InputText
          v-else
          :placeholder="placeHolder"
          :class="{'p-invalid': !isLinkValid}"
          v-model="link"
          @focus="focusIn"
          @focusout="focusOut"/>
      <Button
          v-if="showEdit"
          @click="setEditing"
          :icon="icon"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import 'primeicons/primeicons.css';
import {computed, ref} from "#imports";

const placeHolder = "https://"

const title = ref("")
const link = ref("")

const showEdit = ref(false)
const isLinkValid = ref(true)
const isLoading = ref(false)
const titleMode = ref(false)

const icon = computed(()=>{
  return isLoading.value ? "pi pi-spin pi-spinner" : "pi pi-pencil"
})

function setEditing(){
  titleMode.value = false
}

function focusIn() {
  showEdit.value = false
  isLinkValid.value = true
}

async function focusOut() {
  showEdit.value = true
  const options = {
    params: {
      url: placeHolder + link.value
    }
  }
  isLoading.value = true
  isLinkValid.value = true
  try {
    title.value = await $fetch<string>('/api/page-title', options )
    titleMode.value = true
  } catch(error) {
    isLinkValid.value = false
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