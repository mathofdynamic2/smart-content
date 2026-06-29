"use client"
import * as React from "react"
import { PageHeader, Card, Button, Chip } from "@/components/ui"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { cn, toPersianDigits } from "@/lib/utils"

// Mock data structure
type Article = {
  id: number
  title: string
  status: 'published' | 'scheduled'
  day: number
  month: number // 0-based for mock (0=خرداد, 1=تیر, 2=مرداد)
}

const MOCK_ARTICLES: Article[] = [
  { id: 1, title: 'تحلیل بازار ۲۰۲۴', status: 'published', day: 4, month: 1 },
  { id: 2, title: 'روندهای سئو', status: 'scheduled', day: 4, month: 1 },
  { id: 3, title: 'راهنمای هوش مصنوعی', status: 'scheduled', day: 12, month: 1 },
  { id: 4, title: 'بررسی محصول X', status: 'published', day: 14, month: 1 },
  { id: 5, title: 'آپدیت الگوریتم گوگل', status: 'published', day: 14, month: 1 },
  { id: 6, title: 'نکات بازاریابی', status: 'scheduled', day: 14, month: 1 },
  { id: 7, title: 'مصاحبه با مدیران', status: 'scheduled', day: 14, month: 1 },
  { id: 8, title: 'معرفی فریم‌ورک‌های جدید', status: 'scheduled', day: 22, month: 1 },
  { id: 9, title: 'گزارش عملکرد خرداد', status: 'published', day: 2, month: 1 },
  { id: 10, title: 'برنامه‌های تابستان', status: 'scheduled', day: 28, month: 1 },
]

const MONTHS = [
  { name: 'خرداد', year: 1404, days: 31, startDay: 5 }, // Starts Thursday (پنجشنبه) -> index 5
  { name: 'تیر', year: 1404, days: 31, startDay: 1 },    // Starts Monday (دوشنبه) -> index 2 (Wait: شنبه=0, یکشنبه=1, دوشنبه=2)
  { name: 'مرداد', year: 1404, days: 31, startDay: 5 }   // Starts Thursday (پنجشنبه) -> index 5
]
// Fix start days to be 0-indexed where 0 = شنبه
MONTHS[0].startDay = 5 // پنجشنبه
MONTHS[1].startDay = 2 // دوشنبه
MONTHS[2].startDay = 5 // پنجشنبه

const WEEKDAYS = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه']

