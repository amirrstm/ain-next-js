import { useTranslations } from 'next-intl'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

import type React from 'react'

const FaqFa: React.FC = () => {
  const t = useTranslations('Layout.Home')

  return (
    <div className="relative z-[1] mx-auto max-w-6xl px-2 py-12 md:px-6 md:py-20">
      <div className="flex flex-col items-center">
        <div className="flex justify-center rounded-full bg-primary px-3 py-1 text-white text-xs tracking-widest shadow-primary shadow-xl">
          {t('Faq.Title')}
        </div>

        <h1 className="my-6 block text-center font-bold text-3xl md:text-4xl">{t('Faq.Subtitle')}</h1>

        <div className="mx-auto mt-8 w-full max-w-3xl overflow-hidden rounded-xl border border-muted bg-background">
          <Accordion collapsible type="single">
            <AccordionItem value="what">
              <AccordionTrigger>
                <p className="font-semibold text-xs md:text-lg">آی نویس چیست؟</p>
              </AccordionTrigger>
              <AccordionContent>
                <span className="text-xs leading-[2] md:text-base">
                  آی‌نویس یک سیستم همه جانبه هوشمند برای تولید محتوا است. با استفاده از آی نویس می‌توانید محتوای متنی با دقت بسیار
                  بالا و در کمترین زمان تولید کنید.
                </span>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="how">
              <AccordionTrigger>
                <p className="font-semibold text-xs md:text-lg">چگونه کار می‌کند؟</p>
              </AccordionTrigger>
              <AccordionContent>
                <span className="text-xs leading-[2] md:text-base">
                  پس از یک ثبت نام ساده با ایمیل یا شماره‌تلفن خود، به صفحه کاربری خود یا همان داشبورد منتقل می‌شوید. سپس می‌توانید
                  از منوی سمت راست تولید محتوا را انتخاب نمایید و از بین دسته‌بندی های متنوع آنچه که به کار شما می‌آید را انتخاب
                  کنید و بعداز آن در صفحه جدیی که باز می ‌شود، به سوالات پاسخ دهید تا متن برای شما تولید شود.
                </span>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="free">
              <AccordionTrigger>
                <p className="font-semibold text-xs md:text-lg">آیا استفاده از آی‌نویس رایگان است؟</p>
              </AccordionTrigger>
              <AccordionContent>
                <span className="text-xs leading-[2] md:text-base">
                  بله، در نسخه بتا یا همان اولیه آی‌نویس، تمامی امکانات بصورت رایگان در اختیار شما قرار می‌گیرد.
                </span>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="content">
              <AccordionTrigger>
                <p className="font-semibold text-xs md:text-lg">چه مقدار محتوا می ‌توانم با استفاده از آی‌نویس تولید کنم؟ </p>
              </AccordionTrigger>
              <AccordionContent>
                <span className="text-xs leading-[2] md:text-base">
                  پس از ثبت نام در سایت، شما مجاز به تولید ۵۰ محتوای متنی هستید: یعنی از بین دسته‌بندی های مختلف محتوا، می‌توانید ۵۰
                  بار متن تولید کنید.
                </span>
                <br />
                <span className="text-xs leading-[2] md:text-base">
                  این تعداد محتوا برای یک ماه درنظر گرفته شده است، بدین معنی که در ابتدای هر ماه(تاریخی که به آی‌نویس پیوسته‌اید)
                  این مقدار بازنشانی می‌شود.
                </span>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="access">
              <AccordionTrigger>
                <p className="font-semibold text-xs md:text-lg">آیا به محتوای تولید شده دسترسی خواهم داشت؟</p>
              </AccordionTrigger>
              <AccordionContent>
                <span className="text-xs leading-[2] md:text-base">
                  بله، شما می‌توانید متن‌های تولید شده خود را در پنل کاربری و منوی تاریخچه مشاهده کنید.
                </span>
                <br />
                <span className="text-xs leading-[2] md:text-base">
                  همچنین در منوی داشبورد، مقدار محتوای تولید شده را می‌توانید ببینید.
                </span>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem className="border-none" value="support">
              <AccordionTrigger>
                <p className="font-semibold text-xs md:text-lg">چطور می‌توانم با بخش پشتیبانی در ارتباط باشم</p>
              </AccordionTrigger>
              <AccordionContent>
                <span className="text-xs leading-[2] md:text-base">
                  ما ۲۴ ساعت روز در دسترس هستیم، اگر به کمک نیاز داشتید، می‌توانید از ابزارک پایین سمت چپ صفحه استفاده کنید،
                  همکاران ما در سریع‌ترین زمان ممکن به سوال های شما پاسخ خواهد داد.
                </span>
                <br />
                <span className="text-xs leading-[2] md:text-base">
                  همچنین میتوانید سوال ها، درخواست یا مشکل خود را به ایمیل{' '}
                  <a className="text-blue-400" href="mailto:info@ainevis.com">
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

export default FaqFa
