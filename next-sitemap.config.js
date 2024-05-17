/** @type {import('next-sitemap').IConfig} */
module.exports = {
  generateRobotsTxt: true,
  exclude: ['/user-name', '/fa', '/fa/*'],
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://ainevis.com',
  additionalPaths: async config => {
    const result = [
      {
        loc: '/',
        priority: 0.9,
        changefreq: 'daily',
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/login',
        priority: 0.9,
        changefreq: 'daily',
        lastmod: new Date().toISOString(),
      },

      {
        priority: 0.9,
        changefreq: 'daily',
        loc: '/app/copywriting',
        lastmod: new Date().toISOString(),
      },

      {
        priority: 0.9,
        changefreq: 'daily',
        loc: '/app/history',
        lastmod: new Date().toISOString(),
      },
      {
        priority: 0.9,
        changefreq: 'daily',
        loc: '/app/resume',
        lastmod: new Date().toISOString(),
      },
      {
        priority: 0.9,
        changefreq: 'daily',
        loc: '/app/settings',
        lastmod: new Date().toISOString(),
      },
      {
        priority: 0.9,
        changefreq: 'daily',
        loc: '/app/dashboard',
        lastmod: new Date().toISOString(),
      },
      {
        priority: 0.9,
        changefreq: 'daily',
        loc: '/privacy',
        lastmod: new Date().toISOString(),
      },
      {
        priority: 0.9,
        changefreq: 'daily',
        loc: '/pricing',
        lastmod: new Date().toISOString(),
      },
      {
        priority: 0.9,
        changefreq: 'daily',
        loc: '/about',
        lastmod: new Date().toISOString(),
      },
      {
        priority: 0.7,
        changefreq: 'daily',
        loc: '/app/copywriting/google-ads',
        lastmod: new Date().toISOString(),
      },
      {
        priority: 0.7,
        changefreq: 'daily',
        loc: '/app/copywriting/youtube-title-idea',
        lastmod: new Date().toISOString(),
      },
      {
        priority: 0.7,
        changefreq: 'daily',
        loc: '/app/copywriting/instagram-caption',
        lastmod: new Date().toISOString(),
      },
      {
        priority: 0.7,
        changefreq: 'daily',
        loc: '/app/copywriting/tweets',
        lastmod: new Date().toISOString(),
      },
      {
        priority: 0.7,
        changefreq: 'daily',
        loc: '/app/copywriting/aida-framework',
        lastmod: new Date().toISOString(),
      },
      {
        priority: 0.7,
        changefreq: 'daily',
        loc: '/app/copywriting/pas-framework',
        lastmod: new Date().toISOString(),
      },
      {
        priority: 0.7,
        changefreq: 'daily',
        loc: '/app/copywriting/post-blog',
        lastmod: new Date().toISOString(),
      },
      {
        priority: 0.7,
        changefreq: 'daily',
        loc: '/app/copywriting/seo-keywords',
        lastmod: new Date().toISOString(),
      },
      {
        priority: 0.7,
        changefreq: 'daily',
        loc: '/app/copywriting/title-generator',
        lastmod: new Date().toISOString(),
      },
      {
        priority: 0.7,
        changefreq: 'daily',
        loc: '/app/copywriting/linkedin-post',
        lastmod: new Date().toISOString(),
      },
      {
        priority: 0.7,
        changefreq: 'daily',
        loc: '/app/copywriting/hashtag-generator',
        lastmod: new Date().toISOString(),
      },
      {
        priority: 0.7,
        changefreq: 'daily',
        loc: '/app/copywriting/story-creator',
        lastmod: new Date().toISOString(),
      },
      {
        priority: 0.7,
        changefreq: 'daily',
        loc: '/app/copywriting/content-expandor',
        lastmod: new Date().toISOString(),
      },
      {
        priority: 0.7,
        changefreq: 'daily',
        loc: '/app/copywriting/email',
        lastmod: new Date().toISOString(),
      },
      {
        priority: 0.7,
        changefreq: 'daily',
        loc: '/app/copywriting/startup-ideas',
        lastmod: new Date().toISOString(),
      },
      {
        priority: 0.7,
        changefreq: 'daily',
        loc: '/app/copywriting/festivity-letters',
        lastmod: new Date().toISOString(),
      },
      {
        priority: 0.7,
        changefreq: 'daily',
        loc: '/app/copywriting/question-answer',
        lastmod: new Date().toISOString(),
      },
    ]

    return result
  },
}
