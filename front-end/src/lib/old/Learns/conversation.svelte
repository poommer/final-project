<script>
     import { afterUpdate } from 'svelte';
     import { createEventDispatcher } from 'svelte';

   export let data ;
   export let noCon ;
   let mainContent;
   const dispatch = createEventDispatcher();

   let addNo = (ind) => {
    if(noCon === data.conversation.res.length - 1){noCon = true; return}
    noCon === undefined ? noCon = 0 : noCon < data.conversation.res.length - 1  ?  noCon +=1 : noCon;
    data.conversation.res[noCon].status = true
    data = {...data}    
    dispatch('updateNoCon', { noCon });
   };

   let toSummary = () => {
    window.location = '/summary?data=55'
   }

   afterUpdate(() => {
       if (mainContent) {
           mainContent.scrollTo({
               top: mainContent.scrollHeight,
               behavior: 'smooth'
           });
           noCon === data.conversation.res.length || noCon === undefined || noCon === true ?  '' : playSound(noCon);
       }
   });

   let playSound = (soundIndex) =>{
    var sound = new Audio(`sound_conversation${data.level}/`+soundIndex+'.mp3');
    sound.play();
    sound.addEventListener('canplaythrough', function() {
        sound.play();
    }, false);
}
</script>

<body class="flex flex-col justify-center items-center p-10">
    <div bind:this={mainContent} class="h-[30rem] w-[45rem] overflow-y-scroll" id="main-content">
    {#each data.data as topic,index}

    

    {#if topic.status === true}
        <div>
            <div
                class={` ${topic.speaker === "a" ? "" : "flex justify-end items-end"}`}
            >
                <div class={`min-w-[20rem] h-[10rem] flex gap-8  ${topic.speaker === "a" ? "" : "flex-row-reverse"}`}>
                    <div class="flex items-end justify-end">
                        <img
                            src={topic.speaker === "a" ? data.conversation.speaker_img.a : data.conversation.speaker_img.b}
                            alt=""
                            class="w-[5rem] rounded-full border-2"
                        />
                    </div>
                    <div class={` min-w-[20rem] h-[7rem] relative bg-[#282C36] rounded-[5px] flex flex-col items-center justify-center before:contents-[''] before:absolute before:border-solid before:border-x-[1.5rem] before:border-x-red-600 before:border-x-transparent before:border-t-transparent before:border-y-[1.5rem] before:border-[#282C36] before:rounded-[10px] ${topic.speaker === "a" ? "before:bottom-0 before:left-[-20px]" : "before:bottom-0 before:right-[-20px]"}`}>
                        <span class=" text-[#FFC700]">{topic.text_en}</span>
                        {topic.text_th}
                        <div class={`w-full flex ${topic.speaker === "a" ? 'justify-end pr-4' : 'justify-start pl-4 '}`}>
                            <button on:click={() => {playSound(index)}}><img src="icon/volume.png" alt="" class="w-5 h-5"></button>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </div>
    {/if} 
       
    {/each}
</div>

    <div class="flex justify-center items-center">
    <button class={`w-[10rem] h-12 text-[20px] bg-amber-100 text-amber-600 p-1 rounded-xl relative bottom-[-10rem] ${noCon === 6 ? 'hidden' : ''}`} on:click={noCon === 6 ? toSummary :addNo} >{noCon === undefined ? 'start' : noCon === 6 ? 'next to page' : 'next ==>'}</button>
    </div>
    
</body>


<style>
    /* สไตล์ของ scroll bar */
    #main-content::-webkit-scrollbar {
        width: 10px; /* ความกว้างของ scroll bar */
        
    }

    #main-content::-webkit-scrollbar-track {
        background: #f1f1f100; /* สีพื้นหลังของ scroll bar */
        padding: .25rem;
        margin: .25rem;
    }

    #main-content::-webkit-scrollbar-thumb {
        background-color: #888; /* สีของ thumb */
        border-radius: 10px; /* รูปร่างของ thumb */
    }

    #main-content::-webkit-scrollbar-thumb:hover {
        background-color: #616161; /* สีของ thumb เมื่อ hover */
    }

    #main-content::-webkit-scrollbar-corner {
        background-color: #ff0000; /* สีพื้นหลังของส่วนหัวและท้ายของ scroll bar */
    }
</style>