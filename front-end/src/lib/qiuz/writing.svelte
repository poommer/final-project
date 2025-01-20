<script>

    import { onMount, afterUpdate, createEventDispatcher } from 'svelte';
    import 'animate.css';
  import axios from 'axios';
  
      /** @type {import('./$types').PageData} */
      // export let data;
      export let config;
      $:({maxAns, msg, NextWord} = config);
export let statusNext ;
      export let maxAnsShow; 
      export let urlSound ;
      export let word_TH ;
  
      let changeStatus = false;
  
    //   let maxAns = 2;

    // $:get_gensolving = maxAns == 2 ? gensolving() : '' ;
    
    export let word ;
    export let score;
    export let status_send = false;
    // export let cur_step;
    export let image;
    
    //   export let msg;
    
  
    let result_check_ans = [];
    let hitResult = [];

    let char_word = [] ;
    let AnsList = []
    
    //   if(NextWord){
        //     // gensolving();
    //     console.log(config);
    // }
    let draggedChar = null; // ตัวแปรเก็บข้อมูลไอเท็มที่ถูกลาก
    let draggedindex = null; // ตัวแปรเก็บข้อมูลไอเท็มที่ถูกลาก

    let soudWord_url ;

    afterUpdate(async () => {
        if(NextWord === true){
            
            await start_Item();
            NextWord = false;
        }
})
    

    const get_sound_FormDictAPI = async(word) =>{
        try{
            const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.replace(/[^a-zA-Z]/g, '')}`);
            const data = response.data[0].phonetics;
            if(data[0].audio != ''){
                return data[0].audio;
            } else if(data.length > 1 && data[1].audio != ''){
                return data[1].audio;
            } else if(data.length > 2 && data[2].audio != ''){
                return data[2].audio;
            } else{
                return false
            }
        }catch (err){
            return false            
        }
    }

      const shuffleArray = (array) => {
          
          for(let r = 1; r<=3; r++){
              // console.log('round',r);
              for (let i = array.length - 1; i > 0; i--) {
                  const j = Math.floor(Math.random() * (i + 1));
                  // console.log(`Swapping ${array[i]} with ${array[j]}`); // ดูการสลับแต่ละครั้ง
                  [array[i], array[j]] = [array[j], array[i]];
              }
              // console.log('result',array);
          }
    return array;
  }

  const start_Item = async() => {
        AnsList = []
        char_word = await shuffleArray(word.split(" "))
        char_word = await char_word.map((Item,i)=>{return {index:i, word:Item, sound:urlSound}})
  }

  // ฟังก์ชันเมื่อเริ่มลากไอเท็ม
  const handleDragStart = async(event, char, index) => {
    
    draggedChar = char; // เก็บข้อมูลไอเท็มที่ถูกลาก
    // draggedindex = index
    event.dataTransfer.setData("text/plain", draggedChar);

    // เพิ่มคลาส 'opacity-50' จาก Tailwind เมื่อเริ่มลาก
    event.target.classList.add("opacity-0", "cursor-grabbing", "animate-pulse");
     soudWord_url = await get_sound_FormDictAPI(draggedChar.word);
  }

  // ฟังก์ชันเมื่อไอเท็มถูกลากมาวางเหนือเป้าหมาย
  const handleDragOver = (event, index) => {
    event.preventDefault(); // ป้องกันไม่ให้เบราว์เซอร์ทำค่าเริ่มต้น
    console.log(index);
    
    // if (index !== draggedChar.index) {
    //     alert(index);
    // }

  }

  const handleDropInDiv1 = async (event) => {
    event.preventDefault();
    const index = draggedChar.index; 
    console.log('index to===>',AnsList.includes(val=>{}));
    
    if(!AnsList.some(val => val.index === index)){
        playSound(soudWord_url);
        AnsList = [...AnsList, draggedChar];
        char_word.splice(char_word.findIndex(val=>val.index === index), 1);
        char_word = char_word;
    } 

    draggedChar = null; // รีเซ็ตตัวแปร
    draggedindex = null
  }

  const handleDropInDiv2 = (event) => {
    event.preventDefault();
    const index = draggedChar.index; 
    console.log('index to===>',AnsList.includes(val=>{}));
    
    if(AnsList.some(val => val.index === index)){
        AnsList.splice(AnsList.findIndex(val=>val.index === index), 1);
        AnsList = AnsList
        char_word = [...char_word, draggedChar];
    } 

    draggedChar = null; // รีเซ็ตตัวแปร
    draggedindex = null
  }

  const BackLetter = async (event) => {
    event.preventDefault();
    console.log('BackLetter',event);
    if(event.target.innerText != ''){
        hitResult[event.target.id] = {letter:'', type:'ans', status:null};
        char_word.push(event.target.innerText);
        char_word = char_word
        hitResult = hitResult
    }
  }


      let playSound = (soundFile) =>{
    console.log(soundFile);
    
      var sound = new Audio(soundFile);
      sound.play();
      sound.addEventListener('canplaythrough', function() {
          sound.play();
      }, false);
  }
  

  
  let checkAns = async () => {
      if(maxAns > 0){
          maxAns -= 1
          const ANS = word.split(" ");
          result_check_ans = AnsList.map((value, i) => ({
              isMatch: value.word.toLowerCase() === ANS[i].toLowerCase()
          }));
          if(result_check_ans.some(item => !item.isMatch)){
              if(maxAns === 1){msg = 'ไม่เป็นไร ให้ลองอีกครั้ง'; await start_Item(); AnsList = []}else {  msg = 'ไว้ฝึกมาใหม่นะ' ; statusNext = true ;  score = await interpret_score(result_check_ans) ; status_send = true; console.log(score); }
             
          }else{ 
              score = await interpret_score(result_check_ans)
              status_send = true
              msg = 'good job!'; 
              statusNext = true ;
              maxAns = false ;
              console.log(score);
          }
          return score
      }else{
          maxAns = false
      }

      maxAnsShow = maxAns
      
      
  }
  
  let interpret_score = (listOfAns) =>{
      
      let T = 0;
      let F = 0;
  
      listOfAns.forEach(value => {
          value.isMatch === true ? T += 1 : F += 1        
      });
  
      const rangeScore = (T * 100) / listOfAns.length
  
      if(rangeScore < 20){
          return 0
      }
      else if(rangeScore >= 20 && rangeScore <= 39){
          return 1
      }
      else if(rangeScore >= 40 && rangeScore <= 59){
          return 2
      }
      else if(rangeScore >= 60 && rangeScore <= 79){
          return 3
      }
      else if(rangeScore >= 80 && rangeScore <= 99){
          return 4
      }
      else  if(rangeScore >= 100 || word.split(" ").length === AnsList.length){
          return 5
      }
  
      
  
  }

  const dispatch = createEventDispatcher();


  
      onMount(async () => {
        //   gensolving();
            await start_Item();
          console.log('char_word',char_word);
  
          
      })
  
  
      
  
  
      </script>
  
  <div class="h-full flex flex-col justify-center items-center  gap-4">   
    {#if msg !== ''}
            <p class={`p-2 mt-8 w-full flex justify-center items-center rounded-lg ${score === 5 ?'bg-green-500 text-green-50'  : 'bg-red-600 text-red-50'}`}>{msg}</p>
    {/if}
    <div class="w-full">
        say the text.
        <div class="text-2xl p-2 flex justify-between items-center gap-2 rounded-lg bg-zinc-200 text-zinc-500">
         TH: {word_TH}
             <button on:click={()=>{playSound(urlSound)}}>
                 <div class="w-6 h-6">
                     <svg class="w-6 h-6" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <g clip-path="url(#clip0_1770_255)">
                         <path class={`fill-[#0DA200]`} d="M54.7664 11.8101C54.27 11.3676 53.6231 11.132 52.9584 11.1515C52.2937 11.1711 51.6617 11.4443 51.1922 11.9152C50.7226 12.386 50.4512 13.0188 50.4335 13.6835C50.4159 14.3483 50.6534 14.9945 51.0972 15.4897C55.4332 19.8367 57.8681 25.7258 57.8681 31.8655C57.8681 38.0053 55.4332 43.8944 51.0972 48.2414C50.833 48.4769 50.6196 48.7639 50.4701 49.0848C50.3206 49.4056 50.2381 49.7536 50.2277 50.1074C50.2173 50.4613 50.2792 50.8135 50.4096 51.1426C50.54 51.4717 50.7362 51.7707 50.9861 52.0214C51.2361 52.272 51.5345 52.469 51.8633 52.6004C52.192 52.7317 52.544 52.7946 52.8979 52.7852C53.2517 52.7758 53.6 52.6943 53.9212 52.5457C54.2425 52.3971 54.5301 52.1845 54.7664 51.921C60.078 46.598 63.0611 39.3853 63.0611 31.8655C63.0611 24.3458 60.078 17.1331 54.7664 11.8101Z" />
                         <path class={`fill-[#0DA200]`} d="M47.724 19.6167C47.4839 19.3682 47.1968 19.1699 46.8793 19.0335C46.5618 18.8972 46.2204 18.8254 45.8748 18.8224C45.5293 18.8194 45.1867 18.8852 44.8669 19.016C44.5471 19.1469 44.2565 19.3401 44.0122 19.5844C43.7678 19.8288 43.5746 20.1193 43.4438 20.4391C43.3129 20.7589 43.2471 21.1016 43.2501 21.4471C43.2531 21.7926 43.3249 22.1341 43.4613 22.4516C43.5977 22.7691 43.7959 23.0562 44.0444 23.2963C46.3127 25.5713 47.5864 28.6528 47.5864 31.8654C47.5864 35.078 46.3127 38.1595 44.0444 40.4346C43.7959 40.6746 43.5977 40.9618 43.4613 41.2792C43.3249 41.5967 43.2531 41.9382 43.2501 42.2837C43.2471 42.6292 43.3129 42.9719 43.4438 43.2917C43.5746 43.6115 43.7678 43.9021 44.0122 44.1464C44.2565 44.3907 44.5471 44.5839 44.8669 44.7148C45.1867 44.8456 45.5293 44.9115 45.8748 44.9085C46.2204 44.9055 46.5618 44.8337 46.8793 44.6973C47.1968 44.5609 47.4839 44.3627 47.724 44.1141C50.9673 40.8628 52.7887 36.4578 52.7887 31.8654C52.7887 27.273 50.9673 22.8681 47.724 19.6167Z" />
                         <path class={`fill-[#0DA200]`} d="M36.6009 1.17726C28.6941 2.66138 21.6596 7.12649 16.9514 13.6498H13.6518C10.2023 13.6539 6.89525 15.026 4.45607 17.4652C2.0169 19.9044 0.644757 23.2114 0.640625 26.6609L0.640625 37.0699C0.644757 40.5194 2.0169 43.8264 4.45607 46.2656C6.89525 48.7048 10.2023 50.0769 13.6518 50.081H16.954C21.6609 56.6046 28.6946 61.0698 36.6009 62.5536C36.9761 62.6226 37.3619 62.6083 37.731 62.5117C38.1001 62.4151 38.4434 62.2384 38.7366 61.9944C39.0299 61.7503 39.2659 61.4447 39.4279 61.0993C39.5899 60.7539 39.674 60.3771 39.6741 59.9956V3.73526C39.674 3.35373 39.5899 2.97692 39.4279 2.6315C39.2659 2.28609 39.0299 1.98052 38.7366 1.73645C38.4434 1.49238 38.1001 1.31577 37.731 1.21913C37.3619 1.1225 36.9761 1.1082 36.6009 1.17726Z" />
                         </g>
                         <defs>
                         <clipPath id="clip0_1770_255">
                         <rect width="62.4536" height="62.4536" fill="white" transform="translate(0.640625 0.638672)"/>
                         </clipPath>
                         </defs>
                         </svg>                                       
                 </div>
             </button>   
      
        </div>
    </div>

  <div class="w-full flex flex-col gap-4 justify-center items-center">

    <div 
     role="region"
    aria-label="Drop zone"
    class="w-full    min-h-[5rem]  flex  gap-4 flex-wrap p-4 rounded-xl text-center bg-white shadow-[10px_10px_0px_0px_#373C4A] border-2 border-ec-dark-blue-1"
    
    on:dragover={handleDragOver}
    on:drop={handleDropInDiv1}
    >

    {#each AnsList as words, i }
          <p 
          class={`min-w-[1rem] h-12 p-2 flex justify-center items-center text-3xl rounded-md transition-all border-[1px] bg-white  shadow-[2px_2px_5px_0px_#373C4A]  text-ec-yellow-600 cursor-grab active:cursor-grabbing`} 
          draggable="true"
          on:dragstart={(event)=>{handleDragStart(event, words)}}
          on:dragover={(event)=>{handleDragOver(event, i)}}
          on:dragend={(event)=>{
            event.target.classList.remove("opacity-50", "cursor-grabbing", "animate-pulse");}}
          >
          {words.word}
        </p>
      {/each}    

  </div>

  <div 
  class="w-full flex flex-wrap gap-4 py-4 px-2 border-2 border-dashed border-zinc-500 rounded-md bg-[#dfdfdf98]"
    on:dragover={handleDragOver}
    on:drop={handleDropInDiv2}
    role="region"
  aria-label="Drop zone"
  >
      {#each char_word as char, i }
      <div 
      class={`min-w-[1rem] h-12 flex justify-center items-center text-3xl rounded-md transition-all border-[1px] bg-white  shadow-[2px_2px_5px_0px_#373C4A]  text-ec-yellow-600 cursor-grab active:cursor-grabbing`} 
      >
          <p 
          class={`min-w-[1rem] h-12 p-2 flex justify-center items-center text-3xl rounded-md transition-all border-[1px] bg-white  shadow-[2px_2px_5px_0px_#373C4A]  text-ec-yellow-600 cursor-grab active:cursor-grabbing`} 
          draggable="true"
          on:dragstart={(event)=>{handleDragStart(event, char)}}
          on:dragover={(event)=>{handleDragOver(event, i)}}
          on:dragend={(event)=>{
            event.target.classList.remove("opacity-0", "cursor-grabbing", "animate-pulse");}}
          >
          {char.word}
        </p>
      </div>
      {/each}
      
  </div>
  
  
 
</div>    

</div>
{#if maxAns > 0}
<div class={`w-full flex gap-4 mt-4`}>

    <!-- <button on:click={handleClick} class={`btn border-2  border-[#d3d3d3] w-[15rem] shadow-[10px_10px_0px_0px_#d3d3d3] hover:shadow-[5px_5px_0px_0px_#d3d3d3]`}>skip</button> -->
    <button on:click={async() => {await checkAns(); console.log(score);}} class={`btn bg-[#00d730] w-full shadow-[0px_10px_0px_0px_#00a725] hover:shadow-[0px_5px_0px_0px_#01891f] hover:bg-[#02df33] `}>submit</button>
  </div>
  {/if}

  <!-- <Keybord /> -->