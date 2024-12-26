"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  email: string
  name?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  checkWebSolution: () => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/user`)
      const data = await response.json()
      setUser(data.user)
    } catch (error) {
      console.error("Auth check error:", error)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.error)
    }

    await checkAuth()
    router.refresh()
  }

  const logout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/logout`, { method: "POST" })
    setUser(null)
    router.refresh()
    router.push("/")
  }

  const checkWebSolution = async () => {
    try {
      const response = await fetch('/api/check-web-solution')
      const data = await response.json()
      return data.hasWebSolution
    } catch (error) {
      console.error('Fejl ved tjek af webløsning:', error)
      return false
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, checkWebSolution }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
} 