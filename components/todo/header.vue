<script setup lang="ts">

</script>

<template>
  <div class="flex items-center gap-3 mr-4">
    <UButton
      class="px-5 py-3 font-bold bg-orange-400 hover:bg-slate-400 flex items-center justify-center rounded-full text-center"
      label=""
      :icon="isDark ? 'lucide:sun' : 'lucide:moon'"
      @click="toggleTheme"
    />

    <div class="text-xl font-bold mx-2 select-none">
      |
    </div>

    <UAvatarGroup>
      <ULink
        to="https://github.com/mertozgokceler"
        target="_blank"
        class="hover:ring-primary transition"
      >
        <UAvatar
          size="2xl"
          src="https://avatars.githubusercontent.com/u/114679306?v=4"
          alt="Mert Özgökçeler"
        />
      </ULink>
    </UAvatarGroup>
  </div>
</template>
