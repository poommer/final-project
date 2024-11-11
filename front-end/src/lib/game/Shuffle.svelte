<script>

    import { onMount, afterUpdate, createEventDispatcher } from 'svelte';
    import 'animate.css';
  
      /** @type {import('./$types').PageData} */
      // export let data;
      export let config;
      $:({maxAns, msg, nextStatus} = config);

      
  
      let changeStatus = false;
  
    //   let maxAns = 2;

    
    export  let word ;
    export let score;
    export let status_send = false;
    // export let cur_step;
    export let image;
    
    //   export let msg;
    word = word.split(' ')
    console.log(word);
    
    
  
    let result_check_ans = [];
    let hitResult = [];
    

    afterUpdate(async () => {
        if(nextStatus === true){
            hitResult = []
            await gensolving();
            nextStatus = false;
        }
})
    
      let getUniqueRandomNumbers = (min, max, count) => {
    const numbers = [];
    while (numbers.length < count) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!numbers.includes(randomNumber)) {
        numbers.push(randomNumber);
      }
    }
    return numbers;
  }
  
    let gensolving = async () => {
          let hitCount = word.length - 1
          let hit = getUniqueRandomNumbers(0, word.length-1, hitCount)
  
          for(let i = 0; i<word.length; i++ ){
              if(hit.includes(i)){
                  hitResult[i] = ({letter:word[i], type:'hit', status:true})
                  result_check_ans[i] = {isMatch:true, type:'hit'}
              }else{
                  hitResult[i] = ({letter:'', type:'ans', status:null})
                  result_check_ans[i] = {isMatch:null, type:'ans'}
              }
          }
  
          hitResult = hitResult
          console.log(hitResult);
          console.log(nextStatus);
          
      }
  
      let typeLet = async (letter) => {
          letter = changeStatus === true ?  letter.toUpperCase() : letter.toLowerCase();
          const index = hitResult.findIndex(item => item.type === "ans" )
          console.log(hitResult[index].letter);
          
          const newLetter = hitResult[index].letter === '' ? letter : hitResult[index].letter + letter
          console.log(newLetter);
          hitResult[index] = {letter:newLetter, type:'ans', status:true};
      }
  
      let DelLetter = async () => {
          const reversedIndex = hitResult.slice().reverse().findIndex(item => item.type === "ans" );
  const index = reversedIndex !== -1 ? hitResult.length - reversedIndex - 1 : -1;
  hitResult[index].letter =  hitResult[index].letter.slice(0, -1)
          hitResult = hitResult
          console.log('hitResult[index].letter',hitResult[index].letter);
          console.log(index);
          
  
      }
  
      let changeLetter = () =>{
          changeStatus = !changeStatus
      }
  
  
  
  let checkAns = async () => {
      if(maxAns > 0){
          maxAns -= 1
          result_check_ans = hitResult.map((value, i) => ({
              isMatch: value.letter.replace(/[^a-zA-Z0-9\s]/g, '').toLowerCase() === word[i].replace(/[^a-zA-Z0-9\s]/g, '').toLowerCase(),
              type: value.type
          }));
          if(result_check_ans.some(item => !item.isMatch)){
              if(maxAns === 1){msg = 'ไม่เป็นไร ให้ลองอีกครั้ง'}else {  msg = 'ไว้ฝึกมาใหม่นะ' ;  score = await interpret_score(result_check_ans) ; status_send = true; console.log(score); }
             
          }else{ 
              score = await interpret_score(result_check_ans)
              status_send = true
              msg = 'good job!'; 
              maxAns = false ;
              console.log(score);
          }
          return score
      }else{
          maxAns = false
      }

      
      
  }
  
  let interpret_score = (listOfAns) =>{
      
      let T = 0;
      let F = 0;
      const dataEx = listOfAns.filter(value => value.type === 'ans');
  
      dataEx.forEach(value => {
          value.isMatch === true ? T += 1 : F += 1        
      });
  
      const rangeScore = (T * 100) / dataEx.length
  
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
      else{
          return 5
      }
  
      
  
  }

  let checkAnsAd = async () => {
    const array_Ans = []
    const ansTxt_check = game_Ans.replace(/[^a-zA-Z0-9\s]/g, '').split(' ');
    for (let index = 0; index < ansTxt_check.length; index++) {
        array_Ans.push(ansTxt_check[index].toLowerCase() === word[index].replace(/[^a-zA-Z0-9\s]/g, '').toLowerCase() ? {isMatch:true} : {isMatch:false})
        console.log(array_Ans);
        console.log(ansTxt_check);
        console.log(word);
        
        
    }
    if(array_Ans.some(item => !item.isMatch)){
              if(maxAns === 1){msg = 'ไม่เป็นไร ให้ลองอีกครั้ง'}else {  msg = 'ไว้ฝึกมาใหม่นะ' ;  score = await interpret_score(array_Ans) ; status_send = true; console.log(score); }
             
          }else{ 
              score = await interpret_score(array_Ans)
              status_send = true
              msg = 'good job!'; 
              maxAns = false ;
              console.log(score);
              word = ''
          }
          return score
  }

  const dispatch = createEventDispatcher();

