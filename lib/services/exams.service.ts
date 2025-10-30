// ============================================
// SERVIÇO DE EXAMES
// ============================================
// Gerencia todas as operações relacionadas a exames médicos

import { apiClient } from "./api-client"
import { API_ENDPOINTS } from "@/lib/config/api"
import type { Exam, ApiResponse, PaginatedResponse, FilterOptions } from "@/lib/types"

export const examsService = {
  // Lista todos os exames do usuário
  async list(filters?: FilterOptions): Promise<ApiResponse<PaginatedResponse<Exam>>> {
    const queryParams = new URLSearchParams()

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value))
        }
      })
    }

    const endpoint = `${API_ENDPOINTS.exams.list}?${queryParams.toString()}`
    return apiClient.get<PaginatedResponse<Exam>>(endpoint)
  },

  // Busca um exame específico
  async getById(id: string): Promise<ApiResponse<Exam>> {
    return apiClient.get<Exam>(API_ENDPOINTS.exams.get(id))
  },

  // Faz download do resultado do exame
  async download(id: string): Promise<Blob> {
    const response = await fetch(API_ENDPOINTS.exams.download(id), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    })

    if (!response.ok) {
      throw new Error("Erro ao fazer download do exame")
    }

    return response.blob()
  },

  // Agenda um exame
  async schedule(data: {
    examId: string
    date: string
    time: string
    location: string
  }): Promise<ApiResponse<Exam>> {
    return apiClient.post<Exam>(API_ENDPOINTS.exams.schedule, data)
  },

  // Cancela um exame agendado
  async cancel(id: string, reason?: string): Promise<ApiResponse<Exam>> {
    return apiClient.post<Exam>(API_ENDPOINTS.exams.cancel(id), { reason })
  },
}
