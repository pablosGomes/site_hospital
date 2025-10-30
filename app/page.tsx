"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Heart, Shield, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function LoginPage() {
  const [userType, setUserType] = useState<"patient" | "professional">("patient")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate login and redirect to dashboard
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Side - Branding and Image */}
      <div className="flex-1 flex flex-col justify-center px-12 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-16 h-16 relative">
            <Image
              src="/logo-hospital-solarium.png"
              alt="Hospital Solarium"
              width={64}
              height={64}
              className="object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Hospital Solarium</h1>
        </div>

        {/* Tagline */}
        <p className="text-lg text-gray-600 mb-8 max-w-md leading-relaxed">
          Cuidado profissional, tecnologia inovadora e acolhimento humano em cada atendimento.
        </p>

        {/* Hero Image */}
        <div className="mb-8">
          <img
            src="/mulher-sorrindo-em-cadeira-de-rodas-em-frente-a-ho.jpg"
            alt="Mulher com cadeira de rodas em frente ao hospital"
            className="rounded-lg shadow-lg w-full max-w-lg"
          />
        </div>

        {/* Feature Icons */}
        <div className="flex gap-8">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Segurança</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Cuidado</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Equipe</span>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-96 bg-white flex flex-col justify-center px-8 py-8">
        <div className="w-full max-w-sm mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Acesse sua conta</h2>
          <p className="text-gray-600 mb-8">Selecione seu tipo de perfil para continuar</p>

          {/* User Type Selection */}
          <div className="flex gap-2 mb-6">
            <Button
              variant={userType === "patient" ? "default" : "outline"}
              onClick={() => setUserType("patient")}
              className="flex-1"
            >
              Paciente
            </Button>
            <Button
              variant={userType === "professional" ? "default" : "outline"}
              onClick={() => setUserType("professional")}
              className="flex-1"
            >
              Profissional
            </Button>
          </div>

          {/* Login Form */}
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
              />
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5">
              Entrar como {userType === "patient" ? "Paciente" : "Profissional"}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-500">ou continue com</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Google Login */}
          <Button variant="outline" className="w-full flex items-center gap-2 bg-transparent">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </Button>

          {/* Footer Links */}
          <div className="text-center mt-6 space-y-2">
            <p className="text-sm text-gray-600">
              Não tem uma conta?{" "}
              <button
                type="button"
                onClick={() => router.push("/cadastro")}
                className="text-blue-600 hover:underline font-medium"
              >
                Cadastre-se
              </button>
            </p>
            <p>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Esqueceu sua senha?
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
