"use client"
import * as React from "react"
import { 
  PageHeader, SectionHeader, 
  Card, Button, Chip, IconBadge, Input, Select, EmptyHint
} from "@/components/ui"
import { 
  Search, FileText, Pencil, Trash2, Folder, X, BookOpen, ChevronDown
} from "lucide-react"
import { cn, toPersianDigits } from "@/lib/utils"

const TABS = ['همه', 'پیش‌نویس', 'زمان‌بندی', 'منتشرشده', 'بایگانی']

const MOCK_ARTICLES = [
  {
    id: 1,
    title: 'تحلیل بازار تکنولوژی در سال ۲۰۲۴',
    excerpt: 'با توجه به رشد روزافزون هوش مصنوعی و تاثیر آن بر صنایع مختلف، بازار تکنولوژی در سال ۲۰۲۴ شاهد تحولات شگرفی خواهد بود. این تغییرات می‌توانند مدل‌های کسب‌وکار سنتی را به چالش بکشند.',
    status: 'منتشرشده',
    source: 'اخبار روزانه',
    tags: ['تکنولوژی', 'هوش مصنوعی'],
    date: '۱۴ تیر ۱۴۰۴',
    author: 'علی رضایی',
    folder: 'مقالات بلاگ'
  },
  {
    id: 2,
    title: 'بررسی محصول X-Pro: نسل جدید',
    excerpt: 'در این مقاله به بررسی تخصصی محصول جدید شرکت می‌پردازیم. این محصول با امکانات پیشرفته خود قصد دارد بازار هدف را دگرگون کند و استانداردهای جدیدی تعریف کند.',
    status: 'زمان‌بندی',
    source: 'معرفی محصول',
    tags: ['بررسی', 'سخت‌افزار'],
    date: '۱۵ تیر ۱۴۰۴',
    author: 'دستیار هوشمند',
    folder: 'بررسی محصولات'
  },
  {
    id: 3,
    title: 'راهنمای جامع سئو برای تازه‌کارها',
    excerpt: 'سئو یکی از مهمترین ابزارهای دیجیتال مارکتینگ است. در این راهنما قصد داریم به زبان ساده اصول اولیه بهینه‌سازی موتورهای جستجو را آموزش دهیم.',
    status: 'پیش‌نویس',
    source: 'بریف دستی',
    tags: ['آموزش', 'سئو'],
    date: '۱۲ تیر ۱۴۰۴',
    author: 'تیم تحریریه',
    folder: 'آموزش‌ها'
  },
  {
    id: 4,
    title: 'تاریخچه تحولات اینترنت اشیا',
    excerpt: 'اینترنت اشیا یا IoT مفهومی است که در سال‌های اخیر به شدت مورد توجه قرار گرفته است. اتصال دستگاه‌های مختلف به اینترنت مزایای فراوانی به همراه دارد.',
    status: 'بایگانی',
    source: 'تحقیق و نگارش',
    tags: ['تکنولوژی'],
    date: '۱ تیر ۱۴۰۴',
    author: 'دستیار هوشمند',
    folder: 'مقالات بلاگ'
  }
]

const MOCK_FOLDERS = ['مقالات بلاگ', 'آموزش‌ها', 'بررسی محصولات', 'اخبار شرکت']
const MOCK_TAGS = ['تکنولوژی', 'هوش مصنوعی', 'سئو', 'آموزش', 'بررسی', 'سخت‌افزار']

