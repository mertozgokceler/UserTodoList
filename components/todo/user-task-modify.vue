<script setup lang="ts">
import type { Todo } from '~/types'
import { useTaskStore } from '~/stores/storage'

const router = useRouter()
const store = useTaskStore()
const silinecekGorev = ref<Todo | null>(null)
const removeModalIsOpen = ref<boolean>(false)

function todoDetayaGit(todo: Todo) {
  router.push({
    name: 'todo-id-detay',
    params: { id: String(todo.id + 1) },
  })
}

function silModalAc(todo: Todo) {
  silinecekGorev.value = todo
  removeModalIsOpen.value = true
}
function silOnayla() {
  if (silinecekGorev.value)
    store.sil(silinecekGorev.value.id)
  removeModalIsOpen.value = false
}

function formatTarih(tarih: string): string {
  if (!tarih)
    return ''
  return tarih.replace('T', ' ')
}
</script>

<template>
  <div>
    <ul class="max-w-3xl w-full mx-auto">
      <li
        v-for="(gorev, index) in store.gorevler"
        :key="index"
        class="w-full flex justify-between items-center transition-all duration-300 bg-slate-400 text-black font-bold px-4 py-5 rounded mt-3 hover:shadow-lg hover:bg-purple-500 hover:scale-105"
      >
        <div class="flex items-center space-x-3">
          <span class="rounded-md break-words max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg truncate whitespace-normal">
            <UCheckbox
              v-model="gorev.isCompleted"
              color="primary"
              class="scale-150 bg-slate-300 " name="notifications"
            />
          </span>

          <span
            class="break-words max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg truncate whitespace-normal" :class="[
              gorev.isCompleted ? 'line-through text-gray-500' : '',
            ]"
          >
            {{ gorev.text }}
          </span>

          <span class="text-cyan-950 text-xs break-words max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg truncate whitespace-normal">
            {{ formatTarih(gorev.endDate) }}
          </span>
        </div>

        <div class="flex gap-2 ml-4">
          <UButton
            icon="i-lucide-x" size="md" color="error" variant="solid"
            class="text-white rounded-full px-4 py-2 hover:bg-white hover:text-black transition duration-300"
            @click="silModalAc(gorev)"
          />
          <UButton
            icon="i-lucide-eye" size="md" color="success" variant="solid"
            class="text-white rounded-full px-4 py-2 hover:bg-white hover:text-black transition duration-300"
            @click="todoDetayaGit(gorev)"
          />
        </div>
      </li>
    </ul>
  </div>
  <UModal
    v-model:open="removeModalIsOpen"
    title="Görevi Silmek Üzeresiniz"
    :description="`“${silinecekGorev?.text || 'Görev bulunamadı'}” adlı görevi silmek istediğinize emin misiniz?`"
    :ui="{
      footer: 'flex justify-end space-x-3 mt-4',
    }"
  >
    <template #footer>
      <UButton
        label="Vazgeç"
        color="neutral"
        variant="outline"
        class="px-5"
        @click="removeModalIsOpen = false"
      />
      <UButton
        icon="i-lucide-trash"
        label="Sil"
        color="error"
        variant="solid"
        class="px-6"
        @click="silOnayla"
      />
    </template>
  </UModal>
</template>
