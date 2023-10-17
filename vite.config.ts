import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    base: "./",
    build: {
        target: 'esnext',
        rollupOptions: {
            input: {
                'coop-confetti': resolve(__dirname, 'index.html'),
                iframe: resolve(__dirname, 'iframe.html'),
            },
        },
    },
    preview: {
        port: 1999,
    }
})