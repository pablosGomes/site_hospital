// ============================================
// SERVIÇO DE CONSULTAS
// ============================================
// Gerencia todas as operações relacionadas a consultas médicas

import { apiClient } from "./api-client"
import { API_ENDPOINTS } from "@/lib/config/api"
import type { Appointment, ApiResponse, PaginatedResponse, FilterOptions } from "@/lib/types"

export const appointmentsService = {
  // Lista todas as consultas do usuário
  async list(filters?: FilterOptions): Promise<ApiResponse<PaginatedResponse<Appointment>>> {
    const queryParams = new URLSearchParams()

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value))
        }
      })
    }

    const endpoint = `${API_ENDPOINTS.appointments.list}?${queryParams.toString()}`
    return apiClient.get<PaginatedResponse<Appointment>>(endpoint)
  },

  // Busca uma consulta específica
  async getById(id: string): Promise<ApiResponse<Appointment>> {
    return apiClient.get<Appointment>(API_ENDPOINTS.appointments.get(id))
  },

  // Cria uma nova consulta
  async create(data: Partial<Appointment>): Promise<ApiResponse<Appointment>> {
    return apiClient.post<Appointment>(API_ENDPOINTS.appointments.create, data)
  },

  // Atualiza uma consulta
  async update(id: string, data: Partial<Appointment>): Promise<ApiResponse<Appointment>> {
    return apiClient.put<Appointment>(API_ENDPOINTS.appointments.update(id), data)
  },

  // Cancela uma consulta
  async cancel(id: string, reason?: string): Promise<ApiResponse<Appointment>> {
    return apiClient.post<Appointment>(API_ENDPOINTS.appointments.cancel(id), { reason })
  },

  // Reagenda uma consulta
  async reschedule(id: string, newDate: string, newTime: string): Promise<ApiResponse<Appointment>> {
    return apiClient.post<Appointment>(API_ENDPOINTS.appointments.reschedule(id), {
      date: newDate,
      time: newTime,
    })
  },

  // Busca horários disponíveis
  async getAvailableSlots(doctorId: string, date: string): Promise<ApiResponse<string[]>> {
    const queryParams = new URLSearchParams({ doctorId, date })
    const endpoint = `${API_ENDPOINTS.appointments.available}?${queryParams.toString()}`
    return apiClient.get<string[]>(endpoint)
  },
}
