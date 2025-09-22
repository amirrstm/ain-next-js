import { useTranslations } from 'next-intl'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

import type React from 'react'

const FaqEN: React.FC = () => {
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
                <p className="font-semibold text-xs md:text-lg">What is AINevis?</p>
              </AccordionTrigger>
              <AccordionContent>
                <span className="text-xs leading-[2] md:text-base">
                  AINevis is a comprehensive intelligent system for content creation. Using AINevis, you can create text content
                  with very high accuracy and in the shortest time possible.
                </span>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="how">
              <AccordionTrigger>
                <p className="font-semibold text-xs md:text-lg">How does it work?</p>
              </AccordionTrigger>
              <AccordionContent>
                <span className="text-xs leading-[2] md:text-base">
                  After a simple registration with your email or phone number, you will be taken to your user page or dashboard.
                  Then you can select content creation from the right menu and choose what suits your needs from the various
                  categories. After that, in the new page that opens, answer the questions to generate the text for you.
                </span>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="free">
              <AccordionTrigger>
                <p className="font-semibold text-xs md:text-lg">Is AINevis free to use?</p>
              </AccordionTrigger>
              <AccordionContent>
                <span className="text-xs leading-[2] md:text-base">
                  Yes, in the beta or initial version of AINevis, all features are available to you for free.
                </span>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="content">
              <AccordionTrigger>
                <p className="font-semibold text-xs md:text-lg">How much content can I create using AINevis?</p>
              </AccordionTrigger>
              <AccordionContent>
                <span className="text-xs leading-[2] md:text-base">
                  After registering on the site, you are allowed to create 50 pieces of text content. This means that you can
                  generate text 50 times from different content categories.
                </span>
                <br />
                <span className="text-xs leading-[2] md:text-base">
                  This amount of content is considered for one month, meaning that at the beginning of each month (the date you
                  joined AINevis), this amount is reset.
                </span>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="access">
              <AccordionTrigger>
                <p className="font-semibold text-xs md:text-lg">Will I have access to the generated content?</p>
              </AccordionTrigger>
              <AccordionContent>
                <span className="text-xs leading-[2] md:text-base">
                  Yes, you can view your generated texts in the user panel and the history menu.
                </span>
                <br />
                <span className="text-xs leading-[2] md:text-base">
                  Also, in the dashboard menu, you can see the amount of generated content.
                </span>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem className="border-none" value="support">
              <AccordionTrigger>
                <p className="font-semibold text-xs md:text-lg">How can I contact support?</p>
              </AccordionTrigger>
              <AccordionContent>
                <span className="text-xs leading-[2] md:text-base">
                  We are available 24 hours a day. If you need help, you can use the widget at the bottom left of the page. Our
                  colleagues will respond to your questions as quickly as possible.
                </span>
                <br />
                <span className="text-xs leading-[2] md:text-base">
                  You can also send your questions, requests, or issues to the email{' '}
                  <a className="text-blue-400" href="mailto:info@ainevis.com">
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
