<script>
	import { goto } from '$app/navigation';
  import axios from 'axios';
	import { onMount } from 'svelte';
    // export let id ;
    export let chapter_data 


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
    chapter_data = chapter_data
    })
   

    let gotoLesson = (lessonID,status) => {
        goto(`/lesson/${lessonID}?status=${status}`)
        
    }

    let show_status = false

    let show_discription = (id) => {
        console.log(id);
        show_status = id
    }
   
    
    </script>
    <!-- <a href="lesson/">chapter1 level1</a> -->
    <div class="relative  m-4 p-4">
    
        <div class=" flex flex-col justify-center items-center z-[99] relative">
                <p class="relative text-[35px]">{chapter_data[0].lesson_title}</p>
                <button class=" w-[140px] h-[140px] rounded-full bg-ec-purple-800 shadow-[0px_10px_0_0_#A35DEF] 
               active:shadow-[0px_5px_0_0_#A35DEF] active:translate-y-[5px]  relative" on:click={()=>{show_status = !show_status}}>
                   <span class=" text-white text-[80px]">{chapter_data[0].unit_No}</span>
               </button>

               {#if show_status}
               <div class={`relative `}>
                <div class="absolute p-2 top-[-9rem] left-[6rem] bg-[#434d6197] w-[22rem] h-[10rem] rounded-xl">
                   <div class="flex justify-between items-center">
                       <span class="text-3xl">คำอธิบาย</span> 
                    <button class=" bg-rose-600 w-8 p-1 rounded-md" on:click={()=>{show_status = false}}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                    </button>
                   </div>
                    <p class="text-xl overflow-x-auto mt-2 w-[21rem] h-[6.5rem]">
                        {chapter_data[0].lesson_description}
                    </p>
                </div>
               </div>
               {/if}
               
            </div>
    
            
            {#if chapter_data.length > 1 }
            
            <div class={`w-[160px] border-b-[5px] border-dashed translate-x-[11rem] translate-y-[2.5rem] z-[-1] transform rotate-[60deg] ${chapter_data[1].lesHit_status === null ? 'border-gray-400'  : 'border-ec-yellow-400'}`}></div>
            
            <button class={`z-1 flex justify-center items-center w-[100px] h-[100px] rounded-full active:translate-y-[5px] ${chapter_data[1].lesHit_status == 1 ? 'bg-ec-purple-800 shadow-[0px_10px_0_0_#A35DEF] active:shadow-[0px_5px_0_0_#A35DEF]' : 'bg-ec-light-yellow shadow-[0px_10px_0_0_#755805] active:shadow-[0px_5px_0_0_#755805]'} 
            ml-[16.25rem] mr-[3rem] mt-[5.75rem]  relative disabled:bg-[#a5a5a5] disabled:shadow-[0px_10px_0_0_#9d9d9db0] disabled:active:translate-y-0 disabled:cursor-not-allowed`} 
            disabled={chapter_data[1].lesHit_status === null} on:click={() => {gotoLesson(chapter_data[1].lesson_ID, chapter_data[1].lesHit_status)}}> 
            <!-- {chapter_data[1].lesHit_status} -->
            {#if  chapter_data[1].lesHit_status == 1}
            <img src="icon/book_check.png" alt="">
            {:else if chapter_data[1].lesHit_status === null}
            <img src="icon/book_close.png" alt="">
            {:else}
            <img src="icon/book.png" alt="">
            {/if}
       </button>
    {/if}

    {#if chapter_data.length > 2 }
            <div class={`w-[180px] border-b-[5px]  border-dashed relative translate-x-[7.75rem] translate-y-[3.5rem]   transform rotate-[-40deg] ${chapter_data[2].lesHit_status === null ? 'border-gray-400'  : 'border-ec-yellow-400'}`}></div>
    


            <button class={`z-1 flex justify-center items-center w-[100px] h-[100px] rounded-full active:translate-y-[5px] ${chapter_data[2].lesHit_status == 1 ? 'bg-ec-purple-800 shadow-[0px_10px_0_0_#A35DEF] active:shadow-[0px_5px_0_0_#A35DEF]' : 'bg-ec-light-yellow shadow-[0px_10px_0_0_#755805] active:shadow-[0px_5px_0_0_#755805]'}
                 mt-[5rem] ml-[3rem] relative
                disabled:bg-[#a5a5a5] disabled:shadow-[0px_10px_0_0_#9d9d9db0] disabled:active:translate-y-0 disabled:cursor-not-allowed`} disabled={chapter_data[2].lesHit_status === null} on:click={() => {gotoLesson(chapter_data[2].lesson_ID, chapter_data[2].lesHit_status)}}> 
                  {#if chapter_data[2].lesHit_status == 1}
                  <img src="icon/book_check.png" alt="">
                  {:else if chapter_data[2].lesHit_status === null}
                  <img src="icon/book_close.png" alt="">
                  {:else}
                  <img src="icon/book.png" alt="">
                  {/if}
            </button>
    {/if}

    {#if chapter_data.length > 3 }
                <div class={`w-[180px] border-b-[5px]  border-dashed relative translate-x-[7rem] translate-y-[3.5rem] transform rotate-[45deg] ${chapter_data[3].lesHit_status === null ? 'border-gray-400'  : 'border-ec-yellow-400'}`}></div>
      
            <button class={`z-1  flex justify-center items-center w-[100px] h-[100px] rounded-full active:translate-y-[5px] ${chapter_data[3].lesHit_status == 1 ? 'bg-ec-purple-800 shadow-[0px_10px_0_0_#A35DEF] active:shadow-[0px_5px_0_0_#A35DEF]' : 'bg-ec-light-yellow shadow-[0px_10px_0_0_#755805] active:shadow-[0px_5px_0_0_#755805]'}
            ml-[16.25rem] mr-[2rem] mt-[5.5rem]  relative
            disabled:bg-[#a5a5a5] disabled:shadow-[0px_10px_0_0_#9d9d9db0] disabled:active:translate-y-0 disabled:cursor-not-allowed`}
            disabled={chapter_data[3].lesHit_status === null} on:click={() => {gotoLesson(chapter_data[3].lesson_ID, chapter_data[3].lesHit_status)}}>
            {#if chapter_data[3].lesHit_status == 1}
            <img src="icon/book_check.png" alt="">
            {:else if chapter_data[3].lesHit_status === null}
            <img src="icon/book_close.png" alt="">
            {:else}
            <img src="icon/book.png" alt="">
            {/if}
            </button>

            {/if}
            
            {#if chapter_data.length > 4 }
            <div class={`w-[180px] border-b-[5px] border-ec-purple-400 border-dashed relative translate-x-[7.5rem] translate-y-[3rem] z-[-1]   transform rotate-[-40deg] ${chapter_data[3].lesHit_status === null ? 'border-gray-400'  : 'border-ec-yellow-400'}`}></div>
            
            <button class={`z-1 flex justify-center items-center w-[100px] h-[100px] rounded-full active:translate-y-[5px] ${chapter_data[1].lesHit_status == 1 ? 'bg-ec-purple-800 shadow-[0px_10px_0_0_#A35DEF] active:shadow-[0px_5px_0_0_#A35DEF]' : 'bg-ec-light-yellow shadow-[0px_10px_0_0_#755805] active:shadow-[0px_5px_0_0_#755805]'} 
                 mt-[5rem] ml-[3rem] relative
    disabled:bg-[#a5a5a5] disabled:shadow-[0px_10px_0_0_#9d9d9db0] disabled:active:translate-y-0 disabled:cursor-not-allowed `} disabled={chapter_data[4].lesHit_status === null} on:click={() => {gotoLesson(chapter_data[4].lesson_ID, chapter_data[4].lesHit_status)}}> 
            {#if chapter_data[4].lesHit_status == 1}
            <img src="icon/book_check.png" alt="">
            {:else if chapter_data[4].lesHit_status === null}
            <img src="icon/book_close.png" alt="">
            {:else}
            <img src="icon/book.png" alt="">
            {/if}
            </button>
    {/if}
            

    </div>