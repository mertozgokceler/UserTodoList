<script setup lang="ts">
import { useHead } from '#imports'
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useTaskStore, useUserStore } from '~/stores/storage'

const store = useTaskStore()
const userStore = useUserStore()
const route = useRoute()
const id = Number(route.params.id)
const storageKey = `gorevler_${id}`
const user = computed(() =>
  userStore.kullanicilar.find(u => u.id === id),
)

onMounted(async () => {
  if (userStore.kullanicilar.length === 0) {
    await userStore.fetchUsers()
  }

  const u = user.value
  if (u?.name) {
    useHead({
      title: `${u.name}'in Görevleri`,
    })
  }

  const saved = localStorage.getItem(storageKey)
  store.gorevler = saved ? JSON.parse(saved) : []
})

watch(() => route.params.id, (newId) => {
  const newKey = `gorevler_${newId}`
  const saved = localStorage.getItem(newKey)
  store.gorevler = saved ? JSON.parse(saved) : []
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
