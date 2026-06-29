"use client"
import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, FileText, Library, Calendar, Sparkles, Building2, Package, Users, Settings, Activity, Search, Plus, Moon, Sun, User, Command } from "lucide-react"
import { Button } from "@/components/ui"

const NAV = [
  { section: "اصلی", items: [
    { name: "نمای کلی", href: "/overview", icon: LayoutDashboard },
    { name: "ساخت محتوا", href: "/create", icon: FileText },
    { name: "کتابخانه محتوا", href: "/library", icon: Library },
    { name: "تقویم محتوا", href: "/calendar", icon: Calendar },
  ]},
  { section: "تنظیم و دانش", items: [
    { name: "سوپرایجنت", href: "/super-agent", icon: Sparkles },
    { name: "دانش شرکت", href: "/knowledge", icon: Building2 },
    { name: "محصولات", href: "/products", icon: Package },
    { name: "نویسنده‌ها", href: "/writers", icon: Users },
    { name: "تنظیمات", href: "/settings", icon: Settings },
    { name: "هزینه و مصرف", href: "/usage", icon: Activity },
  ]}
]

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
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

  // Find current page title
  const currentItem = NAV.flatMap(g => g.items).find(i => i.href === pathname)
  const pageTitle = currentItem?.name || "محتوای هوشمند"

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 border-e border-border bg-surface-2/50 backdrop-blur-xl flex flex-col h-full z-20">
        <div className="h-[60px] flex items-center px-6 border-b border-border/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-extrabold text-[15px] shadow-sm">
              م
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-extrabold text-fg leading-none tracking-tight">محتوای هوشمند</span>
              <span className="text-[10px] font-bold text-primary mt-0.5">پلتفرم تولید محتوا</span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-8 scrollbar-none">
          {NAV.map(group => (
            <div key={group.section} className="flex flex-col gap-2">
              <h3 className="text-[11px] font-bold text-fg-3 px-3 uppercase tracking-wider">{group.section}</h3>
              <nav className="flex flex-col gap-1">
                {group.items.map(item => {
                  const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/overview" && item.href !== "/")
                  return (
                    <Link key={item.href} href={item.href} className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-medium transition-all focusable",
                      isActive ? "bg-primary !text-white shadow-[0_4px_12px_rgba(37,99,235,0.2)]" : "text-fg-2 hover:bg-surface-2 hover:text-fg"
                    )}>
                      <item.icon className="size-4.5" />
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
            </div>
          ))}
        </div>

        <div className="p-4 shrink-0">
          <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 flex flex-col gap-3 relative overflow-hidden group">
            <div className="absolute top-0 end-0 size-24 bg-indigo-500/20 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="flex items-center gap-2 relative z-10">
              <Sparkles className="size-4 text-indigo-600 dark:text-indigo-400" />
              <span className="text-[12px] font-bold text-indigo-700 dark:text-indigo-300">سوپرایجنت فعال</span>
            </div>
            <p className="text-[11px] text-indigo-600/80 dark:text-indigo-400/80 font-medium relative z-10 leading-relaxed">
              آماده برای پاسخگویی به سوالات شما درباره محتوا و آمار پلتفرم.
            </p>
            <Link href="/super-agent" className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 relative z-10 flex items-center gap-1 group-hover:gap-1.5 transition-all w-max mt-1 focusable rounded-sm outline-offset-2">
              پرسش جدید &larr;
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-[60px] shrink-0 border-b border-border bg-surface-2/80 backdrop-blur-xl px-6 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-[15px] font-bold text-fg hidden md:block">{pageTitle}</h1>
            <div className="relative hidden lg:flex items-center">
              <Search className="size-4 text-fg-3 absolute start-3" />
              <input 
                type="text" 
                placeholder="جستجو در مقالات و دانش..." 
                className="h-9 w-64 bg-surface border border-border rounded-xl ps-9 pe-12 text-[13px] text-fg placeholder:text-fg-3 focusable transition-all focus:w-72"
              />
              <div className="absolute end-1.5 flex items-center justify-center h-6 px-2 rounded-xl bg-surface-2 border border-border text-[10px] text-fg-3 font-mono gap-0.5 pointer-events-none">
                <Command className="size-3" /> K
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={toggleTheme} className="size-9 p-0 rounded-xl text-fg-2 hover:text-fg hover:bg-surface border border-transparent">
              {isDark ? <Sun className="size-4.5" /> : <Moon className="size-4.5" />}
            </Button>
            <div className="w-px h-5 bg-border mx-1" />
            <Link href="/create" tabIndex={-1}>
              <Button size="sm" className="h-9 rounded-xl px-4 gap-2 text-[13px] font-bold shadow-sm">
                <Plus className="size-4" />
                محتوای جدید
              </Button>
            </Link>
            <button className="size-9 rounded-xl bg-surface-2 border border-border ms-2 flex items-center justify-center text-[12px] font-bold text-fg-2 hover:text-fg transition-colors focusable">
              <User className="size-4.5" />
            </button>
          </div>
        </header>

        {/* Scrollable Main */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 scrollbar-none relative">
          <div className="max-w-[1400px] mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
