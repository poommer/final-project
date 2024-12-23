<script>
	import Modal from './../../../../lib/admin/modal.svelte';
	import { goto } from '$app/navigation';
  import axios from 'axios';
    export let data;

    let cur_stap = 1

    let dataCreate = {title:null, description:null}

    let open_popup = false

    let create = async () => {
        let id = await axios.get('https://api-ecproject.poommer.in.th/api/lessons/topic/heading')
        id = id.data.row_num+1
        console.log({id, dataCreate});
        
       const create_lesson = await axios.post('https://api-ecproject.poommer.in.th/api/lessons/topic',{
            "lesson_ID":`${id}-0`, 
            "lesson_title":dataCreate.title, 
            "lesson_description":dataCreate.description, 
            "unit_No":`${id}`, 
            "lesson_level":"0"
        })

        if(create_lesson.data.status === 201){
            open_popup = true
        }

        console.log(create_lesson);
        
    }
</script>

<div>
    <div>
        <div class="flex items-center justify-center gap-2">
            
            <div class={`w-16 h-16 p-4 rounded-full flex justify-center items-center text-5xl ${cur_stap > 1 ? 'bg-ec-purple text-white': cur_stap === 1 ? 'border-ec-purple border-2 border-dashed text-ec-purple': 'bg-ec-dark-blue-200'}`}>1</div>
            <div class={`w-20 h-1 border-t-2  border-dashed ${cur_stap > 1 ?  'border-t-ec-purple' : 'border-t-ec-dark-blue-200'}`}></div> 
            <div class={`w-16 h-16 p-4 rounded-full flex justify-center items-center text-5xl ${cur_stap > 2 ? 'bg-ec-purple text-white': cur_stap === 2 ? 'border-ec-purple border-2 border-dashed text-ec-purple': 'bg-ec-dark-blue-200'}`}>2</div>
            <div class={`w-20 h-1 border-t-2 border-t-ec-dark-blue-200 border-dashed ${cur_stap > 2 ?  'border-t-ec-purple' : 'border-t-ec-dark-blue-200'}`}></div> 
            <div class={`w-16 h-16 p-4 rounded-full flex justify-center items-center text-5xl ${cur_stap > 3 ? 'bg-ec-purple text-white': cur_stap === 3 ? 'border-ec-purple border-2 border-dashed text-ec-purple': 'bg-ec-dark-blue-200'}`}>3</div>
            <div class={`w-20 h-1 border-t-2 border-t-ec-dark-blue-200 border-dashed ${cur_stap > 3 ?  'border-t-ec-purple' : 'border-t-ec-dark-blue-200'}`}></div> 
            <div class={`w-16 h-16 p-4 rounded-full flex justify-center items-center text-5xl ${cur_stap > 4 ? 'bg-ec-purple text-white': cur_stap === 4 ? 'border-ec-purple border-2 border-dashed text-ec-purple': 'bg-ec-dark-blue-200'}`}>4</div>
        </div>
    </div>
</div>

{#if cur_stap === 1}
<h1 class="text-5xl">สร้างบทเรียน</h1>
<div class="border-b-2 border-b-zinc-500 mb-2"></div>
<div class="">
    <div class="flex flex-col">
        <label class="text-3xl" for="title">ชื่อบทเรียน</label>
        <input type="text" class="text-3xl" bind:value={dataCreate.title}>
    </div>
    <div class="flex flex-col mt-2">
        <label class="text-3xl" for="discription">คำอธิบาย</label>
        <input type="text" class="text-3xl" bind:value={dataCreate.description}>
    </div>
    <div class="flex justify-end mt-4 gap-4">
        <button on:click={()=>{goto('../lesson')}} class="w-[8rem] rounded bg-gray-300 text-gray-700 text-2xl p-2 flex justify-center items-center hover:bg-gray-400">ยกเลิก</button>
        <button on:click={create} class="w-[8rem] rounded bg-ec-purple text-white text-2xl p-2 flex justify-center items-center hover:bg-ec-purple-800">สร้าง</button>
    </div>
</div>

{#if open_popup }
<div class={`h-screen w-full bg-[#000000d8] absolute top-0 left-0 flex items-center justify-center`}>
    <Modal/>
</div>
{/if}

{:else if cur_stap === 2}
<h1>stap 2</h1>

{:else if cur_stap === 3}
<h1>stap 3</h1>

{:else if cur_stap === 4}
<h1>stap 4</h1>
{/if}