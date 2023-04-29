<template>
  <div>
    <!--    <InputMask id="basic" v-model="value" mask="https://******.****" placeholder="https://" />-->
    <!--    <InputMask id="basic" v-model="value" mask="******.***" @blur="getTitle" placeholder="https://" />-->


    <div class="p-inputgroup flex-1" style="width: 300px">
      <InputText
          :placeholder="placeHolder"
          v-model="value"
          @focus="focusIn"
          @focusout="focusOut"/>
      <Button
          v-if="showEdit"
          icon="pi pi-pencil"
          severity="danger"
      />
    </div>

  </div>
</template>
<script setup>
import InputMask from 'primevue/inputmask';
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import 'primeicons/primeicons.css';

const value = ref("")
const url = ref("")
const showEdit = ref(false)
const placeHolder = "https://"

function focusIn() {
  showEdit.value = false
  value.value = url.value
}

async function focusOut() {
  url.value = value.value
  showEdit.value = true

  value.value = await getTitle(placeHolder + value.value)
}


async function getTitle(targetUrl) {
  const options = {
    params: {
      url: targetUrl
    }
  }
  const { title } = await $fetch('/api/page-title', options)
  return title
}


</script>
