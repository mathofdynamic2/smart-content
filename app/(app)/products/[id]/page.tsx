"use client"
import * as React from "react"
import { PageHeader, Card, Button, Input, Textarea, Field, Select } from "@/components/ui"
import { Info, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function EditProductPage() {
  const params = useParams()
  const productId = params?.id
  
  return (
    <div className="space-y-6 pb-20">
      <div className="anim-in">
        <Link href="/products" className="inline-flex items-center gap-1.5 text-[13px] font-bold text-fg-2 hover:text-primary transition-colors mb-4">
          <ArrowRight className="size-4" /> فهرست محصولات
        </Link>
        <PageHeader 
          title="ویرایش محصول" 
          subtitle="تلفن هوشمند X-Pro"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Form */}
        <div className="lg:col-span-8 anim-in" style={{ '--i': 1 } as React.CSSProperties}>
          <Card className="p-6">
            <div className="flex flex-col gap-6">
              <Field label="نام محصول">
                <Input defaultValue="تلفن هوشمند X-Pro" />
              </Field>
              <Field label="خلاصه">
                <Textarea 
                  defaultValue="نسل جدید تلفن‌های هوشمند با دوربین ۱۰۰ مگاپیکسلی و پردازنده ۸ هسته‌ای."
                  className="min-h-[100px]" 
                />
              </Field>
              <Field label="جزئیات فنی">
                <Textarea 
                  defaultValue="صفحه‌نمایش OLED ۶.۷ اینچی، باتری ۵۰۰۰ میلی‌آمپر، پشتیبانی از 5G. مجهز به حسگر اثر انگشت زیر نمایشگر و شارژ سریع ۱۲۰ واتی."
                  className="min-h-[120px] leading-relaxed" 
                />
              </Field>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Field label="دسته‌بندی">
                  <Input defaultValue="الکترونیک" />
                </Field>
                <Field label="وضعیت">
                  <Select defaultValue="فعال">
                    <option value="فعال">فعال</option>
                    <option value="بایگانی">بایگانی</option>
                  </Select>
                </Field>
              </div>

              <div className="flex justify-end pt-4 border-t border-border">
                <Button className="w-full sm:w-auto px-8">ذخیرهٔ تغییرات</Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-6 anim-in" style={{ '--i': 2 } as React.CSSProperties}>
          <Card className="p-5 bg-surface-2/50 border-dashed border-border flex gap-4 sticky top-6">
            <Info className="size-5 text-primary shrink-0" />
            <div className="flex flex-col gap-1">
              <span className="text-[13px] font-bold text-fg">نقش جزئیات محصول</span>
              <span className="text-[12px] text-fg-2 leading-relaxed">
                جزئیات فنی و توضیح محصول، پایه‌ مقالههای «معرفی محصول» است. هر چه دقیق‌تر این بخش‌ها را پر کنید، مقاله‌ تولیدشده غنی‌تر و دقیق‌تر خواهد بود.
              </span>
            </div>
          </Card>
        </div>

      </div>
    </div>
  )
}
