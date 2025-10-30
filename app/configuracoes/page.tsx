"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { User, Bell, Lock, Palette, Shield } from "lucide-react"
import { HospitalHeader } from "@/components/hospital-header"
import { HospitalSidebar } from "@/components/hospital-sidebar"

export default function ConfiguracoesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HospitalHeader />

      <div className="flex">
        <HospitalSidebar />

        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Configurações</h1>
            <p className="text-gray-600">Gerencie suas preferências e informações</p>
          </div>

          <div className="space-y-6">
            {/* Profile Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Informações Pessoais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Nome Completo</label>
                    <Input defaultValue="João Silva" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">CPF</label>
                    <Input defaultValue="123.456.789-00" disabled />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">E-mail</label>
                    <Input type="email" defaultValue="joao.silva@email.com" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Telefone</label>
                    <Input type="tel" defaultValue="(11) 99999-9999" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Data de Nascimento</label>
                    <Input type="date" defaultValue="1990-01-01" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Tipo Sanguíneo</label>
                    <Input defaultValue="O+" />
                  </div>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Salvar Alterações</Button>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-blue-600" />
                  Notificações
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Notificações por E-mail</p>
                    <p className="text-sm text-gray-600">Receba atualizações por e-mail</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Notificações Push</p>
                    <p className="text-sm text-gray-600">Receba notificações no navegador</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Lembretes de Consulta</p>
                    <p className="text-sm text-gray-600">Receba lembretes antes das consultas</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Resultados de Exames</p>
                    <p className="text-sm text-gray-600">Notificações quando exames estiverem prontos</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-blue-600" />
                  Segurança
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Senha Atual</label>
                  <Input type="password" placeholder="Digite sua senha atual" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Nova Senha</label>
                  <Input type="password" placeholder="Digite sua nova senha" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Confirmar Nova Senha</label>
                  <Input type="password" placeholder="Confirme sua nova senha" />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Alterar Senha</Button>

                <div className="border-t pt-4 mt-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Autenticação em Dois Fatores</p>
                      <p className="text-sm text-gray-600">Adicione uma camada extra de segurança</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-blue-600" />
                  Preferências
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Modo Escuro</p>
                    <p className="text-sm text-gray-600">Ativar tema escuro</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Idioma</p>
                    <p className="text-sm text-gray-600">Português (Brasil)</p>
                  </div>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    Alterar
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Privacy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Privacidade
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Compartilhar Dados para Pesquisa</p>
                    <p className="text-sm text-gray-600">Ajude a melhorar os serviços de saúde</p>
                  </div>
                  <Switch />
                </div>
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="font-medium text-red-900 mb-2">Zona de Perigo</p>
                  <p className="text-sm text-red-700 mb-3">Ações irreversíveis que afetam permanentemente sua conta</p>
                  <Button variant="destructive" size="sm">
                    Excluir Conta
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
