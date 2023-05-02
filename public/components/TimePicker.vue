<template>
  <calendar :modelValue="date" @update:modelValue="update" timeOnly>
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
import { computed } from "#imports";

const props = defineProps({
  time: { type: String, required: false }
})

const emits = defineEmits(["update:time"])

const date = computed(()=>{

  if (props.time && /\d{1,2}:\d{1,2}/.test(props.time)) {
    const d = new Date()
    d.setHours(parseInt(props.time.split(":")[0]))
    d.setMinutes(parseInt(props.time.split(":")[1]))
    return d;
  } else {
    return null
  }
})

function update(date: Date) {
  const stringValue = `${date.getHours()}:${date.getMinutes()}`
  emits("update:time", stringValue)
}

function clearTime() {
  emits("update:time", null)
}

function setTimeNow(){
  update(new Date)
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