<script>
  import { afterUpdate } from 'svelte';
	import Conversation from './conversation.svelte';

export let converData ;
console.log(converData);
// console.log(converData.speaker_img);


let mainContent;

export let nowContent = 0

let next_conver = async () => {
if (nowContent < converData.result.length){
        nowContent+=1
    }
}

afterUpdate(() => {
       if (mainContent) {
           mainContent.scrollTo({
               top: mainContent.scrollHeight,
               behavior: 'smooth'
           });
           nowContent === converData.result.length || nowContent === undefined || nowContent === true ?  '' : 'playSound(noCon)';
       }
   });
</script>

<div class="flex flex-col gap-4 justify-center items-center">
    {nowContent}
    
        <div bind:this={mainContent} class="h-[30rem] w-[45rem] overflow-y-scroll " id="main-content">
            {#if nowContent === 0 }    
                welcome to Conversation
                <br> click <b>start</b> to lesson
            {:else}
            {#each converData.result as topic, index}
                {#if index+1 <= nowContent }    
                <div class={`w-full  flex  min-h-[10rem] mt-4  ${topic.speaker === "b" ? 'flex-row-reverse':''}`}>
                    <div class={`w-[15%]  flex items-end ${topic.speaker === "b" ? 'flex-row-reverse':''}`}>
                        <img
                    src={topic.speaker === "a" ? converData.heading[0].specker_A : converData.heading[0].specker_B}
                    alt=""
                    class="w-[5rem] h-[5rem] rounded-full border-2"
                />
                    </div>
                    <div  class={`w-[85%]   flex items-start ${topic.speaker === "b" ? 'flex-row-reverse':''}`}>    
                        <div class={`w-[80%] h-full p-2 relative  bg-[#373C4A] rounded-[5px] flex flex-col items-center justify-center before:contents-[''] before:absolute before:border-solid before:border-x-[1.5rem] before:border-x-red-600 before:border-x-transparent before:border-t-transparent before:border-y-[1.5rem] before:border-[#373C4A] before:rounded-[10px]  ${topic.speaker === "a" ? 'before:bottom-0 before:left-[-20px] ':'before:bottom-0 before:right-[-20px] '}`}>
                           <div class="min-h-[5rem] w-full flex flex-col items-center">
                               <p class=" text-[#FFC700] text-[30px]">{topic.text_en}</p>
                                <p class="text-[24px]">{topic.text_th}</p>
                           </div>
                            <div class={`w-full flex justify-end pr-4`}>
                                <button on:click={()=>{playSound(sound_URL)}}><img src="/icon/volume.png" alt="" class="w-5 h-5"></button>
                            </div>
                            
                        </div>
                    </div>
                </div>
                {/if}
                {/each}
            {/if}
        </div>
   

        {#if nowContent < converData.result.length }
        <div class={`flex gap-4`}>
            <button on:click={next_conver} class={`btn border-2  border-[#d3d3d3] w-[15rem] shadow-[10px_10px_0px_0px_#d3d3d3] hover:shadow-[5px_5px_0px_0px_#d3d3d3]`}>{`${nowContent === false ? 'start' : 'next to'}`}</button>
          </div>
        {/if}
</div>


