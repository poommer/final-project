<script>
    import { createEventDispatcher } from 'svelte';
    export let data ;
    export let contentNext = false;
    
    const dispatch = createEventDispatcher();

    let playSound = (soundIndex) =>{
    contentNext = true;
    dispatch('updateBtn', { contentNext });
    var sound = new Audio(`sound/chapter${data.chapter}/lev${data.lev}/vocab/${data.word}.wav`);
    sound.play();
    sound.addEventListener('canplaythrough', function() {
        sound.play();
    }, false);
}
    </script>
    
    <div class="flex justify-center items-center p-10 ">
        <div class="flex items-center justify-center ">
            <button class="bg-white shadow-[15px_15px_0px_0px_#1c9aff] rounded-[.5rem]  active:shadow-[10px_10px_0px_0px_#13619f] active:translate-y-[5px] active:translate-x-[5px]" on:click={playSound}>
                <img title={`word = ${data.word}`} src={data.immageSrc} alt={`word = ${data.word}`} class="w-[360px]">
            </button>
        </div>
           
    
        
    </div>
    
    