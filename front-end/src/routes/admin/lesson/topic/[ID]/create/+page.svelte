<script>
	import VocabImg from '../../../../../../lib/Learns/vocabImg.svelte';
	import Msg from '../../../../../../lib/component/msg.svelte';
	import Modal from '../../../../../../lib/admin/modal.svelte';
	import CreateSentences from '../../../../../../lib/admin/createSentences.svelte';
	// import Modal from './../../../../lib/admin/modal.svelte';
	import { goto } from '$app/navigation';
  import axios from 'axios';
  import SelectWord from '../../../../../../lib/admin/selectWord.svelte';
  import CreateConversation from '../../../../../../lib/admin/createConversation.svelte';
  import { page } from '$app/stores';
  
    export let data;

    let cur_stap = 1

    let dataCreate = {title:null, description:null}

    let open_popup = false
    let vocab_checked = []
    let vocab_checkedShow = [];

    let set_data = [{en:null, th:null, sound_file:null}] ;

    let conversation = {
        convers_detail:[{name:null, role_A:null, role_B:null}], 
        convers_content:[{en:null, th:null, role:'a', sound_file:null}]}


        let msg_fail ;
    const handleVocab = async (event) => {
        console.log('dd');
        const selected = event.detail ;
        vocab_checked = selected.vocab_checked
        vocab_checkedShow = selected.vocab_checkedShow

        console.log({vocab_checked, vocab_checkedShow});
        
        
    }

    const handlesentence = async (event) => {
        set_data = event.detail
        console.log(set_data);
    }
    const handleConvers = async (event) => {
        console.log(event.detail);
        conversation.convers_content = event.detail.data_not_isNULL
        conversation.convers_detail = event.detail.convers_detail
        console.log(conversation.convers_detail);
    }
    
    const next_to = () => {
        if(cur_stap === 1) {
            if(
                (dataCreate.title === null || dataCreate.title === '') ||
                (dataCreate.description === null || dataCreate.description === '')
            ){
                open_popup = true
                msg_fail = 'ชื่อบทเรียน และคำอธิบายต้องไม่เป็นค่าว่าง'
                return
            }
        }
        else if(cur_stap === 2){
            if( vocab_checked.length < 5 ){
                open_popup = true; 
                msg_fail = `เลือกคำศัพท์อย่างน้อย 5 คำ ขาดอีก ${5 - vocab_checked.length} คำ`; 
                return}

        }
        else if(cur_stap === 3){
            const is_NULL = set_data.filter(Item => 
            Item.en !== null && Item.en !== '' &&
            Item.th !== null && Item.th !== '' &&
            Item.sound_file !== null && Item.sound_file !== ''
        );
            if( is_NULL.length < 5 ){
                open_popup = true; 
                msg_fail = `ต้องมีอย่างน้อย 5 ประโยค และต้องใส่ข้อมูลให้ครบถ้วย [กด save ด้วย] ขาดอีก ${5 - is_NULL.length} ประโยค`; 
                return}

        }
        else if(cur_stap === 4){
            const is_NULL = conversation.convers_content.filter(Item => 
            Item.en !== null && Item.en !== '' &&
            Item.th !== null && Item.th !== '' &&
            Item.role !== null && Item.role !== '' &&
            Item.sound_file !== null && Item.sound_file !== ''
        );

            if( is_NULL.length < 5){
                open_popup = true; 
                msg_fail = `ต้องมีอย่างน้อย 5 ประโยค และต้องใส่ข้อมูลให้ครบถ้วย [กด save ด้วย] ขาดอีก ${5 - is_NULL.length} ประโยค`; 
                return
            }else if( conversation.convers_detail[0].role_A === null || conversation.convers_detail[0].role_A === '' || conversation.convers_detail[0].role_B === null || conversation.convers_detail[0].role_B === '' || conversation.convers_detail[0].name === null || conversation.convers_detail[0].name === '' ) { 
                open_popup = true; 
                msg_fail = `กรอกรายละเอียดให้ครบ`; 
                return

            }

        }

        cur_stap >= 1 && cur_stap < 6 ? cur_stap += 1 : ''

    }

    const play_sound = (files) => {
    console.log(files);
    const reader_sound = new FileReader();
    reader_sound.readAsDataURL(files);
    reader_sound.onload = () => {
      const sound = new Audio(reader_sound.result);
      sound.volume = 0.5;
      sound.play();
    };
  };

  const send_data = async () => {
      const ID = await $page.params.ID
      try{
          const respone_lesson = await axios.get(`https://api-ecproject.poommer.in.th/api/lessons/topic/${ID}`)
          const letest_ID = await respone_lesson.data.row_num
          const topic_ID = `${ID}-${letest_ID}`

          const create_lesson = await axios.post('https://api-ecproject.poommer.in.th/api/lessons/topic',{
            "lesson_ID":topic_ID, 
            "lesson_title":dataCreate.title, 
            "lesson_description":dataCreate.description, 
            "unit_No":ID, 
            "lesson_level":topic_ID
        })
          const create_convers = await axios.post('https://api-ecproject.poommer.in.th/api/lessons/conversation',{
            "lessonID":topic_ID, 
            "name":conversation.convers_detail[0].name,
            "speaker_A":conversation.convers_detail[0].role_A,
            "speaker_B":conversation.convers_detail[0].role_B
})



        const Vocab_create = vocab_checked.map( Item => axios.post('https://api-ecproject.poommer.in.th/api/lessons/set/vocab', {"lesCon_lesID":topic_ID, "lesCon_content":Item}))
        
        const create_sentenec = set_data.map( Item => {
            const formData = new FormData();
            formData.append('lessonID',topic_ID)
            formData.append('en',Item.en)
            formData.append('th',Item.th)
            formData.append('file_sound',Item.sound_file[0])
            return axios.post(`https://api-ecproject.poommer.in.th/api/lessons/set/sentence?lessonID=${topic_ID}&en=${Item.en}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
        })
    })
        const create_conversContent = conversation.convers_content.map( (Item,index) => {
            const formData = new FormData();
            formData.append('en', Item.en)
            formData.append('th', Item.th)
            formData.append('speaker', Item.role)
            formData.append('index', index)
            formData.append('file_sound', Item.sound_file[0])
            return axios.post(`https://api-ecproject.poommer.in.th/api/lessons/conversation/conver-${topic_ID}?converID=conver-${topic_ID}&index=${index}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
        })
    })

       const respone = await Promise.all([ ...Vocab_create, ...create_sentenec, ...create_conversContent])
        
        console.log(respone);
    } catch (err) {
        open_popup = true
        msg_fail = 'ไม่พบบทเรียน กรุณาสร้างบทเรียนก่อน'
    }
     
  }
