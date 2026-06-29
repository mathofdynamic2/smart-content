"use client"
import * as React from "react"
import { Card, Button, Chip } from "@/components/ui"
import { FileText, TrendingUp, Users, Calendar, Plus, ExternalLink, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react"
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar,
  PieChart, Pie, Cell
} from "recharts"

const TREND_DATA = [
  { name: '۱ خرداد', value: 12 },
  { name: '۲ خرداد', value: 19 },
  { name: '۳ خرداد', value: 15 },
  { name: '۴ خرداد', value: 25 },
  { name: '۵ خرداد', value: 22 },
  { name: '۶ خرداد', value: 30 },
  { name: '۷ خرداد', value: 28 },
]

const STATUS_DATA = [
  { name: 'شنبه', published: 4, draft: 2 },
  { name: 'یکشنبه', published: 6, draft: 1 },
  { name: 'دوشنبه', published: 3, draft: 4 },
  { name: 'سه‌شنبه', published: 8, draft: 0 },
  { name: 'چهارشنبه', published: 5, draft: 2 },
  { name: 'پنجشنبه', published: 7, draft: 1 },
  { name: 'جمعه', published: 2, draft: 3 },
]

const SOURCE_DATA = [
  { name: 'تحقیق عمیق', value: 45, color: '#3b82f6' },
  { name: 'اخبار روزانه', value: 30, color: '#10b981' },
  { name: 'محصولات', value: 15, color: '#8b5cf6' },
  { name: 'دستی', value: 10, color: '#f59e0b' },
]

const GAUGE_DATA = [
  { name: 'Published', value: 75, color: '#10b981' },
  { name: 'Remaining', value: 25, color: '#f3f4f6' }, // fallback for light mode, normally use css variable
]

const ACTIVITIES = [
  { title: "مقاله «آینده هوش مصنوعی در ایران» منتشر شد.", time: "۲ ساعت پیش", user: "مریم احمدی" },
  { title: "پیش‌نویس «بررسی بازار خودرو» ایجاد شد.", time: "۴ ساعت پیش", user: "سیستم" },
  { title: "کمپین ایمیلی ماهانه زمان‌بندی شد.", time: "دیروز", user: "علی حسینی" },
  { title: "گزارش سئو برای وبلاگ اصلی به‌روز شد.", time: "دیروز", user: "سیستم" },
]

