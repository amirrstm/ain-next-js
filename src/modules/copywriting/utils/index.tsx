import { IconBooks, IconBrandSlack, IconBulb, IconCertificate, IconDeviceLaptop, IconSpeakerphone } from '@tabler/icons-react'

import IconAidaFramework from '@/icons/copywriting/aida-framework'
import IconBioGenerator from '@/icons/copywriting/bio-generator'
import IconBlogOutline from '@/icons/copywriting/blog-outline'
import IconBulletPointGenerator from '@/icons/copywriting/bullet-point-generator'
import IconBusinessPitch from '@/icons/copywriting/business-pitch'
import IconCallToAction from '@/icons/copywriting/call-to-action'
import IconCaptionGenerator from '@/icons/copywriting/caption-generator'
import IconCoverLetters from '@/icons/copywriting/cover-letters'
import IconEmailGenerator from '@/icons/copywriting/email-generator'
import IconGoogleSearchAds from '@/icons/copywriting/google-search-ads'
import IconInterviewQuestions from '@/icons/copywriting/interview-questions'
import IconJobDescription from '@/icons/copywriting/job-description'
import IconLandingPage from '@/icons/copywriting/landing-page'
import IconMetaDescription from '@/icons/copywriting/meta-description'
import IconMetaTitle from '@/icons/copywriting/meta-title'
import IconNewsLetterGenerator from '@/icons/copywriting/newsletter-generator'
import IconPasFramework from '@/icons/copywriting/pas-framework'
import IconPoemWriting from '@/icons/copywriting/poem-writing'
import IconPostBlog from '@/icons/copywriting/post-blog'
import IconProductDescription from '@/icons/copywriting/product-description'
import IconSeoKeywords from '@/icons/copywriting/seo-keywords'
import IconSmsGenerator from '@/icons/copywriting/sms-generator'
import IconSocialMediaAd from '@/icons/copywriting/social-media-ad'
import IconSongGenerator from '@/icons/copywriting/song-generator'
import IconStartupIdeas from '@/icons/copywriting/startup-ideas'
import IconStoryCreator from '@/icons/copywriting/story-creator'
import IconVideoDescriptionGenerator from '@/icons/copywriting/video-description-generator'
import IconVideoIdeaGenerator from '@/icons/copywriting/video-idea-generator'

import type { ReactNode } from 'react'

export const CATEGORY_ICONS: Record<string, ReactNode> = {
  'branding-ads': <IconSpeakerphone className="h-6 w-6" />,
  'business-shortcuts': <IconCertificate className="h-6 w-6" />,
  copywriting: <IconBooks className="h-6 w-6" />,
  creative: <IconBulb className="h-6 w-6" />,
  'social-media': <IconBrandSlack className="h-6 w-6" />,
  'website-copy': <IconDeviceLaptop className="h-6 w-6" />
}

export const SUB_CATEGORY_ICONS: Record<string, ReactNode> = {
  'aida-framework': (
    <div className="h-12 w-12 translate-y-5 scale-x-[1.2] scale-y-[1.2]">
      <IconAidaFramework />
    </div>
  ),
  'bio-generator': (
    <div className="h-12 w-12 translate-y-2 scale-x-[1.2] scale-y-[1.2]">
      <IconBioGenerator />
    </div>
  ),

  'blog-outline': (
    <div className="h-12 w-12 scale-x-110 scale-y-110">
      <IconBlogOutline />
    </div>
  ),
  'bullet-point-generator': (
    <div className="h-12 w-12">
      <IconBulletPointGenerator />
    </div>
  ),
  'business-pitch': (
    <div className="h-12 w-12 scale-x-110 scale-y-110">
      <IconBusinessPitch />
    </div>
  ),
  'call-to-action': (
    <div className="h-12 w-12">
      <IconCallToAction />
    </div>
  ),
  'caption-generator': (
    <div className="h-12 w-12 translate-y-2 scale-x-[1.1] scale-y-[1.1]">
      <IconCaptionGenerator />
    </div>
  ),
  'cover-letters': (
    <div className="h-12 w-12">
      <IconCoverLetters />
    </div>
  ),
  'email-generator': (
    <div className="h-12 w-12">
      <IconEmailGenerator />
    </div>
  ),
  'google-search-ads': (
    <div className="h-12 w-12">
      <IconGoogleSearchAds />
    </div>
  ),
  'interview-questions': (
    <div className="h-12 w-12">
      <IconInterviewQuestions />
    </div>
  ),

  'job-description': (
    <div className="h-12 w-12">
      <IconJobDescription />
    </div>
  ),
  'landing-page': (
    <div className="h-12 w-12 scale-x-125 scale-y-125">
      <IconLandingPage />
    </div>
  ),
  'meta-description': (
    <div className="h-12 w-12">
      <IconMetaDescription />
    </div>
  ),
  'meta-title': (
    <div className="h-12 w-12">
      <IconMetaTitle />
    </div>
  ),
  'newsletter-generator': (
    <div className="h-12 w-12">
      <IconNewsLetterGenerator />
    </div>
  ),
  'pas-framework': (
    <div className="h-12 w-12 translate-y-5 scale-x-[1.1] scale-y-[1.1]">
      <IconPasFramework />
    </div>
  ),
  'poem-writing': (
    <div className="h-12 w-12">
      <IconPoemWriting />
    </div>
  ),
  'post-blog': (
    <div className="h-12 w-12 scale-x-125 scale-y-125">
      <IconPostBlog />
    </div>
  ),
  'product-description': (
    <div className="h-12 w-12">
      <IconProductDescription />
    </div>
  ),
  'seo-keywords': (
    <div className="h-12 w-12">
      <IconSeoKeywords />
    </div>
  ),
  'sms-generator': (
    <div className="h-12 w-12 translate-y-2 scale-x-[1.2] scale-y-[1.2]">
      <IconSmsGenerator />
    </div>
  ),
  'social-media-ads': (
    <div className="h-12 w-12">
      <IconSocialMediaAd />
    </div>
  ),
  'song-generator': (
    <div className="h-12 w-12">
      <IconSongGenerator />
    </div>
  ),
  'startup-ideas': (
    <div className="h-12 w-12">
      <IconStartupIdeas />
    </div>
  ),
  'story-creator': (
    <div className="h-12 w-12">
      <IconStoryCreator />
    </div>
  ),
  'video-description-generator': (
    <div className="h-12 w-12 translate-y-2 scale-x-[1.3] scale-y-[1.3]">
      <IconVideoDescriptionGenerator />
    </div>
  ),
  'video-idea-generator': (
    <div className="h-12 w-12 translate-y-1 scale-x-[1.5] scale-y-[1.5]">
      <IconVideoIdeaGenerator />
    </div>
  )
}
