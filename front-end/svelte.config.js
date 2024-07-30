import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter()
  },
  preprocess: vitePreprocess(),
  "dependencies": {
    "@sveltejs/adapter-auto": "^1.0.0", // หรือเวอร์ชันที่คุณใช้
    // other dependencies
  },
  "devDependencies": {
    "@sveltejs/vite-plugin-svelte": "^1.0.0", // หรือเวอร์ชันที่คุณใช้
    // other devDependencies
  }
};
export default config;