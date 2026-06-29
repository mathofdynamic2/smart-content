"use client"
import * as React from "react"
import { PageHeader, Card, Button, Input, Textarea, Field, Chip } from "@/components/ui"
import { Sparkles, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function KnowledgePage() {
  const [industry, setIndustry] = React.useState("فناوری اطلاعات و نرم‌افزار")
  const [intro, setIntro] = React.useState("یک شرکت پیشرو در زمینه ارائه راهکارهای هوش مصنوعی و اتوماسیون سازمانی که به کسب‌وکارها کمک می‌کند تا فرآیندهای خود را بهینه‌سازی کنند.")
  const [tone, setTone] = React.useState("حرفه‌ای، نوآورانه و قابل اعتماد")
  const [coreValues, setCoreValues] = React.useState("نوآوری مستمر, شفافیت, مشتری‌مداری, کیفیت بالا")
  const [targetAudience, setTargetAudience] = React.useState("مدیران ارشد، تصمیم‌گیرندگان فناوری در سازمان‌های متوسط تا بزرگ، تیم‌های تحول دیجیتال.")
  
  const [isSaving, setIsSaving] = React.useState(false)
  const [saveStatus, setSaveStatus] = React.useState<'idle' | 'success' | 'error'>('idle')

  const handleSave = () => {
    setIsSaving(true)
    setSaveStatus('idle')
    setTimeout(() => {
      setIsSaving(false)
      setSaveStatus('success')
      setTimeout(() => setSaveStatus('idle'), 3000)
    }, 1500)
  }

  const [extractText, setExtractText] = React.useState("")
  const [isExtracting, setIsExtracting] = React.useState(false)
  const [extractStatus, setExtractStatus] = React.useState<'idle' | 'success' | 'error'>('idle')

  const handleExtract = () => {
    if (!extractText.trim()) {
      setExtractStatus('error')
      setTimeout(() => setExtractStatus('idle'), 3000)
      return
    }
    
    setIsExtracting(true)
    setExtractStatus('idle')
    
    setTimeout(() => {
      setIndustry("تولید و خرده‌فروشی مبلمان")
      setIntro("ما یک برند دکوراسیون داخلی هستیم که مبلمان مینیمال و پایدار تولید می‌کنیم. هدف ما آوردن زیبایی و آرامش به خانه‌های مدرن است.")
      setTone("صمیمی، الهام‌بخش و زیباشناختی")
      setCoreValues("پایداری محیط‌زیست, طراحی مینیمال, کیفیت متریال")
      setTargetAudience("جوانان حرفه‌ای، زوج‌های جوان و علاقه‌مندان به طراحی داخلی مدرن و ساده.")
      
      setIsExtracting(false)
      setExtractStatus('success')
      setExtractText("")
      
      setTimeout(() => setExtractStatus('idle'), 3000)
    }, 2500)
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="anim-in">
        <PageHeader 
          title="دانش شرکت" 
          subtitle="اطلاعات شرکت که به هوش مصنوعی کمک می‌کند محتوای دقیق و هم‌راستا با برند شما بنویسد."
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Form Column */}
        <div className="lg:col-span-8 flex flex-col gap-6 anim-in" style={{ '--i': 1 } as React.CSSProperties}>
          <Card lift className="p-6">
            <div className="flex flex-col gap-6">
              <Field label="صنعت">
                <Input 
                  value={industry} 
                  onChange={e => setIndustry(e.target.value)} 
                  placeholder="مثلاً: تجارت الکترونیک، آموزش، سلامت..." 
                />
              </Field>
              
              <Field label="معرفی شرکت">
                <Textarea 
                  value={intro}
                  onChange={e => setIntro(e.target.value)}
                  placeholder="شرکت شما دقیقاً چه کاری انجام می‌دهد؟..." 
                  className="min-h-[120px] leading-relaxed" 
                />
              </Field>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="لحن صدا">
                  <Textarea 
                    value={tone}
                    onChange={e => setTone(e.target.value)}
                    placeholder="مثلاً حرفه‌ای اما صمیمی..." 
                    className="min-h-[100px]" 
                  />
                </Field>
                <Field label="مخاطب هدف">
                  <Textarea 
                    value={targetAudience}
                    onChange={e => setTargetAudience(e.target.value)}
                    placeholder="توصیف پرسونای مشتریان شما..." 
                    className="min-h-[100px]" 
                  />
                </Field>
              </div>

              <Field label="ارزش‌های اصلی (جدا شده با کاما)">
                <Input 
                  value={coreValues} 
                  onChange={e => setCoreValues(e.target.value)} 
                  placeholder="شفافیت، سرعت، نوآوری..." 
                />
              </Field>

              <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex-1">
                  {saveStatus === 'success' && (
                    <div className="flex items-center gap-2 text-[13px] font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-xl border border-green-200 anim-in">
                      <CheckCircle2 className="size-4" /> پروفایل ذخیره شد ✓
                    </div>
                  )}
                  {saveStatus === 'error' && (
                    <div className="flex items-center gap-2 text-[13px] font-bold text-red-600 bg-red-50 px-3 py-1.5 rounded-xl border border-red-200 anim-in">
                      <AlertCircle className="size-4" /> خطایی در ذخیره‌سازی رخ داد
                    </div>
                  )}
                </div>
                <Button 
                  onClick={handleSave} 
                  disabled={isSaving}
                  className="w-full sm:w-40"
                >
                  {isSaving ? <Loader2 className="size-4 animate-spin me-2" /> : null}
                  {isSaving ? "در حال ذخیره..." : "ذخیرهٔ پروفایل"}
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Extract Panel Sidebar */}
        <div className="lg:col-span-4 anim-in" style={{ '--i': 2 } as React.CSSProperties}>
          <Card lift className="flex flex-col p-5 sticky top-6 bg-surface-2/50 border-dashed">
            <div className="flex items-center gap-2 mb-4">
              <div className="size-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                <Sparkles className="size-4.5" />
              </div>
              <div>
                <h3 className="text-[15px] font-extrabold text-fg">استخراج خودکار</h3>
                <p className="text-[12px] text-fg-3">متنی درباره شرکت خود وارد کنید تا هوش مصنوعی فیلدها را پر کند.</p>
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <Field label="متن برای استخراج">
                <Textarea 
                  value={extractText}
                  onChange={e => setExtractText(e.target.value)}
                  placeholder="متنی دربارهٔ شرکت خود بچسبانید (مثلاً از صفحه درباره ما در وب‌سایتتان)..." 
                  className="min-h-[160px] bg-background leading-relaxed" 
                />
              </Field>
              
              <Button 
                onClick={handleExtract} 
                disabled={isExtracting || !extractText.trim()}
                className="w-full gap-2 bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                {isExtracting ? (
                  <><Loader2 className="size-4 animate-spin" /> در حال تحلیل...</>
                ) : (
                  <><Sparkles className="size-4" /> استخراج از متن</>
                )}
              </Button>

              {extractStatus === 'success' && (
                <div className="flex items-start gap-2 mt-2 p-3 bg-green-50/50 border border-green-200 rounded-xl text-green-700 text-[12px] anim-in">
                  <CheckCircle2 className="size-4 shrink-0 mt-0.5" />
                  <span>اطلاعات با موفقیت استخراج و در فیلدها جایگذاری شد. مقادیر را بررسی و ذخیره کنید.</span>
                </div>
              )}
              {extractStatus === 'error' && (
                <div className="flex items-start gap-2 mt-2 p-3 bg-red-50/50 border border-red-200 rounded-xl text-red-700 text-[12px] anim-in">
                  <AlertCircle className="size-4 shrink-0 mt-0.5" />
                  <span>لطفاً متن معتبری را برای استخراج وارد کنید.</span>
                </div>
              )}
            </div>
          </Card>
        </div>

      </div>
    </div>
  )
}
