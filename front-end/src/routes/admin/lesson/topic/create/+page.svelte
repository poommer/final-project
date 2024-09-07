<script>
	// import Modal from './../../../../lib/admin/modal.svelte';
	import { goto } from '$app/navigation';
  import axios from 'axios';
    export let data;

    let cur_stap = 2

    let dataCreate = {title:null, description:null}

    let open_popup = false

    // let create = async () => {
    //     let id = await axios.get('https://api-ecproject.poommer.in.th/api/lessons/topic/heading')
    //     id = id.data.row_num+1
    //     console.log({id, dataCreate});
        
    //    const create_lesson = await axios.post('https://api-ecproject.poommer.in.th/api/lessons/topic',{
    //         "lesson_ID":`${id}-0`, 
    //         "lesson_title":dataCreate.title, 
    //         "lesson_description":dataCreate.description, 
    //         "unit_No":`${id}`, 
    //         "lesson_level":"0"
    //     })

    //     if(create_lesson.data.status === 201){
    //         open_popup = true
    //     }

    //     console.log(create_lesson);
        
    // }
    let Ans;

    let word_list;
    let vocab;
    let wordlist_query = 'all';

    let vocab_checked = []

    let vocab_checkedShow = [];

    let load_vocab = async (wl) => {
        wordlist_query = wl || 'all'
        word_list = await axios.get('https://api-ecproject.poommer.in.th/api/content//wordlist/')
        word_list = word_list.data

        vocab = await axios.get(`https://api-ecproject.poommer.in.th/api/content/vocab/${wordlist_query === 'all' ? '' : wordlist_query}`)
        vocab = wordlist_query === 'all' ? vocab.data.resultLest : vocab.data
    }

    let word_insert = async (event) => {
        const value = event.target.value;
        const wordEng = vocab.find(val => {return value === val.vocab_ID}).word_en

        if(event.target.checked){
            vocab_checked.push(value)
            vocab_checkedShow.push(wordEng)
        }
        else{
            let vo = vocab_checked.indexOf(value)
            let word_index = vocab_checkedShow.indexOf(wordEng)
            if(vo >= 0 && word_index>=0){
                vocab_checked.splice(vo,1)
                vocab_checkedShow.splice(word_index,1)
            }
        }
            vocab_checked = vocab_checked
            vocab_checkedShow = vocab_checkedShow
    }

</script>
<div class="h-full ">
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
    <div class="flex flex-col mt-2 ">
        <label class="text-3xl" for="discription">คำอธิบาย</label>
        <input type="text" class="text-3xl" bind:value={dataCreate.description}>
    </div>
    <div class="flex justify-end mt-4 gap-4">
        <button on:click={() => {cur_stap = 2}} class="w-[8rem] rounded bg-ec-purple text-white text-2xl p-2 flex justify-center items-center hover:bg-ec-purple-800">ถัดไป</button>
    </div>
</div>

{#if open_popup }
<div class={`h-screen w-full bg-[#000000d8] absolute top-0 left-0 flex items-center justify-center`}>
    <Modal/>
</div>
{/if}


{:else if cur_stap === 2}
<h1 class="text-5xl">เลือกคำศัพท์</h1>
<div class="border-b-2 border-b-zinc-500 mb-2"></div>
<div class="min-h-[45rem]">
    <!-- coding -->
     <div class="w-full h-[45rem]  flex ">
         {#await load_vocab()}
         loading...
      {:then data } 
        <div class="w-2/12 bg-slate-200 rounded-lg">
               <button on:click={()=>{load_vocab('all')}}>all</button> <br>
               {#each word_list as Item}
                   <button on:click={()=>{load_vocab(Item.wl_id)}}>{Item.wl_name}</button> <br>
               {/each}
            
        </div>

        <div class="w-8/12 p-2 flex gap-2 flex-wrap content-start">
            {#each vocab as word }
                
                <label for={word.vocab_ID} class={`rounded-lg p-1 min-w-[6.25rem] h-12 flex justify-center items-center cursor-pointer ${vocab_checked.includes(word.vocab_ID) ? 'bg-sky-600 text-white' : 'bg-zinc-200'}`}>
                    <input type="checkbox" name='vocab' id={word.vocab_ID}  value={word.vocab_ID} checked={vocab_checked.includes(word.vocab_ID)} on:change={word_insert} class="hidden">
                    {word.word_en}
                </label>
            {/each}
            </div>
            
            <div class="w-2/12 bg-slate-200 p-2 rounded-lg">
                <h2>คำศัพท์ที่เลือก</h2>
                <div class="w-full h-1 border-t-[1px] border-neutral-300"></div>
                <div class="flex flex-col">
                    {#each vocab_checkedShow as item }
                    <p>{item}</p>
                    {/each}
                </div>
            </div>
            {/await}
    </div>
   
</div>
 <div class="flex justify-end mt-2 gap-4">
        <button on:click={() => {cur_stap = 1}} class="w-[8rem] rounded bg-gray-200 text-gray-500 text-2xl p-2 flex justify-center items-center hover:bg-gray-300">ย้อนกลับ</button>
        <button on:click={() => {cur_stap = 3}} class="w-[8rem] rounded bg-ec-purple text-white text-2xl p-2 flex justify-center items-center hover:bg-ec-purple-800">ถัดไป</button>
    </div>


{:else if cur_stap === 3}
<h1  class="text-5xl">สร้างประโยคหรือวลี</h1>
<div class="border-b-2 border-b-zinc-500 mb-2"></div>
<div class="">
    <!-- coding -->
    <div class="flex justify-end mt-4 gap-4">
        <button on:click={() => {cur_stap = 2}} class="w-[8rem] rounded bg-gray-200 text-gray-500 text-2xl p-2 flex justify-center items-center hover:bg-gray-300">ย้อนกลับ</button>
        <button on:click={() => {cur_stap = 4}} class="w-[8rem] rounded bg-ec-purple text-white text-2xl p-2 flex justify-center items-center hover:bg-ec-purple-800">ถัดไป</button>
    </div>
</div>

{:else if cur_stap === 4}
<h1  class="text-5xl">สร้างบทสนทนา</h1>
<div class="border-b-2 border-b-zinc-500 mb-2"></div>
<div class="">
    <!-- coding -->
    <div class="flex justify-end gap-4">
        <button on:click={() => {cur_stap = 3}} class="w-[8rem] rounded bg-gray-200 text-gray-500 text-2xl p-2 flex justify-center items-center hover:bg-gray-300">ย้อนกลับ</button>
        <button on:click={() => {cur_stap = 5}} class="w-[8rem] rounded bg-ec-purple text-white text-2xl p-2 flex justify-center items-center hover:bg-ec-purple-800">ถัดไป</button>
    </div>
</div>

{/if}
</div>