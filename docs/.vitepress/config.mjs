import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/docs/',
  title: "RBank Docs",
  description: "Technická dokumentace hybridní bankovní platformy",
  appearance: 'dark',
  
  themeConfig: {
    nav: [
      { text: 'Domů', link: '/' },
      { text: 'Architektura', link: '/architecture/01-system-overview' },
      { text: 'Frontend', link: '/android/01-overview' },
      { text: 'API', link: '/api/01-overview' }
    ],

    sidebar: [
      {
        text: 'Architektura Systému',
        collapsed: false,
        items: [
          { text: 'Přehled', link: '/architecture/01-system-overview' },
          { text: 'Datový tok', link: '/architecture/02-data-flow' },
          { text: 'Komponenty', link: '/architecture/03-components' },
          { text: 'Rozhodnutí (ADR)', link: '/architecture/04-decisions' }
        ]
      },
      {
        text: 'Frontend (React & Capacitor)',
        collapsed: false,
        items: [
          { text: 'Základní přehled', link: '/android/01-overview' },
          { text: 'Struktura projektu', link: '/android/02-project-structure' },
          { text: 'UI a Tailwind', link: '/android/03-ui' },
          { text: 'Navigace', link: '/android/04-navigation' },
          { text: 'Komponenty', link: '/android/05-components-and-pages' },
          { text: 'Komunikace (REST)', link: '/android/07-networking' },
          { text: 'Build proces', link: '/android/08-build' }
        ]
      },
      {
        text: 'Backend (Node.js na AWS)',
        collapsed: false,
        items: [
          { text: 'Přehled', link: '/backend/01-overview' },
          { text: 'Architektura vrstev', link: '/backend/02-architecture' },
          { text: 'Bezpečnost', link: '/security/01-security-model' },
          { text: 'Proměnné a Konfigurace', link: '/backend/06-configuration' }
        ]
      },
      {
        text: 'REST API',
        collapsed: false,
        items: [
          { text: 'Základní info', link: '/api/01-overview' },
          { text: 'Endpointy', link: '/api/03-endpoints' },
          { text: 'Autentizace', link: '/api/02-authentication' },
          { text: 'Ošetření chyb', link: '/api/04-errors' }
        ]
      }
    ],

    search: {
      provider: 'local'
    }
  }
})
