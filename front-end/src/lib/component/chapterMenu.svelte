<script>
	import { onMount } from 'svelte';
     let chapter_data = [
        {
            lesson_ID: "1-0",
            lesson_title: "you and me",
            "lesson_description": "เรียนรู้คำศัพท์และประโยคพื้นฐานสำหรับการทักทาย แนะนำตัว และการสนทนาง่ายๆ ในชีวิตประจำวัน",
            "unit_No": "1",
            "lesson_level": "0",
            "lesHit_status": null
        },
        {
            "lesson_ID": "1-1",
            "lesson_title": "Hello my frind",
            "lesson_description": "เรียนรู้การทักทาย คำศัพท์ง่ายๆ และการสนทนาพื้นฐานเพื่อฝึกการแนะนำตัวและถามสารทุกข์สุกดิบ",
            "unit_No": "1",
            "lesson_level": "1",
            "lesHit_status": "1"
        },
        {
            "lesson_ID": "1-2",
            "lesson_title": "Greeting on time",
            "lesson_description": "เรียนรู้คำศัพท์เกี่ยวกับการทักทายตามช่วงเวลา พร้อมตัวอย่างประโยคและการสนทนาพื้นฐานในชีวิตประจำวัน.",
            "unit_No": "1",
            "lesson_level": "2",
            "lesHit_status": "1"
        },
        {
            "lesson_ID": "1-3",
            "lesson_title": "Nice to Meet You",
            "lesson_description": "ด้เรียนรู้การแนะนำตัวและแลกเปลี่ยนความสุภาพ รวมถึงการถามและตอบเกี่ยวกับชื่อของกันและกัน",
            "unit_No": "1",
            "lesson_level": "3",
            "lesHit_status": null
        },
        {
            "lesson_ID": "1-4",
            "lesson_title": "Quiz 1",
            "lesson_description": "Quiz 1",
            "unit_No": "1",
            "lesson_level": "4",
            "lesHit_status": null
        }
    ];

    console.log(chapter_data);
    onMount(async ()=>{
         chapter_data = chapter_data.map((item) => {
        let new_status
        if(item.lesHit_status === "0"){
            new_status = false
        }else if(item.lesHit_status === "1"){
            new_status = true
        }else{
            new_status = null
        }
        return {
            ...item,  // Spread item contents
            lesHit_status: new_status  // Overwrite lesHit_status with new_status
        }
        
    })
     console.log(chapter_data);
    })
   

    let gotoLesson = (lessonID) => {
        console.log(lessonID);
        
    }
   
    
    </script>
    <!-- <a href="lesson/">chapter1 level1</a> -->
    <div class="relative  m-4 p-4">
    
        <div class=" flex flex-col justify-center items-center z-[99] relative">
                <p class="relative text-[35px]">{chapter_data[0].lesson_title}</p>
                <button class=" w-[140px] h-[140px] rounded-full bg-ec-purple-800 shadow-[0px_10px_0_0_#A35DEF] 
               active:shadow-[0px_5px_0_0_#A35DEF] active:translate-y-[5px]  relative" >
                   <span class=" text-white text-[80px]">1</span>
               </button>
            </div>
    
            <div class={`w-[160px] border-b-[5px] border-dashed translate-x-[11rem] translate-y-[2.5rem] z-[-1] transform rotate-[60deg] ${chapter_data[1].lesHit_status === null ? 'border-gray-400'  : 'border-ec-yellow-400'}`}></div>
    
            <button class={`z-1 flex justify-center items-center w-[100px] h-[100px] rounded-full active:translate-y-[5px] ${chapter_data[1].lesHit_status === true ? 'bg-ec-purple-800 shadow-[0px_10px_0_0_#A35DEF] active:shadow-[0px_5px_0_0_#A35DEF]' : 'bg-ec-light-yellow shadow-[0px_10px_0_0_#755805] active:shadow-[0px_5px_0_0_#755805]'} 
            ml-[16.25rem] mr-[3rem] mt-[5.75rem]  relative disabled:bg-[#a5a5a5] disabled:shadow-[0px_10px_0_0_#9d9d9db0] disabled:active:translate-y-0 disabled:cursor-not-allowed`} 
            disabled={chapter_data[1].lesHit_status === null} on:click={() => {gotoLesson(chapter_data[1].lesson_ID)}}> 
            {#if chapter_data[1].lesHit_status === true}
            <img src="icon/book_check.png" alt="">
            {:else if chapter_data[1].lesHit_status === null}
            <img src="icon/book_close.png" alt="">
            {:else}
            <img src="icon/book.png" alt="">
            {/if}
       </button>
    
            <div class={`w-[180px] border-b-[5px]  border-dashed relative translate-x-[7.75rem] translate-y-[3.5rem]   transform rotate-[-40deg] ${chapter_data[2].lesHit_status === null ? 'border-gray-400'  : 'border-ec-yellow-400'}`}></div>
    
            <button class={`z-1 flex justify-center items-center w-[100px] h-[100px] rounded-full active:translate-y-[5px] ${chapter_data[2].lesHit_status === true ? 'bg-ec-purple-800 shadow-[0px_10px_0_0_#A35DEF] active:shadow-[0px_5px_0_0_#A35DEF]' : 'bg-ec-light-yellow shadow-[0px_10px_0_0_#755805] active:shadow-[0px_5px_0_0_#755805]'}
                 mt-[5rem] ml-[3rem] relative
                disabled:bg-[#a5a5a5] disabled:shadow-[0px_10px_0_0_#9d9d9db0] disabled:active:translate-y-0 disabled:cursor-not-allowed`} disabled={chapter_data[2].lesHit_status === null} on:click={() => {gotoLesson(chapter_data[2].lesson_ID)}}> 
                  {#if chapter_data[2].lesHit_status === true}
                  <img src="icon/book_check.png" alt="">
                  {:else if chapter_data[2].lesHit_status === null}
                  <img src="icon/book_close.png" alt="">
                  {:else}
                  <img src="icon/book.png" alt="">
                  {/if}
            </button>
    
                <div class={`w-[180px] border-b-[5px]  border-dashed relative translate-x-[7rem] translate-y-[3.5rem] transform rotate-[45deg] ${chapter_data[3].lesHit_status === null ? 'border-gray-400'  : 'border-ec-yellow-400'}`}></div>
      
            <button class={`z-1  flex justify-center items-center w-[100px] h-[100px] rounded-full active:translate-y-[5px] ${chapter_data[3].lesHit_status === true ? 'bg-ec-purple-800 shadow-[0px_10px_0_0_#A35DEF] active:shadow-[0px_5px_0_0_#A35DEF]' : 'bg-ec-light-yellow shadow-[0px_10px_0_0_#755805] active:shadow-[0px_5px_0_0_#755805]'}
            ml-[16.25rem] mr-[2rem] mt-[5.5rem]  relative
            disabled:bg-[#a5a5a5] disabled:shadow-[0px_10px_0_0_#9d9d9db0] disabled:active:translate-y-0 disabled:cursor-not-allowed`}
            disabled={chapter_data[3].lesHit_status === null} on:click={() => {gotoLesson(chapter_data[3].lesson_ID)}}>
            {#if chapter_data[3].lesHit_status === true}
            <img src="icon/book_check.png" alt="">
            {:else if chapter_data[3].lesHit_status === null}
            <img src="icon/book_close.png" alt="">
            {:else}
            <img src="icon/book.png" alt="">
            {/if}
            </button>

            <div class={`w-[180px] border-b-[5px] border-ec-purple-400 border-dashed relative translate-x-[7.5rem] translate-y-[3rem] z-[-1]   transform rotate-[-40deg] ${chapter_data[3].lesHit_status === null ? 'border-gray-400'  : 'border-ec-yellow-400'}`}></div>
    
            <button class={`z-1 flex justify-center items-center w-[100px] h-[100px] rounded-full active:translate-y-[5px] ${chapter_data[1].lesHit_status === true ? 'bg-ec-purple-800 shadow-[0px_10px_0_0_#A35DEF] active:shadow-[0px_5px_0_0_#A35DEF]' : 'bg-ec-light-yellow shadow-[0px_10px_0_0_#755805] active:shadow-[0px_5px_0_0_#755805]'} 
                 mt-[5rem] ml-[3rem] relative
    disabled:bg-[#a5a5a5] disabled:shadow-[0px_10px_0_0_#9d9d9db0] disabled:active:translate-y-0 disabled:cursor-not-allowed `} disabled={chapter_data[4].lesHit_status === null} on:click={() => {gotoLesson(chapter_data[4].lesson_ID)}}> 
            {#if chapter_data[4].lesHit_status === true}
            <img src="icon/book_check.png" alt="">
            {:else if chapter_data[4].lesHit_status === null}
            <img src="icon/book_close.png" alt="">
            {:else}
            <img src="icon/book.png" alt="">
            {/if}
            </button>
<!-- 
            <div class="w-[180px] border-b-[5px] border-ec-purple border-dashed relative translate-x-[7rem] translate-y-[3.5rem] transform rotate-[45deg]"></div>
      
            <button class="z-1  flex justify-center items-center w-[100px] h-[100px] bg-ec-light-yellow rounded-full shadow-[0px_10px_0_0_#755805] active:translate-y-[5px] active:shadow-[0px_5px_0_0_#755805] 
            ml-[16.25rem] mr-[2rem] mt-[5.5rem]  relative" >
            <img src="icon/book.png" alt="">
            </button>

            <div class="w-[180px] border-b-[5px] border-ec-purple border-dashed relative translate-x-[7.5rem] translate-y-[3rem]   transform rotate-[-40deg]"></div>
    
            <button class="z-1 flex justify-center items-center w-[100px] h-[100px] bg-ec-light-yellow rounded-full shadow-[0px_10px_0_0_#755805] active:translate-y-[5px] active:shadow-[0px_5px_0_0_#755805] 
                 mt-[5rem] ml-[3rem] relative" > 
                <img src="icon/chat.png" alt="">
            </button>

            <div class="w-[180px] border-b-[5px] border-ec-purple border-dashed relative translate-x-[7rem] translate-y-[3.5rem] transform rotate-[45deg]"></div>
      
            <button class="z-1  flex justify-center items-center w-[100px] h-[100px] bg-ec-light-yellow rounded-full shadow-[0px_10px_0_0_#755805] active:translate-y-[5px] active:shadow-[0px_5px_0_0_#755805] 
            ml-[16.25rem] mr-[2rem] mt-[5.5rem]  relative" >
            <img src="icon/quiz.png" alt="">
            </button> -->
    <!-- --------------------------------------------------- -->
             
    

    
    </div>