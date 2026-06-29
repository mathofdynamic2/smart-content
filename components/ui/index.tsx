import * as React from "react"
import { cn } from "@/lib/utils"

export const PageHeader = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-8">
    <h1 className="text-3xl font-extrabold tracking-tight text-fg">{title}</h1>
    {subtitle && <p className="text-fg-2 mt-2 leading-relaxed text-[14px]">{subtitle}</p>}
  </div>
)

export const SectionHeader = ({ title }: { title: string }) => (
  <h2 className="text-xl font-bold text-fg mb-4">{title}</h2>
)

export const Card = ({ children, className, lift, style, ...props }: { children: React.ReactNode, className?: string, lift?: boolean, style?: React.CSSProperties, onClick?: () => void }) => (
  <div className={cn("bg-surface border border-border rounded-xl", lift && "lift shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)]", className)} style={style} {...props}>
    {children}
  </div>
)

export const Button = ({ children, variant = "primary", size = "md", className, ...props }: any) => {
  const base = "inline-flex items-center justify-center font-medium rounded-xl transition-all focusable active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
  const variants = {
    primary: "bg-primary text-white hover:bg-primary/90 shadow-sm",
    ghost: "bg-transparent text-fg hover:bg-surface-2",
    danger: "bg-down-bg text-down hover:bg-down/10",
    outline: "bg-transparent border border-border text-fg hover:bg-surface-2"
  }
  const sizes = {
    sm: "h-8 px-3 text-[13px]",
    md: "h-10 px-4 text-[14px]",
  }
  return <button className={cn(base, variants[variant as keyof typeof variants] || variants.primary, sizes[size as keyof typeof sizes] || sizes.md, className)} {...props}>{children}</button>
}

export const Chip = ({ children, tone = "neutral", className }: any) => {
  const tones = {
    neutral: "bg-surface text-fg border-border",
    up: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400",
    blue: "bg-primary/10 text-primary border-primary/20",
    primary: "bg-primary/10 text-primary border-primary/20",
  }
  return <span className={cn("inline-flex items-center px-2 py-0.5 rounded-xl text-[12px] font-bold border", tones[tone as keyof typeof tones] || tones.neutral, className)}>{children}</span>
}

export const IconBadge = ({ icon: Icon, tone = "primary", className }: any) => {
  const tones = {
    primary: "bg-primary/10 text-primary",
    ink: "bg-surface-2 text-fg",
    hero: "bg-background text-fg shadow-sm border border-border"
  }
  return (
    <div className={cn("flex items-center justify-center size-10 rounded-xl shrink-0", tones[tone as keyof typeof tones] || tones.primary, className)}>
      <Icon className="size-5" />
    </div>
  )
}

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => (
  <input ref={ref} className={cn("flex h-10 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-fg-3 focusable disabled:cursor-not-allowed disabled:opacity-50 transition-colors", className)} {...props} />
))
Input.displayName = "Input"

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(({ className, ...props }, ref) => (
  <select ref={ref} className={cn("flex h-10 w-full items-center justify-between rounded-xl border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-fg-3 focusable disabled:cursor-not-allowed disabled:opacity-50 transition-colors appearance-none", className)} {...props} />
))
Select.displayName = "Select"

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({ className, ...props }, ref) => (
  <textarea ref={ref} className={cn("flex min-h-[80px] w-full rounded-xl border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-fg-3 focusable disabled:cursor-not-allowed disabled:opacity-50 transition-colors", className)} {...props} />
))
Textarea.displayName = "Textarea"

export const Field = ({ label, children, className }: { label: string, children: React.ReactNode, className?: string }) => (
  <div className={cn("flex flex-col gap-2", className)}>
    <label className="text-[13px] font-bold text-fg">{label}</label>
    {children}
  </div>
)

export const EmptyHint = ({ icon: Icon, title, cta, className }: any) => (
  <div className={cn("flex flex-col items-center justify-center text-center p-8 border border-dashed border-border rounded-xl bg-surface/50", className)}>
    <div className="size-12 rounded-xl bg-surface-2 flex items-center justify-center mb-4 text-fg-3">
      <Icon className="size-6" />
    </div>
    <h3 className="text-[14px] font-bold text-fg mb-4">{title}</h3>
    {cta}
  </div>
)

