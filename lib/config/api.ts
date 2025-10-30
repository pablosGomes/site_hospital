// ============================================
// CONFIGURAÇÃO DA API
// ============================================
// Centraliza todas as configurações relacionadas à API

// URL base da API - deve ser configurada via variável de ambiente
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"

// Timeout padrão para requisições (em milissegundos)
export const API_TIMEOUT = 30000

// Endpoints da API organizados por recurso
export const API_ENDPOINTS = {
  // Autenticação
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    register: "/auth/register",
    refreshToken: "/auth/refresh",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
    verifyEmail: "/auth/verify-email",
  },

  // Usuário
  user: {
    profile: "/user/profile",
    update: "/user/profile",
    avatar: "/user/avatar",
    changePassword: "/user/change-password",
  },

  // Consultas
  appointments: {
    list: "/appointments",
    create: "/appointments",
    get: (id: string) => `/appointments/${id}`,
    update: (id: string) => `/appointments/${id}`,
    cancel: (id: string) => `/appointments/${id}/cancel`,
    reschedule: (id: string) => `/appointments/${id}/reschedule`,
    available: "/appointments/available-slots",
  },

  // Exames
  exams: {
    list: "/exams",
    get: (id: string) => `/exams/${id}`,
    download: (id: string) => `/exams/${id}/download`,
    schedule: "/exams/schedule",
    cancel: (id: string) => `/exams/${id}/cancel`,
  },

  // Telemedicina
  telemedicine: {
    list: "/telemedicine/sessions",
    create: "/telemedicine/sessions",
    get: (id: string) => `/telemedicine/sessions/${id}`,
    join: (id: string) => `/telemedicine/sessions/${id}/join`,
    end: (id: string) => `/telemedicine/sessions/${id}/end`,
    cancel: (id: string) => `/telemedicine/sessions/${id}/cancel`,
  },

  // Mensagens
  messages: {
    conversations: "/messages/conversations",
    conversation: (id: string) => `/messages/conversations/${id}`,
    send: "/messages/send",
    markAsRead: (id: string) => `/messages/${id}/read`,
  },

  // Notificações
  notifications: {
    list: "/notifications",
    markAsRead: (id: string) => `/notifications/${id}/read`,
    markAllAsRead: "/notifications/read-all",
    delete: (id: string) => `/notifications/${id}`,
  },

  // Médicos
  doctors: {
    list: "/doctors",
    get: (id: string) => `/doctors/${id}`,
    specialties: "/doctors/specialties",
  },

  // Emergência
  emergency: {
    contacts: "/emergency/contacts",
    units: "/emergency/units",
    call: "/emergency/call",
  },
} as const

// Headers padrão para requisições
export const getDefaultHeaders = () => ({
  "Content-Type": "application/json",
  Accept: "application/json",
})

// Função para obter headers com autenticação
export const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken")
  return {
    ...getDefaultHeaders(),
    ...(token && { Authorization: `Bearer ${token}` }),
  }
}