</script>
<div class="h-full ">
<div>
    <div>
        <div class="flex items-center justify-center gap-2">
            
            <div class={`w-16 h-16 p-4 rounded-full flex justify-center items-center text-5xl ${cur_stap > 1 ? 'bg-ec-purple text-white': cur_stap === 1 ? 'border-ec-purple border-2 border-dashed text-ec-purple': 'bg-ec-dark-blue-200'}`}>1</div>
            <div class={`w-20 h-1 border-t-2  border-dashed ${cur_stap > 1 ?  'border-t-ec-purple' : 'border-t-ec-dark-blue-200'}`}></div> 
            <div class={`w-16 h-16 p-4 rounded-full flex justify-center items-center text-5xl ${cur_stap > 2 ? 'bg-ec-purple text-white': cur_stap === 2 ? 'border-ec-purple border-2 border-dashed text-ec-purple': 'bg-zinc-200 text-zinc-400'}`}>2</div>
            <div class={`w-20 h-1 border-t-2 border-t-ec-dark-blue-200 border-dashed ${cur_stap > 2 ?  'border-t-ec-purple' : 'border-t-ec-dark-blue-200'}`}></div> 
            <div class={`w-16 h-16 p-4 rounded-full flex justify-center items-center text-5xl ${cur_stap > 3 ? 'bg-ec-purple text-white': cur_stap === 3 ? 'border-ec-purple border-2 border-dashed text-ec-purple': 'bg-zinc-200 text-zinc-400'}`}>3</div>
            <div class={`w-20 h-1 border-t-2 border-t-ec-dark-blue-200 border-dashed ${cur_stap > 3 ?  'border-t-ec-purple' : 'border-t-ec-dark-blue-200'}`}></div> 
            <div class={`w-16 h-16 p-4 rounded-full flex justify-center items-center text-5xl ${cur_stap > 4 ? 'bg-ec-purple text-white': cur_stap === 4 ? 'border-ec-purple border-2 border-dashed text-ec-purple': 'bg-zinc-200 text-zinc-400'}`}>4</div>
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
</div>



