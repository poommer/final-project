<script>
	import  axios  from 'axios';
	import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
    export let data;

    let lesson = data.lessonData

    console.log(lesson);

    onMount(async()=>{
    if(!localStorage.getItem('admin')){
        sessionStorage.setItem('error', 'login, please.')
        goto('/admin')
    }
})

const Delete_lesson = async (ID, type) => {
    let response = await axios.delete(`https://api-ecproject.poommer.in.th/api/lessons/topic/${ID}`)
    if(response.data.status === 200){
        window.location = '/admin/lesson'
    }
}
    
</script>



<div class="flex flex-col gap-2 mt-2">
   
        <div class="bg-gray-200 p-4 flex flex-col justify-between rounded-xl">
            <div class="flex justify-between items-center">
                <div>
                    <h2 class="text-4xl text-ec-purple-600">lessons บทเรียนทั้งหมด
                    </h2> 
                    
                </div>
                <div class="flex justify-end items-end gap-2">
                    <button on:click={() => {goto(`/admin/lesson/topic/create`)}}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#2854C5"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v268q-19-9-39-15.5t-41-9.5v-243H200v560h242q3 22 9.5 42t15.5 38H200Zm0-120v40-560 243-3 280Zm80-40h163q3-21 9.5-41t14.5-39H280v80Zm0-160h244q32-30 71.5-50t84.5-27v-3H280v80Zm0-160h400v-80H280v80ZM720-40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40Zm-20-80h40v-100h100v-40H740v-100h-40v100H600v40h100v100Z"/></svg>
                    </button>
          
                </div>
            </div>
            <p class="text-xl">จำนวนทั้งหมด {lesson.length} บทเรียน</p>

            <div class="m-4  p-4">
                {#if lesson.length > 0}
                {#each lesson as les,i}
                <div class="flex items-center ">
                        <div class="w-[2rem] h-[2rem] text-center text-white flex justify-center items-center bg-ec-purple rounded-full">{i+1}</div>
                        <a href={`./lesson/topic/detail?id=${les.lesson_ID}`} class="text-gray-600 text-2xl underline ml-2 mr-2">{les.lesson_title}</a>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F19E39"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                        </button>
                        <button
                        on:click={()=>{Delete_lesson(les.lesson_ID, 'topic')}}
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                        </button>
                    </div>
                    {#if i !== lesson.length - 1}
                    <div class="flex">
                        <div class="h-16 w-1 ml-3 border-r-2 border-r-ec-purple-400 border-dashed"></div>
                        <p class="text-gray-500 text-lg ml-4">{les.lesson_description}</p>
                    </div>
                    {:else}
                        <p class="text-gray-500 text-lg ml-5">{les.lesson_description}</p>
                    {/if}
                    {/each}
                {/if}
            </div>
           
        </div>

</div>