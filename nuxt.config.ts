// Modelo 05 · Moda, produto único — On Track LP
export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  app: {
    // GitHub Pages: LP_BASE=/<repo>/ · Vercel/domínio próprio: deixe vazio
    baseURL: process.env.LP_BASE || '/',
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      title: 'Sua Marca — A camiseta que você vai usar até gastar',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'description', content: 'Algodão pesado, caimento reto e costura reforçada. Compre com troca grátis em 30 dias.' },
        { name: 'theme-color', content: '#F6F5F1' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap' },
        { rel: 'icon', href: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%230D0D0D'/%3E%3Cpath d='M20 18l8-4c1 3 2 5 4 5s3-2 4-5l8 4 6 8-6 4-3-2v22H23V28l-3 2-6-4Z' fill='%23FF5A36'/%3E%3C/svg%3E" },
      ],
    },
  },
})
