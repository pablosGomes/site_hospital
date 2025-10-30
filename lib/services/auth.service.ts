import { apiClient } from "./api-client"
import { API_ENDPOINTS } from "@/lib/config/api"
import type { User, ApiResponse, PatientRegistrationData, ProfessionalRegistrationData } from "@/lib/types"

interface LoginCredentials {
  email: string
  password: string
}

interface LoginResponse {
  user: User
  token: string
  refreshToken: string
}

interface RegisterData {
  name: string
  email: string
  password: string
  cpf: string
  phone: string
  birthDate: string
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<ApiResponse<LoginResponse>> {
    const response = await apiClient.post<LoginResponse>(API_ENDPOINTS.auth.login, credentials, { requiresAuth: false })
    if (response.success && response.data) {
      localStorage.setItem("authToken", response.data.token)
      localStorage.setItem("refreshToken", response.data.refreshToken)
      localStorage.setItem("user", JSON.stringify(response.data.user))
    }
    return response
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.auth.logout)
    } finally {
      localStorage.removeItem("authToken")
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("user")
    }
  },

  async register(data: RegisterData): Promise<ApiResponse<LoginResponse>> {
    const response = await apiClient.post<LoginResponse>(API_ENDPOINTS.auth.register, data, { requiresAuth: false })
    if (response.success && response.data) {
      localStorage.setItem("authToken", response.data.token)
      localStorage.setItem("refreshToken", response.data.refreshToken)
      localStorage.setItem("user", JSON.stringify(response.data.user))
    }
    return response
  },

  async registerPatient(data: PatientRegistrationData): Promise<ApiResponse<LoginResponse>> {
    const response = await apiClient.post<LoginResponse>(
      API_ENDPOINTS.auth.register,
      { ...data, userType: "patient" },
      { requiresAuth: false },
    )
    if (response.success && response.data) {
      localStorage.setItem("authToken", response.data.token)
      localStorage.setItem("refreshToken", response.data.refreshToken)
      localStorage.setItem("user", JSON.stringify(response.data.user))
    }
    return response
  },

  async registerProfessional(data: ProfessionalRegistrationData): Promise<ApiResponse<LoginResponse>> {
    const response = await apiClient.post<LoginResponse>(
      API_ENDPOINTS.auth.register,
      { ...data, userType: "professional" },
      { requiresAuth: false },
    )
    if (response.success && response.data) {
      localStorage.setItem("authToken", response.data.token)
      localStorage.setItem("refreshToken", response.data.refreshToken)
      localStorage.setItem("user", JSON.stringify(response.data.user))
    }
    return response
  },

  async refreshToken(): Promise<ApiResponse<{ token: string }>> {
    const refreshToken = localStorage.getItem("refreshToken")
    if (!refreshToken) {
      throw new Error("Refresh token não encontrado")
    }
    const response = await apiClient.post<{ token: string }>(
      API_ENDPOINTS.auth.refreshToken,
      { refreshToken },
      { requiresAuth: false },
    )
    if (response.success && response.data) {
      localStorage.setItem("authToken", response.data.token)
    }
    return response
  },

  async forgotPassword(email: string): Promise<ApiResponse<void>> {
    return apiClient.post(API_ENDPOINTS.auth.forgotPassword, { email }, { requiresAuth: false })
  },

  async resetPassword(token: string, newPassword: string): Promise<ApiResponse<void>> {
    return apiClient.post(API_ENDPOINTS.auth.resetPassword, { token, newPassword }, { requiresAuth: false })
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem("authToken")
  },

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem("user")
    return userStr ? JSON.parse(userStr) : null
  },
}
