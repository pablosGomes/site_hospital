// ============================================
// TIPOS E INTERFACES GLOBAIS
// ============================================
// Este arquivo centraliza todas as definições de tipos TypeScript
// usadas em toda a aplicação para garantir consistência

// ============================================
// TIPOS DE USUÁRIO
// ============================================

export interface User {
  id: string
  name: string
  email: string
  cpf: string
  phone: string
  birthDate: string
  address: Address
  avatar?: string
  bloodType?: string
  allergies?: string[]
  userType: "patient" | "professional"
  createdAt: string
  updatedAt: string
}

export interface PatientRegistrationData {
  name: string
  email: string
  password: string
  cpf: string
  rg?: string
  birthDate: string
  phone?: string
  cellphone: string
  gender: string
  bloodType?: string
  healthInsurance?: string
  healthInsuranceNumber?: string
  address: Address
}

export interface ProfessionalRegistrationData {
  name: string
  email: string
  password: string
  cpf: string
  rg?: string
  birthDate: string
  phone?: string
  cellphone: string
  gender: string
  professionalType: string
  registrationNumber: string
  registrationState: string
  specialty: string
  subSpecialty?: string
  graduationInstitution: string
  graduationYear: string
  address: Address
}

export interface Address {
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
}

// ============================================
// TIPOS DE CONSULTA
// ============================================

export interface Appointment {
  id: string
  patientId: string
  doctorId: string
  doctor: Doctor
  specialty: string
  date: string
  time: string
  status: AppointmentStatus
  type: AppointmentType
  location: string
  notes?: string
  symptoms?: string
  createdAt: string
  updatedAt: string
}

export type AppointmentStatus =
  | "scheduled" // Agendada
  | "confirmed" // Confirmada
  | "completed" // Realizada
  | "cancelled" // Cancelada
  | "rescheduled" // Reagendada
  | "no-show" // Faltou

export type AppointmentType =
  | "consultation" // Consulta
  | "return" // Retorno
  | "emergency" // Emergência
  | "telemedicine" // Telemedicina

export interface Doctor {
  id: string
  name: string
  specialty: string
  crm: string
  avatar?: string
  rating?: number
  bio?: string
}

// ============================================
// TIPOS DE EXAME
// ============================================

export interface Exam {
  id: string
  patientId: string
  name: string
  type: ExamType
  category: string
  requestedBy: string
  requestedById: string
  requestDate: string
  scheduledDate?: string
  completedDate?: string
  status: ExamStatus
  result?: ExamResult
  location?: string
  instructions?: string
  createdAt: string
  updatedAt: string
}

export type ExamType =
  | "blood" // Sangue
  | "urine" // Urina
  | "image" // Imagem
  | "cardiac" // Cardíaco
  | "other" // Outro

export type ExamStatus =
  | "requested" // Solicitado
  | "scheduled" // Agendado
  | "completed" // Concluído
  | "available" // Disponível
  | "cancelled" // Cancelado

export interface ExamResult {
  fileUrl: string
  fileName: string
  fileSize: number
  fileType: string
  summary?: string
  observations?: string
}

// ============================================
// TIPOS DE TELEMEDICINA
// ============================================

export interface TelemedicineSession {
  id: string
  patientId: string
  doctorId: string
  doctor: Doctor
  scheduledDate: string
  scheduledTime: string
  duration: number // em minutos
  status: TelemedicineStatus
  roomUrl?: string
  recordingUrl?: string
  notes?: string
  prescription?: Prescription
  createdAt: string
  updatedAt: string
}

export type TelemedicineStatus =
  | "scheduled" // Agendada
  | "in-progress" // Em andamento
  | "completed" // Concluída
  | "cancelled" // Cancelada

export interface Prescription {
  id: string
  medications: Medication[]
  instructions: string
  validUntil: string
  createdAt: string
}

export interface Medication {
  name: string
  dosage: string
  frequency: string
  duration: string
  instructions?: string
}

// ============================================
// TIPOS DE MENSAGEM
// ============================================

export interface Conversation {
  id: string
  participantId: string
  participantName: string
  participantAvatar?: string
  participantRole: "doctor" | "nurse" | "admin" | "support"
  lastMessage: Message
  unreadCount: number
  createdAt: string
  updatedAt: string
}

export interface Message {
  id: string
  conversationId: string
  senderId: string
  senderName: string
  content: string
  type: MessageType
  attachments?: MessageAttachment[]
  isRead: boolean
  createdAt: string
}

export type MessageType = "text" | "image" | "file" | "audio"

export interface MessageAttachment {
  id: string
  fileName: string
  fileUrl: string
  fileSize: number
  fileType: string
}

// ============================================
// TIPOS DE NOTIFICAÇÃO
// ============================================

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: NotificationType
  priority: NotificationPriority
  isRead: boolean
  actionUrl?: string
  actionLabel?: string
  createdAt: string
}

export type NotificationType =
  | "appointment" // Consulta
  | "exam" // Exame
  | "message" // Mensagem
  | "prescription" // Receita
  | "reminder" // Lembrete
  | "system" // Sistema

export type NotificationPriority = "low" | "medium" | "high" | "urgent"

// ============================================
// TIPOS DE RESPOSTA DA API
// ============================================

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: ApiError
  message?: string
  timestamp: string
}

export interface ApiError {
  code: string
  message: string
  details?: Record<string, unknown>
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: Pagination
}

export interface Pagination {
  page: number
  pageSize: number
  totalPages: number
  totalItems: number
  hasNext: boolean
  hasPrevious: boolean
}

// ============================================
// TIPOS DE FILTRO E BUSCA
// ============================================

export interface FilterOptions {
  search?: string
  status?: string
  dateFrom?: string
  dateTo?: string
  type?: string
  sortBy?: string
  sortOrder?: "asc" | "desc"
  page?: number
  pageSize?: number
}
