import { IconInfoOctagon } from '@tabler/icons-react'

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'

interface Props {}

const Info = ({}: Props) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="w-10 h-10 bg-neutral-200 dark:bg-neutral-700 rounded-full flex items-center justify-center cursor-pointer">
          <IconInfoOctagon />
        </div>
      </HoverCardTrigger>
      <HoverCardContent asChild>
        <div className="min-w-[400px]">
          <h1 className="text-sm">خلاصه حرفه‌ای رزومه</h1>

          <p className="mt-1 text-xs leading-5">
            بخش خلاصه رزومه شما جایی است که می‌توانید داستان یا خلاصه‌ای از تجربه حرفه‌ای، مهارت‌ها و دستاوردهای مرتبط
            خود را بنویسید. خلاصه رزومه جایی است که شما خواننده را مجاب می‌کنید رزومه شما را مطالعه کند. در نظر داشته
            باشید که از اعداد و شرکت‌ها یا محصولات خود استفاده کنید
          </p>

          <ul className="list-disc text-xs ms-5 mt-2 leading-5">
            <li>برای مخاطب، کاملا شفاف باشید</li>
            <li>
              <p>راجع به اطلاعات مشخص صحبت کنید</p>
              <ul className="list-disc ms-3 my-2">
                <li>سال های تجربه</li>
                <li>شرکت ها و محصولات چشمگیر</li>
                <li>مهارت های اصلی و کلمات کلیدی</li>
                <li>۱ یا ۲ موفقیت یا دستاورد مهم</li>
              </ul>
            </li>
            <li>ترجیحا از اول شخص استفاده کنید و مطمئن شوید که جمله اول شما مخاطب را به خود مشغول می‌کند</li>
          </ul>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

export default Info
