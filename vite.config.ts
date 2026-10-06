import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// Same policy as the Fastify header, for the python3 fallback which sends no header.
// Build only: the dev server injects inline styles that it would block.
const CSP = "default-src 'none'; script-src 'self'; style-src 'self'; connect-src 'self'; img-src 'self' data:; base-uri 'none'; form-action 'none'"

export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'csp-meta',
      apply: 'build',
      transformIndexHtml: html =>
        html.replace('<meta charset="utf-8">', `<meta charset="utf-8">\n    <meta http-equiv="Content-Security-Policy" content="${CSP}">`),
    },
  ],
  // Participants read src/rules.ts in DevTools > Sources: keep the code legible.
  build: { minify: false, sourcemap: true },
})
