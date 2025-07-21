export interface Todo {
  id: number
  text: string
  createdDate: string
  endDate: string
  category: string
  isCompleted?: boolean
}

export interface Address {
  city: string
  country: string
}

export interface User {
  id: number
  name: string
  email: string
  avatar: string
  role: string
  registeredAt: string
  phone: string
  active: boolean
  address: Address
  uuid: string
}
