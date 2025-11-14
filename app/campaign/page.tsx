"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { HistorySidebar } from "@/components/history-sidebar"
import { FeedbackButtons } from "@/components/feedback-buttons"
import { DottedSurface } from "@/components/ui/dotted-surface"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Sparkles, FileDown, Clock, TrendingUp, Instagram, Facebook, Twitter, Linkedin, CheckCircle2 } from 'lucide-react'
import { sendResponse, getHistory } from "@/lib/api"

interface SuggestionData {
  platform: string
  format: string
  hashtags: string[]
  optimized_text: string
  best_time: string
  tone_style: string[]
  predicted_engagement: number
  explanations?: string
}

interface Suggestion {
  id: string
  data: SuggestionData
}

export default function CampaignPage() {
  const [description, setDescription] = useState("")
  const [platform, setPlatform] = useState("")
  const [format, setFormat] = useState("")
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<[Suggestion | null, Suggestion | null]>([null, null])
  const [selected, setSelected] = useState<"A" | "B" | null>(null)
  const [explanations, setExplanations] = useState<{ A?: string; B?: string }>({})
  const [userHistory, setUserHistory] = useState<any[]>([])
  const [showForm, setShowForm] = useState(true)
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<any>(null)

  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null

  useEffect(() => {
    const userId = localStorage.getItem("userId")
    if (!userId) return
    getHistory(userId).then((historyData) => {
      setUserHistory(historyData || [])
    })
  }, [])

  const generateCampaign = async () => {
    if (!userId || !description || !platform || !format) {
      return
    }

    setSuggestions([null, null])
    setSelected(null)
    setExplanations({})
    setSelectedHistoryItem(null)

    const payload = {
      user_id: userId,
      text: description,
      platform: platform,
      content_type: format,
    }

    setLoading(true)
    try {
      const url = "https://projeto-crm-ead.onrender.com/chat_interaction"

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        const data = await res.json()

        const suggestionA = data.suggestions?.A
        const suggestionB = data.suggestions?.B
        const explanationsData = data.explanations || {}

        setSuggestions([
          suggestionA
            ? {
                id: data.suggestion_id || "unknown-a",
                data: suggestionA,
              }
            : null,
          suggestionB
            ? {
                id: data.suggestion_id || "unknown-b",
                data: suggestionB,
              }
            : null,
        ])
        setExplanations(explanationsData)
        setShowForm(false)
        
        const historyData = await getHistory(userId)
        setUserHistory(historyData || [])
      } else {
        const errorText = await res.text()
        console.error("[v0] ❌ Erro na resposta:", errorText)
      }
    } catch (error) {
      console.error("[v0] ❌ Erro na requisição:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleChoice = async (choice: "A" | "B") => {
    const userId = localStorage.getItem("userId")
    const suggestionId = choice === "A" ? suggestions[0]?.id : suggestions[1]?.id

    if (!userId || !suggestionId) {
      return
    }

    await sendResponse({ user_id: userId, suggestion_id: suggestionId, choice })
    setSelected(choice)
    
    const historyData = await getHistory(userId)
    setUserHistory(historyData || [])
  }

  const downloadPDF = async (id: string) => {
    try {
      const url = `https://projeto-crm-ead.onrender.com/chat_export/${id}`

      const res = await fetch(url)

      if (res.ok) {
        const blob = await res.blob()

        const pdfUrl = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = pdfUrl
        a.download = `campanha-${id}.pdf`
        a.click()
        URL.revokeObjectURL(pdfUrl)
      } else {
        const errorText = await res.text()
        console.error("[v0] ❌ Erro ao baixar PDF:", errorText)
      }
    } catch (error) {
      console.error("[v0] ❌ Erro no download:", error)
    }
  }

  const startNewCampaign = () => {
    setDescription("")
    setPlatform("")
    setFormat("")
    setSuggestions([null, null])
    setSelected(null)
    setExplanations({})
    setSelectedHistoryItem(null)
    setShowForm(true)
  }

  const handleHistoryItemClick = (item: any) => {
    console.log("[v0] 📋 Item do histórico clicado:", item)
    setSelectedHistoryItem(item)
    setShowForm(false)
    setSuggestions([null, null])
    setSelected(null)
    setExplanations({})
  }

  const getPlatformIcon = (platformName: string) => {
    switch (platformName.toLowerCase()) {
      case 'instagram':
        return <Instagram className="w-4 h-4" />
      case 'facebook':
        return <Facebook className="w-4 h-4" />
      case 'twitter':
        return <Twitter className="w-4 h-4" />
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />
      case 'tiktok':
        return <Sparkles className="w-4 h-4" />
      default:
        return null
    }
  }

  const platforms = ["Instagram", "TikTok", "Facebook", "Twitter", "LinkedIn"]
  const formats = ["Imagem", "Vídeo"]

  return (
    <>
      <DottedSurface />
      <Header />
      <HistorySidebar history={userHistory} onItemClick={handleHistoryItemClick} />

      <main className="container max-w-6xl px-4 py-8">
        <section className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Gere Campanhas Incríveis</h1>
          <p className="text-muted-foreground text-lg">Crie conteúdo otimizado para redes sociais em segundos</p>
        </section>

        {showForm && (
          <Card className="mb-8 border-primary/20">
            <CardHeader>
              <CardTitle>Configurar Campanha</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Descrição</Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descreva seu conteúdo de mídia..."
                  className="min-h-24 bg-secondary text-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label>Plataforma</Label>
                <div className="flex flex-wrap gap-2">
                  {platforms.map((p) => (
                    <Button
                      key={p}
                      variant={platform === p ? "default" : "outline"}
                      onClick={() => setPlatform(p)}
                      className="flex-1 min-w-[100px] gap-2"
                    >
                      {getPlatformIcon(p)}
                      {p}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Formato</Label>
                <div className="flex gap-2">
                  {formats.map((f) => (
                    <Button
                      key={f}
                      variant={format === f ? "default" : "outline"}
                      onClick={() => setFormat(f)}
                      className="flex-1"
                    >
                      {f}
                    </Button>
                  ))}
                </div>
              </div>

              <Button
                onClick={generateCampaign}
                disabled={!description || !platform || !format || loading}
                size="lg"
                className="w-full"
              >
                {loading ? (
                  "Gerando..."
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Gerar Campanha
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        {selectedHistoryItem && (
          <>
            <div className="mb-6">
              <Button onClick={startNewCampaign} variant="outline" size="lg" className="w-full">
                <Sparkles className="w-5 h-5 mr-2" />
                Nova Campanha
              </Button>
            </div>

            <Card className="mb-6 border-primary/20">
              <CardHeader>
                <CardTitle>Detalhes da Campanha</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Descrição</Label>
                  <div className="p-3 bg-secondary rounded-lg">
                    <p className="text-sm">{selectedHistoryItem.input.text}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1 space-y-1">
                    <Label>Plataforma</Label>
                    <div className="flex items-center gap-2 p-2 bg-secondary rounded-lg">
                      {getPlatformIcon(selectedHistoryItem.input.platform)}
                      <span className="text-sm">{selectedHistoryItem.input.platform}</span>
                    </div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <Label>Formato</Label>
                    <div className="p-2 bg-secondary rounded-lg">
                      <span className="text-sm">{selectedHistoryItem.input.content_type}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              {['A', 'B'].map((choice) => {
                const suggestion = selectedHistoryItem.output[choice]
                if (!suggestion) return null

                const wasChosen = selectedHistoryItem.choice === choice

                return (
                  <Card key={choice} className={wasChosen ? "border-primary border-2 shadow-lg" : "border-border"}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Sugestão {choice}</span>
                        {wasChosen && (
                          <div className="flex items-center gap-1 text-sm font-normal text-primary">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Escolhida</span>
                          </div>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-2 text-xs">
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded-full">{suggestion.platform}</span>
                        <span className="px-2 py-1 bg-secondary rounded-full">{suggestion.format}</span>
                      </div>

                      <div className="bg-secondary p-4 rounded-lg">
                        <p className="text-sm font-medium mb-2">{suggestion.optimized_text}</p>
                      </div>

                      {suggestion.hashtags && suggestion.hashtags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {suggestion.hashtags.map((tag: string, idx: number) => (
                            <span key={idx} className="text-xs text-primary">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex justify-between text-xs text-muted-foreground border-t pt-3">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>Melhor horário: {suggestion.best_time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          <span>{Math.round(suggestion.predicted_engagement)} eng.</span>
                        </div>
                      </div>

                      {suggestion.tone_style && suggestion.tone_style.length > 0 && (
                        <div className="text-xs">
                          <span className="text-muted-foreground">Tom: </span>
                          <span>{suggestion.tone_style.join(", ")}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {selectedHistoryItem.choice && selectedHistoryItem.output.explanations && selectedHistoryItem.output.explanations[selectedHistoryItem.choice] && (
              <Card className="mt-6 border-primary/50 bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Por que a Sugestão {selectedHistoryItem.choice} foi uma boa escolha?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                      {selectedHistoryItem.output.explanations[selectedHistoryItem.choice]}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {(suggestions[0] || suggestions[1]) && !selectedHistoryItem && (
          <>
            <div className="mb-6">
              <Button onClick={startNewCampaign} variant="outline" size="lg" className="w-full">
                <Sparkles className="w-5 h-5 mr-2" />
                Nova Campanha
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {suggestions.map((s, i) => {
                if (!s) return null
                const choice = i === 0 ? "A" : "B"
                const isSelected = selected === choice

                return (
                  <Card key={s.id} className={isSelected ? "border-primary border-2 shadow-lg" : "border-border"}>
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        <span>Sugestão {choice}</span>
                        {!selected && (
                          <Button onClick={() => handleChoice(choice)} size="sm" variant="outline">
                            Selecionar
                          </Button>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Plataforma e Formato */}
                      <div className="flex gap-2 text-xs">
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded-full">{s.data.platform}</span>
                        <span className="px-2 py-1 bg-secondary rounded-full">{s.data.format}</span>
                      </div>

                      {/* Texto Otimizado */}
                      <div className="bg-secondary p-4 rounded-lg">
                        <p className="text-sm font-medium mb-2">{s.data.optimized_text}</p>
                      </div>

                      {/* Hashtags */}
                      {s.data.hashtags && s.data.hashtags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {s.data.hashtags.map((tag, idx) => (
                            <span key={idx} className="text-xs text-primary">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Melhor horário e engajamento previsto */}
                      <div className="flex justify-between text-xs text-muted-foreground border-t pt-3">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>Melhor horário: {s.data.best_time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          <span>{Math.round(s.data.predicted_engagement)} eng.</span>
                        </div>
                      </div>

                      {/* Tom e estilo */}
                      {s.data.tone_style && s.data.tone_style.length > 0 && (
                        <div className="text-xs">
                          <span className="text-muted-foreground">Tom: </span>
                          <span>{s.data.tone_style.join(", ")}</span>
                        </div>
                      )}

                      <div className="flex justify-between items-center pt-2 border-t">
                        <FeedbackButtons suggestionId={s.id} />
                        <Button onClick={() => downloadPDF(s.id)} variant="ghost" size="sm">
                          <FileDown className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {selected && (
              <Card className="border-primary/50 bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Por que a Sugestão {selected} é uma boa escolha?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                      {explanations[selected] || "Explanation não disponível"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </main>
    </>
  )
}
