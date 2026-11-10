import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), ''), ...process.env };
  const raw = env.SITE_URL?.trim();
  let siteUrl;
  if (raw) {
    const url = new URL(raw);
    if (url.protocol !== 'https:' || url.search || url.hash || url.username || url.password) {
      throw new Error('SITE_URL doit être une URL HTTPS publique sans paramètres ni identifiants.');
    }
    siteUrl = url.href.endsWith('/') ? url.href : `${url.href}/`;
  }
  return {
    base: './',
    server: { allowedHosts: ['terminal.local'] },
    preview: { allowedHosts: ['terminal.local'] },
    build: { outDir: 'dist', sourcemap: false },
    plugins: [{
      name: 'lnia-seo',
      transformIndexHtml(html) {
        const safe = (s) => s.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
        return html.replace('<!-- PUBLIC_SEO -->', siteUrl
          ? `<link rel="canonical" href="${safe(siteUrl)}"><meta property="og:url" content="${safe(siteUrl)}"><meta property="og:image" content="${safe(new URL('logo-ln-ia.png', siteUrl).href)}">`
          : '').replace('content="noindex,follow"', siteUrl ? 'content="index,follow"' : 'content="noindex,follow"');
      },
      generateBundle() {
        this.emitFile({ type: 'asset', fileName: 'robots.txt', source: siteUrl
          ? `User-agent: *\nAllow: /\nSitemap: ${new URL('sitemap.xml', siteUrl).href}\n`
          : 'User-agent: *\nDisallow: /\n' });
        if (siteUrl) this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${siteUrl.replaceAll('&', '&amp;').replaceAll('<', '&lt;')}</loc></url></urlset>` });
      }
    }]
  };
});
