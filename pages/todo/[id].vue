<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '~/stores/storage'

definePageMeta({
  layout: false,
  name: 'todo-id',
})

const route = useRoute()
const userStore = useUserStore()
const id = Number(route.params.id)

onMounted(() => {
  if (userStore.kullanicilar.length === 0) {
    const veriler = localStorage.getItem('kullanicilar')
    if (veriler) {
      userStore.kullanicilar = JSON.parse(veriler)
    }
  }
})

const kisiler = computed(() => userStore.kullanicilar.find(g => g.id === id))
</script>

<template>
  <div>mert</div>
</template>
