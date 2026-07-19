/** @type {import('next-sitemap').IConfig} */

// Try to load blog dates from the generated extra-articles JSON for accurate lastmod
let blogDates = {};
try {
  const extraArticles = require("./data/extra-articles.json");
  for (const article of extraArticles) {
    if (article.slug && article.date) {
      blogDates[`/blogs/nieuws/${article.slug}`] = article.date;
    }
  }
} catch (_) {
  // Fallback: data not available during build
}

module.exports = {
  siteUrl: "https://amarenl.com",
  generateRobotsTxt: false, // Static robots.txt with AI crawler rules
  generateIndexSitemap: false,
  changefreq: "weekly",
  priority: 0.7,
  exclude: [],
  transform: async (config, path) => {
    let priority = config.priority;
    if (path === "/") priority = 1.0;
    else if (path.startsWith("/supplementen") || path.startsWith("/gewichtsbeheer") || path.startsWith("/schoonheid"))
      priority = 0.8;
    else if (path.startsWith("/blogs/nieuws")) priority = 0.6;

    // Use actual publish date for blog posts when available
    const actualDate = blogDates[path];
    const lastmod = actualDate
      ? new Date(actualDate).toISOString()
      : new Date().toISOString();

    return {
      loc: path,
      changefreq: config.changefreq,
      priority,
      lastmod,
    };
  },
};
