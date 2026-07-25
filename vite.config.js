import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves project sites from https://<user>.github.io/<repo>/
// so the build needs to know the sub-path. Change this if you rename the repo.
// If you ever move to a custom domain or a <user>.github.io repo, set it to '/'.
const REPO_NAME = 'naledi-portfolio'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? `/${REPO_NAME}/` : '/',
}))
