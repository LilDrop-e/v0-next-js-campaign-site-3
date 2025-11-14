import { DottedSurface } from "@/components/ui/dotted-surface"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DocsPage() {
  return (
    <>
      <DottedSurface />
      <Header />

      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">Documentação</h1>
          <p className="text-xl text-muted-foreground">Tudo que você precisa saber para usar o CampaignAI</p>
        </div>

        <div className="space-y-8">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle>Como Usar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">1. Faça Login</h3>
                <p>
                  Acesse a página de login e insira seu nome de usuário. Isso permitirá salvar seu histórico e
                  preferências.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">2. Configure a Campanha</h3>
                <p>
                  Na página de campanha, descreva o que você quer criar, selecione a plataforma (Instagram, TikTok,
                  etc.) e o formato (Imagem, Vídeo).
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">3. Gere Sugestões</h3>
                <p>
                  Clique em "Gerar Campanha" e receba duas sugestões personalizadas criadas por IA. Analise ambas e
                  escolha a que mais se adequa.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">4. Dê Feedback</h3>
                <p>
                  Use os botões de like/dislike para avaliar as sugestões. Seu feedback ajuda a melhorar as próximas
                  gerações.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">5. Exporte</h3>
                <p>Clique no ícone de PDF para baixar a campanha selecionada em formato profissional.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle>Endpoints da API</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-secondary p-4 rounded-lg font-mono text-sm">
                <div className="text-primary mb-2">POST /chat_interaction</div>
                <div className="text-muted-foreground">Criar nova campanha</div>
              </div>
              <div className="bg-secondary p-4 rounded-lg font-mono text-sm">
                <div className="text-primary mb-2">POST /chat_response</div>
                <div className="text-muted-foreground">Registrar escolha da sugestão</div>
              </div>
              <div className="bg-secondary p-4 rounded-lg font-mono text-sm">
                <div className="text-primary mb-2">POST /chat_feedback</div>
                <div className="text-muted-foreground">Enviar feedback (like/dislike)</div>
              </div>
              <div className="bg-secondary p-4 rounded-lg font-mono text-sm">
                <div className="text-primary mb-2">
                  GET /chat_export/{"{"}suggestion_id{"}"}
                </div>
                <div className="text-muted-foreground">Exportar campanha em PDF</div>
              </div>
              <div className="bg-secondary p-4 rounded-lg font-mono text-sm">
                <div className="text-primary mb-2">
                  GET /history/{"{"}user_id{"}"}
                </div>
                <div className="text-muted-foreground">Ver histórico do usuário</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle>Fluxo do Sistema</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>O sistema funciona em um fluxo simples e intuitivo:</p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Usuário faz login e é identificado</li>
                <li>Usuário descreve a campanha desejada</li>
                <li>Sistema gera duas sugestões usando IA</li>
                <li>Usuário seleciona uma das sugestões</li>
                <li>Usuário fornece feedback sobre a qualidade</li>
                <li>Sistema aprende com o feedback para melhorar</li>
                <li>Usuário pode exportar a campanha em PDF</li>
                <li>Histórico fica disponível para consulta futura</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}
