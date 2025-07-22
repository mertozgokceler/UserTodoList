<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTaskStore } from '~/stores/storage'

definePageMeta({
  name: 'todo-detay-id',
})

const router = useRouter()
const route = useRoute()
const store = useTaskStore()
const toast = useToast()

const yeniMetin = ref('')
const bitisTarihi = ref('')
const selected = ref<{ text: string, number: number } | undefined>(undefined)

const gorev = computed(() => {
  const id = Number(route.params.id)
  return store.gorevler.find(g => g.id === id)
})

const severityList = [
  { text: 'Yüksek Öncelik', number: 10 },
  { text: 'Orta Öncelik', number: 20 },
  { text: 'Düşük Öncelik', number: 30 },
]

watch(gorev, (g) => {
  if (process.client) {
    if (g) {
      document.title = `Görev: ${g.text}`
      yeniMetin.value = g.text
      bitisTarihi.value = g.endDate
      selected.value = severityList.find(s => s.text === g.category)
    }
    else {
      document.title = 'Görev Detay'
    }
  }
}, { immediate: true })

function guncelleVeGeriDon() {
  if (!gorev.value)
    return

  const index = store.gorevler.findIndex(g => g.id === gorev.value?.id)
  if (index === -1)
    return

  store.gorevler[index].text = yeniMetin.value
  store.gorevler[index].endDate = bitisTarihi.value
  store.gorevler[index].category = selected.value?.text || ''

  localStorage.setItem('gorevler', JSON.stringify(store.gorevler))
  router.back()
}
</script>

<template>
  <div class="flex justify-center items-center min-h-[calc(100vh-128px)] text-white px-4 py-8">
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
              v-model?="selected" :search-input="false" value-key="number"
              label-key="text" :items="severityList"
              placeholder="Lütfen Bir Kategori Seçiniz : " class="bg-zinc-900 w-full px-2 py-2 rounded dark:text-white light:text-amber-50"
            />
          </div>
        </div>

        <div class="mt-9 text-center">
          <UButton
            class="w-60 px-18 py-3 font-bold text-black bg-lime-300"
            icon="i-lucide-refresh-ccw"
            label="Güncelle"
            variant="outline"
            @click="guncelleVeGeriDon(), toast.add({ title: 'Değişiklikler Başarı İle Kaydedildi...' })"
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
