import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [preact(), tailwindcss(),],
	build: {
		rollupOptions: {
		  external: ['preact-render-to-string'], // Fix Vercel build issue
		},
	},
});
