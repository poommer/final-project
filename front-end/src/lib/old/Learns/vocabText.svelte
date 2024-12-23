<script>
    import { createEventDispatcher } from 'svelte';
export let wordTH ;
export let wordEN ;
export let sound_URL ;
export let contentNext = false;

const dispatch = createEventDispatcher();

let playSound = (soundIndex) =>{
    contentNext = true;
    dispatch('updateBtn', { contentNext });
    var sound = new Audio(soundIndex);
    sound.play();
    sound.addEventListener('canplaythrough', function() {
        sound.play();
    }, false);
}
</script>

<div class="flex justify-center items-center p-10">
    <div class="flex items-end">
        <img src="/mascot1.png" alt="" class=" w-[20rem]">
    </div>
        <div class="relative">
        <div class={` min-w-[20rem] h-[7rem] relative left-[-1rem] top-[-10rem] bg-[#373C4A] rounded-[5px] flex flex-col items-center justify-center before:contents-[''] before:absolute before:border-solid before:border-x-[1.5rem] before:border-x-red-600 before:border-x-transparent before:border-t-transparent before:border-y-[1.5rem] before:border-[#373C4A] before:rounded-[10px] before:bottom-0 before:left-[-20px]`}>
            <span class=" text-[#FFC700] text-[30px]">{wordEN}</span>
             <span class="text-[24px]">{wordTH}</span>
            <div class={`w-full flex justify-end pr-4`}>
                <button on:click={()=>{playSound(sound_URL)}}><img src="/icon/volume.png" alt="" class="w-5 h-5"></button>
            </div>
            
        </div>
    </div>

    
</div>

