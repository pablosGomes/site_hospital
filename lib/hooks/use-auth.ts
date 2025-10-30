// ============================================
// HOOK PARA GERENCIAR AUTENTICAÇÃO
// ============================================
// Hook customizado que encapsula a lógica de autenticação

"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { authService } from "@/lib/services"
import type { User } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // Verifica autenticação ao montar o componente
  useEffect(() => {
    const checkAuth = () => {
      const isAuth = authService.isAuthenticated()
      const currentUser = authService.getCurrentUser()

      setIsAuthenticated(isAuth)
      setUser(currentUser)
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  // Faz login
  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true)

      try {
        const response = await authService.login({ email, password })

        if (response.success && response.data) {
          setUser(response.data.user)
          setIsAuthenticated(true)

          toast({
            title: "Bem-vindo!",
            description: "Login realizado com sucesso",
          })

          router.push("/dashboard")
        } else {
          throw new Error(response.error?.message || "Erro ao fazer login")
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Erro desconhecido"
        toast({
          title: "Erro",
          description: errorMessage,
          variant: "destructive",
        })
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    [router, toast],
  )

  // Faz logout
  const logout = useCallback(async () => {
    try {
      await authService.logout()
      setUser(null)
      setIsAuthenticated(false)

      toast({
        title: "Até logo!",
        description: "Logout realizado com sucesso",
      })

      router.push("/")
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro desconhecido"
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })
    }
  }, [router, toast])

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
  }
}
