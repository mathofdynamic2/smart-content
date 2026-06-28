"use client"
import * as React from "react"
import { Card, Chip } from "@/components/ui"
import { Coins, Cpu, Layers, ImageIcon } from "lucide-react"
import { cn, toPersianDigits } from "@/lib/utils"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const USAGE_DATA = [
  { date: '14 خرداد', tokens: 12000 },
  { date: '15 خرداد', tokens: 18000 },
  { date: '16 خرداد', tokens: 15000 },
  { date: '17 خرداد', tokens: 40000 },
  { date: '18 خرداد', tokens: 35000 },
  { date: '19 خرداد', tokens: 62000 },
  { date: '20 خرداد', tokens: 28000 },
  { date: '21 خرداد', tokens: 50000 },
  { date: '22 خرداد', tokens: 55000 },
  { date: '23 خرداد', tokens: 42000 },
  { date: '24 خرداد', tokens: 78000 },
  { date: '25 خرداد', tokens: 82000 },
  { date: '26 خرداد', tokens: 60000 },
  { date: '27 خرداد', tokens: 95000 },
]

const RUN_TYPES = [
  { label: 'بازتولید بخش', runs: 124, max: 150 },
  { label: 'سئو', runs: 85, max: 150 },
  { label: 'تولید پیش‌نویس', runs: 45, max: 150 },
  { label: 'شبکه‌های اجتماعی', runs: 30, max: 150 },
  { label: 'تولید تصویر', runs: 12, max: 150 },
]

const RECENT_RUNS = [
  { id: 1, type: 'تولید پیش‌نویس', provider: 'Google', model: 'gemini-1.5-pro', tokens: 4520, images: 0, date: '۱۴:۲۰ - ۲۷ خرداد' },
  { id: 2, type: 'شبکه‌های اجتماعی', provider: 'Google', model: 'gemini-1.5-flash', tokens: 840, images: 0, date: '۱۲:۰۵ - ۲۷ خرداد' },
  { id: 3, type: 'تولید تصویر', provider: 'OpenAI', model: 'dall-e-3', tokens: 0, images: 1, date: '۰۹:۱۵ - ۲۷ خرداد' },
  { id: 4, type: 'سئو', provider: 'Google', model: 'gemini-1.5-flash', tokens: 1250, images: 0, date: '۱۸:۴۰ - ۲۶ خرداد' },
  { id: 5, type: 'بازتولید بخش', provider: 'Google', model: 'gemini-1.5-pro', tokens: 2100, images: 0, date: '۱۶:۱۰ - ۲۶ خرداد' },
  { id: 6, type: 'بازتولید بخش', provider: 'Google', model: 'gemini-1.5-pro', tokens: 1850, images: 0, date: '۱۵:۴۵ - ۲۶ خرداد' },
  { id: 7, type: 'سئو', provider: 'Google', model: 'gemini-1.5-flash', tokens: 1320, images: 0, date: '۱۱:۲۰ - ۲۶ خرداد' },
]