export default function LibraryPage() {
  const [activeTab, setActiveTab] = React.useState('همه')
  const [search, setSearch] = React.useState('')
  const [selectedFolder, setSelectedFolder] = React.useState('همهٔ پوشه‌ها')
  const [selectedTag, setSelectedTag] = React.useState('همهٔ برچسب‌ها')
  
  const [folders, setFolders] = React.useState(MOCK_FOLDERS)
  const [tags, setTags] = React.useState(MOCK_TAGS)

  const filteredArticles = MOCK_ARTICLES.filter(article => {
    const matchesTab = activeTab === 'همه' || article.status === activeTab
    const matchesSearch = article.title.includes(search) || article.excerpt.includes(search)
    const matchesFolder = selectedFolder === 'همهٔ پوشه‌ها' || article.folder === selectedFolder
    const matchesTag = selectedTag === 'همهٔ برچسب‌ها' || article.tags.includes(selectedTag)
    return matchesTab && matchesSearch && matchesFolder && matchesTag
  })

  return (
    <div className="space-y-6">
      <div className="anim-in">
        <PageHeader 
          title="کتابخانه محتوا" 
          subtitle="همه‌ی مقاله‌های تولیدشده — فیلتر، ویرایش، انتشار و خروجی."
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
        {/* Main Column */}
        <div className="lg:col-span-2 flex flex-col gap-6 anim-in" style={{ '--i': 1 } as React.CSSProperties}>
          
          {/* Filter Card */}
          <Card className="flex flex-col gap-5 p-5">
            <div className="relative">
              <Search className="absolute start-3 top-2.5 size-5 text-fg-3" strokeWidth={1.5} />
              <Input 
                placeholder="جستجو در عنوان و متن..." 
                className="pe-4 ps-10 h-10 w-full bg-surface-2 border-border"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-4 py-1.5 rounded-xl text-[12.5px] font-bold whitespace-nowrap transition-colors focusable border",
                    activeTab === tab 
                      ? "bg-primary text-white border-primary shadow-[0_2px_8px_rgba(37,99,235,0.25)]" 
                      : "bg-surface text-fg-2 border-border hover:bg-surface-2 hover:text-fg"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select value={selectedFolder} onChange={e => setSelectedFolder(e.target.value)} className="text-[12.5px]">
                <option value="همهٔ پوشه‌ها">همهٔ پوشه‌ها</option>
                {folders.map(f => <option key={f} value={f}>{f}</option>)}
              </Select>
              <Select value={selectedTag} onChange={e => setSelectedTag(e.target.value)} className="text-[12.5px]">
                <option value="همهٔ برچسب‌ها">همهٔ برچسب‌ها</option>
                {tags.map(t => <option key={t} value={t}>{t}</option>)}
              </Select>
            </div>
          </Card>

          {/* Article List */}
          <div className="flex flex-col gap-4">
            {filteredArticles.length === 0 ? (
              <EmptyHint 
                icon={BookOpen} 
                title="هنوز مقاله‌ای تولید نشده است"
                cta={<Button variant="primary">از بخش «ساخت محتوا» شروع کنید</Button>}
                className="min-h-[300px]"
              />
            ) : (
              filteredArticles.map((article, idx) => (
                <Card key={article.id} lift className="flex flex-col sm:flex-row gap-5 p-5 anim-in group" style={{ '--i': idx + 2 } as React.CSSProperties}>
                  <div className="shrink-0 hidden sm:block">
                    <IconBadge icon={FileText} tone="blue" />
                  </div>
                  
                  <div className="flex-1 min-w-0 flex flex-col gap-2.5">
                    <div className="flex items-start justify-between gap-4">
                      <a href="#" className="text-[15px] font-extrabold text-fg group-hover:text-primary group-hover:underline decoration-2 underline-offset-4 transition-all line-clamp-1 leading-snug">
                        {article.title}
                      </a>
                      <div className="sm:hidden">
                        <IconBadge icon={FileText} tone="blue" className="size-8 [&>svg]:size-4" />
                      </div>
                    </div>
                    
                    <div className="flex items-center flex-wrap gap-2 text-[11px]">
                      <Chip tone={
                        article.status === 'منتشرشده' ? 'up' :
                        article.status === 'زمان‌بندی' ? 'blue' :
                        article.status === 'بایگانی' ? 'neutral' : 'neutral'
                      }>
                        {article.status}
                      </Chip>
                      <Chip tone="neutral" className="bg-surface border-border text-fg-2">{article.source}</Chip>
                      {article.tags.map(tag => (
                        <Chip key={tag} tone="neutral" className="bg-surface-2 text-fg-3 border-transparent">#{tag}</Chip>
                      ))}
                    </div>
                    
                    <p className="text-[12px] text-fg-3 font-medium flex items-center gap-1.5 flex-wrap">
                      <span className="tnum">{article.date}</span>
                      <span>·</span>
                      <span>{article.author}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><Folder className="size-3" /> {article.folder}</span>
                    </p>
                    
                    <p className="text-[13px] text-fg-2 line-clamp-2 leading-[1.8] mt-1">
                      {article.excerpt}
                    </p>
                  </div>
                  
                  <div className="shrink-0 flex sm:flex-col items-center sm:items-stretch gap-2 pt-4 sm:pt-0 border-t sm:border-t-0 sm:border-s border-border sm:ps-4">
                    <Button variant="ghost" size="sm" className="flex-1 sm:flex-none justify-start">
                      <Pencil className="size-3.5" /> ویرایش
                    </Button>
                    <div className="relative flex-1 sm:flex-none">
                      <select 
                        defaultValue={article.status}
                        className="w-full h-8 px-3 pe-8 rounded-xl border bg-surface-2 text-[12px] text-fg font-medium appearance-none focusable transition-colors hover:border-fg-3"
                      >
                        <option value="پیش‌نویس">پیش‌نویس</option>
                        <option value="زمان‌بندی">زمان‌بندی</option>
                        <option value="منتشرشده">منتشرشده</option>
                        <option value="بایگانی">بایگانی</option>
                      </select>
                      <ChevronDown className="absolute end-2 top-2 size-4 text-fg-3 pointer-events-none" />
                    </div>
                    <Button variant="danger" size="sm" className="hidden sm:flex justify-start text-[12px] mt-auto">
                      <Trash2 className="size-3.5" /> حذف
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 flex flex-col gap-6 anim-in sticky top-6 self-start" style={{ '--i': 3 } as React.CSSProperties}>
          
          {/* Folders */}
          <Card className="flex flex-col gap-4 p-5">
            <SectionHeader title="پوشه‌ها" />
            <div className="flex items-center gap-2">
              <Input placeholder="نام پوشه" className="h-9 text-[12.5px]" />
              <Button variant="ghost" size="sm" className="shrink-0 px-3 h-9 text-[12px]">افزودن</Button>
            </div>
            <div className="flex flex-col gap-1 mt-2">
              {folders.length === 0 ? (
                <p className="text-[12.5px] text-fg-3 text-center py-4">پوشه‌ای ساخته نشده.</p>
              ) : (
                folders.map((folder, idx) => (
                  <div key={idx} className="flex items-center justify-between group p-2 rounded-xl hover:bg-surface-2 transition-colors cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <Folder className="size-4 text-fg-3 group-hover:text-primary transition-colors" />
                      <span className="text-[13px] font-medium text-fg">{folder}</span>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 p-1.5 text-fg-3 hover:text-down hover:bg-down-bg rounded-md transition-all focusable">
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Tags */}
          <Card className="flex flex-col gap-4 p-5">
            <SectionHeader title="برچسب‌ها" />
            <div className="flex items-center gap-2">
              <Input placeholder="نام برچسب" className="h-9 text-[12.5px]" />
              <Button variant="ghost" size="sm" className="shrink-0 px-3 h-9 text-[12px]">افزودن</Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.length === 0 ? (
                <p className="text-[12.5px] text-fg-3 text-center w-full py-4">برچسبی ساخته نشده.</p>
              ) : (
                tags.map((tag, idx) => (
                  <div key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-surface-2 border border-border rounded-xl text-[12px] font-medium text-fg group">
                    <span>{tag}</span>
                    <button className="text-fg-3 hover:text-down transition-colors focusable rounded-sm p-0.5 ms-0.5">
                      <X className="size-3" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </Card>

        </div>
      </div>
    </div>
  )
}
