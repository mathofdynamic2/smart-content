"use client"
import * as React from "react"
import { Card, Button, Input, Select, Textarea, Field, Chip, IconBadge } from "@/components/ui"
import { Search, Plus, Sparkles, FileText, Newspaper, Package, Lightbulb, Clock, CheckCircle2, ChevronLeft, Check, Play, Pause, X } from "lucide-react"

const DAILY_NEWS = [
  { id: 1, title: "هوش مصنوعی گوگل با مدل جدید جمنای وارد رقابت شد", source: "The Verge", time: "۲ ساعت پیش", keyword: "هوش مصنوعی" },
  { id: 2, title: "افزایش فروش خودروهای الکتریکی در سه ماهه اول ۲۰۲۴", source: "Bloomberg", time: "۵ ساعت پیش", keyword: "خودرو" },
  { id: 3, title: "تحلیل بازار مسکن تهران در اردیبهشت ماه", source: "دنیای اقتصاد", time: "دیروز", keyword: "اقتصاد" },
]

export default function CreatePage() {
  const [activeTab, setActiveTab] = React.useState("news")
  const [step, setStep] = React.useState(1)
  const [isGenerating, setIsGenerating] = React.useState(false)
  const [generationDone, setGenerationDone] = React.useState(false)

  // Modals
  const [readerOpen, setReaderOpen] = React.useState(false)
  const [selectedNews, setSelectedNews] = React.useState<any>(null)

  const handleStartGeneration = () => {
    setIsGenerating(true)
    setStep(3)
    setTimeout(() => {
      setIsGenerating(false)
      setGenerationDone(true)
    }, 4000)
  }

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto pb-20">
      
      {/* Header & Tabs */}
      <div className="flex flex-col gap-5 anim-in" style={{ '--i': 1 } as React.CSSProperties}>
        <h1 className="text-2xl font-extrabold text-fg">ساخت محتوای جدید</h1>
        
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 border-b border-border">
          <button 
            onClick={() => { setActiveTab("news"); setStep(1); setGenerationDone(false) }}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 text-[13px] font-bold whitespace-nowrap transition-colors ${activeTab === "news" ? "border-primary text-primary" : "border-transparent text-fg-3 hover:text-fg"}`}
          >
            <Newspaper className="size-4" />
            اخبار روزانه
          </button>
          <button 
            onClick={() => { setActiveTab("research"); setStep(1); setGenerationDone(false) }}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 text-[13px] font-bold whitespace-nowrap transition-colors ${activeTab === "research" ? "border-primary text-primary" : "border-transparent text-fg-3 hover:text-fg"}`}
          >
            <Search className="size-4" />
            تحقیق عمیق
          </button>
          <button 
            onClick={() => { setActiveTab("product"); setStep(1); setGenerationDone(false) }}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 text-[13px] font-bold whitespace-nowrap transition-colors ${activeTab === "product" ? "border-primary text-primary" : "border-transparent text-fg-3 hover:text-fg"}`}
          >
            <Package className="size-4" />
            از روی محصول
          </button>
          <button 
            onClick={() => { setActiveTab("manual"); setStep(1); setGenerationDone(false) }}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 text-[13px] font-bold whitespace-nowrap transition-colors ${activeTab === "manual" ? "border-primary text-primary" : "border-transparent text-fg-3 hover:text-fg"}`}
          >
            <FileText className="size-4" />
            ایده دستی
          </button>
        </div>
      </div>

      {/* STAGE 3: GENERATION (Shared) */}
      {step === 3 && (
        <Card lift className="p-8 flex flex-col gap-8 anim-in bg-surface-2/30 border-primary/20">
          <div className="flex flex-col items-center justify-center text-center gap-4 py-8">
            {isGenerating ? (
              <>
                <div className="relative size-16 flex items-center justify-center">
                  <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
                  <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin" />
                  <Sparkles className="size-6 text-primary animate-pulse" />
                </div>
                <h2 className="text-xl font-extrabold text-fg">در حال تولید محتوا...</h2>
                <p className="text-[13px] text-fg-3 max-w-sm">
                  هوش مصنوعی در حال بررسی منابع، ساختاردهی و نگارش محتوای شماست. این کار ممکن است چند ثانیه طول بکشد.
                </p>
                <div className="flex flex-col gap-2 w-full max-w-xs text-start mt-4">
                  <div className="flex items-center gap-2 text-[12px] font-bold text-fg-2"><CheckCircle2 className="size-4 text-green-500" /> جمع‌آوری اطلاعات</div>
                  <div className="flex items-center gap-2 text-[12px] font-bold text-fg-2"><CheckCircle2 className="size-4 text-green-500" /> ساختاردهی اولیه</div>
                  <div className="flex items-center gap-2 text-[12px] font-bold text-primary animate-pulse"><Sparkles className="size-4" /> نگارش متن اصلی...</div>
                </div>
              </>
            ) : (
              <>
                <div className="size-16 bg-green-500/10 text-green-600 rounded-xl flex items-center justify-center mb-2">
                  <Check className="size-8" />
                </div>
                <h2 className="text-xl font-extrabold text-fg">محتوا با موفقیت تولید شد!</h2>
                <p className="text-[13px] text-fg-3">پیش‌نویس شما آماده است. می‌توانید آن را در ویرایشگر باز کنید.</p>
                <div className="flex items-center gap-3 mt-4">
                  <Button variant="outline" onClick={() => setStep(1)} className="rounded-xl px-6">بازگشت</Button>
                  <Button className="rounded-xl px-6 gap-2"><FileText className="size-4" /> باز کردن در ویرایشگر</Button>
                </div>
              </>
            )}
          </div>
        </Card>
      )}

      {/* STAGE 1 & 2: INPUTS */}
      {step < 3 && activeTab === "news" && (
        <div className="flex flex-col gap-6 anim-in" style={{ '--i': 2 } as React.CSSProperties}>
          
          <div className="flex items-center justify-between sticky top-[60px] z-10 bg-background/80 backdrop-blur-xl py-3 border-b border-border">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
              <span className="text-[12px] font-bold text-fg-3 whitespace-nowrap ms-1">کلیدواژه‌ها:</span>
              <Chip tone="primary">همه</Chip>
              <Chip tone="neutral" className="hover:bg-surface-2 cursor-pointer">هوش مصنوعی</Chip>
              <Chip tone="neutral" className="hover:bg-surface-2 cursor-pointer">اقتصاد</Chip>
              <Chip tone="neutral" className="hover:bg-surface-2 cursor-pointer">خودرو</Chip>
            </div>
            <Button size="sm" variant="outline" className="rounded-xl h-8 text-[11px] gap-1.5 shrink-0 bg-surface">
              <Clock className="size-3" />
              دریافت جدید
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DAILY_NEWS.map((news) => (
              <Card lift key={news.id} className="p-4 flex flex-col gap-4 group cursor-pointer" onClick={() => { setSelectedNews(news); setReaderOpen(true) }}>
                <div className="flex items-center justify-between">
                  <Chip tone="neutral" className="text-[10px]">{news.keyword}</Chip>
                  <span className="text-[11px] text-fg-3">{news.time}</span>
                </div>
                <h3 className="text-[14px] font-bold text-fg leading-relaxed group-hover:text-primary transition-colors line-clamp-2">
                  {news.title}
                </h3>
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/50">
                  <span className="text-[11px] font-bold text-fg-2">{news.source}</span>
                  <Button variant="ghost" size="sm" className="h-7 px-2 text-[11px] rounded-xl">خواندن</Button>
                </div>
              </Card>
            ))}
          </div>

        </div>
      )}

      {step < 3 && activeTab !== "news" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 anim-in" style={{ '--i': 2 } as React.CSSProperties}>
          
          {/* Main Form */}
          <Card lift className="lg:col-span-2 p-6 flex flex-col gap-6">
            <h2 className="text-[16px] font-extrabold text-fg border-b border-border pb-4">تنظیمات محتوا</h2>
            
            {activeTab === "research" && (
              <Field label="موضوع تحقیق">
                <Input placeholder="مثال: تاثیر هوش مصنوعی در پزشکی..." className="text-[13px]" />
              </Field>
            )}

            {activeTab === "product" && (
              <Field label="انتخاب محصول">
                <Select className="text-[13px]">
                  <option>نرم‌افزار حسابداری ابری</option>
                  <option>اپلیکیشن مدیریت وظایف</option>
                  <option>بسته آموزشی سئو</option>
                </Select>
              </Field>
            )}

            {activeTab === "manual" && (
              <Field label="ایده یا خلاصه مطلب">
                <Textarea placeholder="درباره چه چیزی می‌خواهید بنویسید؟ ساختار یا ایده اصلی را اینجا وارد کنید..." className="h-32 text-[13px]" />
              </Field>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2">
              <Field label="نویسنده (پرسونا)">
                <Select className="text-[13px]">
                  <option>نویسنده رسمی و شرکتی</option>
                  <option>وبلاگ‌نویس صمیمی</option>
                  <option>متخصص فنی</option>
                </Select>
              </Field>
              <Field label="لحن">
                <Select className="text-[13px]">
                  <option>آموزنده و تحلیلی</option>
                  <option>ترغیب‌کننده و فروش</option>
                  <option>خبری و اطلاع‌رسانی</option>
                </Select>
              </Field>
            </div>
            
            <div className="flex items-center justify-end pt-4 border-t border-border">
              <Button onClick={() => setStep(2)} className="rounded-xl px-8 gap-2">
                مرحله بعد
                <ChevronLeft className="size-4" />
              </Button>
            </div>
          </Card>

          {/* Sidebar Guidelines */}
          <div className="flex flex-col gap-4">
            <Card lift className="p-5 bg-indigo-500/5 border-indigo-500/20 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-indigo-600">
                <Lightbulb className="size-4.5" />
                <h3 className="text-[13px] font-bold">نکات تولید محتوا</h3>
              </div>
              <ul className="text-[12px] text-fg-2 flex flex-col gap-2.5 list-disc ps-4 leading-relaxed">
                <li>سعی کنید موضوع را تا حد امکان دقیق و جزئی بنویسید.</li>
                <li>انتخاب نویسنده مناسب تاثیر زیادی در خروجی دارد.</li>
                <li>در مرحله بعد می‌توانید کلمات کلیدی سئو را تنظیم کنید.</li>
              </ul>
            </Card>
          </div>

        </div>
      )}

      {/* STEP 2: BRIEF & SEO */}
      {step === 2 && activeTab !== "news" && (
        <Card lift className="p-6 flex flex-col gap-6 anim-in" style={{ '--i': 3 } as React.CSSProperties}>
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <Button variant="ghost" size="sm" onClick={() => setStep(1)} className="size-8 p-0 rounded-xl bg-surface hover:bg-surface-2"><ChevronLeft className="size-4 rotate-180" /></Button>
            <h2 className="text-[16px] font-extrabold text-fg">تنظیمات تکمیلی و سئو</h2>
          </div>
          
          <Field label="کلمات کلیدی سئو (با کاما جدا کنید)">
            <Input placeholder="مثال: هوش مصنوعی، پزشکی، آینده، تکنولوژی" className="text-[13px]" />
          </Field>
          
          <Field label="طول محتوا">
            <Select className="text-[13px]">
              <option>کوتاه (حدود ۵۰۰ کلمه)</option>
              <option>متوسط (حدود ۱۰۰۰ کلمه)</option>
              <option>بلند و جامع (بیش از ۱۵۰۰ کلمه)</option>
            </Select>
          </Field>

          <Field label="دستورالعمل‌های اضافه (اختیاری)">
            <Textarea placeholder="نکات خاصی که می‌خواهید هوش مصنوعی در نظر بگیرد..." className="h-24 text-[13px]" />
          </Field>

          <div className="flex justify-end pt-4">
            <Button onClick={handleStartGeneration} className="rounded-xl px-8 gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-md">
              <Sparkles className="size-4" />
              تولید محتوا
            </Button>
          </div>
        </Card>
      )}

      {/* Reader Modal (For News) */}
      {readerOpen && selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm anim-in">
          <Card className="w-full max-w-3xl bg-surface flex flex-col shadow-2xl h-[90vh] md:h-[80vh] overflow-hidden rounded-xl">
            <div className="flex items-center justify-between p-4 border-b border-border bg-surface-2/50">
              <div className="flex items-center gap-3">
                <Chip tone="neutral">{selectedNews.keyword}</Chip>
                <span className="text-[12px] font-bold text-fg-3">{selectedNews.source}</span>
              </div>
              <button onClick={() => setReaderOpen(false)} className="size-8 flex items-center justify-center rounded-xl hover:bg-border/50 text-fg-3 hover:text-fg transition-colors">
                <X className="size-4.5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 md:p-10 flex flex-col gap-6">
              <h1 className="text-2xl md:text-3xl font-extrabold text-fg leading-tight">
                {selectedNews.title}
              </h1>
              <div className="prose prose-sm md:prose-base prose-neutral dark:prose-invert max-w-none text-[15px] leading-loose text-fg-2">
                <p>این یک متن آزمایشی برای خبر است. در سیستم واقعی اینجا محتوای کامل استخراج شده از لینک خبر قرار می‌گیرد که توسط هوش مصنوعی خوانده و خلاصه شده است.</p>
                <p>پلتفرم محتوای هوشمند می‌تواند این اخبار را تبدیل به یک مقاله وبلاگی، یک پست لینکدین یا یک رشته توییت کند. شما در پایین صفحه می‌توانید خروجی مورد نظر خود را انتخاب کنید.</p>
                <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.</p>
              </div>
            </div>

            <div className="p-5 border-t border-border bg-surface-2/30 flex flex-col sm:flex-row items-center gap-4 justify-between shrink-0">
              <span className="text-[13px] font-bold text-fg">تبدیل این خبر به:</span>
              <div className="flex flex-wrap items-center gap-2">
                <Button onClick={() => { setReaderOpen(false); handleStartGeneration() }} variant="outline" size="sm" className="rounded-xl gap-2 bg-surface">
                  <FileText className="size-4 text-primary" />
                  مقاله وبلاگ
                </Button>
                <Button onClick={() => { setReaderOpen(false); handleStartGeneration() }} variant="outline" size="sm" className="rounded-xl gap-2 bg-surface">
                  <Play className="size-4 text-indigo-500" />
                  پست لینکدین
                </Button>
                <Button onClick={() => { setReaderOpen(false); handleStartGeneration() }} variant="outline" size="sm" className="rounded-xl gap-2 bg-surface">
                  <Sparkles className="size-4 text-emerald-500" />
                  رشته توییت
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

    </div>
  )
}
