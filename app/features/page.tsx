import { DottedSurface } from "@/components/ui/dotted-surface"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Zap, Target, TrendingUp, Clock, Users } from "lucide-react"

const features = [
  {
    icon: Sparkles,
    title: "IA Avançada",
    description: "Geração de conteúdo otimizado usando inteligência artificial de última geração.",
  },
  {
    icon: Zap,
    title: "Rápido e Eficiente",
    description: "Crie campanhas completas em segundos, economizando horas de trabalho.",
  },
  {
    icon: Target,
    title: "Multi-Plataforma",
    description: "Suporte para Instagram, TikTok, Facebook, Twitter e LinkedIn.",
  },
  {
    icon: TrendingUp,
    title: "Otimização SEO",
    description: "Conteúdo otimizado para alcance máximo e engajamento.",
  },
  {
    icon: Clock,
    title: "Histórico Completo",
    description: "Acesse todas as suas campanhas anteriores a qualquer momento.",
  },
  {
    icon: Users,
    title: "Feedback Inteligente",
    description: "Sistema de feedback que melhora continuamente as sugestões.",
  },
]

export default function FeaturesPage() {
  return (
    <>
      <DottedSurface />
      <Header />

      <main className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 text-balance">Funcionalidades Poderosas</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tudo que você precisa para criar campanhas de marketing de sucesso
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="border-primary/20 hover:border-primary/40 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </main>
    </>
  )
}
