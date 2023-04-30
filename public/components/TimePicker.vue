<template>
  <calendar v-model="time" timeOnly>
    <template #footer>
      <hr>
      <div class="controls">
        <button @click="setTimeNow">Сейчас</button>
        <button @click="clearTime">Очистить</button>
      </div>
    </template>
  </calendar>
</template>

<script setup lang="ts">
import Calendar from 'primevue/calendar';
import {ref} from "#imports";

const time = ref()

function clearTime() {
  time.value = null
}

function setTimeNow(){
  time.value = new Date()
}

</script>

<style scoped lang="scss">

.controls{
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 20px auto;

  button{
    border: none;
    background-color: white;
    color: #1d4ed8;
    cursor: pointer;
  }
}
</style>