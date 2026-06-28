"use client"
import * as React from "react"
import { PageHeader, Card, Button, Chip, Input, Textarea, Field, Select, EmptyHint } from "@/components/ui"
import { Trash2, Pencil, Package, Plus } from "lucide-react"
import Link from "next/link"

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'تلفن هوشمند X-Pro',
    summary: 'نسل جدید تلفن‌های هوشمند با دوربین ۱۰۰ مگاپیکسلی و پردازنده ۸ هسته‌ای.',
    techDetails: 'صفحه‌نمایش OLED ۶.۷ اینچی، باتری ۵۰۰۰ میلی‌آمپر، پشتیبانی از 5G.',
    category: 'الکترونیک',
    status: 'فعال'
  },
  {
    id: 2,
    name: 'ساعت هوشمند FitBand v2',
    summary: 'ردیاب سلامتی با قابلیت پایش خواب و ضربان قلب به‌صورت ۲۴ ساعته.',
    techDetails: 'مقاوم در برابر آب تا ۵۰ متر، عمر باتری ۷ روزه، بلوتوث نسخه ۵.',
    category: 'گجت پوشیدنی',
    status: 'بایگانی'
  }
]

export default function ProductsPage() {
  const [products, setProducts] = React.useState(MOCK_PRODUCTS)

  const handleDelete = (id: number) => {
    setProducts(products.filter(p => p.id !== id))
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="anim-in">
        <PageHeader 
          title="محصولات" 
          subtitle="محصولاتی که ایجنت «معرفی محصول» دربارهٔ آنها مقاله می‌نویسد."
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Products List Column */}
        <div className="lg:col-span-8 flex flex-col gap-4 anim-in" style={{ '--i': 1 } as React.CSSProperties}>
          {products.length === 0 ? (
            <EmptyHint 
              icon={Package}
              title="هنوز محصولی ثبت نکرده‌اید."
              cta={<p className="text-sm text-fg-3">از فرم کنار، اولین محصول را اضافه کنید.</p>}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {products.map((product, idx) => (
                <Card key={product.id} lift className="flex flex-col p-5 anim-in group" style={{ '--i': idx + 2 } as React.CSSProperties}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-[15px] font-extrabold text-fg">{product.name}</h3>
                      {product.status === 'بایگانی' && (
                        <Chip tone="neutral" className="bg-surface-2 text-fg-3 border-border">بایگانی</Chip>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-[13px] text-fg-2 line-clamp-2 leading-relaxed mb-4 flex-1">
                    {product.summary}
                  </p>
                  
                  <div className="flex flex-col gap-1 mb-5">
                    <p className="text-[11px] text-fg-3"><span className="font-bold text-fg-2">دسته‌بندی:</span> {product.category}</p>
                    <p className="text-[11px] text-fg-3 line-clamp-1" title={product.techDetails}><span className="font-bold text-fg-2">جزئیات:</span> {product.techDetails}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-auto pt-4 border-t border-border">
                    <Link href={`/products/${product.id}`} className="flex-1">
                      <Button variant="ghost" size="sm" className="w-full gap-2 text-[12px] bg-surface hover:bg-surface-2 border border-border">
                        <Pencil className="size-3.5" /> ویرایش
                      </Button>
                    </Link>
                    <Button 
                      variant="danger" 
                      size="sm" 
                      className="gap-2 text-[12px] bg-surface border border-border px-3"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 className="size-3.5" /> حذف
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Add Product Sidebar */}
        <div className="lg:col-span-4 anim-in" style={{ '--i': 3 } as React.CSSProperties}>
          <Card lift className="flex flex-col p-5 sticky top-6">
            <h2 className="text-[16px] font-extrabold text-fg mb-5 flex items-center gap-2">
              <Plus className="size-4 text-primary" />
              افزودن محصول جدید
            </h2>
            
            <div className="flex flex-col gap-4">
              <Field label="نام محصول">
                <Input placeholder="مثلاً: تلفن هوشمند X-Pro" />
              </Field>
              <Field label="خلاصه">
                <Textarea placeholder="توضیح مختصری درباره این محصول..." className="min-h-[80px]" />
              </Field>
              <Field label="جزئیات فنی">
                <Textarea placeholder="مشخصات فنی و ویژگی‌های کلیدی..." className="min-h-[100px]" />
              </Field>
              <Field label="دسته‌بندی">
                <Input placeholder="مثلاً: الکترونیک، گجت..." />
              </Field>
              <Field label="وضعیت">
                <Select defaultValue="فعال">
                  <option value="فعال">فعال</option>
                  <option value="بایگانی">بایگانی</option>
                </Select>
              </Field>
              
              <Button className="w-full mt-2">
                اضافهٔ محصول جدید
              </Button>
            </div>
          </Card>
        </div>

      </div>
    </div>
  )
}
