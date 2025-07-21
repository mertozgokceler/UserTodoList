import type { Todo, User } from '~/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTaskStore = defineStore('todo', () => {
  const gorevler = ref<Todo[]>([])

  function getNextId(): number {
    return gorevler.value.length ? Math.max(...gorevler.value.map(g => g.id)) + 1 : 0
  }

  function ekle(text: string) {
    const yeniGorev: Todo = {
      id: getNextId(),
      text: text.trim(),
      createdDate: new Date().toLocaleString(),
      isCompleted: false,
      endDate: '',
      category: '',

    }

    gorevler.value.push(yeniGorev)
    localStorage.setItem('gorevler', JSON.stringify(gorevler.value))
  }

  function sil(index: number) {
    gorevler.value.splice(index, 1)
    localStorage.setItem('gorevler', JSON.stringify(gorevler.value))
  }

  function deleteAll() {
    gorevler.value = []
    localStorage.setItem('gorevler', JSON.stringify(gorevler.value))
  }

  return { gorevler, ekle, sil, deleteAll }
})

// ------------------------------------------------------------------------------------------------------------------------------------------------

export const useUserStore = defineStore('user', () => {
  const kullanicilar = ref<User[]>([])
  const config = useRuntimeConfig()
  const userKey = config.public.localStorageKeys.users

  async function fetchUsers() {
    if (typeof window === 'undefined')
      return

    const config = useRuntimeConfig()
    const userKey = config.public.localStorageKeys.users

    const stored = localStorage.getItem(userKey)
    if (stored) {
      kullanicilar.value = JSON.parse(stored)
      return
    }

    try {
      const { data, error } = await useFetch<User[]>('https://mockly.atlaxt.me/api/users', {
        server: false,
      })

      if (data.value) {
        const uuidUsers = await Promise.all(
          data.value.map(async (user) => {
            const uuid = await $fetch<string>('https://mockly.atlaxt.me/api/uuid')
            return { ...user, uuid }
          }),
        )

        kullanicilar.value = uuidUsers
        localStorage.setItem(userKey, JSON.stringify(kullanicilar.value))
      }
      else if (error.value) {
        console.error('Kullanıcı verisi çekilemedi:', error.value)
      }
    }
    catch (err) {
      console.error('Hata oluştu:', err)
    }
  }

  function clearUsers() {
    kullanicilar.value = []
    localStorage.removeItem(userKey)
  }

  function sil(uuid: string) {
    kullanicilar.value = kullanicilar.value.filter(user => user.uuid !== uuid)
    localStorage.setItem(userKey, JSON.stringify(kullanicilar.value))
  }

  return { kullanicilar, fetchUsers, clearUsers, sil }
})
