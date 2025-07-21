<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '~/stores/storage'

const store = useTaskStore()
const route = useRoute()
const userStore = useUserStore()
const id = Number(route.params.id)

const _kisiler = computed(() => userStore.kullanicilar.find(g => g.id === id))
definePageMeta({
  name: 'todo-id',
})

const storageKey = `gorevler_${id}`

onMounted(() => {
  const saved = localStorage.getItem(storageKey)
  if (saved) {
    store.gorevler = JSON.parse(saved)
  }
})

watch(() => store.gorevler, (newVal) => {
  localStorage.setItem(storageKey, JSON.stringify(newVal))
}, { deep: true })
</script>

<template>
  <div class="flex flex-col items-center gap-6">
    <TodoUserInput />
  </div>
  <div class="mt-4">
    <TodoUserTaskModify />
  </div>
</template>
