<script>
    import 'animate.css';
export let xp ;
export let sumScore;
export let quizName;
export let time;
export let count_TF;

const encouragementQuotes = [
  {
    en: "Keep going. Every step may seem small, but it brings you closer to your dreams.",
    th: "เดินหน้าต่อไป แต่ละก้าวอาจดูเล็กน้อย แต่ทุกก้าวจะพาคุณเข้าใกล้ความฝันมากขึ้น"
  },
  {
    en: "You are stronger than you think, braver than you feel, and smarter than you believe.",
    th: "คุณแข็งแกร่งกว่าที่คิด กล้าหาญกว่าที่รู้สึก และฉลาดกว่าที่คุณเชื่อ"
  },
  {
    en: "Difficult roads often lead to beautiful destinations.",
    th: "ถนนที่ยากลำบากมักพาเราไปสู่จุดหมายที่สวยงาม"
  },
  {
    en: "The only limit to your success is your own doubt. Believe and achieve!",
    th: "ข้อจำกัดเดียวของความสำเร็จคือความสงสัยในตัวเอง เชื่อมั่นแล้วคุณจะสำเร็จ!"
  },
  {
    en: "Don’t quit. Your breakthrough is just around the corner.",
    th: "อย่าล้มเลิก ความสำเร็จของคุณอยู่ใกล้แค่เอื้อม"
  },
  {
    en: "Success is not about being the best; it's about being better than you were yesterday.",
    th: "ความสำเร็จไม่ใช่การเป็นที่หนึ่ง แต่เป็นการพัฒนาตัวเองให้ดีกว่าเมื่อวาน"
  },
  {
    en: "Every challenge is an opportunity to grow. Embrace it!",
    th: "ทุกความท้าทายคือโอกาสที่จะเติบโต จงยอมรับมัน"
  },
  {
    en: "You are capable of amazing things. Keep believing in your potential.",
    th: "คุณสามารถทำสิ่งที่ยิ่งใหญ่ได้ จงเชื่อในศักยภาพของตนเอง"
  },
  {
    en: "The journey may be tough, but the destination will be worth it.",
    th: "การเดินทางอาจจะยากลำบาก แต่จุดหมายปลายทางนั้นคุ้มค่า"
  },
  {
    en: "You’ve come this far, don’t stop now.",
    th: "คุณมาถึงจุดนี้แล้ว อย่าหยุดแค่นี้"
  },
  {
    en: "Learning a new language is like opening a door to a new world.",
    th: "การเรียนรู้ภาษาใหม่ก็เหมือนการเปิดประตูสู่โลกใหม่"
  },
  {
    en: "The more you practice, the more confident you become.",
    th: "ยิ่งฝึกฝนมากเท่าไหร่ คุณก็ยิ่งมั่นใจมากขึ้นเท่านั้น"
  },
  {
    en: "Mistakes are proof that you are trying.",
    th: "ความผิดพลาดคือหลักฐานว่าคุณพยายามอยู่"
  },
  {
    en: "Fluency is not the end goal. Communication is.",
    th: "ความคล่องแคล่วไม่ใช่จุดหมายปลายทาง การสื่อสารต่างหากที่เป็นจุดสำคัญ"
  },
  {
    en: "Small progress is still progress. Keep going!",
    th: "ความก้าวหน้าเล็กๆ น้อยๆ ก็คือความก้าวหน้าเช่นกัน อย่ายอมแพ้!"
  },
  {
    en: "Learning a language is not about perfection, it’s about connection.",
    th: "การเรียนภาษาคือเรื่องของการเชื่อมต่อ ไม่ใช่การทำให้สมบูรณ์แบบ"
  },
  {
    en: "Success in learning English doesn’t happen overnight, but it does happen!",
    th: "ความสำเร็จในการเรียนภาษาอังกฤษไม่เกิดขึ้นในชั่วข้ามคืน แต่มันเกิดขึ้นได้จริง!"
  },
  {
    en: "Every new word learned is a step closer to your goal.",
    th: "ทุกคำศัพท์ใหม่ที่เรียนรู้คืออีกหนึ่งก้าวที่เข้าใกล้เป้าหมายของคุณ"
  },
  {
    en: "The journey of a thousand words begins with a single sentence.",
    th: "การเดินทางของคำพันคำเริ่มต้นด้วยประโยคเดียว"
  },
  {
    en: "It’s okay to struggle. Every struggle brings you closer to success.",
    th: "การมีความยากลำบากเป็นเรื่องธรรมดา เพราะทุกความลำบากพาคุณไปใกล้ความสำเร็จมากขึ้น"
  },
  {
    en: "You’re doing an amazing job, and your hard work is truly inspiring!",
    th: "คุณกำลังทำได้ยอดเยี่ยมมาก ความทุ่มเทของคุณสร้างแรงบันดาลใจจริงๆ"
  },
  {
    en: "You have a unique talent that shines through everything you do.",
    th: "คุณมีพรสวรรค์ที่โดดเด่นในทุกสิ่งที่คุณทำ"
  },
  {
    en: "Your determination and dedication are truly admirable.",
    th: "ความมุ่งมั่นและการทุ่มเทของคุณเป็นสิ่งที่น่าชื่นชมอย่างแท้จริง"
  },
  {
    en: "I admire your strength and perseverance. You’re an inspiration!",
    th: "ฉันชื่นชมความแข็งแกร่งและความพากเพียรของคุณ คุณเป็นแรงบันดาลใจ!"
  },
  {
    en: "The way you handle challenges with grace is truly impressive.",
    th: "วิธีที่คุณจัดการกับความท้าทายอย่างสง่างามช่างน่าประทับใจจริงๆ"
  },
  {
    en: "Your positive energy lights up the room. Keep being you!",
    th: "พลังบวกของคุณทำให้บรรยากาศรอบข้างสดใสขึ้นเสมอ จงเป็นตัวของตัวเองต่อไป!"
  },
  {
    en: "You have an incredible ability to bring out the best in others.",
    th: "คุณมีความสามารถที่น่าทึ่งในการดึงสิ่งที่ดีที่สุดออกมาจากคนอื่น"
  },
  {
    en: "Your passion and enthusiasm make everything you do extraordinary.",
    th: "ความหลงใหลและความกระตือรือร้นของคุณทำให้ทุกสิ่งที่คุณทำพิเศษสุดๆ"
  },
  {
    en: "The effort you put into everything is truly remarkable. Keep up the fantastic work!",
    th: "ความพยายามที่คุณทุ่มเทเป็นสิ่งที่น่าทึ่งมาก ขอให้ทำสิ่งที่ยอดเยี่ยมต่อไป!"
  },
  {
    en: "You are a shining example of what dedication and hard work can achieve.",
    th: "คุณเป็นตัวอย่างที่ชัดเจนของความทุ่มเทและความพยายามที่ประสบความสำเร็จ"
  }
];

