# Guia de Integração com Backend

Este documento descreve como integrar o frontend com o backend.

## Estrutura de Arquivos

\`\`\`
lib/
├── types/           # Definições TypeScript
│   └── index.ts
├── config/          # Configurações
│   └── api.ts
├── services/        # Serviços de API
│   ├── api-client.ts
│   ├── auth.service.ts
│   ├── appointments.service.ts
│   ├── exams.service.ts
│   └── index.ts
└── hooks/           # Hooks customizados
    ├── use-auth.ts
    ├── use-appointments.ts
    ├── use-exams.ts
    └── index.ts
\`\`\`

## Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
\`\`\`

### 2. Endpoints da API

Todos os endpoints estão definidos em `lib/config/api.ts`. Para adicionar novos endpoints:

\`\`\`typescript
export const API_ENDPOINTS = {
  // ... endpoints existentes
  
  // Novo recurso
  myResource: {
    list: "/my-resource",
    get: (id: string) => `/my-resource/${id}`,
    create: "/my-resource",
  },
}
\`\`\`

## Uso nos Componentes

### Exemplo com Hook

\`\`\`typescript
"use client"

import { useAppointments } from "@/lib/hooks"

export default function MyComponent() {
  const { appointments, isLoading, error, cancelAppointment } = useAppointments({
    status: "scheduled"
  })

  if (isLoading) return <div>Carregando...</div>
  if (error) return <div>Erro: {error}</div>

  return (
    <div>
      {appointments.map(appointment => (
        <div key={appointment.id}>
          {appointment.doctor.name}
          <button onClick={() => cancelAppointment(appointment.id)}>
            Cancelar
          </button>
        </div>
      ))}
    </div>
  )
}
\`\`\`

### Exemplo com Serviço Direto

\`\`\`typescript
import { appointmentsService } from "@/lib/services"

async function handleCreateAppointment(data) {
  try {
    const response = await appointmentsService.create(data)
    
    if (response.success) {
      console.log("Consulta criada:", response.data)
    }
  } catch (error) {
    console.error("Erro:", error)
  }
}
\`\`\`

## Formato de Resposta da API

Todas as respostas devem seguir o formato:

\`\`\`typescript
{
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: Record<string, unknown>
  }
  message?: string
  timestamp: string
}
\`\`\`

## Autenticação

O sistema usa JWT Bearer Token. O token é automaticamente incluído em todas as requisições que requerem autenticação.

### Login

\`\`\`typescript
import { authService } from "@/lib/services"

const response = await authService.login({
  email: "user@example.com",
  password: "password123"
})

// Token é automaticamente salvo no localStorage
\`\`\`

### Logout

\`\`\`typescript
await authService.logout()
// Token é automaticamente removido do localStorage
\`\`\`

## Tratamento de Erros

Todos os serviços lançam `ApiError` em caso de falha:

\`\`\`typescript
import { ApiError } from "@/lib/services"

try {
  await appointmentsService.create(data)
} catch (error) {
  if (error instanceof ApiError) {
    console.log("Status:", error.statusCode)
    console.log("Código:", error.code)
    console.log("Mensagem:", error.message)
  }
}
\`\`\`

## Próximos Passos

1. Configure a URL da API em `.env.local`
2. Implemente o backend seguindo os contratos de API definidos
3. Teste a integração usando os hooks fornecidos
4. Adicione novos serviços conforme necessário
