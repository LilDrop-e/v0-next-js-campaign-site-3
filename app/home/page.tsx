import { DottedSurface } from "@/components/ui/dotted-surface"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Sparkles, Zap, TrendingUp } from 'lucide-react'

export default function HomePage() {
  return (
    <>
      <DottedSurface />
      <div className="relative" style={{ zIndex: 10 }}>
        <Header />

        <main className="container mx-auto px-4">
          <section className="min-h-[80vh] flex flex-col items-center justify-center text-center">
            <div className="max-w-4xl space-y-8">
              <h1 className="text-6xl md:text-7xl font-bold text-balance leading-tight">
                Crie Campanhas de <span className="text-primary">Marketing</span> com IA
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-balance">
                Gere conteúdo otimizado para redes sociais em segundos. Poderoso, rápido e inteligente para a Gen.Z.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/campaign">
                  <Button size="lg" className="text-lg px-8">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Começar Agora
                  </Button>
                </Link>
                <Link href="/features">
                  <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
                    Ver Funcionalidades
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          <section className="py-20 grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Super Rápido</h3>
              <p className="text-muted-foreground">Crie campanhas completas em segundos, não em horas</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">IA Avançada</h3>
              <p className="text-muted-foreground">Tecnologia de ponta para resultados profissionais</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Alto Engajamento</h3>
              <p className="text-muted-foreground">Conteúdo otimizado para máximo alcance e conversão na Gen.Z</p>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}
