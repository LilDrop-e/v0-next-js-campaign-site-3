"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from 'next/navigation'
import { DottedSurface } from "@/components/ui/dotted-surface"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles } from 'lucide-react'

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (name.trim() && email.trim() && password.trim()) {
      localStorage.setItem("userId", name)
      router.push("/home")
    }
  }

  return (
    <>
      <DottedSurface />
      <div className="relative min-h-screen flex items-center justify-center px-4" style={{ zIndex: 10 }}>
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-8 h-8 text-primary" />
              <CardTitle className="text-2xl font-bold">Criar Conta</CardTitle>
            </div>
            <CardDescription className="text-base">
              Cadastre-se no CAMISapi para começar a criar campanhas incríveis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" size="lg">
                Cadastrar
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                Já tem uma conta?{" "}
                <a href="/" className="text-primary hover:underline">
                  Faça login
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
