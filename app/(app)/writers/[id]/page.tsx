"use client"
import * as React from "react"
import { PageHeader, Card, Button, Input, Textarea, Field, EmptyHint } from "@/components/ui"
import { Fingerprint, Info, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function EditWriterPage() {
  const params = useParams()
  const writerId = params?.id
  
  const [hasFingerprint, setHasFingerprint] = React.useState(false)
  
  return (
    <div className="space-y-6 pb-20">
      <div className="anim-in">
        <Link href="/writers" className="inline-flex items-center gap-1.5 text-[13px] font-bold text-fg-2 hover:text-primary transition-colors mb-4">
          <ArrowRight className="size-4" /> فهرست نویسنده‌ها
        </Link>
        <PageHeader 
          title="ویرایش نویسنده" 
          subtitle="سردبیر ارشد"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Form */}
        <div className="lg:col-span-8 anim-in" style={{ '--i': 1 } as React.CSSProperties}>
          <Card className="p-6">
            <div className="flex flex-col gap-6">
              <Field label="نام">
                <Input defaultValue="سردبیر ارشد" />
              </Field>
              <Field label="بیوگرافی">
                <Textarea 
                  defaultValue="یک نویسنده مجرب با لحنی رسمی و قاطع که برای اخبار و مقالات تحلیلی مناسب است."
                  className="min-h-[100px]" 
                />
              </Field>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Field label="سبک">
                  <Input defaultValue="رسمی و تحلیلی" />
                </Field>
                <Field label="شخصیت">
                  <Input defaultValue="قاطع و حرفه‌ای" />
                </Field>
              </div>

              <Field label="نمونه‌های صدا">
                <Textarea 
                  defaultValue="با توجه به روندهای اخیر بازار، سرمایه‌گذاری در حوزه‌های نوین فناوری اجتناب‌ناپذیر است. تحلیل داده‌ها نشان می‌دهد..."
                  className="min-h-[160px] leading-relaxed" 
                />
              </Field>
              
              <div className="flex justify-end pt-4 border-t border-border">
                <Button className="w-full sm:w-auto px-8">ذخیرهٔ تغییرات</Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-6 anim-in" style={{ '--i': 2 } as React.CSSProperties}>
          
          <Card className="flex flex-col overflow-hidden">
            <div className="bg-surface-2 p-4 border-b border-border flex items-center gap-3">
              <div className="size-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <Fingerprint className="size-4.5" />
              </div>
              <h2 className="text-[15px] font-extrabold text-fg">اثرانگشت صدا</h2>
            </div>
            
            <div className="p-5 flex flex-col gap-5">
              {!hasFingerprint ? (
                <>
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <Fingerprint className="size-10 text-fg-3 mb-3 opacity-50" />
                    <p className="text-[13px] font-bold text-fg-2 mb-1">هنوز استخراج نشده…</p>
                    <p className="text-[11px] text-fg-3">با پردازش نمونه‌های صدا، هوش مصنوعی ویژگی‌های لحن این نویسنده را استخراج می‌کند.</p>
                  </div>
                  <Button 
                    className="w-full gap-2" 
                    variant="ghost" 
                    style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
                    onClick={() => setHasFingerprint(true)}
                  >
                    <Fingerprint className="size-4" /> استخراج اثرانگشت صدا
                  </Button>
                </>
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5 pb-3 border-b border-border/50">
                    <span className="text-[11px] font-bold text-fg-3">رجیستر غالب</span>
                    <span className="text-[13px] font-bold text-fg">رسمی، آکادمیک، خبری</span>
                  </div>
                  <div className="flex flex-col gap-1.5 pb-3 border-b border-border/50">
                    <span className="text-[11px] font-bold text-fg-3">سبک استدلال</span>
                    <span className="text-[13px] font-bold text-fg">داده‌محور و منطقی</span>
                  </div>
                  <div className="flex flex-col gap-1.5 pb-3 border-b border-border/50">
                    <span className="text-[11px] font-bold text-fg-3">دمای احساسی</span>
                    <span className="text-[13px] font-bold text-fg">پایین (سرد و بی‌طرف)</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[11px] font-bold text-fg-3">حرکت‌های رایج</span>
                    <span className="text-[13px] font-bold text-fg">استفاده از آمار، جملات مرکب و مجهول</span>
                  </div>
                  
                  <Button 
                    className="w-full gap-2 mt-2" 
                    variant="ghost" 
                    size="sm"
                    style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
                  >
                    <Fingerprint className="size-3.5" /> استخراج مجدد
                  </Button>
                </div>
              )}
            </div>
          </Card>
          
          <Card className="p-5 bg-surface-2/50 border-dashed border-border flex gap-4">
            <Info className="size-5 text-primary shrink-0" />
            <div className="flex flex-col gap-1">
              <span className="text-[13px] font-bold text-fg">پرسونا چیست؟</span>
              <span className="text-[12px] text-fg-2 leading-relaxed">
                پرسوناها لحن و صدای نوشته‌های شما را تعیین می‌کنند. هوش مصنوعی هنگام تولید محتوا، خودش را در قالب این پرسونا قرار می‌دهد تا متنی یکدست و با شخصیتِ برند شما تولید کند.
              </span>
            </div>
          </Card>

        </div>

      </div>
    </div>
  )
}
