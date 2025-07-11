<script setup lang="ts">
</script>

<template>
  <div class="h-screen">
    <div class="flex justify-end mr-4">
      <UButton
        class="py-3 font-bold bg-orange-400 hover:bg-slate-400 mt-5"
        label="Change Theme"
        :icon="isDark ? 'lucide:sun' : 'lucide:moon'"
        @click="toggleTheme"
      />
    </div>
    <div class="mt-50">
      <todo-user-list />
    </div>
  </div>
</template>
