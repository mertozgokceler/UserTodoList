<script setup lang="ts">
const value = ref('')
const store = useTaskStore()
const gorev = ref('')

function gorevEkle() {
  if (gorev.value.trim()) {
    store.ekle(gorev.value)
    gorev.value = ''
  }
}
</script>

<template>
  <UInput
    v-model="gorev"
    placeholder="Görev Giriniz :"
    :ui="{ trailing: 'pe-1' }"
    class="mt-7 w-100 text-left border placeholder:font-semibold font-semibold shadow-xl/30 shadow-white rounded hover:ring-2 hover:ring-orange-500 transition-all duration-300 dark:text-white"
  >
    <template v-if="gorev?.length" #trailing>
      <UButton
        color="error"
        variant="link"
        size="xl"
        icon="i-lucide-circle-x"
        aria-label="Clear input"
        @click="value = ''"
      />
    </template>
  </UInput>
  <div class="flex gap-4 mt-3">
    <UButton
      icon="i-lucide-plus" size="md" color="success" variant="solid"
      class="text-black px-9 py-3 font-bold rounded hover:bg-amber-50 hover:ring-2 hover:ring-orange-500 transition-all duration-300"
      @click="gorevEkle"
    >
      Ekle
    </UButton>
    <UButton
      icon="i-lucide-trash" size="md" color="error" variant="solid"
      class="text-black px-4 py-3 font-bold rounded hover:bg-amber-50 hover:ring-2 hover:ring-orange-500 transition-all duration-300"
      @click="store.deleteAll()"
    >
      Hepsini Sil
    </UButton>
  </div>
  <div class="mt-2 w-96">
    <slot />
  </div>
</template>
