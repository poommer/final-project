<script>
	import { goto } from '$app/navigation';
    export let data;

    const lesson = data.lessonData

    console.log(lesson);
    
</script>


<div>
    <div class="flex justify-between items-center border-b-2 border-b-zinc-500 p-2 ">
        <h1 class="text-5xl">LESSONS</h1>
        <div class="flex gap-2">
          <a href="/admin/lesson/create" class="w-[8rem] rounded bg-ec-purple text-white text-2xl p-2 flex justify-center items-center hover:bg-ec-purple-800">สร้างใหม่</a>
          <div class="flex">
            <button class="w-[3rem] rounded bg-gray-500 text-white text-2xl p-2 flex justify-center items-center hover:bg-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M440-120v-240h80v80h320v80H520v80h-80Zm-320-80v-80h240v80H120Zm160-160v-80H120v-80h160v-80h80v240h-80Zm160-80v-80h400v80H440Zm160-160v-240h80v80h160v80H680v80h-80Zm-480-80v-80h400v80H120Z"/></svg>
            </button>
          </div>
        </div>
    </div>
</div>

<div class="flex flex-col gap-2 mt-2">
    {#each lesson as Item }
        <div class="bg-gray-200 p-4 flex flex-col justify-between rounded-xl">
            <div class="flex justify-between items-center">
                <div>
                    <h2 class="text-4xl text-ec-purple-600">{Item.heading.name}
                        <span class="text-lg text-gray-500">[{Item.lesson.length} บทเรียน]</span>
                    </h2> 
                    
                </div>
                <div class="flex justify-end items-end gap-2">
                    <button on:click={() => {goto('/admin/lesson/topic/create')}}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#2854C5"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v268q-19-9-39-15.5t-41-9.5v-243H200v560h242q3 22 9.5 42t15.5 38H200Zm0-120v40-560 243-3 280Zm80-40h163q3-21 9.5-41t14.5-39H280v80Zm0-160h244q32-30 71.5-50t84.5-27v-3H280v80Zm0-160h400v-80H280v80ZM720-40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40Zm-20-80h40v-100h100v-40H740v-100h-40v100H600v40h100v100Z"/></svg>
                    </button>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#F19E39"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                    </button>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#EA3323"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                    </button>
                </div>
            </div>
            <p class="text-xl">{Item.heading.description}</p>

            <div class="m-4  p-4">
                {#if Item.lesson.length > 0}
                {#each Item.lesson as les,i}
                <div class="flex items-center ">
                        <div class="w-4 h-4 bg-ec-purple rounded-full"></div>
                        <a href="#" class="text-gray-600 text-2xl underline ml-2 mr-2">{les.lesson_title}</a>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F19E39"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                        </button>
                        <button>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                        </button>
                    </div>
                    {#if i !== Item.lesson.length - 1}
                    <div class="flex">
                        <div class="h-16 w-1 ml-1 border-r-2 border-r-ec-purple-400 border-dashed"></div>
                        <p class="text-gray-500 text-lg ml-4">{les.lesson_description}</p>
                    </div>
                    {:else}
                        <p class="text-gray-500 text-lg ml-5">{les.lesson_description}</p>
                    {/if}
                    {/each}
                {/if}
            </div>
           
        </div>
    {/each}
</div>