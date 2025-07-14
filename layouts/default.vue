<script setup lang="ts">

</script>

<template>
  <Head>
    <title>TodoList | By Mert</title>
  </Head>

  <div class="min-h-screen flex flex-col text-white">
    <div class="w-full p-5 rounded flex justify-center items-center bg-sky-500 -mt-1">
      <div class="ml-4">
        <img
          src="~/assets/icontodo.png"
          alt="İcon Bulunamadı"
          class="w-20 h-20 object-contain"
        >
      </div>

      <h1
        class="text-3xl font-bold text-red-50 text-center flex-1 justify-center items-center ml-10"
        style="font-family: Pacifico, cursive;"
      >
        ToDoList | Mert Özgökçeler
      </h1>
      <TodoHeader />
    </div>

    <main class="flex-1 overflow-auto p-4">
      <slot />
    </main>

    <footer class="bg-orange-400 text-zinc-950 font-semibold text-center py-2 border-t border-red-200">
      © 2025 Mert Özgökçeler. Tüm hakları saklıdır.
    </footer>
  </div>
</template>
