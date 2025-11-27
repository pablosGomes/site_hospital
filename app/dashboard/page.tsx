'''"use client"  
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"  
import { Badge } from "@/components/ui/badge"  
import { Button } from "@/components/ui/button"  
import { Calendar, FileText, Heart, ArrowRight, Download, Eye } from "lucide-react"  
import Link from "next/link"  
  
export default function DashboardPage() {  
  return (  
    <>  
      <div className="mb-4 lg:mb-6 animate-fade-in-up opacity-0 [animation-delay:0ms] [animation-fill-mode:forwards]">  
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">  
          <div>  
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">Minha Área</h1>  
            <p className="text-sm lg:text-base text-gray-600">Olá, Maria Silva</p>  
          </div>  
          <div className="text-left sm:text-right">  
            <p className="text-xs lg:text-sm text-gray-600">Hoje</p>  
            <p className="text-base lg:text-lg font-semibold text-gray-900">Quinta-feira, 18 de Setembro</p>  
          </div>  
        </div>  
      </div>  
  
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">  
        <Link href="/consultas">  
          <Card className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-blue-300 animate-fade-in-up opacity-0 [animation-delay:100ms] [animation-fill-mode:forwards]">  
            <CardContent className="p-4 lg:p-6">  
              <div className="flex items-center justify-between">  
                <div>  
                  <p className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">2</p>  
                  <p className="text-xs lg:text-sm text-gray-600 mb-2">Próximas Consultas</p>  
                  <p className="text-xs text-blue-600 flex items-center gap-1 font-medium">  
                    Clique para agendar <ArrowRight className="w-3 h-3" />  
                  </p>  
                </div>  
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center shadow-md">  
                  <Calendar className="w-6 h-6 lg:w-7 lg:h-7 text-blue-600" />  
                </div>  
              </div>  
            </CardContent>  
          </Card>  
        </Link>  
  
        <Link href="/exames">  
          <Card className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-green-300 animate-fade-in-up opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">  
            <CardContent className="p-4 lg:p-6">  
              <div className="flex items-center justify-between">  
                <div>  
                  <p className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">3</p>  
                  <p className="text-xs lg:text-sm text-gray-600 mb-2">Exames Disponíveis</p>  
                  <p className="text-xs text-green-600 flex items-center gap-1 font-medium">  
                    Ver resultados <ArrowRight className="w-3 h-3" />  
                  </p>  
                </div>  
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center shadow-md">  
                  <FileText className="w-6 h-6 lg:w-7 lg:h-7 text-green-600" />  
                </div>  
              </div>  
            </CardContent>  
          </Card>  
        </Link>  
  
        <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in-up opacity-0 [animation-delay:300ms] [animation-fill-mode:forwards] sm:col-span-2 lg:col-span-1">  
          <CardContent className="p-4 lg:p-6">  
            <div className="flex items-center justify-between">  
              <div>  
                <p className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">Ativo</p>  
                <p className="text-xs lg:text-sm text-gray-600 mb-2">Status de Saúde</p>  
                <p className="text-xs text-yellow-600 flex items-center gap-1 font-medium">Tudo em ordem</p>  
              </div>  
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl flex items-center justify-center shadow-md">  
                <Heart className="w-6 h-6 lg:w-7 lg:h-7 text-yellow-600 fill-yellow-600 animate-pulse" />  
              </div>  
            </div>  
          </CardContent>  
        </Card>  
      </div>  
  
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">  
        {/* Próximas Consultas */}  
        <Card className="animate-fade-in-left opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards]">  
          <CardHeader>  
            <CardTitle className="flex items-center gap-2 text-base lg:text-lg">  
              <Calendar className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600" />  
              Próximas Consultas  
            </CardTitle>  
          </CardHeader>  
          <CardContent className="space-y-3">  
            <div className="flex items-center justify-between p-3 lg:p-4 bg-gradient-to-r from-blue-50 to-transparent rounded-lg border border-blue-100 transition-all duration-200 hover:shadow-md hover:border-blue-300">  
              <div className="flex items-center gap-3 lg:gap-4">  
                <div className="text-center bg-white rounded-lg p-2 shadow-sm">  
                  <p className="text-sm font-bold text-gray-900">22</p>  
                  <p className="text-xs text-gray-600">Set</p>  
                  <p className="text-xs text-blue-600 font-medium">14:00</p>  
                </div>  
                <div>  
                  <p className="text-sm lg:text-base font-semibold text-gray-900">Dr. Silva</p>  
                  <p className="text-xs lg:text-sm text-gray-600">Cardiologia</p>  
                </div>  
              </div>  
              <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">Confirmado</Badge>  
            </div>  
  
            <div className="flex items-center justify-between p-3 lg:p-4 bg-gradient-to-r from-blue-50 to-transparent rounded-lg border border-blue-100 transition-all duration-200 hover:shadow-md hover:border-blue-300">  
              <div className="flex items-center gap-3 lg:gap-4">  
                <div className="text-center bg-white rounded-lg p-2 shadow-sm">  
                  <p className="text-sm font-bold text-gray-900">28</p>  
                  <p className="text-xs text-gray-600">Set</p>  
                  <p className="text-xs text-blue-600 font-medium">09:30</p>  
                </div>  
                <div>  
                  <p className="text-sm lg:text-base font-semibold text-gray-900">Dra. Santos</p>  
                  <p className="text-xs lg:text-sm text-gray-600">Dermatologia</p>  
                </div>  
              </div>  
              <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">Confirmado</Badge>  
            </div>  
  
            <Link href="/consultas">  
              <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 transition-all duration-200 hover:scale-105 text-sm lg:text-base">  
                Ver Todas as Consultas  
              </Button>  
            </Link>  
          </CardContent>  
        </Card>  
  
        {/* Exames Recentes */}  
        <Card className="animate-fade-in-right opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards]">  
          <CardHeader>  
            <CardTitle className="flex items-center gap-2 text-base lg:text-lg">  
              <FileText className="w-4 h-4 lg:w-5 lg:h-5 text-green-600" />  
              Exames Recentes  
            </CardTitle>  
          </CardHeader>  
          <CardContent className="space-y-3">  
            <div className="flex items-center justify-between p-3 lg:p-4 bg-gradient-to-r from-green-50 to-transparent rounded-lg border border-green-100 transition-all duration-200 hover:shadow-md hover:border-green-300 group">  
              <div className="flex-1 min-w-0">  
                <p className="text-sm lg:text-base font-semibold text-gray-900 truncate">Hemograma Completo</p>  
                <p className="text-xs lg:text-sm text-gray-600">15 Set • Dr. Silva</p>  
              </div>  
              <div className="flex items-center gap-2 flex-shrink-0">  
                <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">Disponível</Badge>  
                <Button  
                  size="sm"  
                  variant="ghost"  
                  className="hidden sm:flex opacity-0 group-hover:opacity-100 transition-opacity"  
                >  
                  <Eye className="w-4 h-4" />  
                </Button>  
                <Button  
                  size="sm"  
                  variant="ghost"  
                  className="hidden sm:flex opacity-0 group-hover:opacity-100 transition-opacity"  
                >  
                  <Download className="w-4 h-4" />  
                </Button>  
              </div>  
            </div>  
  
            <div className="flex items-center justify-between p-3 lg:p-4 bg-gradient-to-r from-green-50 to-transparent rounded-lg border border-green-100 transition-all duration-200 hover:shadow-md hover:border-green-300 group">  
              <div className="flex-1 min-w-0">  
                <p className="text-sm lg:text-base font-semibold text-gray-900 truncate">Raio-X Tórax</p>  
                <p className="text-xs lg:text-sm text-gray-600">10 Set • Dra. Santos</p>  
              </div>  
              <div className="flex items-center gap-2 flex-shrink-0">  
                <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">Disponível</Badge>  
                <Button  
                  size="sm"  
                  variant="ghost"  
                  className="hidden sm:flex opacity-0 group-hover:opacity-100 transition-opacity"  
                >  
                  <Eye className="w-4 h-4" />  
                </Button>  
                <Button  
                  size="sm"  
                  variant="ghost"  
                  className="hidden sm:flex opacity-0 group-hover:opacity-100 transition-opacity"  
                >  
                  <Download className="w-4 h-4" />  
                </Button>  
              </div>  
            </div>  
  
            <Link href="/exames">  
              <Button className="w-full mt-4 bg-green-600 hover:bg-green-700 transition-all duration-200 hover:scale-105 text-sm lg:text-base">  
                Ver Todos os Exames  
              </Button>  
            </Link>  
          </CardContent>  
        </Card>  
      </div>  
    </>  
  )  
}  
'''
