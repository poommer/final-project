import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
        out: 'build' // โฟลเดอร์ที่สร้าง output สำหรับ production
    }),
},
  preprocess: vitePreprocess(),
};

export default config;
