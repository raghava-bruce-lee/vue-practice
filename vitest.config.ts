// import { fileURLToPath } from 'node:url';
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      root: './src',
      globals: true,
      environment: 'jsdom',
      coverage: {
        exclude: ['**/icons/*.vue', '**/plugins/**/*.ts', '**/layouts/*.vue'],
        reportsDirectory: '../coverage'
      },
      server: {
        deps: {
          inline: ['vuetify']
        }
      },
      exclude: [...configDefaults.exclude, 'e2e/*']
      // root: fileURLToPath(new URL('./', import.meta.url))
    }
  })
);
