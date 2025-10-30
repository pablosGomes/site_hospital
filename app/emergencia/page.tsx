"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Phone, MapPin, Clock, Ambulance } from "lucide-react"
import { HospitalHeader } from "@/components/hospital-header"
import { HospitalSidebar } from "@/components/hospital-sidebar"

export default function EmergenciaPage() {
  const emergencyContacts = [
    {
      id: 1,
      name: "SAMU",
      number: "192",
      description: "Serviço de Atendimento Móvel de Urgência",
      available: "24 horas",
    },
    {
      id: 2,
      name: "Bombeiros",
      number: "193",
      description: "Corpo de Bombeiros",
      available: "24 horas",
    },
    {
      id: 3,
      name: "Pronto Socorro Hospital Solarium",
      number: "(11) 3456-7890",
      description: "Atendimento de emergência do hospital",
      available: "24 horas",
    },
  ]

  const emergencyUnits = [
    {
      id: 1,
      name: "Hospital Solarium - Unidade Central",
      address: "Av. Principal, 1000 - Centro",
      distance: "2.5 km",
      waitTime: "15 min",
    },
    {
      id: 2,
      name: "Hospital Solarium - Unidade Norte",
      address: "Rua das Flores, 500 - Zona Norte",
      distance: "5.8 km",
      waitTime: "30 min",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <HospitalHeader />

      <div className="flex">
        <HospitalSidebar />

        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Emergência</h1>
            <p className="text-gray-600">Acesso rápido a serviços de emergência</p>
          </div>

          {/* Emergency Alert */}
          <Card className="mb-6 bg-red-50 border-red-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-red-900 mb-2">Em caso de emergência grave</h3>
                  <p className="text-red-800 mb-4">
                    Se você está enfrentando uma emergência médica grave, ligue imediatamente para o SAMU (192) ou vá ao
                    pronto-socorro mais próximo.
                  </p>
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    <Phone className="w-4 h-4 mr-2" />
                    Ligar para SAMU (192)
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contacts */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-blue-600" />
                Contatos de Emergência
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {emergencyContacts.map((contact) => (
                <div key={contact.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{contact.name}</p>
                      <p className="text-sm text-gray-600">{contact.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="w-3 h-3 text-gray-500" />
                        <span className="text-xs text-gray-500">{contact.available}</span>
                      </div>
                    </div>
                  </div>
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    <Phone className="w-4 h-4 mr-2" />
                    {contact.number}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Nearby Emergency Units */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Unidades de Emergência Próximas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {emergencyUnits.map((unit) => (
                <div key={unit.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Ambulance className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{unit.name}</p>
                      <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        {unit.address}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-gray-500">{unit.distance}</span>
                        <span className="text-xs text-green-600">Tempo de espera: {unit.waitTime}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="bg-transparent">
                    Ver no Mapa
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
