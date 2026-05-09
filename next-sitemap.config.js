/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://amarenl.com",
  generateRobotsTxt: true,
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

    return {
      loc: path,
      changefreq: config.changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};
