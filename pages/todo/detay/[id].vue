<script setup lang="ts">
import type { Todo } from '~/types'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTaskStore } from '~/stores/storage'

definePageMeta({
  name: 'todo-detay-id',
})

const router = useRouter()
const route = useRoute()
const store = useTaskStore()
const user = useUserStore()
const toast = useToast()

const yeniMetin = ref('')
const bitisTarihi = ref('')
const selected = ref<number | undefined>(undefined)

const severityList = [
  { text: 'Yüksek Öncelik', number: 10 },
  { text: 'Orta Öncelik', number: 20 },
  { text: 'Düşük Öncelik', number: 30 },
]

const gorev = ref<Todo | undefined>()

onMounted(() => {
  store.loadFromStorage(Number(user.$id))
  const id = Number(route.params.id)
  const bulunan = store.gorevler.find(g => g.id === id)
  gorev.value = bulunan

  if (bulunan) {
    document.title = `Görev: ${bulunan.text}`
    yeniMetin.value = bulunan.text
    bitisTarihi.value = bulunan.endDate
    selected.value = severityList.find(s => s.text === bulunan.category)?.number
  }
  else {
    document.title = 'Görev Detay'
  }
})

function guncelleVeGeriDon() {
  if (!gorev.value)
    return

  const selectedCategory = severityList.find(s => s.number === selected.value)?.text || ''

  const guncellenmis: Todo = {
    ...gorev.value,
    text: yeniMetin.value,
    endDate: bitisTarihi.value,
    category: selectedCategory,
  }

  store.guncelle(guncellenmis)

  toast.add({ title: 'Değişiklikler başarıyla kaydedildi.' })
  router.back()
}
</script>

<template>
  <div class="flex justify-center items-center min-h-[calc(100vh-128px)] text-white px-4 py-8">
    <h1>{{ gorev?.text }}</h1>
    <div class="w-full max-w-3xl p-6 rounded-lg shadow-lg bg-zinc-700">
      <h1 class="text-2xl font-bold mb-4">
        Görev Detay
      </h1>

      <div v-if="gorev">
        <p><strong>Görev ID :</strong> {{ gorev.id }}</p>
        <p><strong>Mevcut Görev :</strong> {{ gorev.text }}</p>
        <p><strong>Oluşturulma Tarihi :</strong> {{ gorev.createdDate }}</p>

        <div class="mt-8">
          <label class="block mb-1 font-semibold">Görev Adını Değiştir :</label>
          <UInput
            v-model="yeniMetin"
            placeholder="Görevinizi Buradan Değiştirebilirsiniz..."
            type="text"
            class="w-full px-3 py-2 rounded text-black placeholder:text-gray-700 font-semibold"
          />
        </div>

        <div class="mt-6">
          <label class="block mb-1 font-semibold">Son Bitiş Tarihi ve Saati Ekle :</label>
          <UInput
            v-model="bitisTarihi"
            type="datetime-local"
            class="w-full px-3 py-2 rounded text-black font-semibold"
          />
        </div>

        <div class="mt-7">
          <div class="mt-4">
            <label class="block mb-1 font-semibold">Bir Kategori Seç :</label>
            <USelectMenu
              v-model="selected"
              :items="severityList"
              value-key="number"
              label-key="text"
              placeholder="Lütfen Bir Kategori Seçiniz"
              class="bg-zinc-900 w-full px-2 py-2 rounded text-white"
            />
          </div>
        </div>

        <div class="mt-9 text-center">
          <UButton
            class="w-60 px-18 py-3 font-bold text-black bg-lime-300"
            icon="i-lucide-refresh-ccw"
            label="Güncelle"
            variant="outline"
            @click="guncelleVeGeriDon"
          />
        </div>
      </div>

      <div v-else class="mt-6">
        <p class="text-red-500">
          Görev bulunamadı.
        </p>
      </div>
    </div>
  </div>
</template>
