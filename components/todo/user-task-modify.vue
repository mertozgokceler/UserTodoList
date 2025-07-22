<script setup lang="ts">
import type { Todo } from '~/types'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useTaskStore, useUserStore } from '~/stores/storage'

const router = useRouter()
const route = useRoute()
const store = useTaskStore()
const userStore = useUserStore()

const silinecekGorev = ref<Todo | null>(null)
const removeModalIsOpen = ref<boolean>(false)
const toast = useToast()

const id = Number(route.params.id)
const user = computed(() =>
  userStore.kullanicilar.find(u => u.id === id),
)

onMounted(async () => {
  if (userStore.kullanicilar.length === 0)
    await userStore.fetchUsers()
})

function todoDetayaGit(todo: Todo) {
  router.push({
    name: 'todo-detay-id',
    params: { id: String(todo.id) },
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
  <div class="flex flex-col lg:flex-row justify-center lg:justify-start items-center gap-6 mt-6 max-w-5xl mx-auto">
    <div class="lg:w-[350px] bg-indigo-950 text-white p-6 rounded shadow sticky top-6 self-start">
      <h2 class="text-xl font-bold mb-4">
        Kullanıcı Bilgileri
      </h2>
      <div v-if="user">
        <p><strong>Ad Soyad :</strong> {{ user.name }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Tel No :</strong> {{ user.phone }}</p>
        <p><strong>Durum :</strong> {{ user.active }}</p>
        <p><strong>Kayıt Tarihi :</strong> {{ formatTarih(user.registeredAt) }}</p>
      </div>
      <div v-else class="text-gray-300 text-sm">
        Kullanıcı bilgisi bulunamadı.
      </div>
    </div>

    <div class="flex-1 w-full">
      <ul class="w-120">
        <li
          v-for="(gorev, index) in store.gorevler"
          :key="index"
          class="w-full flex justify-between items-center transition-all duration-300 bg-slate-400 text-black font-bold px-4 py-5 rounded mt-3 hover:shadow-lg hover:bg-purple-500 hover:scale-105"
        >
          <div class="flex items-center space-x-3">
            <span class="rounded-md break-words max-w-xs truncate whitespace-normal">
              <UCheckbox
                v-model="gorev.isCompleted"
                color="primary"
                class="scale-150 bg-slate-300"
                name="notifications"
              />
            </span>

            <span
              class="break-words max-w-xs truncate whitespace-normal"
              :class="[gorev.isCompleted ? 'line-through text-gray-500' : '']"
            >
              {{ gorev.text }}
            </span>

            <span class="text-cyan-950 text-xs break-words max-w-xs truncate whitespace-normal">
              {{ formatTarih(gorev.endDate) }}
            </span>
          </div>

          <UDropdownMenu
            :items="[
              {
                label: 'Detaya Git',
                icon: 'i-lucide-eye',
                onClick: () => todoDetayaGit(gorev),
                class: 'bg-green-500 font-semibold hover:bg-blue-100 text-black',
              },
              {
                label: 'Sil',
                icon: 'i-lucide-trash',
                onClick: () => silModalAc(gorev),
                class: 'bg-red-400 font-semibold hover:bg-red-100 text-black',
              },
            ]"
            :content="{ align: 'end', side: 'bottom', sideOffset: 8 }"
            :ui="{ content: 'w-48' }"
          >
            <UButton
              color="neutral"
              variant="solid"
              class="rounded-full"
              icon="i-lucide-more-horizontal"
              label="Seçenekler"
            />
          </UDropdownMenu>
        </li>
      </ul>
    </div>
  </div>
  <UModal
    v-model:open="removeModalIsOpen"
    title="Görevi Silmek Üzeresiniz"
    :description="`“${silinecekGorev?.text || 'Görev bulunamadı'}” adlı görevi silmek istediğinize emin misiniz?`"
    :ui="{ footer: 'flex justify-end space-x-3 mt-4' }"
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
        @click="() => {
          silOnayla()
          toast.add({ title: `${silinecekGorev?.text || 'Görev bulunamadı'} adlı görev başarı ile silindi !` })
        }"
      />
    </template>
  </UModal>
</template>
