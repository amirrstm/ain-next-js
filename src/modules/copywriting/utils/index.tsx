import {
  IconAdjustmentsStar,
  IconArrowsMaximize,
  IconBrandBlogger,
  IconBrandGoogle,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
  IconBrandYoutube,
  IconConfetti,
  IconHash,
  IconHeading,
  IconMailBolt,
  IconMessageStar,
  IconPencilHeart,
  IconQuestionMark,
  IconSeo,
  IconTextCaption,
  IconTopologyStar3,
} from '@tabler/icons-react'
import { Globe, Laptop, LibraryBig, Megaphone, Paperclip, Slack } from 'lucide-react'
import { ReactNode } from 'react'

export const CATEGORY_ICONS: Record<string, ReactNode> = {
  copywriting: <LibraryBig className="w-5 h-5" />,
  'branding-ads': <Megaphone className="w-5 h-5" />,
  'website-copy': <Laptop className="w-5 h-5" />,
  'social-media': <Slack className="w-5 h-5" />,
  publication: <Paperclip className="w-5 h-5" />,
  other: <Globe className="w-5 h-5" />,
}

export const SUB_CATEGORY_ICONS: Record<string, ReactNode> = {
  'google-ads': <IconBrandGoogle className="w-6 h-6" />,
  'instagram-caption': <IconBrandInstagram className="w-6 h-6" />,
  'youtube-title-idea': <IconBrandYoutube className="w-6 h-6" />,
  tweets: <IconBrandX className="w-6 h-6" />,
  'aida-framework': <IconTextCaption className="w-6 h-6" />,
  'pas-framework': <IconTopologyStar3 className="w-6 h-6" />,
  'post-blog': <IconBrandBlogger className="w-6 h-6" />,
  'seo-keywords': <IconSeo className="w-6 h-6" />,
  'title-generator': <IconHeading className="w-6 h-6" />,
  'linkedin-post': <IconBrandLinkedin className="w-6 h-6" />,
  'review-responder': <IconMessageStar className="w-6 h-6" />,
  'hashtag-generator': <IconHash className="w-6 h-6" />,
  'story-creator': <IconPencilHeart className="w-6 h-6" />,
  'content-expandor': <IconArrowsMaximize className="w-6 h-6" />,
  email: <IconMailBolt className="w-6 h-6" />,
  'question-answer': <IconQuestionMark className="w-6 h-6" />,
  'startup-ideas': <IconAdjustmentsStar className="w-6 h-6" />,
  'festivity-letters': <IconConfetti className="w-6 h-6" />,
}
