<script setup lang="ts">
import type { User } from '~/types'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '~/stores/storage'

const userStore = useUserStore()
const silinecekKisi = ref<User | null>(null)
const removeModalIsOpen = ref<boolean>(false)
const removeModalIsOpenAll = ref<boolean>(false)
const router = useRouter()
const toast = useToast()

function detayaGit(user: User) {
  router.push({
    name: 'todo-id',
    params: { id: String(user.id) },
  })
}

function getUsers() {
  userStore.fetchUsers()
}

function silModalAcAll() {
  removeModalIsOpenAll.value = true
}

function deleteUsers() {
  userStore.clearUsers()
  removeModalIsOpenAll.value = false
}

function silModalAc(user: User) {
  silinecekKisi.value = user
  removeModalIsOpen.value = true
}

function silOnayla() {
  if (silinecekKisi.value) {
    userStore.sil(silinecekKisi.value.uuid)
    toast.add({ title: `${silinecekKisi.value.name} adlı kullanıcı silindi.` })
  }
  removeModalIsOpen.value = false
}

onMounted(() => {
  if (userStore.kullanicilar.length === 0) {
    userStore.fetchUsers()
  }
})
</script>

<template>
  <div class="flex flex-col items-center justify-center w-full gap-6 mt-4">
    <div class="font-bold text-center text-lg text-slate-800 dark:text-white">
      Aşağıdaki Buton ile Kullanıcıları Listeleyebilirsiniz!
    </div>

    <div class="flex gap-2">
      <UButton
        class="py-4 font-bold bg-orange-400 hover:bg-slate-400 w-44 flex justify-center items-center hover:ring-3 hover:ring-sky-500 transition-all duration-300"
        icon="lucide:refresh-ccw"
        label="Kullanıcıları Getir"
        @click="getUsers"
      />
      <UButton
        color="error"
        class="py-4 font-bold hover:bg-slate-400 w-44 flex justify-center items-center hover:ring-3 hover:ring-sky-500 transition-all duration-300"
        icon="lucide:trash"
        label="Tüm Kullanıcıları Sil"
        @click="silModalAcAll"
      />
    </div>

    <div class="mt-4 w-full max-w-3xl">
      <ul class="w-full space-y-3">
        <li
          v-for="kullanici in userStore.kullanicilar"
          :key="kullanici.uuid"
          class="w-full flex justify-between items-center transition-all duration-300 bg-slate-400 text-black font-bold px-4 py-5 rounded hover:shadow-lg hover:bg-purple-500 hover:scale-105"
        >
          <span><UAvatar :alt="kullanici.name" size="md" /></span>
          <span class="-ml-2 flex justify-center items-center">{{ kullanici.name }}</span>
          <span class="text-sm italic">{{ kullanici.email }}</span>
          <div class="flex gap-2 ml-4">
            <UButton
              icon="i-lucide-trash" size="md" color="error" variant="solid"
              class="text-white rounded-full px-4 py-2 hover:bg-white hover:text-black transition duration-300"
              @click="silModalAc(kullanici)"
            />
            <UButton
              icon="i-lucide-eye" size="md" color="success" variant="solid"
              class="text-white rounded-full px-4 py-2 hover:bg-white hover:text-black transition duration-300"
              @click="detayaGit(kullanici)"
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
  <UModal
    v-model:open="removeModalIsOpen"
    title="Kişiyi Silmek Üzeresiniz"
    :description="`“${silinecekKisi?.name || 'Kişi Bulunamadı'}” adlı kişiyi silmek istediğinize emin misiniz?`"
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

  <UModal
    v-model:open="removeModalIsOpenAll"
    title="Tüm Kişileri Silmek Üzeresiniz"
    description="Tüm Kişileri Silmek İstediğinize Emin Misiniz ?"
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
        @click="removeModalIsOpenAll = false"
      />
      <UButton
        icon="lucide-trash"
        label="Sil"
        color="error"
        variant="solid"
        class="px-6"
        @click="() => {
          deleteUsers()
          toast.add({ title: 'Tüm Kullanıcılar Başarıyla Silindi' })
        }"
      />
    </template>
  </UModal>
</template>
