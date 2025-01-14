<script>
	import { goto } from '$app/navigation';
  import Button from "./button.svelte";
  export let data ;
</script>

<div class="relative w-[300px] h-[240px]  lg:w-[390px] lg:h-[290px] bg-white border-2 border-[#373C4A] shadow-[10px_10px_0px_0px_#373C4A] rounded-[10px] overflow-hidden">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkIhzIvOHcYSFjWoqv0P7MMqRGujEfl-psUA&s" alt="" class="w-full h-[10rem] object-cover object-center">
    <div class="bg-white shadow-[-9px_-1px_18px_#00000047] absolute bottom-[-10px] lg:bottom-[-20px] left-[-1rem] w-[450px] lg:h-[170px] h-[160px]  z-[999] rotate-[-6deg]">
        <div class="rotate-[6deg]  h-[190px]  lg:w-full lg:h-[280px] pt-4  pl-5 pr-36 lg:pr-16">
            <div class="">
                <h1 class="text-3xl line-clamp-1">{data.lesson_title}</h1>
                <p class={`text-lg line-clamp-1`}>{data.lesson_description}</p>
                {#if data.lesHit_status === null}
                    <small class="text-sm text-rose-600 line-clamp-1">*ต้องเรียนบทเรียนก่อนหน้าก่อน</small>
                {/if}
            </div>
            <div class={`w-full flex justify-end items-center mr-6 ${data.lesHit_status !== null ? 'mt-5' : ''}`}>
                <div class="w-[120px]">
                    <Button click={()=>{goto(`lessons/${data.lesson_ID}/?s=${data.lesHit_status}`)}} typeBtn="A1" options={{bg:`${data.lesHit_status === '0' ? 'primary' : data.lesHit_status === '1' ? 'green' : 'disable'}`, style:'style1'}}>
                        {data.lesHit_status === '0' ? 'Start Now' : 'Start'}
                    </Button>
                </div>
            </div>
        </div>
    </div>
</div>
