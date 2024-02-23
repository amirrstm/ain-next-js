'use client'

import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'

type Props = { open: boolean; setOpen: (open: boolean) => void; onSave: () => void }
const Preferences: React.FC<Props> = ({ open, setOpen, onSave }) => {
  const [activeTab, setActiveTab] = useState(0)
  const [functionalActive, setFunctionalActive] = useState(false)

  const tabs = ['How can you manage your preferences?', 'Strictly Necessary Cookies', 'Performance Cookies']

  useEffect(() => {
    setFunctionalActive(!!localStorage.getItem('seen-cookies'))
  }, [])

  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent className="max-w-[800px]">
        <DialogHeader className="border-b pb-6">
          <DialogTitle asChild>
            <h2 className="text-xl">Preference Center</h2>
          </DialogTitle>
        </DialogHeader>

        <DialogDescription asChild>
          <div className="h-[500px] md:h-[400px] w-full overflow-y-auto flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-[230px] bg-secondary md:h-full">
              {tabs.map((tab, index) => (
                <div
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={clsx('px-6 py-3 w-full border-b relative cursor-pointer', {
                    'bg-white font-bold before:w-2 before:h-full before:absolute before:left-0 before:top-0 before:bg-primary':
                      activeTab === index,
                  })}
                >
                  <p>{tab}</p>
                </div>
              ))}
            </div>

            <div className="flex-1 p-4 h-full overflow-y-auto">
              {activeTab === 0 && <Manage />}
              {activeTab === 1 && <Strict />}
              {activeTab === 2 && <Functional active={functionalActive} setActive={setFunctionalActive} />}
            </div>
          </div>
        </DialogDescription>

        <DialogFooter className="flex flex-col gap-3 sm:flex-row sm:justify-between border-t pt-5">
          <Button className="min-w-[200px]" onClick={onSave}>
            Save my preferences
          </Button>
          <Button className="min-w-[200px]" onClick={onSave}>
            Accept only necessary
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default Preferences

const Manage = () => (
  <div>
    <h2 className="text-lg font-medium">How can you manage your preferences?</h2>

    <p className="mt-2">
      Tracking technologies that we enable are an essential part of the frameworks we have adopted to securely enable
      our digital ecosystem. Some of these trackers (which may include third-party cookies) are strictly necessary and
      are enabled for security purposes, to technically deliver the website or service requested, and to facilitate the
      exercise of other individual rights. Depending on your choice we may also enable other categories of non-essential
      trackers to deliver additional functionalities, such as personalization, application enhancement or improved
      website performance, registering web traffic analysis and, assisting in our marketing campaigns. The control panel
      provides detailed information about each tracker and enables you to opt-in/out of different purposes of
      processing. Our systems are able to detect and honour Global Privacy Control. For purposes of enabling our website
      and honouring user choice we process user IP addresses. To learn more, read the section titled "Content Delivery
      Network CDN" in our Cookie Notice.
    </p>
  </div>
)

const Strict = () => (
  <div>
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-medium">Strictly Necessary Cookies</h2>

      <p className="font-medium text-blue-400">Always Active</p>
    </div>

    <p className="mt-2">
      These cookies are set to provide the service, application or resource requested. Without these cookies, your
      request cannot be properly delivered. They are usually set to manage actions made by you, such as requesting
      website visual elements, pages resources or due user login/logoff. We can also use these cookies to set up
      essential functionalities to guarantee the security and efficiency of the service requested, like authentication
      and load balancer request.
    </p>

    <div className="mt-8">
      <div className="border-b pb-2">
        <p className="text-base font-medium">Vendor List</p>
      </div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="flex-1 pr-2 flex justify-between">
              <p>Cookies Pro</p>

              <p className="font-medium text-blue-400">Always Active</p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <AccordionDescription
              company="SolutionsApps"
              privacyLink="https://www.solutionsapps.com/privacy-policy/"
              description="SolutionsApps is the most comprehensive consent solution trusted by 250,000+ websites."
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>
            <div className="flex-1 pr-2 flex justify-between">
              <p>Cloudinary</p>

              <p className="font-medium text-blue-400">Always Active</p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <AccordionDescription
              company="Cloudinary"
              privacyLink="https://cloudinary.com/privacy"
              description="A single source of truth for managing the entire image and video lifecycle trusted by 1.5 million developers and 10,000 enterprise and hyper-growth companies."
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  </div>
)

const Functional: React.FC<{ active: boolean; setActive: (e: boolean) => void }> = ({ active, setActive }) => (
  <div>
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-medium">Performance Cookies</h2>

      <Switch checked={active} onCheckedChange={setActive} />
    </div>

    <p className="mt-2">
      These cookies are set to provide quantitative measures of website visitors. Information collected with these
      cookies is used in operations to measure website or software KPIs, such as performance. With the usage of these
      cookies we are able to count visits and traffic sources to improve the performance of our site and application. If
      you do not allow these cookies, we will not know when you have visited our site.
    </p>

    <div className="mt-8">
      <div className="border-b pb-2">
        <p className="text-base font-medium">Vendor List</p>
      </div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="flex-1 pr-2 flex justify-between">
              <p>Cookies Pro</p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <AccordionDescription
              company="SolutionsApps"
              privacyLink="https://www.solutionsapps.com/privacy-policy/"
              description="SolutionsApps is the most comprehensive consent solution trusted by 250,000+ websites."
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>
            <div className="flex-1 pr-2 flex justify-between">
              <p>CloudFlare</p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <AccordionDescription
              company="Cloudflare Inc."
              privacyLink="https://www.cloudflare.com/privacypolicy/"
              description="Cloudflare’s global cloud platform delivers a range of network services to businesses of all sizes around the world—making them more secure while enhancing the performance and reliability of their critical Internet properties."
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  </div>
)

type DescProps = { company: string; description: string; privacyLink: string }
const AccordionDescription: React.FC<DescProps> = ({ company, description, privacyLink }) => {
  return (
    <div className="p-1">
      <div>
        <p className="font-medium">Parent Company</p>
        <p className="text-xs ml-2 mt-1">{company}</p>
      </div>

      <div className="mt-3">
        <p className="font-medium">Description</p>
        <p className="text-xs ml-2 mt-1">{description}</p>
      </div>

      <div className="mt-3">
        <p className="font-medium">Privacy Policy Link</p>
        <p className="text-xs ml-2 mt-1">
          <a target="_blank" rel="noreferrer" href={privacyLink} className="text-primary cursor-pointer">
            {privacyLink}
          </a>
        </p>
      </div>
    </div>
  )
}
