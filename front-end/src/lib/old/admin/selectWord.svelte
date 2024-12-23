<script>
    import axios from 'axios';
  import { createEventDispatcher } from 'svelte';
    let word_list;
    let vocab;

    
    let Cur_wl ;
    
    export let vocab_checked = []
    export let vocab_checkedShow = [];

   const dispatch = createEventDispatcher();

    const load_vocab = async (wl) => {
        Cur_wl = wl === undefined ? 'wl001' : wl
        word_list = await axios.get('https://api-ecproject.poommer.in.th/api/content//wordlist/')
        word_list = word_list.data

        vocab = await axios.get(`https://api-ecproject.poommer.in.th/api/content/vocab/${Cur_wl}`)
        vocab = vocab.data
    }

    const word_insert = async (event) => {
        const value = event.target.value;
        const wordEng = vocab.find(val => {return value === val.vocab_ID}).word_en
        const wordTH = vocab.find(val => {return value === val.vocab_ID}).word_th

        if(event.target.checked){
            vocab_checked.push(value)
            vocab_checkedShow.push({wordEng, wordTH})
        }
        else{
            let vo = vocab_checked.indexOf(value)
            let word_index = vocab_checkedShow.indexOf(wordEng)
            if(vo >= 0 && word_index>=0){
                vocab_checked.splice(vo,1)
                vocab_checkedShow.splice(word_index,1)
            }
        }
            dispatch('vocab_selected',{vocab_checked, vocab_checkedShow} )
            vocab_checked = vocab_checked
            vocab_checkedShow = vocab_checkedShow
    }

    
</script>

<h1 class="text-5xl">เลือกคำศัพท์</h1>
<div class="border-b-2 border-b-zinc-500 mb-2"></div>
<div class="min-h-[45rem]">
    <!-- coding -->
     <div class="w-full h-[45rem]  flex ">
         {#await load_vocab()}
         loading...
      {:then data } 
        <div class="w-2/12 bg-slate-200 rounded-lg p-2 overflow-auto">
            <h2>หมวดหมูคำศัพท์</h2>
                <div class="w-full h-1 border-t-[1px] border-neutral-300"></div>
               <!-- <button on:click={()=>{load_vocab('all')}}>all</button> <br> -->
               {#each word_list as Item}
                   <button class={`w-full text-left p-2 transition-all ${Cur_wl === Item.wl_id ? 'bg-ec-yellow text-ec-purple rounded-br-lg' : ''}`} on:click={()=>{load_vocab(Item.wl_id)}}>{Item.wl_name}</button> <br>
               {/each}
            
        </div>

        <div class="w-8/12 p-2 flex  gap-2 flex-wrap content-start">
            {#if vocab.length < 1}
            <div class="w-full flex flex-col items-center justify-center">
                <h2>ยังไม่มีคำศัพท์</h2>
                <a class="btn bg-ec-purple text-white" href="/admin/vocab/uploads">
                    เพิ่มคำศัพท์เลย
                </a>
            </div>
            {:else}
                {#each vocab as word }
                        
                        <label for={word.vocab_ID} class={`rounded-lg p-1 min-w-[6.25rem] text-center h-16 flex justify-center items-center cursor-pointer ${vocab_checked.includes(word.vocab_ID) ? 'bg-sky-600 text-white' : 'bg-zinc-200'}`}>
                            <input type="checkbox" name='vocab' id={word.vocab_ID}  value={word.vocab_ID} checked={vocab_checked.includes(word.vocab_ID)} on:change={word_insert} class="hidden">
                            {word.word_en} <br> {word.word_th}
                        </label>
                {/each}
            {/if}
            </div>
            
            <div class="w-2/12 bg-slate-200 p-2 rounded-lg">
                <h2>คำศัพท์ที่เลือก</h2>
                <div class="w-full h-1 border-t-[1px] border-neutral-300"></div>
                <div class="h-[95%] flex flex-col overflow-auto">
                    
                    {#each vocab_checkedShow as item }
                    <p>{item.wordEng} - <span class="text-lg">{item.wordTH}</span></p>
                    {/each}
                </div>
            </div>
            {/await}
    </div>
   
</div>

