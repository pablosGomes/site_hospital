// ============================================
// HOOK PARA GERENCIAR EXAMES
// ============================================
// Hook customizado que encapsula a lógica de busca e gerenciamento de exames

"use client"

import { useState, useEffect, useCallback } from "react"
import { examsService } from "@/lib/services"
import type { Exam, FilterOptions } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"

export function useExams(initialFilters?: FilterOptions) {
  const [exams, setExams] = useState<Exam[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<FilterOptions>(initialFilters || {})
  const { toast } = useToast()

  // Busca exames
  const fetchExams = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await examsService.list(filters)

      if (response.success && response.data) {
        setExams(response.data.data)
      } else {
        throw new Error(response.error?.message || "Erro ao buscar exames")
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro desconhecido"
      setError(errorMessage)
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [filters, toast])

  // Faz download de um exame
  const downloadExam = useCallback(
    async (id: string, fileName: string) => {
      try {
        const blob = await examsService.download(id)

        // Cria um link temporário para download
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = fileName
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)

        toast({
          title: "Sucesso",
          description: "Download iniciado",
        })
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Erro desconhecido"
        toast({
          title: "Erro",
          description: errorMessage,
          variant: "destructive",
        })
      }
    },
    [toast],
  )

  // Busca exames quando os filtros mudam
  useEffect(() => {
    fetchExams()
  }, [fetchExams])

  return {
    exams,
    isLoading,
    error,
    filters,
    setFilters,
    refetch: fetchExams,
    downloadExam,
  }
}
