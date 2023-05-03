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
import {onMounted, ref} from "#imports";

const props = defineProps({
  time: { type: String, required: false }
})
const emits = defineEmits(["update:time"])

const date = ref()

onMounted(()=>{
  if (props.time && /\d{1,2}:\d{1,2}/.test(props.time)) {
    date.value = new Date()
    date.value.setHours(parseInt(props.time.split(":")[0]))
    date.value.setMinutes(parseInt(props.time.split(":")[1]))
  } else {
    date.value = null
  }
})

function update(val?: Date) {
  date.value = val
  const stringValue = val?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  emits("update:time", stringValue)
}

function clearTime() {
  update()
}

function setTimeNow(){
  update(new Date())
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