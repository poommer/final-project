<script>
	import { goto } from '$app/navigation';
	import { name, set_progress, set_progressLesson } from './../store/lesson.js';
  import { page } from '$app/stores';
  $: path = $page.url.pathname.split('/')[1] ;

  let progress = false;
  let widthStatus = $set_progress;
    // คำนวณค่าที่จำเป็นสำหรับ stroke-dasharray
    const radius = 50;
  const circumference = 2 * Math.PI * radius;

  // ฟังก์ชันเพื่อคำนวณ stroke-dashoffset
  $: offset = circumference - ($set_progress / 100) * circumference;

</script>

<div class="h-lvh bg-[#F2F2F2] bg-[url('/background.png')] bg-no-repeat bg-cover bg-center " >
    <div class="h-full p-[10px] sm:p-5">
      <header class="h-[15%] md:h-[10%] ">
        <div class="header-nav w-full flex flex-col md:flex-row justify-between md:items-center bg-ec-yellow rounded-full px-5 py-4 border-2 border-ec-dark-blue-2 shadow-[5px_5px_0px_0px_#343946]   ">
          <div class="flex gap-2 ">
              <button on:click={()=>{goto(`/${path}`)}}>
                <img src="https://cdn-icons-png.flaticon.com/128/3916/3916931.png" alt="" class="w-4 h-4">
              </button>
              <h1>{$name}</h1>
          </div>

          <div class="flex items-center justify-center">
          
          {#if path === 'quiz'}
            <div class="w-full md:w-auto flex justify-center items-center ">
              <div class="w-[15rem] md:w-[40rem] h-4 flex items-center justify-center">
                <div class="w-full h-full bg-gray-200 rounded-full overflow-hidden shadow-[1px_1px_5px_4px_#ff2bff]">
                    <div class=" w-2/12 h-full bg-ec-purple-600 ease-out duration-75" class:animate={progress} style={`width:${$set_progress}%; --target-width:${$set_progress}%; --start-width:${$set_progress-((1/(10+1))*100)}%;`}></div>
                </div>
              </div>
            </div>
          {:else if  path === 'lessons'}
            {#each $set_progressLesson as item,i}  
            {#if i+1 !== 6 && i !== 0}
            <span class="w-16 h-[2px] rounded-full bg-gray-100 mx-2"></span>
          {/if}
            <div class="relative ">
                <svg class="w-9 h-9" viewBox="0 0 120 120">
                  <!-- วงกลมพื้นหลัง -->
                  <circle
                    class="text-gray-100"
                    cx="60"
                    cy="60"
                    r={radius}
                    fill="transparent"
                    stroke="currentColor"
                    stroke-width="10"
                  />
                  <!-- วงกลมแสดง Progress -->
                  <circle
                    class="text-green-500 transition-all duration-300 ease-linear"
                    cx="60"
                    cy="60"
                    r={radius}
                    fill="transparent"
                    stroke="currentColor"
                    stroke-width="10"
                    stroke-dasharray={circumference}
                    stroke-dashoffset={circumference - (item.progress === null ? 0 : item.progress / 100) * circumference}
                    style="transform: rotate(-90deg); transform-origin: 50% 50%;"
                  />
                </svg>
                <span class="w-full  flex justify-center items-center absolute  text-sm text-gray-700 ">{item.progress === null ? 0 : Math.round((item.progress/100)*item.qty)}/{item.qty}</span>
                <span class="w-full h-full flex justify-center items-center absolute bottom-0 text-sm font-semibold text-gray-700 "></span>
            </div>
           
            {/each}
              {/if}
          
          </div>
        </div>
      </header>
      <main class="w-full  h-[85%] md:h-[90%] p-2 bg-[#FFFFFFD4] md:flex md:justify-center md:items-center rounded-xl overflow-auto shadow-[0_0_5px_0_#00000096]">
        <div class="w-full md:w-[50rem] px-3 py-6">
          <slot  />
        </div>
        
      </main>  
    </div>
  </div>