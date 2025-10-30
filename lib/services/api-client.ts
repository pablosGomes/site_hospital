// ============================================
// CLIENTE HTTP PARA API
// ============================================
// Wrapper para fetch com funcionalidades adicionais

import { API_BASE_URL, API_TIMEOUT, getAuthHeaders } from "@/lib/config/api"
import type { ApiResponse } from "@/lib/types"

// Classe de erro customizada para erros da API
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public details?: Record<string, unknown>,
  ) {
    super(message)
    this.name = "ApiError"
  }
}

// Opções para requisições
interface RequestOptions extends RequestInit {
  timeout?: number
  requiresAuth?: boolean
}

// Cliente HTTP genérico
class ApiClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  // Método privado para fazer requisições
  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    const { timeout = API_TIMEOUT, requiresAuth = true, headers = {}, ...fetchOptions } = options

    // Configura headers
    const requestHeaders = requiresAuth ? { ...getAuthHeaders(), ...headers } : { ...headers }

    // Configura timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...fetchOptions,
        headers: requestHeaders,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      // Parse da resposta
      const data = await response.json()

      // Verifica se houve erro
      if (!response.ok) {
        throw new ApiError(
          response.status,
          data.error?.code || "UNKNOWN_ERROR",
          data.error?.message || "Erro desconhecido",
          data.error?.details,
        )
      }

      return data
    } catch (error) {
      clearTimeout(timeoutId)

      // Trata erros de rede
      if (error instanceof TypeError) {
        throw new ApiError(0, "NETWORK_ERROR", "Erro de conexão com o servidor")
      }

      // Trata timeout
      if (error instanceof Error && error.name === "AbortError") {
        throw new ApiError(0, "TIMEOUT_ERROR", "Tempo de requisição excedido")
      }

      // Re-lança outros erros
      throw error
    }
  }

  // Método GET
  async get<T>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: "GET" })
  }

  // Método POST
  async post<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    })
  }

  // Método PUT
  async put<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    })
  }

  // Método PATCH
  async patch<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(body),
    })
  }

  // Método DELETE
  async delete<T>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: "DELETE" })
  }
}

// Exporta instância única do cliente
export const apiClient = new ApiClient(API_BASE_URL)
