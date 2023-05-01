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

hr{
  border: var(--surface-border) solid 1px;
}

.controls{
  display: flex;
  justify-content: space-between;
  margin: 1rem 4%;

  button{
    border: none;
    background-color: var(--surface-0);
    color: var(--blue-500);
    cursor: pointer;
  }
}
</style>