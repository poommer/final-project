<script>
  import { afterUpdate } from 'svelte';
	import Conversation from './conversation.svelte';

export let converData ;
console.log(converData);
console.log(converData.speaker_img);


let mainContent;

export let nowContent = 0

let next_conver = async () => {
if (nowContent < converData.data.length){
        nowContent+=1
    }
}

afterUpdate(() => {
       if (mainContent) {
           mainContent.scrollTo({
               top: mainContent.scrollHeight,
               behavior: 'smooth'
           });
           nowContent === converData.data.length || nowContent === undefined || nowContent === true ?  '' : 'playSound(noCon)';
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
            {#each converData.data as topic, index}
                {#if index+1 <= nowContent }    
                <div class={`w-full  flex  h-[10rem] ${topic.speaker === "b" ? 'flex-row-reverse':''}`}>
                    <div class={`w-[15%]  flex items-end ${topic.speaker === "b" ? 'flex-row-reverse':''}`}>
                        <img
                    src={topic.speaker === "a" ? converData.speaker_img.a : converData.speaker_img.b}
                    alt=""
                    class="w-[5rem] h-[5rem] rounded-full border-2"
                />
                    </div>
                    <div  class={`w-[85%]  flex items-start ${topic.speaker === "b" ? 'flex-row-reverse':''}`}>    
                        <div class={`min-w-[50%] p-2 relative  bg-[#373C4A] rounded-[5px] flex flex-col items-center justify-center before:contents-[''] before:absolute before:border-solid before:border-x-[1.5rem] before:border-x-red-600 before:border-x-transparent before:border-t-transparent before:border-y-[1.5rem] before:border-[#373C4A] before:rounded-[10px]  ${topic.speaker === "a" ? 'before:bottom-0 before:left-[-20px] ':'before:bottom-0 before:right-[-20px] '}`}>
                            <span class=" text-[#FFC700] text-[30px]">{topic.text_en}</span>
                             <span class="text-[24px]">{topic.text_th}</span>
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
   

        {#if nowContent < converData.data.length }
        <div class={`flex gap-4`}>
            <button on:click={next_conver} class={`btn border-2  border-[#d3d3d3] w-[15rem] shadow-[10px_10px_0px_0px_#d3d3d3] hover:shadow-[5px_5px_0px_0px_#d3d3d3]`}>{`${nowContent === false ? 'start' : 'next to'}`}</button>
          </div>
        {/if}
</div>




<!-- <div class="flex flex-col justify-center items-center p-10 ">
<div bind:this={mainContent} class="h-[30rem] w-[45rem] overflow-y-scroll " id="main-content">
{#each converData.data as topic, index}
<div class="bg-orange-300 m-2 flex">
    <div class={`w-full bg-white flex ${topic.speaker === "a" ? "" : " flex-row-reverse justify-end items-end "}`} >
        <div class={`w-2/12 h-[10rem] flex  items-end  ${topic.speaker === "a" ? "" : "flex-row-reverse"}`}>
            <img
            src={topic.speaker === "a" ? converData.speaker_img.a : converData.speaker_img.b}
            alt=""
            class="w-[5rem] h-[5rem] rounded-full border-2"
        />
        </div>
    
        <div class="w-6/12">
            <div class={`w-full relative  bg-[#373C4A] rounded-[5px] flex flex-col items-center justify-center before:contents-[''] before:absolute before:border-solid before:border-x-[1.5rem] before:border-x-red-600 before:border-x-transparent before:border-t-transparent before:border-y-[1.5rem] before:border-[#373C4A] before:rounded-[10px] before:bottom-0 before:left-[-20px]`}>
                <span class=" text-[#FFC700] text-[30px]">{topic.text_en}</span>
                 <span class="text-[24px]">{topic.text_th}</span>
                <div class={`w-full flex justify-end pr-4`}>
                    <button on:click={()=>{playSound(sound_URL)}}><img src="/icon/volume.png" alt="" class="w-5 h-5"></button>
                </div>
                
            </div>
        </div>
    </div>
</div>
{/each}
</div>
</div>
<!-- <div class="flex flex-col justify-center items-center p-10"> 
    ddd
    <div bind:this={mainContent} class="h-[30rem] w-[45rem] overflow-y-scroll" id="main-content">
        {#each converData.data as topic, index}
            <div class={` ${topic.speaker === "a" ? "" : "flex justify-end items-end"}`} >
                <div class={`min-w-[20rem] h-[10rem] flex gap-8  ${topic.speaker === "a" ? "" : "flex-row-reverse"}`}>
                    <img
                    src={topic.speaker === "a" ? converData.conversation.speaker_img.a : converData.conversation.speaker_img.b}
                    alt=""
                    class="w-[5rem] rounded-full border-2"
                />
                </div>

                <div class={` min-w-[20rem] h-[7rem] relative bg-[#282C36] rounded-[5px] flex flex-col items-center justify-center before:contents-[''] before:absolute before:border-solid before:border-x-[1.5rem] before:border-x-red-600 before:border-x-transparent before:border-t-transparent before:border-y-[1.5rem] before:border-[#282C36] before:rounded-[10px] ${topic.speaker === "a" ? "before:bottom-0 before:left-[-20px]" : "before:bottom-0 before:right-[-20px]"}`}>
                    <span class=" text-[#FFC700]">eng</span>
                   ไทย
                    <div class={`w-full flex ${topic.speaker === "a" ? 'justify-end pr-4' : 'justify-start pl-4 '}`}>
                        <button on:click={() => {playSound(index)}}><img src="icon/volume.png" alt="" class="w-5 h-5"></button>
                    </div>
                    
                </div>

            </div>
        {/each}
    </div>
</div>


<div class="flex justify-center items-center">
    <button class={`w-[10rem] h-12 text-[20px] bg-amber-100 text-amber-600 p-1 rounded-xl relative bottom-[-10rem] ${noCon === 6 ? 'hidden' : ''}`} on:click={noCon === 6 ? toSummary :addNo} >{noCon === undefined ? 'start' : noCon === 6 ? 'next to page' : 'next ==>'}</button>
    </div> -->