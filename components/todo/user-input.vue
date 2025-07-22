<script setup lang="ts">
const store = useTaskStore()
const gorev = ref('')
const removeModalIsOpen = ref<boolean>(false)
const toast = useToast()
const route = useRoute()
const userStore = useUserStore()
const id = Number(route.params.id)

const user = computed(() =>
  userStore.kullanicilar.find(u => u.id === id),
)

onMounted(async () => {
  if (userStore.kullanicilar.length === 0)
    await userStore.fetchUsers()
})

function gorevEkle() {
  if (gorev.value.trim()) {
    store.ekle(gorev.value)
    gorev.value = ''
  }
}

function silModalAc() {
  removeModalIsOpen.value = true
}

function hepsiniSil() {
  store.gorevler = []
  removeModalIsOpen.value = false
}
</script>

<template>
  <div v-if="user" class="font-semibold text-zinc-900 dark:text-white scale-125 flex justify-center items-center">
    Merhaba , {{ user.name }}
  </div>
  <UInput
    v-model="gorev"
    placeholder="Görev Giriniz :"
    :ui="{ trailing: 'pe-1' }"
    class="mt-7 w-120 h-full max-w-2xl text-left border placeholder:font-semibold font-semibold
         shadow-xl shadow-black/40 dark:shadow-white rounded light:shadow-black
         hover:ring-2 hover:ring-orange-500 transition-all duration-300 dark:text-white"
  >
    <template v-if="gorev?.length" #trailing>
      <UButton
        color="error"
        variant="link"
        size="xl"
        icon="i-lucide-circle-x"
        aria-label="Clear input"
        @click="gorev = ''"
      />
    </template>
  </UInput>
  <div class="flex gap-4 mt-3">
    <UButton
      icon="i-lucide-plus" size="md" color="success" variant="solid"
      class="text-black px-9 py-3 font-bold rounded hover:bg-amber-50 hover:ring-2 hover:ring-orange-500 transition-all duration-300"
      @click="gorevEkle"
    >
      Ekle
    </UButton>
    <UButton
      icon="i-lucide-trash" size="md" color="error" variant="solid"
      class="text-black px-4 py-3 font-bold rounded hover:bg-amber-50 hover:ring-2 hover:ring-orange-500 transition-all duration-300"
      @click="silModalAc"
    >
      Hepsini Sil
    </UButton>
  </div>
  <UModal
    v-model:open="removeModalIsOpen"
    title="Tüm Görevleri Silmek Üzeresiniz"
    description=" Tüm görevleri silmek istediğinize emin misiniz?"
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
        @click="() => {
          hepsiniSil()
          toast.add({ title: 'Tüm Görevler Başarıyla Silindi' })
        }"
      />
    </template>
  </UModal>
  <div class="mt-2 w-96">
    <slot />
  </div>
</template>
