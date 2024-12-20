import {defineConfig, loadEnv} from 'vite'
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import {globSync} from "glob";

const port = 5173
const origin = `https://adesso-cms.ddev.site:${port}`


// const origin = `${process.env.DDEV_PRIMARY_URL}:${port}`
export default defineConfig(({command, mode}) => {
    const env = loadEnv(mode, process.cwd(), '')
    return {
        plugins: [tailwindcss()], build: {
            manifest: true,
            rollupOptions: {
                input: [...globSync('./js/adesso.js'), ...globSync('./css/adesso.css'),], output: {
                    assetFileNames: 'assets/[name].[ext]',
                    chunkFileNames: 'assets/[name].js',
                    entryFileNames: 'assets/[name].js',
                },
            },
        }, resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        }, server: {
            host: "0.0.0.0", port: port, strictPort: true, origin: origin,
        },
    }
});
