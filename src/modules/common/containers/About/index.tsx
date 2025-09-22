'use client'

import { useTheme } from 'next-themes'

import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'

import type React from 'react'

const AboutContainer: React.FC = () => {
  const { resolvedTheme } = useTheme()

  return (
    <div>
      <Header />

      <section className="relative">
        <div
          className="-z-[2] absolute top-0 right-0 left-0 h-1/2 bg-background bg-contain bg-top bg-no-repeat opacity-50"
          style={{
            backgroundImage:
              resolvedTheme === 'light'
                ? 'url("/images/bg-content.svg")'
                : 'linear-gradient(rgba(15,15,15,0.7), rgba(15,15,15,0.7)),url("/images/bg-content.svg")'
          }}
        />

        <div className="flex flex-col items-center justify-center py-12 pb-[200px]">
          <div className="flex w-20 justify-center rounded-full bg-primary py-1 text-white text-xs tracking-widest shadow-primary shadow-xl">
            داستان ما
          </div>

          <div className="mt-6 max-w-xl text-center">
            <h1 className="font-bold text-3xl leading-relaxed md:text-5xl">داستان پشت آی نــویــس</h1>
            <p className="mt-4 text-gray-400 text-xs md:text-base">نوشته‌ای از سازنده پلتفرم </p>
          </div>

          <div className="mx-auto mt-8 w-full max-w-3xl rounded-lg bg-card p-8 shadow-md">
            <strong>سلام! من امیر هستم،</strong>

            <p className="mt-8">
              من یک برنامه‌نویس علاقه‌مند به هوش مصنوعی هستم، بنا به شغلی که دارم، هر ابزار، اپ یا برنامه‌ای که مربوط به هوش مصنوعی
              هست را تست کرده و می‌کنم تا مطمئن شم چیزی که در آی‌نویس ارائه میشه، جدیدترین و مرتبط ترین محتوایی هست که می‌شود ارائه
              کرد.
            </p>

            <p className="mt-8">
              اولین مشکلی که باهاش مواجه شدم، این بود که: همه‌ی این ابزارها پرداخت دلاری داشتندو برای ما ایرانی ها هزینه زیادی دربر
              داشتند. برای تست کردن هرکدام از این ابزار ها مجبور می‌شدم اکانت های متعدد بسازم و گاها پرداخت دلاری انجام دهم تا از
              سازوکار آن‌ها سر دربیاورم. درنهایت مدیریت این حساب ها برای تولید محتوا کار بسیار دشواری برای من بود.
            </p>

            <p className="mt-8">
              به فکرم رسید که باید یک راه بهتری برای همه‌ی این‌کارها وجود داشته باشد... من یک ابزاری می‌خواستم که همه‌ی امکاناتی که
              هوش مصنوعی می‌تواند ارائه دهد را در عین سادگی داشته باشد، همچنین از لحاظ مالی هم مقرون به صرفه باشد.
            </p>

            <p className="mt-8">همین دلیلی شد که آی نویس را راه‌اندازی کردم.</p>

            <p className="mt-8">
              آی نویس جوابی بود که به دنبالش بودم، ما یک پلفرم جامع بر پایه‌ی هوش مصنوعی هستیم که قادر به تولید محتوای متنی به زبان
              فارسی، در یک محیط ساده و کاملا کاربرپسند هستیم.
            </p>

            <p className="mt-8">
              بدون پیچیدگی، بدون نیاز به دانش برنامه‌نویسی، بدون هیچ ویژگی اضافی که شما را سردرگم کند فقط قدرت هوش مصنوعی که در عین
              سادگی، محتوای متنی را با دقت بسیار بالا و در کمترین زمان تولید می‌کند. فعلا در نسخه بتا، تمامی امکانات بصورت رایگان
              در اختیارتان قرار می‌گیرد تا به کمک آنها محتوای مورد نظرتان را تولید کنید.
            </p>

            <p className="mt-8">
              اگر شما هم به دنبال یک راه‌حل برای صرفه‌جویی در زمان و هزینه برای تولید محتوا هستید و یا از استفاده کردن از ده ها
              ابزار خسته شده‌اید، پیشنهاد می‌کنم حتما آی نویس را امتحان کنید !
            </p>

            <p className="mt-8">
              همین الان شروع به استفاده از آی نویس کنید، تجربه جدیدی از تولید محتوا داشته باشید و هر مشکلی داشتید از طریق ایمیل{' '}
              <a className="text-blue-400" href="mailto:info@ainevis.com">
                info@ainevis.com
              </a>{' '}
              با من در ارتباط باشید.
            </p>

            <strong className="mt-8 block">
              <span>ساخته شده با</span>
              <span aria-label="heart" className="mx-1" role="img">
                ❤️
              </span>
              توسط امیر رستمی
            </strong>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default AboutContainer
