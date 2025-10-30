// ============================================
// HOOK PARA GERENCIAR CONSULTAS
// ============================================
// Hook customizado que encapsula a lógica de busca e gerenciamento de consultas

"use client"

import { useState, useEffect, useCallback } from "react"
import { appointmentsService } from "@/lib/services"
import type { Appointment, FilterOptions } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"

export function useAppointments(initialFilters?: FilterOptions) {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<FilterOptions>(initialFilters || {})
  const { toast } = useToast()

  // Busca consultas
  const fetchAppointments = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await appointmentsService.list(filters)

      if (response.success && response.data) {
        setAppointments(response.data.data)
      } else {
        throw new Error(response.error?.message || "Erro ao buscar consultas")
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

  // Cancela uma consulta
  const cancelAppointment = useCallback(
    async (id: string, reason?: string) => {
      try {
        const response = await appointmentsService.cancel(id, reason)

        if (response.success) {
          toast({
            title: "Sucesso",
            description: "Consulta cancelada com sucesso",
          })
          // Atualiza a lista
          await fetchAppointments()
        } else {
          throw new Error(response.error?.message || "Erro ao cancelar consulta")
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Erro desconhecido"
        toast({
          title: "Erro",
          description: errorMessage,
          variant: "destructive",
        })
      }
    },
    [fetchAppointments, toast],
  )

  // Reagenda uma consulta
  const rescheduleAppointment = useCallback(
    async (id: string, newDate: string, newTime: string) => {
      try {
        const response = await appointmentsService.reschedule(id, newDate, newTime)

        if (response.success) {
          toast({
            title: "Sucesso",
            description: "Consulta reagendada com sucesso",
          })
          // Atualiza a lista
          await fetchAppointments()
        } else {
          throw new Error(response.error?.message || "Erro ao reagendar consulta")
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Erro desconhecido"
        toast({
          title: "Erro",
          description: errorMessage,
          variant: "destructive",
        })
      }
    },
    [fetchAppointments, toast],
  )

  // Busca consultas quando os filtros mudam
  useEffect(() => {
    fetchAppointments()
  }, [fetchAppointments])

  return {
    appointments,
    isLoading,
    error,
    filters,
    setFilters,
    refetch: fetchAppointments,
    cancelAppointment,
    rescheduleAppointment,
  }
}
