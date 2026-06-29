"use client"
import * as React from "react"
import { 
  Card, Button, Chip, IconBadge, Input, Select, Textarea, Field 
} from "@/components/ui"
import { 
  ArrowRight, Search, Share2, ImageIcon, Bold, Italic, List as ListIcon, 
  ListOrdered, Quote, Undo2, Redo2, Sparkles, Check, Download, Trash2, 
  Copy, Plus, UploadCloud, X, ChevronDown, CheckCircle2, Loader2, Image as ImageLucide
} from "lucide-react"
import { cn, toPersianDigits } from "@/lib/utils"
import Link from "next/link"

export default function EditorPage() {
  const [status, setStatus] = React.useState("پیش‌نویس")
  const [isSaving, setIsSaving] = React.useState(false)
  const [saveSuccess, setSaveSuccess] = React.useState(false)
  
  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 2000)
    }, 1500)
  }

  const [regenOpen, setRegenOpen] = React.useState(false)
  const [isRegenerating, setIsRegenerating] = React.useState(false)
  
  const handleRegen = () => {
    setIsRegenerating(true)
    setTimeout(() => {
      setIsRegenerating(false)
      setRegenOpen(false)
    }, 2500)
  }

  const [enrichTab, setEnrichTab] = React.useState<'seo'|'social'|'media'>('seo')
  
  const [seoScore, setSeoScore] = React.useState<number | null>(null)
  const [isAnalyzingSeo, setIsAnalyzingSeo] = React.useState(false)
  
  const analyzeSeo = () => {
    setIsAnalyzingSeo(true)
    setTimeout(() => {
      setSeoScore(78)
      setIsAnalyzingSeo(false)
    }, 2000)
  }

  const [socialGenerated, setSocialGenerated] = React.useState(false)
  const [imgModalOpen, setImgModalOpen] = React.useState(false)
  const [isGeneratingImg, setIsGeneratingImg] = React.useState(false)
  const [generatedImg, setGeneratedImg] = React.useState<string | null>(null)

  const handleGenerateImg = () => {
    setIsGeneratingImg(true)
    setTimeout(() => {
      setGeneratedImg('https://picsum.photos/seed/generated/400/400')
      setIsGeneratingImg(false)
    }, 3000)
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8 anim-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-fg">ویرایش مقاله</h1>
          <p className="text-fg-2 mt-2">تحلیل بازار تکنولوژی در سال ۲۰۲۴</p>
        </div>
        <Link href="/library">
          <Button variant="ghost" size="sm" className="gap-2 text-fg-3 hover:text-fg">
            <ArrowRight className="size-4" />
            <span>کتابخانه</span>
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* EDITOR COLUMN */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Metadata Bar */}
          <Card lift className="p-5 flex flex-col gap-5 anim-in" style={{ '--i': 1 } as React.CSSProperties}>
            <Field label="عنوان">
              <Input defaultValue="تحلیل بازار تکنولوژی در سال ۲۰۲۴" className="font-bold text-lg h-12" />
            </Field>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="وضعیت">
                <Select value={status} onChange={e => setStatus(e.target.value)}>
                  <option value="پیش‌نویس">پیش‌نویس</option>
                  <option value="زمان‌بندی‌شده">زمان‌بندی‌شده</option>
                  <option value="منتشرشده">منتشرشده</option>
                  <option value="بایگانی">بایگانی</option>
                </Select>
              </Field>
              {status === 'زمان‌بندی‌شده' && (
                <Field label="موعد انتشار">
                  <Input type="datetime-local" className="text-left" dir="ltr" />
                </Field>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="پوشه">
                <Select defaultValue="مقالات بلاگ">
                  <option value="مقالات بلاگ">مقالات بلاگ</option>
                  <option value="اخبار">اخبار</option>
                </Select>
              </Field>
              <Field label="برچسب‌ها">
                <div className="flex flex-wrap gap-2 pt-1.5">
                  <Chip tone="neutral">تکنولوژی <X className="size-3 inline ms-1 cursor-pointer" /></Chip>
                  <Chip tone="neutral">هوش مصنوعی <X className="size-3 inline ms-1 cursor-pointer" /></Chip>
                  <button className="inline-flex items-center justify-center size-6 rounded-md bg-surface-2 hover:bg-border text-fg-3 transition-colors border border-dashed border-border">
                    <Plus className="size-3" />
                  </button>
                </div>
              </Field>
            </div>
            
            <div className="pt-2 flex justify-end">
              <Button 
                onClick={handleSave} 
                disabled={isSaving} 
                className={cn("w-full sm:w-32 transition-all", saveSuccess ? "bg-green-600 hover:bg-green-600" : "")}
              >
                {isSaving ? (
                  <><Loader2 className="size-4 animate-spin ms-2" /> در حال ذخیره...</>
                ) : saveSuccess ? (
                  <><Check className="size-4 ms-2" /> ذخیره شد</>
                ) : (
                  "ذخیره"
                )}
              </Button>
            </div>
          </Card>

          {/* Editor Workspace */}
          <div className="flex flex-col gap-2 anim-in" style={{ '--i': 2 } as React.CSSProperties}>
            
            {/* Toolbar */}
            <Card lift className="flex items-center gap-1.5 p-2 overflow-x-auto scrollbar-none sticky top-6 z-10">
              <Button variant="ghost" size="sm" className="size-9 px-0 shrink-0"><Bold className="size-4" /></Button>
              <Button variant="ghost" size="sm" className="size-9 px-0 shrink-0"><Italic className="size-4" /></Button>
              <Button variant="ghost" size="sm" className="size-9 px-0 shrink-0"><ListIcon className="size-4" /></Button>
              <Button variant="ghost" size="sm" className="size-9 px-0 shrink-0"><ListOrdered className="size-4" /></Button>
              <Button variant="ghost" size="sm" className="size-9 px-0 shrink-0"><Quote className="size-4" /></Button>
              <div className="w-px h-6 bg-border mx-1 shrink-0"></div>
              <Button variant="ghost" size="sm" className="size-9 px-0 shrink-0"><Undo2 className="size-4" /></Button>
              <Button variant="ghost" size="sm" className="size-9 px-0 shrink-0"><Redo2 className="size-4" /></Button>
              <div className="w-px h-6 bg-border mx-1 shrink-0"></div>
              <Button 
                variant="ghost" 
                size="sm" 
                className={cn("gap-2 text-[12px] shrink-0 transition-colors", regenOpen ? "bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700" : "")}
                onClick={() => setRegenOpen(!regenOpen)}
              >
                <Sparkles className="size-4" />
                بازنویسی بخش
              </Button>
            </Card>

            {/* Regen Panel */}
            {regenOpen && (
              <Card lift className="p-4 bg-blue-50/50 border-blue-200 flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Field label="نوع عملیات">
                    <Select defaultValue="بازنویسی" className="bg-white">
                      <option value="بازنویسی">بازنویسی (Reword)</option>
                      <option value="گسترش">گسترش (Expand)</option>
                      <option value="فشرده‌سازی">فشرده‌سازی (Summarize)</option>
                    </Select>
                  </Field>
                  <Field label="دستور اضافی (اختیاری)" className="sm:col-span-2">
                    <Input placeholder="مثلاً: لحن را کمی رسمی‌تر کن..." className="bg-white" />
                  </Field>
                </div>
                
                {isRegenerating && (
                  <div className="p-4 rounded-xl bg-white border border-blue-100 shadow-sm relative overflow-hidden">
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 bg-[length:200%_100%] animate-[shimmer_2s_linear_infinite]" />
                    <div className="flex items-center gap-3 text-blue-600 mb-2">
                      <Sparkles className="size-4 animate-pulse" />
                      <span className="text-[12px] font-bold">هوش مصنوعی در حال بازنویسی است...</span>
                    </div>
                    <div className="space-y-2 opacity-50">
                      <div className="h-2.5 bg-surface-2 rounded-full w-full"></div>
                      <div className="h-2.5 bg-surface-2 rounded-full w-5/6"></div>
                      <div className="h-2.5 bg-surface-2 rounded-full w-4/6"></div>
                    </div>
                  </div>
                )}
                
                <Button 
                  onClick={handleRegen} 
                  disabled={isRegenerating} 
                  className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto self-end"
                >
                  بازتولید
                </Button>
              </Card>
            )}

            {/* Rich Text Area (Mock) */}
            <Card lift className="min-h-[600px] p-6 sm:p-10 cursor-text focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 transition-all">
              <div 
                className="outline-none text-[15px] leading-[2.2] text-fg space-y-6"
                contentEditable 
                dir="rtl"
                suppressContentEditableWarning
              >
                <h1 className="text-3xl font-extrabold mb-6 tracking-tight text-fg leading-snug">
                  آینده‌ی هوش مصنوعی در سازمان‌ها
                </h1>
                <p>
                  در سال‌های اخیر، نفوذ <strong className="font-bold text-fg">هوش مصنوعی (AI)</strong> در ساختارهای سازمانی از یک مزیت رقابتی به یک ضرورت حیاتی تبدیل شده است. شرکت‌های پیشرو در حال بازطراحی فرآیندهای خود برای یکپارچه‌سازی یادگیری ماشین در تمام سطوح تصمیم‌گیری هستند.
                </p>
                
                <h2 className="text-2xl font-bold mt-8 mb-4 tracking-tight text-fg border-b border-border pb-2">
                  ۱. اتوماسیون فرآیندهای پیچیده
                </h2>
                <p>
                  برخلاف گذشته که اتوماسیون تنها به وظایف تکراری و ساده محدود می‌شد، امروز الگوریتم‌های هوش مصنوعی قادرند فرآیندهای شناختی را نیز بر عهده بگیرند. این موضوع شامل تحلیل داده‌های حجیم، پیش‌بینی روندهای بازار و حتی مدیریت منابع انسانی می‌شود.
                </p>
                
                <blockquote className="border-s-4 border-primary ps-4 py-1 my-6 text-fg-2 font-medium bg-primary/5 rounded-e-lg italic">
                  «هوش مصنوعی جایگزین مدیران نمی‌شود، اما مدیرانی که از هوش مصنوعی استفاده می‌کنند، جایگزین مدیرانی خواهند شد که این کار را نمی‌کنند.»
                </blockquote>
                
                <h3 className="text-xl font-bold mt-6 mb-3 text-fg">نقش داده‌ها در این تحول</h3>
                <ul className="list-disc list-inside space-y-2 text-fg-2 ms-2">
                  <li>جمع‌آوری داده‌های ساختاریافته و بدون ساختار</li>
                  <li>پاک‌سازی و پردازش لحظه‌ای</li>
                  <li>استفاده از مدل‌های زبانی بزرگ (LLMs)</li>
                </ul>

                <p className="mt-4">
                  برای پیاده‌سازی موفق، نیاز به زیرساخت‌های ابری قدرتمند است. به عنوان مثال، استفاده از <code className="font-mono text-[13px] bg-surface-2 px-1.5 py-0.5 rounded text-primary" dir="ltr">AWS SageMaker</code> یا <code className="font-mono text-[13px] bg-surface-2 px-1.5 py-0.5 rounded text-primary" dir="ltr">Google Vertex AI</code> می‌تواند زمان توسعه مدل‌ها را تا ۷۰٪ کاهش دهد.
                </p>
              </div>
            </Card>

          </div>
        </div>

        {/* ENRICH SIDEBAR */}
        <div className="lg:col-span-4 flex flex-col gap-6 anim-in" style={{ '--i': 3 } as React.CSSProperties}>
          
          <Card lift className="flex flex-col overflow-hidden sticky top-6 max-h-[calc(100vh-2rem)]">
            
            {/* Tab Bar */}
            <div className="flex items-center border-b border-border bg-surface-2/50">
              <button 
                onClick={() => setEnrichTab('seo')}
                className={cn("flex-1 h-12 flex items-center justify-center gap-2 text-[13px] font-bold transition-colors border-b-2", enrichTab === 'seo' ? "border-primary text-primary bg-background" : "border-transparent text-fg-3 hover:text-fg hover:bg-surface-2")}
              >
                <Search className="size-4" />
                سئو
              </button>
              <button 
                onClick={() => setEnrichTab('social')}
                className={cn("flex-1 h-12 flex items-center justify-center gap-2 text-[13px] font-bold transition-colors border-b-2", enrichTab === 'social' ? "border-primary text-primary bg-background" : "border-transparent text-fg-3 hover:text-fg hover:bg-surface-2")}
              >
                <Share2 className="size-4" />
                شبکه‌های اجتماعی
              </button>
              <button 
                onClick={() => setEnrichTab('media')}
                className={cn("flex-1 h-12 flex items-center justify-center gap-2 text-[13px] font-bold transition-colors border-b-2", enrichTab === 'media' ? "border-primary text-primary bg-background" : "border-transparent text-fg-3 hover:text-fg hover:bg-surface-2")}
              >
                <ImageIcon className="size-4" />
                تصویر
              </button>
            </div>

            {/* Tab Contents */}
            <div className="p-5 flex-1 overflow-y-auto">
              
              {/* SEO TAB */}
              {enrichTab === 'seo' && (
                <div className="flex flex-col gap-6">
                  
                  <div className="flex flex-col gap-3">
                    <Field label="کلمهٔ کلیدی هدف">
                      <Input placeholder="مثلاً: هوش مصنوعی" defaultValue="هوش مصنوعی" />
                    </Field>
                    <Button onClick={analyzeSeo} disabled={isAnalyzingSeo} className="w-full gap-2">
                      {isAnalyzingSeo ? (
                        <><Loader2 className="size-4 animate-spin" /> در حال تحلیل...</>
                      ) : (
                        <><Sparkles className="size-4" /> تحلیل سئو</>
                      )}
                    </Button>
                  </div>

                  <div className="h-px bg-border w-full"></div>

                  {seoScore !== null && !isAnalyzingSeo && (
                    <div className="flex flex-col gap-4 anim-in">
                      <div className="flex items-center justify-between p-4 bg-surface rounded-xl border border-border">
                        <div>
                          <div className="text-[12px] font-bold text-fg-3 uppercase tracking-wider mb-1">نمره کلی سئو</div>
                          <div className={cn("text-3xl font-extrabold tnum", seoScore >= 80 ? "text-green-600" : seoScore >= 50 ? "text-amber-500" : "text-red-500")}>
                            {seoScore} <span className="text-lg text-fg-3 font-medium">/ ۱۰۰</span>
                          </div>
                        </div>
                        <div className="relative size-16">
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                            <path className="text-border" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                            <path className={cn("transition-all duration-1000 ease-out", seoScore >= 80 ? "text-green-500" : seoScore >= 50 ? "text-amber-500" : "text-red-500")} strokeWidth="3" strokeDasharray={`${seoScore}, 100`} stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                          </svg>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-surface-2 rounded-xl text-center">
                          <div className="text-[11px] text-fg-3 mb-1 font-medium">تعداد کلمات</div>
                          <div className="text-lg font-bold text-fg tnum">۱,۲۸۴</div>
                        </div>
                        <div className="p-3 bg-surface-2 rounded-xl text-center">
                          <div className="text-[11px] text-fg-3 mb-1 font-medium">چگالی کلمه کلیدی</div>
                          <div className="text-lg font-bold text-green-600 tnum">۲.۴٪</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-[13px] font-bold text-fg mb-3">پیشنهادات بهبود</h4>
                        <div className="flex items-start gap-2 text-[12px] text-fg-2">
                          <CheckCircle2 className="size-4 text-green-500 shrink-0 mt-0.5" />
                          <span>کلمه کلیدی در پاراگراف اول وجود دارد.</span>
                        </div>
                        <div className="flex items-start gap-2 text-[12px] text-fg-2">
                          <CheckCircle2 className="size-4 text-green-500 shrink-0 mt-0.5" />
                          <span>طول محتوا مناسب است.</span>
                        </div>
                        <div className="flex items-start gap-2 text-[12px] text-amber-600 font-medium">
                          <div className="size-4 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">!</div>
                          <span>از تگ‌های H2 بیشتر برای ساختاردهی استفاده کنید.</span>
                        </div>
                        <div className="flex items-start gap-2 text-[12px] text-red-500 font-medium">
                          <X className="size-4 shrink-0 mt-0.5" />
                          <span>هیچ لینک داخلی در متن وجود ندارد.</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col gap-4">
                    <Field label="عنوان سئو (متا تایتل)">
                      <Input defaultValue="آینده‌ی هوش مصنوعی در سازمان‌ها | تحلیل ۲۰۲۴" />
                      <div className="text-[11px] text-fg-3 text-end">۴۸ / ۶۰ کاراکتر</div>
                    </Field>
                    <Field label="توضیحات متا (متا دسکریپشن)">
                      <Textarea defaultValue="بررسی کامل تاثیر هوش مصنوعی در ساختارهای سازمانی و اتوماسیون فرآیندها در سال ۲۰۲۴. راهنمای پیاده‌سازی و یکپارچه‌سازی." />
                      <div className="text-[11px] text-fg-3 text-end">۱۱۸ / ۱۶۰ کاراکتر</div>
                    </Field>
                  </div>
                </div>
              )}

              {/* SOCIAL TAB */}
              {enrichTab === 'social' && (
                <div className="flex flex-col gap-6">
                  {!socialGenerated ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
                      <div className="size-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        <Share2 className="size-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-fg text-sm">تولید محتوای شبکه‌های اجتماعی</h3>
                        <p className="text-[12px] text-fg-3 mt-1">نسخه‌های متناسب با هر پلتفرم (لینکدین، توییتر، تلگرام) را به کمک هوش مصنوعی بسازید.</p>
                      </div>
                      <Button onClick={() => setSocialGenerated(true)} className="w-full gap-2 mt-2">
                        <Sparkles className="size-4" />
                        تولید پست‌ها
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-5 anim-in">
                      
                      {/* LinkedIn */}
                      <div className="flex flex-col gap-3 p-4 rounded-xl border border-border bg-surface">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="size-6 rounded bg-[#0A66C2] text-white flex items-center justify-center font-bold text-[10px]">in</div>
                            <span className="text-[13px] font-bold text-fg">لینکدین</span>
                          </div>
                          <Chip tone="up">آماده</Chip>
                        </div>
                        <Textarea 
                          className="min-h-[120px] text-[13px]" 
                          defaultValue={`آیا سازمان شما برای موج بعدی تحولات هوش مصنوعی آماده است؟ 🤖\n\nدر مقاله جدیدمان بررسی کرده‌ایم که چگونه شرکت‌های پیشرو در حال استفاده از LLMها برای اتوماسیون فرآیندهای پیچیده هستند.\n\nنکات کلیدی:\n✅ کاهش ۷۰ درصدی زمان توسعه مدل‌ها\n✅ مدیریت هوشمند داده‌ها\n✅ تغییر پارادایم مدیریتی\n\nلینک مقاله در کامنت اول 👇\n\n#هوش_مصنوعی #مدیریت #تکنولوژی`} 
                        />
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="flex-1 text-[12px] h-8 gap-2"><Sparkles className="size-3.5"/> تولید دوباره</Button>
                          <Button variant="ghost" size="sm" className="flex-1 text-[12px] h-8 gap-2"><Copy className="size-3.5"/> کپی متن</Button>
                        </div>
                      </div>

                      {/* X / Twitter */}
                      <div className="flex flex-col gap-3 p-4 rounded-xl border border-border bg-surface">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="size-6 rounded bg-black text-white flex items-center justify-center font-bold text-[12px]">𝕏</div>
                            <span className="text-[13px] font-bold text-fg">توییتر (X)</span>
                          </div>
                          <Chip tone="up">آماده</Chip>
                        </div>
                        <Textarea 
                          className="min-h-[100px] text-[13px]" 
                          defaultValue={`«هوش مصنوعی جایگزین مدیران نمی‌شود، مدیرانی که از هوش مصنوعی استفاده می‌کنند، جایگزین بقیه می‌شوند.»\n\nدر مقاله جدید بررسی کردیم چطور اتوماسیون سازمانی در ۲۰۲۴ تغییر کرده است. 🧵👇\n\n🔗 [لینک]`} 
                        />
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="flex-1 text-[12px] h-8 gap-2"><Sparkles className="size-3.5"/> تولید دوباره</Button>
                          <Button variant="ghost" size="sm" className="flex-1 text-[12px] h-8 gap-2"><Copy className="size-3.5"/> کپی متن</Button>
                        </div>
                      </div>

                      {/* Instagram */}
                      <div className="flex flex-col gap-3 p-4 rounded-xl border border-border bg-surface">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="size-6 rounded bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] text-white flex items-center justify-center font-bold text-[12px]">
                              <svg className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                            </div>
                            <span className="text-[13px] font-bold text-fg">اینستاگرام</span>
                          </div>
                          <Chip tone="up">آماده</Chip>
                        </div>
                        <Textarea 
                          className="min-h-[100px] text-[13px]" 
                          defaultValue={`هوش مصنوعی چه تاثیری در ساختارهای سازمانی ما دارد؟ 🚀\n\nبرای خواندن مقاله لینک بایو را چک کنید.\n\n#هوش_مصنوعی #تکنولوژی #سازمان`} 
                        />
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="flex-1 text-[12px] h-8 gap-2"><Sparkles className="size-3.5"/> تولید دوباره</Button>
                          <Button variant="ghost" size="sm" className="flex-1 text-[12px] h-8 gap-2"><Copy className="size-3.5"/> کپی متن</Button>
                        </div>
                      </div>

                      {/* Telegram */}
                      <div className="flex flex-col gap-3 p-4 rounded-xl border border-border bg-surface">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="size-6 rounded bg-[#229ED9] text-white flex items-center justify-center font-bold text-[12px]">
                              <svg className="size-3.5 ms-[-2px] mt-[1px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .24z"/></svg>
                            </div>
                            <span className="text-[13px] font-bold text-fg">تلگرام</span>
                          </div>
                          <Chip tone="up">آماده</Chip>
                        </div>
                        <Textarea 
                          className="min-h-[80px] text-[13px]" 
                          defaultValue={`🚀 آینده‌ی هوش مصنوعی در سازمان‌ها\n\nمقاله جدید ما منتشر شد. برای مطالعه روی لینک زیر کلیک کنید:\n\n🔗 [لینک مقاله]`} 
                        />
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="flex-1 text-[12px] h-8 gap-2"><Sparkles className="size-3.5"/> تولید دوباره</Button>
                          <Button variant="ghost" size="sm" className="flex-1 text-[12px] h-8 gap-2"><Copy className="size-3.5"/> کپی متن</Button>
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              )}

              {/* MEDIA TAB */}
              {enrichTab === 'media' && (
                <div className="flex flex-col gap-6">
                  
                  <div className="border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center text-center bg-surface hover:bg-surface-2 hover:border-primary/50 transition-colors cursor-pointer group">
                    <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <UploadCloud className="size-5" />
                    </div>
                    <div className="text-[13px] font-bold text-fg">آپلود تصویر جدید</div>
                    <div className="text-[11px] text-fg-3 mt-1">فرمت‌های پشتیبانی شده: JPG, PNG, WebP</div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="h-px bg-border flex-1"></div>
                    <span className="text-[12px] font-bold text-fg-3 uppercase tracking-wider">یا</span>
                    <div className="h-px bg-border flex-1"></div>
                  </div>

                  <Button onClick={() => setImgModalOpen(true)} className="w-full gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
                    <Sparkles className="size-4" />
                    تولید تصویر با هوش مصنوعی
                  </Button>

                  <div className="mt-4 space-y-4">
                    <h4 className="text-[13px] font-bold text-fg">رسانه‌های استفاده شده</h4>
                    
                    <div className="grid grid-cols-2 gap-3">
                      
                      {/* Media Item */}
                      <div className="group relative aspect-square rounded-xl overflow-hidden border border-border bg-surface-2 flex items-center justify-center">
                        <ImageLucide className="size-8 text-fg-3 opacity-50" />
                        <img src="https://picsum.photos/seed/tech1/400/400" className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-80" alt="Tech" />
                        
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                          <button className="h-7 px-3 bg-white/20 hover:bg-white text-white hover:text-black rounded-xl text-[11px] font-bold backdrop-blur-sm transition-colors">استفاده در متن</button>
                          <div className="flex gap-2">
                            <button className="size-7 rounded-xl bg-white/20 hover:bg-white text-white hover:text-black flex items-center justify-center backdrop-blur-sm transition-colors"><Download className="size-3.5" /></button>
                            <button className="size-7 rounded-xl bg-red-500/80 hover:bg-red-500 text-white flex items-center justify-center backdrop-blur-sm transition-colors"><Trash2 className="size-3.5" /></button>
                          </div>
                        </div>
                      </div>

                      {/* Media Item */}
                      <div className="group relative aspect-square rounded-xl overflow-hidden border border-border bg-surface-2 flex items-center justify-center">
                        <ImageLucide className="size-8 text-fg-3 opacity-50" />
                        <img src="https://picsum.photos/seed/tech2/400/400" className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-80" alt="Tech" />
                        
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                          <button className="h-7 px-3 bg-white/20 hover:bg-white text-white hover:text-black rounded-xl text-[11px] font-bold backdrop-blur-sm transition-colors">استفاده در متن</button>
                          <div className="flex gap-2">
                            <button className="size-7 rounded-xl bg-white/20 hover:bg-white text-white hover:text-black flex items-center justify-center backdrop-blur-sm transition-colors"><Download className="size-3.5" /></button>
                            <button className="size-7 rounded-xl bg-red-500/80 hover:bg-red-500 text-white flex items-center justify-center backdrop-blur-sm transition-colors"><Trash2 className="size-3.5" /></button>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              )}
            </div>

          </Card>
        </div>

      </div>

      {/* Image Generation Modal */}
      {imgModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm anim-in">
          <Card lift className="w-full max-w-lg bg-background flex flex-col shadow-xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-bold text-fg">تولید تصویر با هوش مصنوعی</h3>
              <button onClick={() => setImgModalOpen(false)} className="text-fg-3 hover:text-fg transition-colors">
                <X className="size-5" />
              </button>
            </div>
            
            <div className="p-5 flex flex-col gap-5">
              {!generatedImg && !isGeneratingImg && (
                <Field label="توصیف تصویر (پرامپت)">
                  <Textarea 
                    className="min-h-[120px]" 
                    placeholder="یک دفتر کار مدرن با نور طبیعی، یک لپتاپ روی میز، تم رنگی آبی و خاکستری..." 
                    defaultValue="دفتر کار مدرن با هوش مصنوعی، گرافیک وکتور مینی‌مال، رنگ‌های سازمانی"
                  />
                </Field>
              )}

              {isGeneratingImg && (
                <div className="aspect-video w-full rounded-xl bg-surface-2 border border-border flex flex-col items-center justify-center gap-3 anim-in">
                  <div className="size-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                    <Sparkles className="size-6 animate-pulse" />
                  </div>
                  <div className="text-[13px] font-bold text-fg">در حال خلق تصویر...</div>
                  <div className="text-[11px] text-fg-3">ممکن است چند ثانیه طول بکشد</div>
                </div>
              )}

              {generatedImg && !isGeneratingImg && (
                <div className="flex flex-col gap-4 anim-in">
                  <div className="aspect-video w-full rounded-xl overflow-hidden border border-border relative group">
                    <img src={generatedImg} alt="Generated" className="w-full h-full object-cover" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-border bg-surface flex items-center justify-end gap-3">
              <Button variant="ghost" onClick={() => setImgModalOpen(false)}>انصراف</Button>
              {!generatedImg && !isGeneratingImg && (
                <Button onClick={handleGenerateImg} className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
                  <Sparkles className="size-4" /> تولید تصویر
                </Button>
              )}
              {generatedImg && !isGeneratingImg && (
                <>
                  <Button variant="ghost" onClick={handleGenerateImg} className="gap-2 text-[12px]"><Sparkles className="size-4" /> تولید مجدد</Button>
                  <Button onClick={() => { setImgModalOpen(false); setGeneratedImg(null) }} className="gap-2"><Check className="size-4" /> ذخیره در رسانه‌ها</Button>
                </>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
