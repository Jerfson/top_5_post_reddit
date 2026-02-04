import { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PostCard, Post } from '@/components/PostCard'
import { Activity, Bot, Zap } from 'lucide-react'

interface Data {
  n8n: Post[]
  automation: Post[]
}

function App() {
  const [data, setData] = useState<Data | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("n8n")

  useEffect(() => {
    fetch('/reddit_top_posts.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load data')
        return res.json()
      })
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <Activity className="w-12 h-12 text-primary animate-spin" />
          <p className="text-muted-foreground">Analyzing Reddit Intelligence...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-destructive">
        <p>Error: {error}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8 font-sans selection:bg-primary/20">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex flex-col items-center text-center space-y-4 py-8">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 shadow-[0_0_50px_-12px_var(--primary)]">
            <Bot className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
            Agent Intelligence
          </h1>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Top performing discussions from the automation community.
          </p>
        </header>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-[400px] grid-cols-2 bg-secondary/50 backdrop-blur-sm p-1">
              <TabsTrigger value="n8n" className="gap-2 data-[state=active]:bg-n8n data-[state=active]:text-white transition-all">
                <Zap className="w-4 h-4" />
                n8n
              </TabsTrigger>
              <TabsTrigger value="automation" className="gap-2 data-[state=active]:bg-automation data-[state=active]:text-white transition-all">
                <Bot className="w-4 h-4" />
                Automation
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="n8n" className="space-y-4 animate-accordion-down">
            {data?.n8n.map((post) => (
              <PostCard key={post.url} post={post} />
            ))}
          </TabsContent>

          <TabsContent value="automation" className="space-y-4 animate-accordion-down">
            {data?.automation.map((post) => (
              <PostCard key={post.url} post={post} />
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Background Gradients */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-background">
        <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[100px]" />
        <div className="absolute bottom-0 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-secondary/20 blur-[100px]" />
      </div>
    </div>
  )
}

export default App
