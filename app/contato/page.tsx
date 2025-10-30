"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock, MessageSquare } from "lucide-react"
import { HospitalHeader } from "@/components/hospital-header"
import { HospitalSidebar } from "@/components/hospital-sidebar"

export default function ContatoPage() {
  const contactInfo = [
    {
      id: 1,
      icon: Phone,
      title: "Telefone",
      value: "(11) 3456-7890",
      description: "Seg a Sex, 8h às 18h",
    },
    {
      id: 2,
      icon: Mail,
      title: "E-mail",
      value: "contato@hospitalsolarium.com.br",
      description: "Resposta em até 24h",
    },
    {
      id: 3,
      icon: MapPin,
      title: "Endereço",
      value: "Av. Principal, 1000 - Centro",
      description: "São Paulo - SP",
    },
    {
      id: 4,
      icon: Clock,
      title: "Horário de Atendimento",
      value: "Segunda a Sexta: 8h às 18h",
      description: "Sábado: 8h às 12h",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <HospitalHeader />

      <div className="flex">
        <HospitalSidebar />

        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Contato</h1>
            <p className="text-gray-600">Entre em contato conosco</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contact Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informações de Contato</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contactInfo.map((info) => {
                    const Icon = info.icon
                    return (
                      <div key={info.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{info.title}</p>
                          <p className="text-sm text-gray-700 mt-1">{info.value}</p>
                          <p className="text-xs text-gray-500 mt-1">{info.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Redes Sociais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Facebook: @hospitalsolarium
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Instagram: @hospitalsolarium
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    LinkedIn: Hospital Solarium
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  Envie uma Mensagem
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Nome Completo</label>
                    <Input placeholder="Digite seu nome" />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">E-mail</label>
                    <Input type="email" placeholder="seu@email.com" />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Telefone</label>
                    <Input type="tel" placeholder="(11) 99999-9999" />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Assunto</label>
                    <Input placeholder="Qual o motivo do contato?" />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Mensagem</label>
                    <Textarea placeholder="Digite sua mensagem..." rows={5} />
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Enviar Mensagem</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
