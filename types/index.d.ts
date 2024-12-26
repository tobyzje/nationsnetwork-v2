export interface User {
  id: string
  email: string
  password: string
  name: string | null
  phone: string | null
  companyName: string | null
  isAdmin: boolean
  createdAt: Date
  updatedAt: Date
}

export interface DbUser extends User {
  id: string
} 