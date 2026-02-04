import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, ThumbsUp, ExternalLink } from "lucide-react"

export interface Post {
    subreddit: string
    title: string
    url: string
    permalink: string
    score: number
    comments: number
    engagement: number
    created_utc: number
    selftext: string
}

export function PostCard({ post }: { post: Post }) {
    return (
        <Card className="hover:border-primary/50 transition-colors cursor-default group relative overflow-hidden bg-white/5 backdrop-blur-sm border-white/10">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start gap-4">
                    <CardTitle className="text-lg font-medium leading-snug group-hover:text-primary transition-colors">
                        {post.title}
                    </CardTitle>
                    <a
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors p-1"
                    >
                        <ExternalLink className="w-5 h-5" />
                    </a>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {post.selftext || "No preview available..."}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <Badge className="gap-1 bg-secondary hover:bg-secondary/80 border-white/10 text-secondary-foreground items-center px-2 py-1">
                        <ThumbsUp className="w-3 h-3" />
                        <span className="font-medium">{post.score}</span>
                    </Badge>
                    <Badge className="gap-1 bg-secondary hover:bg-secondary/80 border-white/10 text-secondary-foreground items-center px-2 py-1">
                        <MessageSquare className="w-3 h-3" />
                        <span className="font-medium">{post.comments}</span>
                    </Badge>
                    <span className="text-xs ml-auto">
                        {new Date(post.created_utc * 1000).toLocaleDateString()}
                    </span>
                </div>
            </CardContent>
        </Card>
    )
}
