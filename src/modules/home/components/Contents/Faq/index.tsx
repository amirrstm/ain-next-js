import { useTranslations } from 'next-intl'

import React from 'react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const Faq: React.FC = () => {
  const t = useTranslations('Layout.Home')

  return (
    <div className="max-w-6xl mx-auto py-12 md:py-20 px-2 md:px-6 relative z-[1]">
      <div className="flex flex-col items-center">
        <div className="py-1 px-3 rounded-full bg-primary text-white flex justify-center text-xs shadow-xl shadow-primary tracking-widest">
          {t('Faq.Title')}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold my-6 block text-center">{t('Faq.Subtitle')}</h1>

        <div className="border rounded-xl mt-8 w-full bg-background max-w-3xl mx-auto overflow-hidden">
          <Accordion type="single" collapsible>
            <AccordionItem value="what">
              <AccordionTrigger>
                <p className="text-xs md:text-lg font-semibold">آی نویس چیست؟</p>
              </AccordionTrigger>
              <AccordionContent>
                <span className="text-xs md:text-base leading-[2]">
                  آی‌نویس یک سیستم همه جانبه هوشمند برای تولید محتوا است. با استفاده از آی نویس می‌توانید محتوای متنی با
                  دقت بسیار بالا و در کمترین زمان تولید کنید.
                </span>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="how">
              <AccordionTrigger>
                <p className="text-xs md:text-lg font-semibold">چگونه کار می‌کند؟</p>
              </AccordionTrigger>
              <AccordionContent>
                <span className="text-xs md:text-base leading-[2]">
                  پس از یک ثبت نام ساده با ایمیل یا شماره‌تلفن خود، به صفحه کاربری خود یا همان داشبورد منتقل می‌شوید.
                  سپس می‌توانید از منوی سمت راست تولید محتوا را انتخاب نمایید و از بین دسته‌بندی های متنوع آنچه که به
                  کار شما می‌آید را انتخاب کنید و بعداز آن در صفحه جدیی که باز می ‌شود، به سوالات پاسخ دهید تا متن برای
                  شما تولید شود.
                </span>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="free">
              <AccordionTrigger>
                <p className="text-xs md:text-lg font-semibold">آیا استفاده از آی‌نویس رایگان است؟</p>
              </AccordionTrigger>
              <AccordionContent>
                <span className="text-xs md:text-base leading-[2]">
                  بله، در نسخه بتا یا همان اولیه آی‌نویس، تمامی امکانات بصورت رایگان در اختیار شما قرار می‌گیرد.
                </span>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="content">
              <AccordionTrigger>
                <p className="text-xs md:text-lg font-semibold">
                  چه مقدار محتوا می ‌توانم با استفاده از آی‌نویس تولید کنم؟{' '}
                </p>
              </AccordionTrigger>
              <AccordionContent>
                <span className="text-xs md:text-base leading-[2]">
                  پس از ثبت نام در سایت، شما مجاز به تولید ۵۰ محتوای متنی هستید: یعنی از بین دسته‌بندی های مختلف محتوا،
                  می‌توانید ۵۰ بار متن تولید کنید.
                </span>
                <br />
                <span className="text-xs md:text-base leading-[2]">
                  این تعداد محتوا برای یک ماه درنظر گرفته شده است، بدین معنی که در ابتدای هر ماه(تاریخی که به آی‌نویس
                  پیوسته‌اید) این مقدار بازنشانی می‌شود.
                </span>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="access">
              <AccordionTrigger>
                <p className="text-xs md:text-lg font-semibold">آیا به محتوای تولید شده دسترسی خواهم داشت؟</p>
              </AccordionTrigger>
              <AccordionContent>
                <span className="text-xs md:text-base leading-[2]">
                  بله، شما می‌توانید متن‌های تولید شده خود را در پنل کاربری و منوی تاریخچه مشاهده کنید.
                </span>
                <br />
                <span className="text-xs md:text-base leading-[2]">
                  همچنین در منوی داشبورد، مقدار محتوای تولید شده را می‌توانید ببینید.
                </span>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="support" className="border-none">
              <AccordionTrigger>
                <p className="text-xs md:text-lg font-semibold">چطور می‌توانم با بخش پشتیبانی در ارتباط باشم</p>
              </AccordionTrigger>
              <AccordionContent>
                <span className="text-xs md:text-base leading-[2]">
                  ما ۲۴ ساعت روز در دسترس هستیم، اگر به کمک نیاز داشتید، می‌توانید از ابزارک پایین سمت چپ صفحه استفاده
                  کنید، همکاران ما در سریع‌ترین زمان ممکن به سوال های شما پاسخ خواهد داد.
                </span>
                <br />
                <span className="text-xs md:text-base leading-[2]">
                  همچنین میتوانید سوال ها، درخواست یا مشکل خود را به ایمیل{' '}
                  <a href="mailto:info@ainevis.com" className="text-blue-400">
                    info@ainevis.com
                  </a>{' '}
                  ارسال نمایید.
                </span>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  )
}

export default Faq