export default function CalendarPage() {
  const [currentMonthIdx, setCurrentMonthIdx] = React.useState(1) // Start at تیر
  const [animDirection, setAnimDirection] = React.useState<'none' | 'left' | 'right'>('none')
  
  const currentMonth = MONTHS[currentMonthIdx]
  const today = currentMonthIdx === 1 ? 14 : -1 // mock today is 14 تیر

  const handlePrev = () => {
    if (currentMonthIdx > 0) {
      setAnimDirection('right') // RTL: prev month animates from right
      setTimeout(() => {
        setCurrentMonthIdx(prev => prev - 1)
        setAnimDirection('none')
      }, 50)
    }
  }

  const handleNext = () => {
    if (currentMonthIdx < MONTHS.length - 1) {
      setAnimDirection('left') // RTL: next month animates from left
      setTimeout(() => {
        setCurrentMonthIdx(prev => prev + 1)
        setAnimDirection('none')
      }, 50)
    }
  }

  // Generate cells
  const cells = []
  for (let i = 0; i < currentMonth.startDay; i++) {
    cells.push(<div key={`empty-${i}`} className="bg-surface/30 min-h-[100px] sm:min-h-[140px] p-2 border-b border-s border-border/50"></div>)
  }

  for (let day = 1; day <= currentMonth.days; day++) {
    const isToday = day === today
    const dayArticles = MOCK_ARTICLES.filter(a => a.day === day && a.month === currentMonthIdx)
    const hasMore = dayArticles.length > 3
    const displayArticles = dayArticles.slice(0, 3)
    
    cells.push(
      <div 
        key={`day-${day}`} 
        className={cn(
          "bg-background min-h-[100px] sm:min-h-[140px] p-2 border-b border-s border-border transition-colors hover:bg-surface-2 group relative",
          isToday ? "ring-inset ring-2 ring-primary bg-primary/5" : ""
        )}
      >
        <span className={cn(
          "text-[13px] font-bold tnum flex items-center justify-center size-7 rounded-xl mb-2",
          isToday ? "bg-primary text-white" : "text-fg-2 group-hover:text-fg"
        )}>
          {toPersianDigits(day)}
        </span>
        
        <div className="flex flex-col gap-1.5 overflow-hidden">
          {displayArticles.map(article => (
            <a 
              key={article.id} 
              href="#"
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-xl bg-surface border border-border/60 hover:border-primary/40 hover:bg-surface-2 transition-colors group/link truncate focusable"
              title={article.title}
            >
              <div className={cn(
                "size-1.5 rounded-full shrink-0", 
                article.status === 'published' ? "bg-green-500" : "bg-blue-500"
              )} />
              <span className="text-[11px] font-medium text-fg truncate group-hover/link:text-primary transition-colors">
                {article.title}
              </span>
            </a>
          ))}
          {hasMore && (
            <div className="text-[10px] font-medium text-fg-3 px-2 py-0.5 mt-0.5">
              +{toPersianDigits(dayArticles.length - 3)} بیشتر
            </div>
          )}
        </div>
      </div>
    )
  }

  // Fill remaining cells to complete the grid (optional, but keeps borders clean)
  const totalCells = currentMonth.startDay + currentMonth.days
  const remainder = totalCells % 7
  if (remainder !== 0) {
    for (let i = 0; i < 7 - remainder; i++) {
      cells.push(<div key={`empty-end-${i}`} className="bg-surface/30 min-h-[100px] sm:min-h-[140px] p-2 border-b border-s border-border/50"></div>)
    }
  }

  const hasAnyArticles = MOCK_ARTICLES.some(a => a.month === currentMonthIdx)

  return (
    <div className="space-y-6 pb-20">
      <div className="anim-in">
        <PageHeader 
          title="تقویم محتوا" 
          subtitle="مقاله‌های زمان‌بندی‌شده و منتشرشده در تقویم شمسی."
        />
      </div>

      <Card lift className="flex flex-col overflow-hidden anim-in relative" style={{ '--i': 1 } as React.CSSProperties}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:px-6 border-b border-border bg-surface-2/30">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handlePrev} 
            disabled={currentMonthIdx === 0}
            aria-label="ماه قبل"
            className="text-fg-2 hover:text-fg"
          >
            <ChevronRight className="size-5" />
          </Button>
          
          <h2 className="text-xl font-extrabold text-fg w-40 text-center flex items-center justify-center gap-2">
            {currentMonth.name} <span className="text-fg-3 font-normal tnum">{toPersianDigits(currentMonth.year)}</span>
          </h2>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleNext} 
            disabled={currentMonthIdx === MONTHS.length - 1}
            aria-label="ماه بعد"
            className="text-fg-2 hover:text-fg"
          >
            <ChevronLeft className="size-5" />
          </Button>
        </div>

        {/* Calendar Body */}
        <div className={cn(
          "flex flex-col flex-1",
          animDirection === 'left' ? "animate-out slide-out-to-left-4 fade-out duration-150" :
          animDirection === 'right' ? "animate-out slide-out-to-right-4 fade-out duration-150" :
          "animate-in fade-in duration-300"
        )}>
          {/* Weekdays */}
          <div className="grid grid-cols-7 border-b border-border bg-surface">
            {WEEKDAYS.map(day => (
              <div key={day} className="py-3 text-center text-[12.5px] font-bold text-fg-2 border-s border-border first:border-s-0">
                {day}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 bg-border gap-[1px] border-s border-border">
            {cells.map((cell, index) => React.cloneElement(cell, { 
              // Overwrite border classes since we are using gap-[1px] and bg-border on parent for perfect hairlines
              className: cn(cell.props.className, "border-0") 
            }))}
          </div>
          
          {!hasAnyArticles && (
            <div className="absolute inset-0 top-[120px] flex items-center justify-center pointer-events-none">
              <div className="bg-surface/80 backdrop-blur-sm px-6 py-3 rounded-xl border border-border shadow-sm text-[13px] font-bold text-fg-2">
                موردی برای این ماه نیست.
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