export default function OverviewPage() {
  return (
    <div className="flex flex-col gap-6">
      
      {/* Quick Launch */}
      <div className="flex items-center gap-3 overflow-x-auto scrollbar-none pb-2 anim-in" style={{ '--i': 1 } as React.CSSProperties}>
        <Button size="sm" className="gap-2 shrink-0 rounded-xl px-5"><Plus className="size-4" /> محتوای جدید</Button>
        <Button variant="outline" size="sm" className="gap-2 shrink-0 rounded-xl bg-surface"><FileText className="size-4" /> از روی محصول</Button>
        <Button variant="outline" size="sm" className="gap-2 shrink-0 rounded-xl bg-surface"><Calendar className="size-4" /> زمان‌بندی هفتگی</Button>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 anim-in" style={{ '--i': 2 } as React.CSSProperties}>
        <Card lift className="p-5 flex flex-col gap-4 relative overflow-hidden bg-[#2563eb] text-white border-transparent">
          <div className="absolute -end-4 -top-4 size-32 bg-white/10 rounded-full blur-2xl" />
          <div className="flex items-center justify-between relative z-10">
            <span className="text-[13px] font-bold text-white/90">تولید این ماه</span>
            <Chip className="bg-white/20 text-white border-white/10 gap-1 backdrop-blur-md">
              <ArrowUpRight className="size-3" />
              ۱۲٪
            </Chip>
          </div>
          <div className="flex items-end gap-2 relative z-10 mt-2">
            <span className="text-4xl font-extrabold text-white">۱۲۸</span>
            <span className="text-[13px] font-medium text-white/80 mb-1">مقاله</span>
          </div>
        </Card>

        <Card lift className="p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-bold text-fg-3">بازدید (تخمین)</span>
            <Chip tone="up" className="gap-1">
              <ArrowUpRight className="size-3" />
              ۵٪
            </Chip>
          </div>
          <div className="flex items-end gap-2 mt-2">
            <span className="text-3xl font-extrabold text-fg">۴۵K</span>
          </div>
        </Card>

        <Card lift className="p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-bold text-fg-3">نویسندگان فعال</span>
            <Chip tone="neutral" className="gap-1">
              ثابت
            </Chip>
          </div>
          <div className="flex items-end gap-2 mt-2">
            <span className="text-3xl font-extrabold text-fg">۶</span>
          </div>
        </Card>

        <Card lift className="p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-bold text-fg-3">هزینه (توکن)</span>
            <Chip tone="down" className="gap-1 bg-red-500/10 text-red-600 border-red-500/20">
              <ArrowDownRight className="size-3" />
              ۲٪
            </Chip>
          </div>
          <div className="flex items-end gap-2 mt-2">
            <span className="text-3xl font-extrabold text-fg">$۴۲</span>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 anim-in" style={{ '--i': 3 } as React.CSSProperties}>
        
        {/* Trend Chart */}
        <Card lift className="lg:col-span-2 p-6 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h2 className="text-[16px] font-extrabold text-fg">روند تولید محتوا</h2>
              <p className="text-[12px] text-fg-3">میزان محتوای تولید شده در ۷ روز گذشته</p>
            </div>
            <select className="h-8 rounded-xl border border-border bg-surface text-[12px] text-fg px-2 outline-none">
              <option>۷ روز گذشته</option>
              <option>۳۰ روز گذشته</option>
            </select>
          </div>
          <div className="h-[250px] w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={TREND_DATA} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="areaColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--fg-3))' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--fg-3))' }} dx={-10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--background))', color: 'hsl(var(--fg))' }}
                  itemStyle={{ color: 'hsl(var(--fg))' }}
                />
                <Area type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#areaColor)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Publish Rate Gauge */}
        <Card lift className="p-6 flex flex-col gap-6">
          <div className="flex flex-col gap-1 text-center">
            <h2 className="text-[16px] font-extrabold text-fg">نرخ انتشار موفق</h2>
            <p className="text-[12px] text-fg-3">نسبت محتوای منتشر شده به پیش‌نویس</p>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center relative min-h-[200px]" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={GAUGE_DATA}
                  cx="50%"
                  cy="70%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius="65%"
                  outerRadius="85%"
                  paddingAngle={0}
                  dataKey="value"
                  stroke="none"
                  cornerRadius={10}
                >
                  {GAUGE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#2563eb' : 'hsl(var(--surface-2))'} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <span className="text-4xl font-extrabold text-fg">۷۵٪</span>
            </div>
          </div>
        </Card>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 anim-in" style={{ '--i': 4 } as React.CSSProperties}>
        
        {/* Status Bar Chart */}
        <Card lift className="p-6 flex flex-col gap-6">
          <h2 className="text-[16px] font-extrabold text-fg">وضعیت هفتگی</h2>
          <div className="h-[200px] w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={STATUS_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--fg-3))' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--fg-3))' }} dx={-10} />
                <Tooltip cursor={{ fill: 'hsl(var(--surface-2))' }} contentStyle={{ borderRadius: '12px', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--background))', color: 'hsl(var(--fg))' }} itemStyle={{ color: 'hsl(var(--fg))' }} />
                <Bar dataKey="published" fill="#2563eb" radius={[6, 6, 0, 0]} barSize={12} />
                <Bar dataKey="draft" fill="hsl(var(--fg-3))" radius={[6, 6, 0, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Source Donut */}
        <Card lift className="p-6 flex flex-col gap-6">
          <h2 className="text-[16px] font-extrabold text-fg">منابع تولید</h2>
          <div className="flex-1 flex items-center justify-center relative min-h-[200px]" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={SOURCE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius="65%"
                  outerRadius="85%"
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                  cornerRadius={6}
                >
                  {SOURCE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--background))', color: 'hsl(var(--fg))' }} itemStyle={{ color: 'hsl(var(--fg))' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {SOURCE_DATA.map(item => (
              <div key={item.name} className="flex items-center gap-1.5">
                <div className="size-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-[11px] font-bold text-fg-2">{item.name}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card lift className="p-6 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[16px] font-extrabold text-fg">فعالیت‌های اخیر</h2>
            <Button variant="ghost" size="sm" className="text-[11px] h-7 rounded-xl">مشاهده همه</Button>
          </div>
          <div className="flex flex-col gap-5 flex-1 overflow-y-auto scrollbar-none">
            {ACTIVITIES.map((act, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center shrink-0">
                  <div className="size-2 rounded-full bg-primary/50 mt-1.5" />
                  {i !== ACTIVITIES.length - 1 && <div className="w-px h-full bg-border mt-2" />}
                </div>
                <div className="flex flex-col pb-4">
                  <span className="text-[13px] font-bold text-fg">{act.title}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] text-fg-3">{act.time}</span>
                    <span className="text-[11px] text-fg-3">•</span>
                    <span className="text-[11px] text-fg-3">{act.user}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

      </div>
    </div>
  )
}
