<script setup lang="ts">

</script>

<template>
  <div class="min-h-screen overflow-auto">
    <div class="w-full bg-slate-600 p-5 rounded flex items-center justify-between">
      <div class="rounded flex items-center justify-between ml-4">
        <img
          src="~/assets/icontodo.png"
          alt="İcon Bulunamadı"
          class="w-20 h-20 object-contain -ml-5"
        >
      </div>
      <h1
        class="text-3xl font-bold text-red-50 text-center flex-1"
        style="font-family: Pacifico, cursive;"
      >
        Merhaba, ToDoListe'e Hoş Geldiniz!
      </h1>
      <div class="w-20 h-25" />
    </div>
  </div>
  <div class="fixed left-0 top-0 w-screen h-dvh">
    <slot />
  </div>
</template>
