/** @type {import('next-sitemap').IConfig} */

async function fetchCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}/public/category/plain-list`)
  const categories = await res.json()

  const copywriting = categories.data.map((category) => ({
    changefreq: 'daily',
    lastmod: new Date().toISOString(),
    loc: `/app/copywriting/${category.slug}`,
    priority: 0.9
  }))

  return [...copywriting]
}

module.exports = {
  additionalPaths: async (_config) => {
    const categories = await fetchCategories()

    const result = [
      {
        changefreq: 'daily',
        lastmod: new Date().toISOString(),
        loc: '/',
        priority: 0.9
      },
      {
        changefreq: 'daily',
        lastmod: new Date().toISOString(),
        loc: '/login',
        priority: 0.9
      },

      {
        changefreq: 'daily',
        lastmod: new Date().toISOString(),
        loc: '/app/copywriting',
        priority: 0.9
      },

      {
        changefreq: 'daily',
        lastmod: new Date().toISOString(),
        loc: '/app/history',
        priority: 0.9
      },
      {
        changefreq: 'daily',
        lastmod: new Date().toISOString(),
        loc: '/app/resume',
        priority: 0.9
      },
      {
        changefreq: 'daily',
        lastmod: new Date().toISOString(),
        loc: '/app/settings',
        priority: 0.9
      },
      {
        changefreq: 'daily',
        lastmod: new Date().toISOString(),
        loc: '/app/dashboard',
        priority: 0.9
      },
      {
        changefreq: 'daily',
        lastmod: new Date().toISOString(),
        loc: '/privacy',
        priority: 0.9
      },
      {
        changefreq: 'daily',
        lastmod: new Date().toISOString(),
        loc: '/pricing',
        priority: 0.9
      },
      {
        changefreq: 'daily',
        lastmod: new Date().toISOString(),
        loc: '/about',
        priority: 0.9
      },

      ...categories
    ]

    return result
  },
  exclude: ['/user-name', '/fa', '/fa/*'],
  generateRobotsTxt: true,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL
}
