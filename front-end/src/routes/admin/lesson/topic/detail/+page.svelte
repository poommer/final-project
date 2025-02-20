<script>
    import { page } from '$app/stores';
  import axios from 'axios';
  const play_sound = (files) => {
    console.log(files);
    const reader_sound = new FileReader();

      const sound = new Audio(files);
      sound.volume = 0.5;
      sound.play();

  };

  const Delete_lesson = async (ID, type) => {
    let response = await axios.delete(`https://api-ecproject.poommer.in.th/api/lessons/topic/${ID}`)
    if(response.data.status === 200){
        window.location = '/admin/lesson'
    }
}
    const id = $page.url.searchParams.get('id');

    const load_data = async()=>{
        const data = [];
        const response_hearding = await axios.get(`https://api-ecproject.poommer.in.th/api/lessons/topic/1?lev=${id.split('-')[1]}`)
        const response = await axios.get(`https://api-ecproject.poommer.in.th/api/lessons/detail/${id}`)

        data.push({heading:response_hearding.data.response})
        data.push({content:response.data})

        console.log(data);
     return data   
    }
</script>

<div>
     {#await load_data()}
        loading...
     {:then respone }        
        <h1  class="text-5xl uppercase flex  items-center">รายละเอียด
            <button
                        on:click={()=>{Delete_lesson(id, 'topic')}}
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px" fill="#EA3323"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                        </button>
        </h1>
        
        <div class="w-full flex  gap-4 mt-4">
            <div class={`w-full h-[40rem] flex flex-col items-center gap-4`}>
                <div class="w-full h-[9rem] border-2 border-ec-purple rounded-lg bg-slate-100">
                    <div class="w-full h-[3rem] flex justify-center items-center bg-ec-purple text-white text-2xl p-2">
                        เกี่ยวกับบทเรียน
                    </div>
                    <div class="h-[7rem] overflow-auto">
                        <p>ชื่อบทเรียน:{respone[0].heading[0].lesson_title}</p>
                        <p>คำอธิบาย:{respone[0].heading[0].lesson_description}</p>
                    </div>
                </div>
        
                <div class="w-full h-[30rem] border-2 border-ec-purple rounded-lg bg-slate-100">
                    <div class="w-full h-[3rem] flex justify-center items-center bg-ec-purple text-white text-2xl p-2">
                        คำศัพท์ที่เลือก
                    </div>
                    <div class="h-[26.7rem] overflow-auto p-2">
                        {#each respone[1].content.vocab as item,index }
                        <div     class="flex justify-between items-center">
                            <p>{item.word_en} ({item.pos}) - <span class="text-lg">{item.word_th}</span></p>
                            <div  class="flex gap-2">
        
                                <button class="bg-ec-purple text-white text-sm p-1 rounded-md" on:click={()=>{play_sound(item.soundURL)}}>
                                    play
                                </button>
                            </div>
                        </div>
                        {/each}
                    </div>
                </div>
            </div>
        
            <div class={`w-[33.33%] h-[40rem] flex flex-col border-2 border-ec-purple rounded-lg bg-slate-100`}>
                <div class="w-full h-[3rem] flex justify-center items-center bg-ec-purple text-white text-2xl p-2">
                    ประโยคและวลี
                </div>
                <div class="h-[37rem] overflow-auto">
                    <div class="flex flex-col gap-2 p-2">
                        {#each respone[1].content.sentence as Item, index  }
                        <div class="w-full flex flex-col-reverse p-2 justify-between border-2 border-ec-purple rounded-md overflow-hidden">
                            
                                <div class="w-full flex items-center justify-end">
                                    <div  class="flex gap-2">
                                        <button class="bg-ec-purple text-white text-sm p-1 rounded-md" on:click={()=>{play_sound(Item.sound_url)}}>
                                            play
                                        </button>
                                    </div>
                                </div>
                    
                                <div class="flex">
                                    {Item.sen_en} <br>
                                    {Item.sen_th}
                                </div>
                            
                        </div>
                            {/each}
                    </div>
                </div>
                </div>
        
        
        </div>
     {/await}
</div>