function handleClick() {
  dispatch('cur_stepComponent');
//   status_send = false
}

let game_mode = 'basic'

let game_Ans;
  
      
  
  
      </script>
  
  
  <div class=" flex flex-col gap-4 justify-center items-center ">
  <small>{msg}</small>
  <img src={image} alt="" class="max-w-[7em] bg-white shadow-[5px_5px_0px_0px_#1c9aff] rounded-[.5rem]">
  <div class="flex">
    <button on:click={()=>{game_mode = 'basic'}} class={`w-[7rem] p-2 rounded-s-md ${game_mode === 'basic' ? 'bg-ec-purple' : 'bg-white text-ec-purple'}`}>basic</button>
    <button on:click={()=>{game_mode = 'advance'}} class={`w-[7rem] p-2 rounded-r-md ${game_mode === 'advance' ? 'bg-ec-purple' : 'bg-white text-ec-purple'}`}>advance</button>
  </div>
  {#if game_mode === 'basic'}    
  <div class="flex gap-2 bg-slate-50 p-2 rounded-md  ">
    {#each hitResult as item, i }
        <p class={` flex justify-center items-center text-5xl 
        ${item.type === 'hit' ? ' min-w-[0.1rem]' : 'border-b-2 border-ec-dark-blue-5 border-dashed min-w-[5rem]'} 
        ${result_check_ans[i].isMatch === true && item.type === 'ans' ? 'animate__animated animate__heartBeat border-green-700 text-green-700' : result_check_ans[i].isMatch === false && item.type === 'ans' ? 'animate__animated animate__tada border-rose-700 text-rose-700' : ' text-ec-purple'}`}>{item.letter}</p>
    {/each}
    <p class="text-5xl text-ec-purple">.</p>
</div>
<div class={`flex flex-col justify-center items-center gap-2 w-[42rem] ${changeStatus === true ? 'lowercase' : 'capitalize'}`}>
    <div class="flex gap-3 lowercase">
        <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg ${changeStatus === true ? 'capitalize' : 'lowercase'}`} on:click={() => {typeLet('Q')}}>Q</button>
        <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg ${changeStatus === true ? 'capitalize' : 'lowercase'}`} on:click={() => {typeLet('W')}}>W</button>
        <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg ${changeStatus === true ? 'capitalize' : 'lowercase'}`} on:click={() => {typeLet('E')}}>E</button>
        <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg ${changeStatus === true ? 'capitalize' : 'lowercase'}`} on:click={() => {typeLet('R')}}>R</button>
        <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg ${changeStatus === true ? 'capitalize' : 'lowercase'}`} on:click={() => {typeLet('T')}}>T</button>
        <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg ${changeStatus === true ? 'capitalize' : 'lowercase'}`} on:click={() => {typeLet('Y')}}>Y</button>
        <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg ${changeStatus === true ? 'capitalize' : 'lowercase'}`} on:click={() => {typeLet('U')}}>U</button>
        <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg ${changeStatus === true ? 'capitalize' : 'lowercase'}`} on:click={() => {typeLet('I')}}>I</button>
        <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg ${changeStatus === true ? 'capitalize' : 'lowercase'}`} on:click={() => {typeLet('O')}}>O</button>
        <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg ${changeStatus === true ? 'capitalize' : 'lowercase'}`} on:click={() => {typeLet('P')}}>P</button>
    </div>
    <div class="flex gap-3">
        <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg ${changeStatus === true ? 'capitalize' : 'lowercase'}`} on:click={() => {typeLet('A')}}>A</button>
        <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg ${changeStatus === true ? 'capitalize' : 'lowercase'}`} on:click={() => {typeLet('S')}}>S</button>
        <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg ${changeStatus === true ? 'capitalize' : 'lowercase'}`} on:click={() => {typeLet('D')}}>D</button>
        <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg ${changeStatus === true ? 'capitalize' : 'lowercase'}`} on:click={() => {typeLet('F')}}>F</button>
        <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg ${changeStatus === true ? 'capitalize' : 'lowercase'}`} on:click={() => {typeLet('G')}}>G</button>
        <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg ${changeStatus === true ? 'capitalize' : 'lowercase'}`} on:click={() => {typeLet('H')}}>H</button>
        <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg ${changeStatus === true ? 'capitalize' : 'lowercase'}`} on:click={() => {typeLet('J')}}>J</button>
        <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg ${changeStatus === true ? 'capitalize' : 'lowercase'}`} on:click={() => {typeLet('K')}}>K</button>
        <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg ${changeStatus === true ? 'capitalize' : 'lowercase'}`} on:click={() => {typeLet('L')}}>L</button>
    </div>
    <div class="flex gap-3">
        <button class="bg-yellow-600 p-2 w-16 h-16 font-bold text-3xl rounded-lg flex justify-center items-center" on:click={() => {changeLetter()}}><svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#e8eaed"><path d="M440-240v-368L296-464l-56-56 240-240 240 240-56 56-144-144v368h-80Z"/></svg></button>
        <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg ${changeStatus === true ? 'capitalize' : 'lowercase'}`} on:click={() => {typeLet('Z')}}>Z</button>
        <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg ${changeStatus === true ? 'capitalize' : 'lowercase'}`} on:click={() => {typeLet('X')}}>X</button>
        <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg ${changeStatus === true ? 'capitalize' : 'lowercase'}`} on:click={() => {typeLet('C')}}>C</button>
        <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg ${changeStatus === true ? 'capitalize' : 'lowercase'}`} on:click={() => {typeLet('V')}}>V</button>
        <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg ${changeStatus === true ? 'capitalize' : 'lowercase'}`} on:click={() => {typeLet('B')}}>B</button>
        <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg ${changeStatus === true ? 'capitalize' : 'lowercase'}`} on:click={() => {typeLet('N')}}>N</button>
        <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg ${changeStatus === true ? 'capitalize' : 'lowercase'}`} on:click={() => {typeLet('M')}}>M</button>
        <button class={`bg-yellow-600 p-2 w-16 h-16 font-bold text-3xl rounded-lg flex justify-center items-center`} on:click={DelLetter}><svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#e8eaed"><path d="M360-200q-20 0-37.5-9T294-234L120-480l174-246q11-16 28.5-25t37.5-9h400q33 0 56.5 23.5T840-680v400q0 33-23.5 56.5T760-200H360Zm400-80v-400 400Zm-400 0h400v-400H360L218-480l142 200Zm96-40 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Z"/></svg></button>
    </div>
</div>
{:else}
<input type="text" class="text-5xl text-ec-purple" bind:value={game_Ans}>
{/if}
  
  

  {#if maxAns > 0}
  <div class={`flex gap-4`}>

      <button on:click={handleClick} class={`btn border-2  border-[#d3d3d3] w-[15rem] shadow-[10px_10px_0px_0px_#d3d3d3] hover:shadow-[5px_5px_0px_0px_#d3d3d3]`}>skip</button>
      <button on:click={async() => {game_mode === 'basic' ? await checkAns() : await checkAnsAd(); console.log(score);}} class={`btn bg-[#00d730] w-[15rem] shadow-[0px_10px_0px_0px_#00a725] hover:shadow-[0px_5px_0px_0px_#01891f] hover:bg-[#02df33] `}>submit</button>
    </div>
    {/if}
  </div>    
  <!-- <Keybord /> -->