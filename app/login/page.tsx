"use client"
import * as React from "react"
import { Card, Button, Input, Field } from "@/components/ui"
import { Eye, EyeOff, AlertCircle, Moon, Sun, Sparkles } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = React.useState(false)
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [error, setError] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [isDark, setIsDark] = React.useState(false)

  React.useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggleTheme = () => {
    const next = !isDark
    setIsDark(next)
    if (next) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    setTimeout(() => {
      if (email === "error@example.com" || password === "wrong") {
        setError("ایمیل یا گذرواژه وارد شده نامعتبر است.")
        setIsLoading(false)
      } else {
        router.push("/")
      }
    }, 1000)
  }

  return (
    <div className="min-h-[100dvh] w-full bg-surface-2 flex items-center justify-center p-4 md:p-8 relative">
      {/* Theme Toggle Corner */}
      <div className="absolute top-6 start-6 z-20">
        <Button variant="ghost" size="sm" onClick={toggleTheme} className="size-10 p-0 rounded-full bg-surface border border-border shadow-sm text-fg-2 hover:text-fg">
          {isDark ? <Sun className="size-4.5" /> : <Moon className="size-4.5" />}
        </Button>
      </div>

      {/* Main Card */}
      <Card className="w-full max-w-[900px] grid grid-cols-1 md:grid-cols-5 overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-border bg-background rounded-[2rem] min-h-[600px] anim-in">
        
        {/* Brand Side (Gradient/Frosted) */}
        <div className="hidden md:flex flex-col justify-between col-span-2 p-10 relative overflow-hidden bg-primary/5 border-e border-border">
          {/* Decorative Background */}
          <div className="absolute top-0 end-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 start-0 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-[12px] bg-primary text-primary-fg flex items-center justify-center font-extrabold text-lg shadow-sm">
                م
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-extrabold text-fg leading-none tracking-tight">محتوای هوشمند</span>
                <span className="text-[11px] font-bold text-primary mt-1">پلتفرم تولید بلاگ هوشمند</span>
              </div>
            </div>
            <p className="text-[14px] text-fg-2 leading-relaxed max-w-sm mt-4">
              با کمک هوش مصنوعی، مقالات سئوشده، معرفی محصولات و پست‌های شبکه‌های اجتماعی را با لحن برند خودتان تولید کنید.
            </p>
          </div>

          <div className="relative z-10">
            <div className="bg-surface/80 backdrop-blur-md border border-border/60 rounded-2xl p-5 inline-flex flex-col gap-3 shadow-sm">
               <div className="flex items-center gap-3">
                 <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                    <Sparkles className="size-4" />
                 </div>
                 <div className="flex flex-col gap-0.5">
                   <span className="text-[13px] font-bold text-fg">تولید هوشمند فعال است</span>
                   <span className="text-[11px] text-fg-3">دسترسی به تمام ابزارهای نویسندگی</span>
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="col-span-3 p-8 md:p-14 flex flex-col justify-center relative">
          
          {/* Mobile Brand (visible only on small screens) */}
          <div className="md:hidden flex items-center gap-3 mb-10">
            <div className="size-9 rounded-[12px] bg-primary text-primary-fg flex items-center justify-center font-extrabold text-lg shadow-sm">
              م
            </div>
            <div className="flex flex-col">
              <span className="text-[15px] font-extrabold text-fg leading-none tracking-tight">محتوای هوشمند</span>
              <span className="text-[11px] font-bold text-primary mt-1">پلتفرم تولید بلاگ هوشمند</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-8">
            <h1 className="text-2xl font-extrabold text-fg tracking-tight">ورود به حساب</h1>
            <p className="text-[13px] text-fg-3">برای ادامه وارد شوید و به داشبورد خود دسترسی پیدا کنید.</p>
          </div>

          {error && (
            <div className="mb-6 flex items-start gap-2 p-3 bg-red-50/50 border border-red-200 rounded-xl text-red-700 text-[12px] anim-in">
              <AlertCircle className="size-4 shrink-0 mt-0.5" />
              <span className="font-medium leading-relaxed">{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <Field label="ایمیل">
              <Input 
                type="email" 
                placeholder="name@company.com" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                dir="ltr"
                className="text-left font-mono text-[13px]"
                required
              />
            </Field>

            <Field label="گذرواژه">
              <div className="relative flex items-center">
                <Input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  dir="ltr"
                  className="text-left font-mono text-[13px] ps-10"
                  required
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "پنهان کردن گذرواژه" : "نمایش گذرواژه"}
                  className="absolute start-3 text-fg-3 hover:text-fg transition-colors p-1 rounded focusable"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </Field>

            <div className="flex items-center justify-between mt-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-border text-primary focus:ring-primary bg-background" />
                <span className="text-[12px] font-medium text-fg-2 group-hover:text-fg transition-colors">مرا به خاطر بسپار</span>
              </label>
              <Link href="#" className="text-[12px] font-bold text-primary hover:text-primary/80 transition-colors">
                فراموشی گذرواژه؟
              </Link>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full mt-2 h-11 text-[14px]">
              {isLoading ? "در حال ورود..." : "ورود"}
            </Button>
          </form>

          <div className="flex items-center gap-4 my-8">
            <div className="h-px bg-border/60 flex-1"></div>
            <span className="text-[11px] font-bold text-fg-3">یا</span>
            <div className="h-px bg-border/60 flex-1"></div>
          </div>

          <Button type="button" variant="ghost" className="w-full bg-surface hover:bg-surface-2 border border-border h-11 text-[13px] gap-2">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            ورود با حساب گوگل
          </Button>

          <div className="mt-8 text-center">
            <p className="text-[13px] text-fg-3">
              حساب ندارید؟ <Link href="#" className="font-bold text-primary hover:text-primary/80 transition-colors">ثبت‌نام کنید</Link>
            </p>
          </div>

        </div>
      </Card>
    </div>
  )
}
