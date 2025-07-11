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

export const userStore = defineStore('user', () => {
  const kullanicilar = ref<User[]>([])

  function getNextId(): number {
    return kullanicilar.value.length ? Math.max(...kullanicilar.value.map(g => g.id)) + 1 : 0
  }
})
