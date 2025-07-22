<script setup lang="ts"></script>

<template>
  <Head>
    <title>TodoList | By Mert</title>
  </Head>

  <div class="h-screen flex flex-col text-white dark:bg-zinc-600 light:bg-zinc-300">
    <div class="w-full p-9 bg-sky-500 flex items-center relative">
      <div class="absolute left-4 flex items-center">
        <img
          src="~/assets/icontodo.png"
          alt="İcon Bulunamadı"
          class="w-25 h-25 object-contain"
        >
      </div>

      <h1
        class="mx-auto text-3xl font-bold text-white"
        style="font-family: Pacifico, cursive;"
      >
        ToDoList | Mert Özgökçeler
      </h1>

      <div class="absolute right-4 flex items-center space-x-3">
        <TodoHeader />
      </div>
    </div>

    <main class="flex-1 overflow-auto p-4">
      <slot />
    </main>

    <footer class="bg-orange-400 text-zinc-950 font-semibold text-center py-2 border-t border-red-200">
      © 2025 Mert Özgökçeler. Tüm hakları saklıdır.
    </footer>
  </div>
</template>
