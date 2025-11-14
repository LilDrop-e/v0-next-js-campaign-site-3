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

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (username.trim()) {
      localStorage.setItem("userId", username)
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
              <CardTitle className="text-2xl font-bold">CAMISapi</CardTitle>
            </div>
            <CardDescription className="text-base">
              Geração de Campanhas com IA para a Gen.Z
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Nome de usuário</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Digite seu nome"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" size="lg">
                Entrar
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                Novo por aqui?{" "}
                <a href="/register" className="text-primary hover:underline">
                  Cadastre-se
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
