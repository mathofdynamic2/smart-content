"use client"
import * as React from "react"
import { PageHeader, Card, Button, Chip } from "@/components/ui"
import { Sparkles, Send, User, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: React.ReactNode
  isStreaming?: boolean
}

const SUGGESTIONS = [
  "چند مقاله منتشر کرده‌ام؟",
  "یک مقالهٔ معرفی محصول بساز",
  "تقویم انتشار را نشانم بده"
]

export default function SuperAgentPage() {
  const [messages, setMessages] = React.useState<Message[]>([])
  const [input, setInput] = React.useState("")
  const [isStreaming, setIsStreaming] = React.useState(false)
  const messagesEndRef = React.useRef<HTMLDivElement>(null)
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`
    }
  }

  const handleSend = (text: string) => {
    if (!text.trim() || isStreaming) return
    
    setInput("")
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: text }])
    setIsStreaming(true)

    // Simulate thinking delay
    setTimeout(() => {
      const assistantId = (Date.now() + 1).toString()
      setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: "", isStreaming: true }])
      
      let baseText = "در حال بررسی اطلاعات شما هستم..."
      let interactiveNode: React.ReactNode = null
      
      if (text.includes("مقاله")) {
        baseText = "شما تاکنون ۱۲ مقاله منتشر کرده‌اید و ۵ مقاله در وضعیت پیش‌نویس قرار دارند."
        interactiveNode = (
          <div className="mt-3">
            <Link href="/library">
              <Chip tone="primary" className="w-max cursor-pointer bg-primary/10 hover:bg-primary/20 text-primary border-transparent transition-colors">
                <span className="text-[12px] font-bold">رفتن به کتابخانه</span>
                <ArrowLeft className="size-3 ms-1 inline" />
              </Chip>
            </Link>
          </div>
        )
      } else if (text.includes("محصول")) {
        baseText = "برای ایجاد یک مقاله معرفی محصول جدید، می‌توانید از بخش ایجاد محتوا اقدام کنید."
        interactiveNode = (
          <div className="mt-3">
            <Link href="/create">
              <Chip tone="primary" className="w-max cursor-pointer bg-primary/10 hover:bg-primary/20 text-primary border-transparent transition-colors">
                <span className="text-[12px] font-bold">ایجاد محتوای جدید</span>
                <ArrowLeft className="size-3 ms-1 inline" />
              </Chip>
            </Link>
          </div>
        )
      } else if (text.includes("تقویم")) {
        baseText = "تقویم محتوای شما برای این ماه شامل ۳ مقاله زمان‌بندی شده است."
        interactiveNode = (
          <div className="mt-3">
            <Link href="/calendar">
              <Chip tone="primary" className="w-max cursor-pointer bg-primary/10 hover:bg-primary/20 text-primary border-transparent transition-colors">
                <span className="text-[12px] font-bold">مشاهده تقویم</span>
                <ArrowLeft className="size-3 ms-1 inline" />
              </Chip>
            </Link>
          </div>
        )
      } else {
        baseText = "من دستیار هوشمند شما هستم. آماده‌ام تا در ناوبری پلتفرم و مدیریت محتوا به شما کمک کنم."
      }

      const words = baseText.split(" ")
      let i = 0
      
      const interval = setInterval(() => {
        setMessages(prev => prev.map(msg => {
          if (msg.id === assistantId) {
            const currentStr = typeof msg.content === 'string' ? msg.content : (msg.content as any)?.props?.children?.[0] || ""
            return { ...msg, content: currentStr + (i > 0 ? " " : "") + words[i] }
          }
          return msg
        }))
        i++
        if (i >= words.length) {
          clearInterval(interval)
          setMessages(prev => prev.map(msg => {
            if (msg.id === assistantId) {
              return { 
                ...msg, 
                isStreaming: false, 
                content: (
                  <div className="flex flex-col">
                    <span>{baseText}</span>
                    {interactiveNode}
                  </div>
                ) 
              }
            }
            return msg
          }))
          setIsStreaming(false)
        }
      }, 70)

    }, 400)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend(input)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] sm:h-[calc(100vh-6rem)] pb-4">
      <div className="shrink-0 anim-in">
        <PageHeader 
          title="سوپرایجنت" 
          subtitle="دستیار هوشمند برای پرسش دربارهٔ محتوا و هدایت سریع در پلتفرم."
        />
      </div>

      <Card className="flex-1 flex flex-col mt-4 overflow-hidden border-border bg-surface/30 anim-in" style={{ '--i': 1 } as React.CSSProperties}>
        
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-6">
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center max-w-lg mx-auto">
              <div className="size-16 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                <Sparkles className="size-8" />
              </div>
              <h2 className="text-xl font-extrabold text-fg mb-2">چگونه می‌توانم کمک کنم؟</h2>
              <p className="text-[13px] text-fg-3 leading-relaxed mb-8">
                من می‌توانم آمار محتوای شما را تحلیل کنم، پیش‌نویس‌های جدید بسازم و در پیدا کردن سریع بخش‌های پلتفرم راهنماییتان کنم.
              </p>
              
              <div className="flex flex-col gap-3 w-full">
                {SUGGESTIONS.map((sug, idx) => (
                  <button 
                    key={idx} 
                    className="p-4 text-start cursor-pointer hover:border-primary/40 transition-all bg-background rounded-xl border border-border shadow-sm hover:-translate-y-1 hover:shadow-md w-full focusable active:scale-[0.99]"
                    onClick={() => handleSend(sug)}
                  >
                    <span className="text-[13px] font-bold text-fg-2 hover:text-fg">{sug}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map(msg => (
                <div key={msg.id} className={cn("flex w-full", msg.role === 'user' ? "justify-end" : "justify-start")}>
                  <div className={cn("flex max-w-[85%] md:max-w-[75%] gap-3", msg.role === 'user' ? "flex-row-reverse" : "flex-row")}>
                    
                    {/* Avatar */}
                    <div className={cn(
                      "size-8 rounded-xl flex items-center justify-center shrink-0 mt-1",
                      msg.role === 'user' ? "bg-primary/20 text-primary" : "bg-indigo-100 text-indigo-600"
                    )}>
                      {msg.role === 'user' ? <User className="size-4" /> : <Sparkles className="size-4" />}
                    </div>
                    
                    {/* Bubble */}
                    <div className={cn(
                      "p-4 rounded-xl text-[14px] leading-[1.8]",
                      msg.role === 'user' 
                        ? "bg-primary text-white rounded-se-sm" 
                        : "bg-surface-2 text-fg border border-border/50 rounded-ss-sm"
                    )}>
                      {msg.content}
                      {msg.isStreaming && <span className="inline-block size-2 rounded-full bg-indigo-400 animate-pulse ms-1 mb-0.5" />}
                    </div>
                    
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Composer */}
        <div className="shrink-0 p-4 bg-background border-t border-border">
          <div className="max-w-4xl mx-auto flex flex-col gap-2">
            <div className="relative flex items-end gap-2 bg-surface-2 rounded-xl p-2 border border-border focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 transition-all">
              <textarea 
                ref={textareaRef}
                value={input}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                placeholder="پرسش خود را بنویسید..."
                className="flex-1 bg-transparent border-0 focus:ring-0 focus:outline-none px-2 py-2.5 resize-none text-[13px] placeholder:text-fg-3 leading-relaxed"
                rows={1}
                style={{
                  minHeight: "44px",
                  maxHeight: "150px"
                }}
              />
              <Button 
                size="sm"
                className="size-10 rounded-xl shrink-0 bg-primary text-white hover:bg-primary/90 disabled:opacity-50 mb-0.5"
                disabled={!input.trim() || isStreaming}
                onClick={() => handleSend(input)}
              >
                <Send className="size-4 rtl:-scale-x-100" />
              </Button>
            </div>
            <div className="text-[10px] text-fg-3 text-center">
              با زدن Shift + Enter خط جدید ایجاد کنید. پاسخ‌ها توسط هوش مصنوعی تولید می‌شوند.
            </div>
          </div>
        </div>
        
      </Card>
    </div>
  )
}