{:else if cur_stap === 2}
<SelectWord vocab_checkedShow={vocab_checkedShow} vocab_checked={vocab_checked} on:vocab_selected={handleVocab} />

{:else if cur_stap === 3}

    <CreateSentences set_data={set_data} on:set_data={handlesentence} />

{:else if cur_stap === 4}
<CreateConversation convers_detail={conversation.convers_detail} convers_content={conversation.convers_content} on:saveContent={handleConvers} />

{:else if cur_stap === 5}
<h1  class="text-5xl uppercase">summery</h1>
<div class="w-full flex  gap-4">
    <div class={`w-[33.33%] h-[40rem] flex flex-col items-center gap-4`}>
        <div class="w-full h-[9rem] border-2 border-ec-purple rounded-lg bg-slate-100">
            <div class="w-full h-[3rem] flex justify-center items-center bg-ec-purple text-white text-2xl p-2">
                เกี่ยวกับบทเรียน
            </div>
            <div class="h-[7rem] overflow-auto">
                <p>{dataCreate.title}</p>
                <p>{dataCreate.description}</p>
            </div>
        </div>

        <div class="w-full h-[30rem] border-2 border-ec-purple rounded-lg bg-slate-100">
            <div class="w-full h-[3rem] flex justify-center items-center bg-ec-purple text-white text-2xl p-2">
                คำศัพท์ที่เลือก
            </div>
            <div class="h-[26.7rem] overflow-auto p-2">
                {#if vocab_checkedShow.length < 1}
                <p>ยังไม่มีคำศัพท์</p>
                {:else}
                {#each vocab_checkedShow as item,index }
                <div     class="flex justify-between items-center">
                    <p>{item.wordEng} - <span class="text-lg">{item.wordTH}</span></p>
                    <div  class="flex gap-2">
                        <button
    class="bg-rose-200 w-7 h-7 rounded-md flex justify-center item"
    on:click={() => {
    vocab_checkedShow.splice(index, 1);
    vocab_checked.splice(index, 1);
    
    vocab_checkedShow = [...vocab_checkedShow];
    vocab_checked = [...vocab_checked];
    }}
    >
    <svg
    xmlns="http://www.w3.org/2000/svg"
    height="28px"
    viewBox="0 0 24 24"
    width="28px"
    fill="#EA3323"
    ><path d="M0 0h24v24H0V0z" fill="none" /><path
      d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
    />
    
    </svg>
    </button>
                        <button class="bg-ec-purple text-white text-sm p-1 rounded-md" on:click={()=>{play_sound(Item.sound_file[0])}}>
                            play
                        </button>
                    </div>
                </div>
                {/each}
                {/if}
            </div>
        </div>
    </div>

    <div class={`w-[33.33%] h-[40rem] flex flex-col border-2 border-ec-purple rounded-lg bg-slate-100`}>
        <div class="w-full h-[3rem] flex justify-center items-center bg-ec-purple text-white text-2xl p-2">
            ประโยคและวลี
        </div>
        <div class="h-[37rem] overflow-auto">
            <div class="flex flex-col gap-2 p-2">
                {#each set_data as Item, index  }
                <div class="w-full flex flex-col-reverse p-2 justify-between border-2 border-ec-purple rounded-md overflow-hidden">
                    
                        <div class="w-full flex items-center justify-end">
                            <div  class="flex gap-2">
                                <button
            class="bg-rose-200 w-7 h-7 rounded-md flex justify-center item"
            on:click={() => {
            set_data.splice(index, 1);
            
            set_data = [...set_data];
            }}
            >
            <svg
            xmlns="http://www.w3.org/2000/svg"
            height="28px"
            viewBox="0 0 24 24"
            width="28px"
            fill="#EA3323"
            ><path d="M0 0h24v24H0V0z" fill="none" /><path
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
            />
            
            </svg>
            </button>
                                <button class="bg-ec-purple text-white text-sm p-1 rounded-md" on:click={()=>{play_sound(Item.sound_file[0])}}>
                                    play
                                </button>
                            </div>
                        </div>
            
                        <div class="flex">
                            {Item.en} <br>
                            {Item.th}
                        </div>
                    
                </div>
                    {/each}
            </div>
        </div>
        </div>

        <div class={`w-[33.33%] h-[40rem] flex flex-col border-2 border-ec-purple rounded-lg bg-slate-100`}>
            <div class="w-full h-[3rem] flex justify-center items-center bg-ec-purple text-white text-2xl p-2">
                บทสนทนา
            </div>
           
            <div class="h-[37rem]  p-2 overflow-auto">
                {#if conversation.convers_content.length < 1}
                <p>ยังไม่มีบทสนทนา</p>
                {:else}
    
                    <div class="flex items-center justify-between p-2 border-b-2 border-zinc-300 my-2">
                        {#each conversation.convers_detail as detail }
                            {detail.name}
                            <div class="flex items-center gap-2">
                               A: <img class={`w-12 h-12 rounded-full overflow-hidden border-2 border-ec-purple`} src={detail.role_A} alt="">
                               B: <img class={`w-12 h-12 rounded-full overflow-hidden border-2 border-ec-purple`} src={detail.role_B} alt="">
                            </div>
                        {/each}
                    </div>
<div class="flex flex-col gap-2">
    {#each conversation.convers_content as Item, index  }
    <div class="w-full flex flex-col p-2 justify-between border-2 border-ec-purple rounded-md overflow-hidden">
        
            <div class="w-full flex items-center justify-between">
                role: {Item.role}
                <div  class="flex gap-2">
                    <button
class="bg-rose-200 w-7 h-7 rounded-md flex justify-center item"
on:click={() => {
conversation.convers_content.splice(index, 1);

conversation.convers_content = [...conversation.convers_content];
}}
>
<svg
xmlns="http://www.w3.org/2000/svg"
height="28px"
viewBox="0 0 24 24"
width="28px"
fill="#EA3323"
><path d="M0 0h24v24H0V0z" fill="none" /><path
  d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
/>

</svg>
</button>
                    <button class="bg-ec-purple text-white text-sm p-1 rounded-md" on:click={()=>{play_sound(Item.sound_file[0])}}>
                        play
                    </button>
                </div>
            </div>

            <div class="flex">
                {Item.en} <br>
                {Item.th}
            </div>
        
    </div>
        {/each}
</div>
                {/if}
            </div>

        </div>
</div>
{/if}

<div class="flex justify-end mt-2 gap-4">
        <button 
        on:click={
        () => {
            cur_stap > 1 ? cur_stap -= 1 : ''; console.log({vocab_checked, vocab_checkedShow} );
        }
        } 
        class={`w-[8rem] rounded bg-gray-400 text-gray-100 text-2xl p-2 flex justify-center items-center hover:bg-gray-500  transition-all duration-[0.5s] ease-in-out
        ${cur_stap <= 1 || cur_stap === 6 ? 'hidden' : '' }`}
        
        >
        {cur_stap === 5 ? 'ยกเลิก' : 'ย้อนกลับ'}
    </button>
        
        <button 
        on:click={()=>{cur_stap === 5 ? send_data() : next_to()}} 
        class={` 
        w-[8rem] rounded  text-white text-2xl p-2 flex justify-center items-center transition-all duration-[0.5s] ease-in-out
        ${cur_stap === 5 ? 'bg-green-600 hover:bg-green-500' : 'hover:bg-ec-purple-800 bg-ec-purple' } 
        ${cur_stap === 6 ? 'hidden' : '' }`}>
        {cur_stap === 5 ? 'ยืนยัน' : 'ถัดไป'}
    </button>
    </div>
</div>

{#if open_popup === true }
<div class={`h-screen w-full bg-[#000000d8] absolute top-0 left-0 flex items-center justify-center`}>
    <Msg type={'fail'} text={msg_fail} on:close={(event)=>{open_popup = event.detail; console.log(open_popup);
    }} />
</div>
{/if}