let QuotesIndex = Math.floor(Math.random()*encouragementQuotes.length)

console.log(encouragementQuotes[QuotesIndex]);


</script>

<div class="  animate__zoomInRight w-full h-full flex flex-col  items-center bg-ec-dark-blue-2 rounded-xl p-6">
    <h1 class="text-5xl text-ec-light-yellow">Summary for the {quizName}</h1>
    <h3 class="text-2xl flex flex-col justify-center items-center mt-4  ">
        {encouragementQuotes[QuotesIndex].en}
        <span class="text-xl">{encouragementQuotes[QuotesIndex].th}</span>
    </h3>
<div class="flex flex-col gap-2 mt-4">
    <div class="flex gap-2" >
        <div class="flex flex-col justify-center items-center gap-4 w-[12rem] h-[12rem] rounded-lg bg-ec-dark-blue-4">
            <img src="/icon/coin.png" alt="" class="w-[5rem] h-[5rem]">
            <p class="text-5xl">{sumScore}</p>
        </div>

        <div class="flex flex-col justify-center items-center gap-4 w-[12rem] h-[12rem] rounded-lg bg-ec-dark-blue-4">
            <img src="/icon/xp.png" alt="" class="w-[7rem] h-[7rem]">
            <p class="text-5xl">{xp}</p>
        </div>
    </div>

    <div class="flex gap-2" >
        <div class="flex flex-col justify-center items-center gap-4 w-[12rem] h-[12rem] rounded-lg bg-ec-dark-blue-4">
            <div class="flex text-4xl justify-center items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="48px" viewBox="0 0 24 24" width="48px" fill="#75FB4C"><rect fill="none" height="24" width="24"/><path d="M22,5.18L10.59,16.6l-4.24-4.24l1.41-1.41l2.83,2.83l10-10L22,5.18z M19.79,10.22C19.92,10.79,20,11.39,20,12 c0,4.42-3.58,8-8,8s-8-3.58-8-8c0-4.42,3.58-8,8-8c1.58,0,3.04,0.46,4.28,1.25l1.44-1.44C16.1,2.67,14.13,2,12,2C6.48,2,2,6.48,2,12 c0,5.52,4.48,10,10,10s10-4.48,10-10c0-1.19-0.22-2.33-0.6-3.39L19.79,10.22z"/></svg>
                {count_TF.T}
            </div>
            <div class="flex text-4xl justify-center items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#EA3323"><path d="M0 0h24v24H0z" fill="none"/><path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
                    {count_TF.F}
            </div>
        </div>

        <div class="flex flex-col  text-4xl justify-center items-center gap-4 w-[12rem] h-[12rem] rounded-lg bg-ec-dark-blue-4">
            <svg xmlns="http://www.w3.org/2000/svg" height="64" viewBox="0 0 24 24" width="64" fill="#ffc700"><path d="M-618-568H782v3600H-618zM0 0h24v24H0z" fill="none"/><path d="M22 5.7l-4.6-3.9-1.3 1.5 4.6 3.9L22 5.7zM7.9 3.4L6.6 1.9 2 5.7l1.3 1.5 4.6-3.8zM12.5 8H11v6l4.7 2.9.8-1.2-4-2.4V8zM12 4c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 16c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7z"/></svg>
            {`${String(Math.floor(time / 60)).padStart(1, '0')}:${String(time % 60).padStart(2, '0')}`}
        </div>
    </div>
</div>
 </div>