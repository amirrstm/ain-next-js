import { useTranslations } from 'next-intl'

import React from 'react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const FaqEN: React.FC = () => {
  const t = useTranslations('Layout.Home')

  return (
    <div className="max-w-6xl mx-auto py-12 md:py-20 px-2 md:px-6 relative z-[1]">
      <div className="flex flex-col items-center">
        <div className="py-1 px-3 rounded-full bg-primary text-white flex justify-center text-xs shadow-xl shadow-primary tracking-widest">
          {t('Faq.Title')}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold my-6 block text-center">{t('Faq.Subtitle')}</h1>

        <div className="border border-muted rounded-xl mt-8 w-full bg-background max-w-3xl mx-auto overflow-hidden">
          <Accordion type="single" collapsible>
            <AccordionItem value="what">
              <AccordionTrigger>
                <p className="text-xs md:text-lg font-semibold">What is AINevis?</p>
              </AccordionTrigger>
              <AccordionContent>
                <span className="text-xs md:text-base leading-[2]">
                  AINevis is a comprehensive intelligent system for content creation. Using AINevis, you can create text
                  content with very high accuracy and in the shortest time possible.
                </span>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="how">
              <AccordionTrigger>
                <p className="text-xs md:text-lg font-semibold">How does it work?</p>
              </AccordionTrigger>
              <AccordionContent>
                <span className="text-xs md:text-base leading-[2]">
                  After a simple registration with your email or phone number, you will be taken to your user page or
                  dashboard. Then you can select content creation from the right menu and choose what suits your needs
                  from the various categories. After that, in the new page that opens, answer the questions to generate
                  the text for you.
                </span>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="free">
              <AccordionTrigger>
                <p className="text-xs md:text-lg font-semibold">Is AINevis free to use?</p>
              </AccordionTrigger>
              <AccordionContent>
                <span className="text-xs md:text-base leading-[2]">
                  Yes, in the beta or initial version of AINevis, all features are available to you for free.
                </span>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="content">
              <AccordionTrigger>
                <p className="text-xs md:text-lg font-semibold">How much content can I create using AINevis?</p>
              </AccordionTrigger>
              <AccordionContent>
                <span className="text-xs md:text-base leading-[2]">
                  After registering on the site, you are allowed to create 50 pieces of text content. This means that
                  you can generate text 50 times from different content categories.
                </span>
                <br />
                <span className="text-xs md:text-base leading-[2]">
                  This amount of content is considered for one month, meaning that at the beginning of each month (the
                  date you joined AINevis), this amount is reset.
                </span>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="access">
              <AccordionTrigger>
                <p className="text-xs md:text-lg font-semibold">Will I have access to the generated content?</p>
              </AccordionTrigger>
              <AccordionContent>
                <span className="text-xs md:text-base leading-[2]">
                  Yes, you can view your generated texts in the user panel and the history menu.
                </span>
                <br />
                <span className="text-xs md:text-base leading-[2]">
                  Also, in the dashboard menu, you can see the amount of generated content.
                </span>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="support" className="border-none">
              <AccordionTrigger>
                <p className="text-xs md:text-lg font-semibold">How can I contact support?</p>
              </AccordionTrigger>
              <AccordionContent>
                <span className="text-xs md:text-base leading-[2]">
                  We are available 24 hours a day. If you need help, you can use the widget at the bottom left of the
                  page. Our colleagues will respond to your questions as quickly as possible.
                </span>
                <br />
                <span className="text-xs md:text-base leading-[2]">
                  You can also send your questions, requests, or issues to the email{' '}
                  <a href="mailto:info@ainevis.com" className="text-blue-400">
                    info@ainevis.com
                  </a>
                  .
                </span>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  )
}

export default FaqEN
