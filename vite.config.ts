import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        rollupOptions: {
            output: {
                entryFileNames: `assets/[name].js`,
                chunkFileNames: `assets/[name].js`,
                assetFileNames: `assets/[name].[ext]`
            },
            input: {
                'coop-confetti': resolve(__dirname, 'index.html'),
                iframe: resolve(__dirname, 'iframe.html'),
            },
        },
    },
})