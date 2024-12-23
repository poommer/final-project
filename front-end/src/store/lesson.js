import { writable } from 'svelte/store';

// สร้าง store พร้อมค่าเริ่มต้น
export const name = writable(null);
export const set_progress = writable(0);
export const set_progressLesson = writable([{progress:0, qty:0 }, {progress:0, qty:0 }, {progress:0, qty:0 }, {progress:0, qty:0 }, {progress:0, qty:0 }]);
