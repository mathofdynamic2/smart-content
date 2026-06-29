"use client"
import * as React from "react"
import { PageHeader, Card, Button, Input, Field, Select, Chip } from "@/components/ui"
import { Info, X, CheckCircle2, Loader2, Key } from "lucide-react"
import { cn } from "@/lib/utils"

export default function SettingsPage() {
  const [model, setModel] = React.useState("gemini-1.5-flash")
  const [intelligence, setIntelligence] = React.useState("متعادل")
  const [creativity, setCreativity] = React.useState("متوسط")
  
  const [isSaving, setIsSaving] = React.useState(false)
  const [saveSuccess, setSaveSuccess] = React.useState(false)

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 2000)
    }, 1200)
  }

  const [keywords, setKeywords] = React.useState(["هوش مصنوعی", "فناوری اطلاعات", "دیجیتال مارکتینگ", "سئو"])
  const [keywordInput, setKeywordInput] = React.useState("")

  const addKeyword = (e?: React.FormEvent) => {
    e?.preventDefault()
    const trimmed = keywordInput.trim()
    if (trimmed && !keywords.includes(trimmed) && keywords.length < 20) {
      setKeywords([...keywords, trimmed])
      setKeywordInput("")
    }
  }

  const removeKeyword = (kw: string) => {
    setKeywords(keywords.filter(k => k !== kw))
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="anim-in">
        <PageHeader 
          title="تنظیمات" 
          subtitle="مدل هوش مصنوعی و رفتار تولید محتوا."
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Column */}
        <div className="lg:col-span-8 flex flex-col gap-6 anim-in" style={{ '--i': 1 } as React.CSSProperties}>
          
          <Card lift className="p-6">
            <h2 className="text-[16px] font-extrabold text-fg mb-5">تنظیمات عمومی</h2>
            <div className="flex flex-col gap-6">
              
              <Field label="مدل هوش مصنوعی">
                <Select value={model} onChange={e => setModel(e.target.value)}>
                  <option value="gemini-1.5-flash">Gemini 1.5 Flash — سریع و اقتصادی</option>
                  <option value="gemini-1.5-flash-8b">Gemini 1.5 Flash-8B — بسیار سریع و کم‌هزینه</option>
                  <option value="gpt-4o-mini">GPT-4o Mini — مدل اقتصادی و سریع OpenAI</option>
                  <option value="claude-3-haiku">Claude 3 Haiku — مدل سریع و کارآمد Anthropic</option>
                </Select>
                <div className="text-[11px] text-fg-3 mt-1">همهٔ گزینه‌ها در ردهٔ اقتصادی هستند.</div>
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Field label="سطح هوشمندی">
                  <Select value={intelligence} onChange={e => setIntelligence(e.target.value)}>
                    <option value="سریع">سریع</option>
                    <option value="متعادل">متعادل</option>
                    <option value="حداکثر">حداکثر</option>
                  </Select>
                </Field>
                <Field label="خلاقیت">
                  <Select value={creativity} onChange={e => setCreativity(e.target.value)}>
                    <option value="کم">کم (دقیق و ساختاریافته)</option>
                    <option value="متوسط">متوسط (متعادل)</option>
                    <option value="زیاد">زیاد (خلاقانه و آزاد)</option>
                  </Select>
                </Field>
              </div>

              <div className="pt-4 border-t border-border flex justify-end">
                <Button 
                  onClick={handleSave} 
                  disabled={isSaving}
                  className={cn("w-full sm:w-40 transition-colors", saveSuccess ? "bg-green-600 hover:bg-green-600" : "")}
                >
                  {isSaving ? (
                    <><Loader2 className="size-4 animate-spin ms-2" /> در حال ذخیره...</>
                  ) : saveSuccess ? (
                    <><CheckCircle2 className="size-4 ms-2" /> ذخیره شد</>
                  ) : (
                    "ذخیرهٔ تنظیمات"
                  )}
                </Button>
              </div>
            </div>
          </Card>

          <Card lift className="p-6">
            <h2 className="text-[16px] font-extrabold text-fg mb-2">کلیدواژه‌های اخبار روزانه</h2>
            <p className="text-[12px] text-fg-3 leading-relaxed mb-5">
              اخبار روزانه بر اساس این کلیدواژه‌ها هر روز (و با دکمهٔ دریافت) جمع‌آوری می‌شود.
            </p>
            
            <div className="flex flex-col gap-4">
              <form onSubmit={addKeyword} className="flex gap-2">
                <Input 
                  value={keywordInput}
                  onChange={e => setKeywordInput(e.target.value)}
                  placeholder="افزودن کلیدواژه (با اینتر تایید کنید)..."
                  className="flex-1"
                />
                <Button type="submit" disabled={!keywordInput.trim() || keywords.length >= 20} variant="outline" className="px-4">افزودن</Button>
              </form>

              <div className="flex flex-wrap gap-2 pt-2">
                {keywords.map((kw) => (
                  <div key={kw} className="animate-in fade-in zoom-in-95 duration-200">
                    <Chip tone="neutral" className="bg-surface-2 text-fg hover:bg-border transition-colors group pe-1.5">
                      {kw}
                      <button 
                        onClick={() => removeKeyword(kw)} 
                        type="button"
                        aria-label={`حذف کلیدواژه ${kw}`}
                        className="ms-2 size-4 rounded-md flex items-center justify-center text-fg-3 hover:text-fg hover:bg-surface transition-colors focusable"
                      >
                        <X className="size-3" />
                      </button>
                    </Chip>
                  </div>
                ))}
                {keywords.length === 0 && (
                  <div className="text-[12px] text-fg-3">هیچ کلیدواژه‌ای ثبت نشده است.</div>
                )}
              </div>
              <div className="text-[11px] text-fg-3 text-end">
                {keywords.length} / ۲۰ کلیدواژه
              </div>
            </div>
          </Card>

        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 anim-in" style={{ '--i': 2 } as React.CSSProperties}>
          <div className="sticky top-6 flex flex-col gap-6">
            <Card className="flex flex-col p-5 bg-surface-2/50 border-dashed border-border gap-4">
              <div className="flex items-center gap-2">
                <Info className="size-5 text-primary shrink-0" />
                <h3 className="text-[14px] font-extrabold text-fg">دربارهٔ مدل‌ها</h3>
              </div>
              <p className="text-[12px] text-fg-2 leading-relaxed">
                تمامی مدل‌های ارائه‌شده در این پلتفرم در ردهٔ اقتصادی (Economy-tier) قرار دارند تا هزینه‌های تولید محتوا و مصرف توکن در مقیاس بالا، بهینه‌تر مدیریت شود.
              </p>
              
              <div className="h-px w-full bg-border/60"></div>
              
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold text-fg-2">مدل فعال:</span>
                <span className="font-mono text-[11px] font-bold text-primary bg-primary/10 px-2 py-1 rounded" dir="ltr">
                  {model}
                </span>
              </div>
            </Card>

            <div className="flex items-start gap-2 p-4 rounded-xl border border-border bg-surface text-fg-3">
              <Key className="size-4 shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed">
                تنظیمات مربوط به پروفایل کاربری و کلیدهای API (API Keys) در فازهای بعدی به سیستم اضافه خواهند شد.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
