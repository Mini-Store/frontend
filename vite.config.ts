import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@icons': path.resolve(__dirname, './src/assets/icons'),
        '@styles': path.resolve(__dirname, './src/assets/styles'),
        '@components': path.resolve(__dirname, './src/components'),
        '@atoms': path.resolve(__dirname, './src/components/atoms'),
        '@organisms': path.resolve(__dirname, './src/components/organisms'),
        '@molecules': path.resolve(__dirname, './src/components/molecules'),
        '@constants': path.resolve(__dirname, './src/constants'),
        '@delivery': path.resolve(__dirname, './src/delivery'),
        '@helpers': path.resolve(__dirname, './src/helpers'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@lib': path.resolve(__dirname, './src/lib'),
        '@models': path.resolve(__dirname, './src/models'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@router': path.resolve(__dirname, './src/router'),
        '@store': path.resolve(__dirname, './src/store'),
      },
    },
    plugins: [react()],
    css: {
      postcss: './postcss.config.js',
    },
    server: {
      host: true,
      port: 5173,
      strictPort: true,
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL ?? 'http://localhost:8080',
          changeOrigin: true,
        },
      },
    },
  }
})
