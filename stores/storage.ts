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

  async function fetchUsers() {
    if (typeof window === 'undefined')
      return

    const stored = localStorage.getItem('kullanicilar')
    if (stored) {
      kullanicilar.value = JSON.parse(stored) as User[]
      return
    }


    try {
      const { data, error } = await useFetch<User[]>('https://my-json-server.typicode.com/mertozgokceler/testserver/posts', {
        server: false,
      })

      if (data.value) {
        kullanicilar.value = data.value
        localStorage.setItem('kullanicilar', JSON.stringify(kullanicilar.value))
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
    localStorage.removeItem('kullanicilar')
  }

  function sil(index: number) {
    kullanicilar.value.splice(index, 1)
    localStorage.setItem('kullanicilar', JSON.stringify(kullanicilar.value))
  }

  return { kullanicilar, fetchUsers, clearUsers, sil }
})
