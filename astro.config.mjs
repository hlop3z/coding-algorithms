import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import expressiveCode from 'astro-expressive-code';

export default defineConfig({
  site: 'https://hlop3z.github.io',
  base: '/coding-algorithms',
  integrations: [
    expressiveCode({
      themes: ['github-dark', 'github-light'],
      styleOverrides: {
        borderRadius: '0.5rem',
      },
    }),
    mdx(),
    tailwind(),
  ],
  output: 'static',
  build: {
    assets: '_assets',
  },
});
