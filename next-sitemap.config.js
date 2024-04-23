/** @type {import('next-sitemap').IConfig} */
module.exports = {
  generateRobotsTxt: true,
  exclude: ['/fa/user-name'],
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://ainevis.com',
  additionalPaths: async config => {
    const result = [
      {
        priority: 0.9,
        changefreq: 'daily',
        loc: '/fa/app/copywriting/google-ads',
        lastmod: new Date().toISOString(),
      },
      {
        priority: 0.9,
        changefreq: 'daily',
        loc: '/fa/app/copywriting/youtube-title-idea',
        lastmod: new Date().toISOString(),
      },
      {
        priority: 0.9,
        changefreq: 'daily',
        loc: '/fa/app/copywriting/instagram-caption',
        lastmod: new Date().toISOString(),
      },
      {
        priority: 0.9,
        changefreq: 'daily',
        loc: '/fa/app/copywriting/tweets',
        lastmod: new Date().toISOString(),
      },
      {
        priority: 0.9,
        changefreq: 'daily',
        loc: '/fa/app/copywriting/aida-framework',
        lastmod: new Date().toISOString(),
      },
      {
        priority: 0.9,
        changefreq: 'daily',
        loc: '/fa/app/copywriting/pas-framework',
        lastmod: new Date().toISOString(),
      },
      {
        priority: 0.9,
        changefreq: 'daily',
        loc: '/fa/app/copywriting/post-blog',
        lastmod: new Date().toISOString(),
      },
      {
        priority: 0.9,
        changefreq: 'daily',
        loc: '/fa/app/copywriting/seo-keywords',
        lastmod: new Date().toISOString(),
      },
      {
        priority: 0.9,
        changefreq: 'daily',
        loc: '/fa/app/copywriting/title-generator',
        lastmod: new Date().toISOString(),
      },
      {
        priority: 0.9,
        changefreq: 'daily',
        loc: '/fa/app/copywriting/linkedin-post',
        lastmod: new Date().toISOString(),
      },
      {
        priority: 0.9,
        changefreq: 'daily',
        loc: '/fa/app/copywriting/hashtag-generator',
        lastmod: new Date().toISOString(),
      },
      {
        priority: 0.9,
        changefreq: 'daily',
        loc: '/fa/app/copywriting/story-creator',
        lastmod: new Date().toISOString(),
      },
      {
        priority: 0.9,
        changefreq: 'daily',
        loc: '/fa/app/copywriting/content-expandor',
        lastmod: new Date().toISOString(),
      },
      {
        priority: 0.9,
        changefreq: 'daily',
        loc: '/fa/app/copywriting/email',
        lastmod: new Date().toISOString(),
      },
      {
        priority: 0.9,
        changefreq: 'daily',
        loc: '/fa/app/copywriting/startup-ideas',
        lastmod: new Date().toISOString(),
      },
      {
        priority: 0.9,
        changefreq: 'daily',
        loc: '/fa/app/copywriting/festivity-letters',
        lastmod: new Date().toISOString(),
      },
      {
        priority: 0.9,
        changefreq: 'daily',
        loc: '/fa/app/copywriting/question-answer',
        lastmod: new Date().toISOString(),
      },
    ]

    return result
  },
}
