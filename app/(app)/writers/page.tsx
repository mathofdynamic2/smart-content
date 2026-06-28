"use client"
import * as React from "react"
import { PageHeader, Card, Button, Chip, Input, Textarea, Field, EmptyHint } from "@/components/ui"
import { Trash2, Pencil, Users, Plus } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const MOCK_WRITERS = [
  {
    id: 1,
    name: 'سردبیر ارشد',
    isDefault: true,
    bio: 'یک نویسنده مجرب با لحنی رسمی و قاطع که برای اخبار و مقالات تحلیلی مناسب است.',
    style: 'رسمی و تحلیلی',
    personality: 'قاطع و حرفه‌ای'
  },
  {
    id: 2,
    name: 'بلاگر دوستانه',
    isDefault: false,
    bio: 'لحنی صمیمی و محاوره‌ای، مناسب برای شبکه‌های اجتماعی و پست‌های سبک.',
    style: 'محاوره‌ای و صمیمی',
    personality: 'دوستانه و پرانرژی'
  }
]

export default function WritersPage() {
  const [writers, setWriters] = React.useState(MOCK_WRITERS)

  const handleDelete = (id: number) => {
    setWriters(writers.filter(w => w.id !== id))
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="anim-in">
        <PageHeader 
          title="نویسنده‌ها" 
          subtitle="پرسوناهایی که لحن و سبک نوشتن بلاگ‌ها را شکل می‌دهند."
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Writers List Column */}
        <div className="lg:col-span-8 flex flex-col gap-4 anim-in" style={{ '--i': 1 } as React.CSSProperties}>
          {writers.length === 0 ? (
            <EmptyHint 
              icon={Users}
              title="هنوز نویسنده‌ای اضافه نکرده‌اید."
              cta={<p className="text-sm text-fg-3">از فرم کنار، اولین پرسونا را بسازید.</p>}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {writers.map((writer, idx) => (
                <Card key={writer.id} lift className="flex flex-col p-5 anim-in group" style={{ '--i': idx + 2 } as React.CSSProperties}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-[15px] font-extrabold text-fg">{writer.name}</h3>
                      {writer.isDefault && (
                        <Chip tone="blue" className="bg-blue-50 text-blue-600 border-transparent">پیش‌فرض</Chip>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-[13px] text-fg-2 line-clamp-2 leading-relaxed mb-4 flex-1">
                    {writer.bio}
                  </p>
                  
                  <div className="flex flex-col gap-1 mb-5">
                    <p className="text-[11px] text-fg-3"><span className="font-bold text-fg-2">سبک:</span> {writer.style}</p>
                    <p className="text-[11px] text-fg-3"><span className="font-bold text-fg-2">شخصیت:</span> {writer.personality}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-auto pt-4 border-t border-border">
                    <Link href={`/writers/${writer.id}`} className="flex-1">
                      <Button variant="ghost" size="sm" className="w-full gap-2 text-[12px] bg-surface hover:bg-surface-2 border border-border">
                        <Pencil className="size-3.5" /> ویرایش
                      </Button>
                    </Link>
                    <Button 
                      variant="danger" 
                      size="sm" 
                      className="gap-2 text-[12px] bg-surface border border-border px-3"
                      onClick={() => handleDelete(writer.id)}
                    >
                      <Trash2 className="size-3.5" /> حذف
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Add Writer Sidebar */}
        <div className="lg:col-span-4 anim-in" style={{ '--i': 3 } as React.CSSProperties}>
          <Card lift className="flex flex-col p-5 sticky top-6">
            <h2 className="text-[16px] font-extrabold text-fg mb-5 flex items-center gap-2">
              <Plus className="size-4 text-primary" />
              افزودن نویسنده
            </h2>
            
            <div className="flex flex-col gap-4">
              <Field label="نام">
                <Input placeholder="مثلاً: کپی‌رایتر خلاق" />
              </Field>
              <Field label="بیوگرافی">
                <Textarea placeholder="توضیح مختصری درباره این پرسونا..." className="min-h-[80px]" />
              </Field>
              <Field label="سبک">
                <Input placeholder="مثلاً: داستانی و جذاب" />
              </Field>
              <Field label="شخصیت">
                <Input placeholder="مثلاً: شوخ‌طبع و جسور" />
              </Field>
              <Field label="نمونه‌های صدا">
                <Textarea placeholder="چند پاراگراف از نمونه نوشته‌های این شخص برای یادگیری هوش مصنوعی وارد کنید..." className="min-h-[120px]" />
              </Field>
              
              <Button className="w-full mt-2">
                افزودن نویسنده
              </Button>
            </div>
          </Card>
        </div>

      </div>
    </div>
  )
}
