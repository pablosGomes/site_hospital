"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, User, Stethoscope, CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { authService } from "@/lib/services"
import Image from "next/image"

// ============================================
// COMPONENTE DE CADASTRO
// ============================================
// Permite cadastro de pacientes e profissionais com formulários específicos

export default function CadastroPage() {
  const router = useRouter()
  const [userType, setUserType] = useState<"patient" | "professional">("patient")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  // Estados do formulário de paciente
  const [patientData, setPatientData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    cpf: "",
    rg: "",
    birthDate: "",
    phone: "",
    cellphone: "",
    gender: "",
    bloodType: "",
    healthInsurance: "",
    healthInsuranceNumber: "",
    // Endereço
    zipCode: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
  })

  // Estados do formulário de profissional
  const [professionalData, setProfessionalData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    cpf: "",
    rg: "",
    birthDate: "",
    phone: "",
    cellphone: "",
    gender: "",
    // Dados profissionais
    professionalType: "", // médico, enfermeiro, técnico, etc
    registrationNumber: "", // CRM, COREN, etc
    registrationState: "",
    specialty: "",
    subSpecialty: "",
    graduationInstitution: "",
    graduationYear: "",
    // Endereço
    zipCode: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
  })

  // ============================================
  // HANDLERS DE FORMULÁRIO
  // ============================================

  const handlePatientChange = (field: string, value: string) => {
    setPatientData((prev) => ({ ...prev, [field]: value }))
    setError("")
  }

  const handleProfessionalChange = (field: string, value: string) => {
    setProfessionalData((prev) => ({ ...prev, [field]: value }))
    setError("")
  }

  // Valida e submete formulário de paciente
  const handlePatientSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Validações básicas
    if (patientData.password !== patientData.confirmPassword) {
      setError("As senhas não coincidem")
      setLoading(false)
      return
    }

    if (patientData.password.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres")
      setLoading(false)
      return
    }

    try {
      const response = await authService.register({
        name: patientData.name,
        email: patientData.email,
        password: patientData.password,
        cpf: patientData.cpf,
        phone: patientData.cellphone,
        birthDate: patientData.birthDate,
        // Adicionar outros campos conforme necessário
      })

      if (response.success) {
        setSuccess(true)
        setTimeout(() => {
          router.push("/dashboard")
        }, 2000)
      } else {
        setError(response.error?.message || "Erro ao criar conta")
      }
    } catch (err) {
      setError("Erro ao criar conta. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  // Valida e submete formulário de profissional
  const handleProfessionalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Validações básicas
    if (professionalData.password !== professionalData.confirmPassword) {
      setError("As senhas não coincidem")
      setLoading(false)
      return
    }

    if (professionalData.password.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres")
      setLoading(false)
      return
    }

    try {
      const response = await authService.register({
        name: professionalData.name,
        email: professionalData.email,
        password: professionalData.password,
        cpf: professionalData.cpf,
        phone: professionalData.cellphone,
        birthDate: professionalData.birthDate,
        // Adicionar outros campos conforme necessário
      })

      if (response.success) {
        setSuccess(true)
        setTimeout(() => {
          router.push("/dashboard")
        }, 2000)
      } else {
        setError(response.error?.message || "Erro ao criar conta")
      }
    } catch (err) {
      setError("Erro ao criar conta. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  // Busca endereço pelo CEP
  const handleZipCodeBlur = async (type: "patient" | "professional") => {
    const zipCode = type === "patient" ? patientData.zipCode : professionalData.zipCode

    if (zipCode.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`)
        const data = await response.json()

        if (!data.erro) {
          if (type === "patient") {
            setPatientData((prev) => ({
              ...prev,
              street: data.logradouro,
              neighborhood: data.bairro,
              city: data.localidade,
              state: data.uf,
            }))
          } else {
            setProfessionalData((prev) => ({
              ...prev,
              street: data.logradouro,
              neighborhood: data.bairro,
              city: data.localidade,
              state: data.uf,
            }))
          }
        }
      } catch (err) {
        console.error("Erro ao buscar CEP:", err)
      }
    }
  }

  // Tela de sucesso
  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-12 pb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Cadastro realizado com sucesso!</h2>
            <p className="text-gray-600 mb-6">Redirecionando para o painel...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 relative">
              <Image
                src="/logo-hospital-solarium.png"
                alt="Hospital Solarium"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Hospital Solarium</h1>
              <p className="text-sm text-gray-600">Criar nova conta</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => router.push("/")} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
        </div>

        {/* Tabs de seleção de tipo de usuário */}
        <Tabs value={userType} onValueChange={(value) => setUserType(value as "patient" | "professional")}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="patient" className="gap-2">
              <User className="w-4 h-4" />
              Sou Paciente
            </TabsTrigger>
            <TabsTrigger value="professional" className="gap-2">
              <Stethoscope className="w-4 h-4" />
              Sou Profissional
            </TabsTrigger>
          </TabsList>

          {/* Formulário de Paciente */}
          <TabsContent value="patient">
            <Card>
              <CardHeader>
                <CardTitle>Cadastro de Paciente</CardTitle>
                <CardDescription>Preencha seus dados para criar sua conta</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePatientSubmit} className="space-y-6">
                  {/* Dados Pessoais */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Dados Pessoais</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="patient-name">Nome Completo *</Label>
                        <Input
                          id="patient-name"
                          value={patientData.name}
                          onChange={(e) => handlePatientChange("name", e.target.value)}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="patient-cpf">CPF *</Label>
                        <Input
                          id="patient-cpf"
                          value={patientData.cpf}
                          onChange={(e) => handlePatientChange("cpf", e.target.value)}
                          placeholder="000.000.000-00"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="patient-rg">RG</Label>
                        <Input
                          id="patient-rg"
                          value={patientData.rg}
                          onChange={(e) => handlePatientChange("rg", e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="patient-birthDate">Data de Nascimento *</Label>
                        <Input
                          id="patient-birthDate"
                          type="date"
                          value={patientData.birthDate}
                          onChange={(e) => handlePatientChange("birthDate", e.target.value)}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="patient-gender">Sexo *</Label>
                        <Select
                          value={patientData.gender}
                          onValueChange={(value) => handlePatientChange("gender", value)}
                        >
                          <SelectTrigger id="patient-gender">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="M">Masculino</SelectItem>
                            <SelectItem value="F">Feminino</SelectItem>
                            <SelectItem value="O">Outro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="patient-bloodType">Tipo Sanguíneo</Label>
                        <Select
                          value={patientData.bloodType}
                          onValueChange={(value) => handlePatientChange("bloodType", value)}
                        >
                          <SelectTrigger id="patient-bloodType">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="A+">A+</SelectItem>
                            <SelectItem value="A-">A-</SelectItem>
                            <SelectItem value="B+">B+</SelectItem>
                            <SelectItem value="B-">B-</SelectItem>
                            <SelectItem value="AB+">AB+</SelectItem>
                            <SelectItem value="AB-">AB-</SelectItem>
                            <SelectItem value="O+">O+</SelectItem>
                            <SelectItem value="O-">O-</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Contato */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Contato</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="patient-phone">Telefone</Label>
                        <Input
                          id="patient-phone"
                          value={patientData.phone}
                          onChange={(e) => handlePatientChange("phone", e.target.value)}
                          placeholder="(00) 0000-0000"
                        />
                      </div>

                      <div>
                        <Label htmlFor="patient-cellphone">Celular *</Label>
                        <Input
                          id="patient-cellphone"
                          value={patientData.cellphone}
                          onChange={(e) => handlePatientChange("cellphone", e.target.value)}
                          placeholder="(00) 00000-0000"
                          required
                        />
                      </div>

                      <div className="md:col-span-2">
                        <Label htmlFor="patient-email">E-mail *</Label>
                        <Input
                          id="patient-email"
                          type="email"
                          value={patientData.email}
                          onChange={(e) => handlePatientChange("email", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Convênio */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Convênio</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="patient-healthInsurance">Convênio</Label>
                        <Input
                          id="patient-healthInsurance"
                          value={patientData.healthInsurance}
                          onChange={(e) => handlePatientChange("healthInsurance", e.target.value)}
                          placeholder="Nome do convênio"
                        />
                      </div>

                      <div>
                        <Label htmlFor="patient-healthInsuranceNumber">Número da Carteirinha</Label>
                        <Input
                          id="patient-healthInsuranceNumber"
                          value={patientData.healthInsuranceNumber}
                          onChange={(e) => handlePatientChange("healthInsuranceNumber", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Endereço */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Endereço</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="patient-zipCode">CEP *</Label>
                        <Input
                          id="patient-zipCode"
                          value={patientData.zipCode}
                          onChange={(e) => handlePatientChange("zipCode", e.target.value)}
                          onBlur={() => handleZipCodeBlur("patient")}
                          placeholder="00000-000"
                          required
                        />
                      </div>

                      <div className="md:col-span-2">
                        <Label htmlFor="patient-street">Rua *</Label>
                        <Input
                          id="patient-street"
                          value={patientData.street}
                          onChange={(e) => handlePatientChange("street", e.target.value)}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="patient-number">Número *</Label>
                        <Input
                          id="patient-number"
                          value={patientData.number}
                          onChange={(e) => handlePatientChange("number", e.target.value)}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="patient-complement">Complemento</Label>
                        <Input
                          id="patient-complement"
                          value={patientData.complement}
                          onChange={(e) => handlePatientChange("complement", e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="patient-neighborhood">Bairro *</Label>
                        <Input
                          id="patient-neighborhood"
                          value={patientData.neighborhood}
                          onChange={(e) => handlePatientChange("neighborhood", e.target.value)}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="patient-city">Cidade *</Label>
                        <Input
                          id="patient-city"
                          value={patientData.city}
                          onChange={(e) => handlePatientChange("city", e.target.value)}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="patient-state">Estado *</Label>
                        <Select
                          value={patientData.state}
                          onValueChange={(value) => handlePatientChange("state", value)}
                        >
                          <SelectTrigger id="patient-state">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="AC">Acre</SelectItem>
                            <SelectItem value="AL">Alagoas</SelectItem>
                            <SelectItem value="AP">Amapá</SelectItem>
                            <SelectItem value="AM">Amazonas</SelectItem>
                            <SelectItem value="BA">Bahia</SelectItem>
                            <SelectItem value="CE">Ceará</SelectItem>
                            <SelectItem value="DF">Distrito Federal</SelectItem>
                            <SelectItem value="ES">Espírito Santo</SelectItem>
                            <SelectItem value="GO">Goiás</SelectItem>
                            <SelectItem value="MA">Maranhão</SelectItem>
                            <SelectItem value="MT">Mato Grosso</SelectItem>
                            <SelectItem value="MS">Mato Grosso do Sul</SelectItem>
                            <SelectItem value="MG">Minas Gerais</SelectItem>
                            <SelectItem value="PA">Pará</SelectItem>
                            <SelectItem value="PB">Paraíba</SelectItem>
                            <SelectItem value="PR">Paraná</SelectItem>
                            <SelectItem value="PE">Pernambuco</SelectItem>
                            <SelectItem value="PI">Piauí</SelectItem>
                            <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                            <SelectItem value="RN">Rio Grande do Norte</SelectItem>
                            <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                            <SelectItem value="RO">Rondônia</SelectItem>
                            <SelectItem value="RR">Roraima</SelectItem>
                            <SelectItem value="SC">Santa Catarina</SelectItem>
                            <SelectItem value="SP">São Paulo</SelectItem>
                            <SelectItem value="SE">Sergipe</SelectItem>
                            <SelectItem value="TO">Tocantins</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Senha */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Senha de Acesso</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="patient-password">Senha *</Label>
                        <Input
                          id="patient-password"
                          type="password"
                          value={patientData.password}
                          onChange={(e) => handlePatientChange("password", e.target.value)}
                          placeholder="Mínimo 6 caracteres"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="patient-confirmPassword">Confirmar Senha *</Label>
                        <Input
                          id="patient-confirmPassword"
                          type="password"
                          value={patientData.confirmPassword}
                          onChange={(e) => handlePatientChange("confirmPassword", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Mensagem de erro */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>
                  )}

                  {/* Botão de submit */}
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Criando conta..." : "Criar Conta"}
                  </Button>

                  <p className="text-sm text-center text-gray-600">
                    Já tem uma conta?{" "}
                    <button
                      type="button"
                      onClick={() => router.push("/")}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Faça login
                    </button>
                  </p>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Formulário de Profissional */}
          <TabsContent value="professional">
            <Card>
              <CardHeader>
                <CardTitle>Cadastro de Profissional</CardTitle>
                <CardDescription>Preencha seus dados profissionais para criar sua conta</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfessionalSubmit} className="space-y-6">
                  {/* Dados Pessoais */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Dados Pessoais</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="professional-name">Nome Completo *</Label>
                        <Input
                          id="professional-name"
                          value={professionalData.name}
                          onChange={(e) => handleProfessionalChange("name", e.target.value)}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="professional-cpf">CPF *</Label>
                        <Input
                          id="professional-cpf"
                          value={professionalData.cpf}
                          onChange={(e) => handleProfessionalChange("cpf", e.target.value)}
                          placeholder="000.000.000-00"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="professional-rg">RG</Label>
                        <Input
                          id="professional-rg"
                          value={professionalData.rg}
                          onChange={(e) => handleProfessionalChange("rg", e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="professional-birthDate">Data de Nascimento *</Label>
                        <Input
                          id="professional-birthDate"
                          type="date"
                          value={professionalData.birthDate}
                          onChange={(e) => handleProfessionalChange("birthDate", e.target.value)}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="professional-gender">Sexo *</Label>
                        <Select
                          value={professionalData.gender}
                          onValueChange={(value) => handleProfessionalChange("gender", value)}
                        >
                          <SelectTrigger id="professional-gender">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="M">Masculino</SelectItem>
                            <SelectItem value="F">Feminino</SelectItem>
                            <SelectItem value="O">Outro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Dados Profissionais */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Dados Profissionais</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="professional-type">Tipo de Profissional *</Label>
                        <Select
                          value={professionalData.professionalType}
                          onValueChange={(value) => handleProfessionalChange("professionalType", value)}
                        >
                          <SelectTrigger id="professional-type">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="medico">Médico</SelectItem>
                            <SelectItem value="enfermeiro">Enfermeiro</SelectItem>
                            <SelectItem value="tecnico_enfermagem">Técnico de Enfermagem</SelectItem>
                            <SelectItem value="fisioterapeuta">Fisioterapeuta</SelectItem>
                            <SelectItem value="psicologo">Psicólogo</SelectItem>
                            <SelectItem value="nutricionista">Nutricionista</SelectItem>
                            <SelectItem value="farmaceutico">Farmacêutico</SelectItem>
                            <SelectItem value="outro">Outro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="professional-registrationNumber">Número de Registro *</Label>
                        <Input
                          id="professional-registrationNumber"
                          value={professionalData.registrationNumber}
                          onChange={(e) => handleProfessionalChange("registrationNumber", e.target.value)}
                          placeholder="CRM, COREN, etc"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="professional-registrationState">UF do Registro *</Label>
                        <Select
                          value={professionalData.registrationState}
                          onValueChange={(value) => handleProfessionalChange("registrationState", value)}
                        >
                          <SelectTrigger id="professional-registrationState">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="AC">AC</SelectItem>
                            <SelectItem value="AL">AL</SelectItem>
                            <SelectItem value="AP">AP</SelectItem>
                            <SelectItem value="AM">AM</SelectItem>
                            <SelectItem value="BA">BA</SelectItem>
                            <SelectItem value="CE">CE</SelectItem>
                            <SelectItem value="DF">DF</SelectItem>
                            <SelectItem value="ES">ES</SelectItem>
                            <SelectItem value="GO">GO</SelectItem>
                            <SelectItem value="MA">MA</SelectItem>
                            <SelectItem value="MT">MT</SelectItem>
                            <SelectItem value="MS">MS</SelectItem>
                            <SelectItem value="MG">MG</SelectItem>
                            <SelectItem value="PA">PA</SelectItem>
                            <SelectItem value="PB">PB</SelectItem>
                            <SelectItem value="PR">PR</SelectItem>
                            <SelectItem value="PE">PE</SelectItem>
                            <SelectItem value="PI">PI</SelectItem>
                            <SelectItem value="RJ">RJ</SelectItem>
                            <SelectItem value="RN">RN</SelectItem>
                            <SelectItem value="RS">RS</SelectItem>
                            <SelectItem value="RO">RO</SelectItem>
                            <SelectItem value="RR">RR</SelectItem>
                            <SelectItem value="SC">SC</SelectItem>
                            <SelectItem value="SP">SP</SelectItem>
                            <SelectItem value="SE">SE</SelectItem>
                            <SelectItem value="TO">TO</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="professional-specialty">Especialidade *</Label>
                        <Input
                          id="professional-specialty"
                          value={professionalData.specialty}
                          onChange={(e) => handleProfessionalChange("specialty", e.target.value)}
                          placeholder="Ex: Cardiologia"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="professional-subSpecialty">Subespecialidade</Label>
                        <Input
                          id="professional-subSpecialty"
                          value={professionalData.subSpecialty}
                          onChange={(e) => handleProfessionalChange("subSpecialty", e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="professional-graduationInstitution">Instituição de Formação *</Label>
                        <Input
                          id="professional-graduationInstitution"
                          value={professionalData.graduationInstitution}
                          onChange={(e) => handleProfessionalChange("graduationInstitution", e.target.value)}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="professional-graduationYear">Ano de Formação *</Label>
                        <Input
                          id="professional-graduationYear"
                          type="number"
                          value={professionalData.graduationYear}
                          onChange={(e) => handleProfessionalChange("graduationYear", e.target.value)}
                          placeholder="2020"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contato */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Contato</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="professional-phone">Telefone</Label>
                        <Input
                          id="professional-phone"
                          value={professionalData.phone}
                          onChange={(e) => handleProfessionalChange("phone", e.target.value)}
                          placeholder="(00) 0000-0000"
                        />
                      </div>

                      <div>
                        <Label htmlFor="professional-cellphone">Celular *</Label>
                        <Input
                          id="professional-cellphone"
                          value={professionalData.cellphone}
                          onChange={(e) => handleProfessionalChange("cellphone", e.target.value)}
                          placeholder="(00) 00000-0000"
                          required
                        />
                      </div>

                      <div className="md:col-span-2">
                        <Label htmlFor="professional-email">E-mail *</Label>
                        <Input
                          id="professional-email"
                          type="email"
                          value={professionalData.email}
                          onChange={(e) => handleProfessionalChange("email", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Endereço */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Endereço</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="professional-zipCode">CEP *</Label>
                        <Input
                          id="professional-zipCode"
                          value={professionalData.zipCode}
                          onChange={(e) => handleProfessionalChange("zipCode", e.target.value)}
                          onBlur={() => handleZipCodeBlur("professional")}
                          placeholder="00000-000"
                          required
                        />
                      </div>

                      <div className="md:col-span-2">
                        <Label htmlFor="professional-street">Rua *</Label>
                        <Input
                          id="professional-street"
                          value={professionalData.street}
                          onChange={(e) => handleProfessionalChange("street", e.target.value)}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="professional-number">Número *</Label>
                        <Input
                          id="professional-number"
                          value={professionalData.number}
                          onChange={(e) => handleProfessionalChange("number", e.target.value)}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="professional-complement">Complemento</Label>
                        <Input
                          id="professional-complement"
                          value={professionalData.complement}
                          onChange={(e) => handleProfessionalChange("complement", e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="professional-neighborhood">Bairro *</Label>
                        <Input
                          id="professional-neighborhood"
                          value={professionalData.neighborhood}
                          onChange={(e) => handleProfessionalChange("neighborhood", e.target.value)}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="professional-city">Cidade *</Label>
                        <Input
                          id="professional-city"
                          value={professionalData.city}
                          onChange={(e) => handleProfessionalChange("city", e.target.value)}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="professional-state">Estado *</Label>
                        <Select
                          value={professionalData.state}
                          onValueChange={(value) => handleProfessionalChange("state", value)}
                        >
                          <SelectTrigger id="professional-state">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="AC">Acre</SelectItem>
                            <SelectItem value="AL">Alagoas</SelectItem>
                            <SelectItem value="AP">Amapá</SelectItem>
                            <SelectItem value="AM">Amazonas</SelectItem>
                            <SelectItem value="BA">Bahia</SelectItem>
                            <SelectItem value="CE">Ceará</SelectItem>
                            <SelectItem value="DF">Distrito Federal</SelectItem>
                            <SelectItem value="ES">Espírito Santo</SelectItem>
                            <SelectItem value="GO">Goiás</SelectItem>
                            <SelectItem value="MA">Maranhão</SelectItem>
                            <SelectItem value="MT">Mato Grosso</SelectItem>
                            <SelectItem value="MS">Mato Grosso do Sul</SelectItem>
                            <SelectItem value="MG">Minas Gerais</SelectItem>
                            <SelectItem value="PA">Pará</SelectItem>
                            <SelectItem value="PB">Paraíba</SelectItem>
                            <SelectItem value="PR">Paraná</SelectItem>
                            <SelectItem value="PE">Pernambuco</SelectItem>
                            <SelectItem value="PI">Piauí</SelectItem>
                            <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                            <SelectItem value="RN">Rio Grande do Norte</SelectItem>
                            <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                            <SelectItem value="RO">Rondônia</SelectItem>
                            <SelectItem value="RR">Roraima</SelectItem>
                            <SelectItem value="SC">Santa Catarina</SelectItem>
                            <SelectItem value="SP">São Paulo</SelectItem>
                            <SelectItem value="SE">Sergipe</SelectItem>
                            <SelectItem value="TO">Tocantins</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Senha */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Senha de Acesso</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="professional-password">Senha *</Label>
                        <Input
                          id="professional-password"
                          type="password"
                          value={professionalData.password}
                          onChange={(e) => handleProfessionalChange("password", e.target.value)}
                          placeholder="Mínimo 6 caracteres"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="professional-confirmPassword">Confirmar Senha *</Label>
                        <Input
                          id="professional-confirmPassword"
                          type="password"
                          value={professionalData.confirmPassword}
                          onChange={(e) => handleProfessionalChange("confirmPassword", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Mensagem de erro */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>
                  )}

                  {/* Botão de submit */}
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Criando conta..." : "Criar Conta Profissional"}
                  </Button>

                  <p className="text-sm text-center text-gray-600">
                    Já tem uma conta?{" "}
                    <button
                      type="button"
                      onClick={() => router.push("/")}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Faça login
                    </button>
                  </p>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
