<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col justify-center items-center w-full border h-full">
    <UButton
      label="Tema Değiştir"
      :icon="isDark ? 'lucide:sun' : 'lucide:moon'"
      @click="toggleTheme"
    />
    <div class="text-primary-400 transition-all duration-300">
      ATLAS
    </div>
  </div>
</template>
