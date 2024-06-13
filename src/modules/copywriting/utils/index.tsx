import {
  IconBooks,
  IconBrandSlack,
  IconBulb,
  IconCertificate,
  IconDeviceLaptop,
  IconSpeakerphone,
} from '@tabler/icons-react'
import { ReactNode } from 'react'

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

export const CATEGORY_ICONS: Record<string, ReactNode> = {
  creative: <IconBulb className="w-6 h-6" />,
  copywriting: <IconBooks className="w-6 h-6" />,
  'branding-ads': <IconSpeakerphone className="w-6 h-6" />,
  'website-copy': <IconDeviceLaptop className="w-6 h-6" />,
  'social-media': <IconBrandSlack className="w-6 h-6" />,
  'business-shortcuts': <IconCertificate className="w-6 h-6" />,
}

export const SUB_CATEGORY_ICONS: Record<string, ReactNode> = {
  'business-pitch': (
    <div className="w-12 h-12 scale-x-110 scale-y-110">
      <IconBusinessPitch />
    </div>
  ),
  'call-to-action': (
    <div className="w-12 h-12">
      <IconCallToAction />
    </div>
  ),
  'social-media-ads': (
    <div className="w-12 h-12">
      <IconSocialMediaAd />
    </div>
  ),
  'google-search-ads': (
    <div className="w-12 h-12">
      <IconGoogleSearchAds />
    </div>
  ),
  'caption-generator': (
    <div className="w-12 h-12 flex items-center">
      <IconCaptionGenerator />
    </div>
  ),
  'sms-generator': (
    <div className="w-12 h-12 flex items-center">
      <IconSmsGenerator />
    </div>
  ),
  'bio-generator': (
    <div className="w-12 h-12 flex">
      <IconBioGenerator />
    </div>
  ),
  'video-description-generator': (
    <div className="w-12 h-12 flex items-end scale-x-[1.3] scale-y-[1.3]">
      <IconVideoDescriptionGenerator />
    </div>
  ),
  'video-idea-generator': (
    <div className="w-12 h-12 flex scale-x-150 scale-y-150">
      <IconVideoIdeaGenerator />
    </div>
  ),
  'aida-framework': (
    <div className="w-12 h-12 flex scale-x-125 scale-y-125">
      <IconAidaFramework />
    </div>
  ),
  'pas-framework': (
    <div className="w-12 h-12 flex scale-x-110 scale-y-110">
      <IconPasFramework />
    </div>
  ),
  'product-description': (
    <div className="w-12 h-12 flex items-start ">
      <IconProductDescription />
    </div>
  ),
  'bullet-point-generator': (
    <div className="w-12 h-12 flex items-start ">
      <IconBulletPointGenerator />
    </div>
  ),
  'startup-ideas': (
    <div className="w-12 h-12 flex items-start ">
      <IconStartupIdeas />
    </div>
  ),
  'cover-letters': (
    <div className="w-12 h-12 flex items-start scale-x-110 scale-y-110">
      <IconCoverLetters />
    </div>
  ),
  'email-generator': (
    <div className="w-12 h-12 flex items-start scale-x-110 scale-y-110">
      <IconEmailGenerator />
    </div>
  ),
  'interview-questions': (
    <div className="w-12 h-12 flex items-start">
      <IconInterviewQuestions />
    </div>
  ),

  'job-description': (
    <div className="w-12 h-12 flex items-start">
      <IconJobDescription />
    </div>
  ),

  'blog-outline': (
    <div className="w-12 h-12 flex items-start scale-x-110 scale-y-110">
      <IconBlogOutline />
    </div>
  ),
  'landing-page': (
    <div className="w-12 h-12 flex items-start scale-x-125 scale-y-125">
      <IconLandingPage />
    </div>
  ),
  'post-blog': (
    <div className="w-12 h-12 flex items-start scale-x-125 scale-y-125">
      <IconPostBlog />
    </div>
  ),
  'meta-description': (
    <div className="w-12 h-12 flex items-start ">
      <IconMetaDescription />
    </div>
  ),
  'seo-keywords': (
    <div className="w-12 h-12 flex items-start">
      <IconSeoKeywords />
    </div>
  ),
  'meta-title': (
    <div className="w-12 h-12 flex items-start">
      <IconMetaTitle />
    </div>
  ),
  'newsletter-generator': (
    <div className="w-12 h-12 flex items-start">
      <IconNewsLetterGenerator />
    </div>
  ),
  'story-creator': (
    <div className="w-12 h-12 flex items-start">
      <IconStoryCreator />
    </div>
  ),
  'poem-writing': (
    <div className="w-12 h-12 flex items-start">
      <IconPoemWriting />
    </div>
  ),
  'song-generator': (
    <div className="w-12 h-12 flex items-start">
      <IconSongGenerator />
    </div>
  ),
}
