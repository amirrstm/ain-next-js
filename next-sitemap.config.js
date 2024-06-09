/** @type {import('next-sitemap').IConfig} */

async function fetchCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}/public/category/plain-list`)
  const categories = await res.json()

  const copywriting = categories.data.map(category => ({
    priority: 0.9,
    changefreq: 'daily',
    lastmod: new Date().toISOString(),
    loc: `/app/copywriting/${category.slug}`,
  }))

  const useCases = categories.data.map(category => ({
    priority: 0.9,
    changefreq: 'daily',
    lastmod: new Date().toISOString(),
    loc: `/use-cases/${category.slug}`,
  }))

  return [...copywriting, ...useCases]
}

module.exports = {
  generateRobotsTxt: true,
  exclude: ['/user-name', '/fa', '/fa/*'],
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://ainevis.com',
  additionalPaths: async config => {
    const categories = await fetchCategories()

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

      ...categories,
    ]

    return result
  },
}