export default function UsagePage() {
  return (
    <div className="space-y-8 pb-20">
      
      {/* Page Header */}
      <div className="anim-in">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold tracking-tight text-fg">مصرف و هزینه</h1>
          <Chip tone="up" className="mt-1">رایگان</Chip>
        </div>
        <p className="text-fg-2">شفافیت مصرف توکن و تصویر. صورتحساب در این نسخه رایگان است.</p>
      </div>

      {/* Stat Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 anim-in" style={{ '--i': 1 } as React.CSSProperties}>
        <Card lift className="p-5 flex flex-col gap-4">
          <div className="flex items-center gap-3 text-fg-3">
            <Coins className="size-5" />
            <span className="text-[13px] font-bold">کل توکن‌ها</span>
          </div>
          <div className="text-3xl font-extrabold text-fg tnum tracking-tight">
            {toPersianDigits((674000).toLocaleString())}
          </div>
        </Card>
        
        <Card lift className="p-5 flex flex-col gap-4">
          <div className="flex items-center gap-3 text-fg-3">
            <Cpu className="size-5" />
            <span className="text-[13px] font-bold">توکن خروجی</span>
          </div>
          <div className="text-3xl font-extrabold text-fg tnum tracking-tight">
            {toPersianDigits((182500).toLocaleString())}
          </div>
        </Card>
        
        <Card lift className="p-5 flex flex-col gap-4">
          <div className="flex items-center gap-3 text-fg-3">
            <Layers className="size-5" />
            <span className="text-[13px] font-bold">خواندن از کش</span>
          </div>
          <div className="text-3xl font-extrabold text-fg tnum tracking-tight">
            {toPersianDigits((491500).toLocaleString())}
          </div>
        </Card>
        
        <Card lift className="p-5 flex flex-col gap-4">
          <div className="flex items-center gap-3 text-fg-3">
            <ImageIcon className="size-5" />
            <span className="text-[13px] font-bold">تصاویر</span>
          </div>
          <div className="text-3xl font-extrabold text-fg tnum tracking-tight">
            {toPersianDigits(12)}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Area Chart */}
        <Card lift className="lg:col-span-2 p-6 flex flex-col gap-6 anim-in" style={{ '--i': 2 } as React.CSSProperties}>
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-extrabold text-fg">مصرف توکن در ۱۴ روز اخیر</h2>
            <div className="text-[12px] font-medium text-fg-3 bg-surface-2 px-3 py-1 rounded-full">
              {toPersianDigits(296)} اجرا
            </div>
          </div>
          
          <div className="h-[250px] w-full mt-2" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={USAGE_DATA} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: 'var(--fg-3)', fontFamily: 'inherit' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: 'var(--fg-3)', fontFamily: 'inherit' }}
                  tickFormatter={(value) => toPersianDigits(value.toLocaleString())}
                  width={60}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', backgroundColor: 'var(--background)' }}
                  itemStyle={{ color: 'var(--primary)', fontSize: '13px', fontWeight: 'bold' }}
                  labelStyle={{ color: 'var(--fg-2)', fontSize: '12px', marginBottom: '4px' }}
                  formatter={(value: any) => [toPersianDigits(Number(value).toLocaleString()) + ' توکن', 'مصرف']}
                />
                <Area type="monotone" dataKey="tokens" stroke="var(--primary)" strokeWidth={2} fillOpacity={1} fill="url(#colorTokens)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Bar Chart (Runs by Type) */}
        <Card lift className="lg:col-span-1 p-6 flex flex-col gap-6 anim-in" style={{ '--i': 3 } as React.CSSProperties}>
          <h2 className="text-[16px] font-extrabold text-fg">اجرا بر اساس نوع</h2>
          
          <div className="flex flex-col gap-5 mt-2">
            {RUN_TYPES.map((type, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="font-bold text-fg-2">{type.label}</span>
                  <span className="font-bold text-fg tnum">{toPersianDigits(type.runs)}</span>
                </div>
                <div className="h-2 w-full bg-surface-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${(type.runs / type.max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

      </div>

      {/* Recent Runs Table */}
      <Card lift className="flex flex-col overflow-hidden anim-in" style={{ '--i': 4 } as React.CSSProperties}>
        <div className="p-6 border-b border-border">
          <h2 className="text-[16px] font-extrabold text-fg">اجراهای اخیر</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-start text-[13px]">
            <thead>
              <tr className="border-b border-border bg-surface-2/30">
                <th className="py-3 px-6 text-start font-bold text-fg-3">نوع اجرا</th>
                <th className="py-3 px-6 text-start font-bold text-fg-3">ارائه‌دهنده</th>
                <th className="py-3 px-6 text-start font-bold text-fg-3">مدل</th>
                <th className="py-3 px-6 text-start font-bold text-fg-3">توکن</th>
                <th className="py-3 px-6 text-start font-bold text-fg-3">تصویر</th>
                <th className="py-3 px-6 text-start font-bold text-fg-3">تاریخ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {RECENT_RUNS.map((run) => (
                <tr key={run.id} className="hover:bg-surface/50 transition-colors">
                  <td className="py-3 px-6 font-medium text-fg">{run.type}</td>
                  <td className="py-3 px-6 text-fg-2">{run.provider}</td>
                  <td className="py-3 px-6 text-fg-2 font-mono text-[12px]" dir="ltr">{run.model}</td>
                  <td className="py-3 px-6 font-medium text-fg tnum">{toPersianDigits(run.tokens.toLocaleString())}</td>
                  <td className="py-3 px-6 font-medium text-fg tnum">{toPersianDigits(run.images)}</td>
                  <td className="py-3 px-6 text-fg-3 tnum">{run.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

    </div>
  )
}
