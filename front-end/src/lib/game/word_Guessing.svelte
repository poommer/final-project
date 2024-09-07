<script>

    import { onMount } from 'svelte';
    import 'animate.css';
  
      /** @type {import('./$types').PageData} */
      // export let data;
  
      let changeStatus = false;
  
      let MaxPaly = 2;
  
      export  let word ;
  
      let msg = '';
  
      export let score;
  
  let result_check_ans = [];
      let hitResult = [];
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
          let hitCount = 0.4 * word.length
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
          
      }
  
      let typeLet = async (letter) => {
          letter = changeStatus === true ?  letter.toUpperCase() : letter.toLowerCase();
          const index = hitResult.findIndex(item => item.type === "ans" && item.status === null)
          hitResult[index] = {letter:letter, type:'ans', status:true};
      }
  
      let DelLetter = async () => {
          const reversedIndex = hitResult.slice().reverse().findIndex(item => item.type === "ans" && item.status === true);
  const index = reversedIndex !== -1 ? hitResult.length - reversedIndex - 1 : -1;
          if(index>=0){
              hitResult[index].letter = ''
              hitResult[index].status = null
              result_check_ans[index] = {isMatch:null, type:undefined}
          }
          // hitResult = hitResult
          console.log(index);
          
  
      }
  
      let changeLetter = () =>{
          changeStatus = !changeStatus
      }
  
  
  
  let checkAns = async () => {
      if(MaxPaly > 0){
          MaxPaly -= 1
          result_check_ans = hitResult.map((value, i) => ({
              isMatch: value.letter.toLowerCase() === word[i].toLowerCase(),
              type: value.type
          }));
          if(result_check_ans.some(item => !item.isMatch)){
              if(MaxPaly === 1){  msg = 'ไม่เป็นไร ให้ลองอีกครั้ง'}else {  msg = 'ไว้ฝึกมาใหม่นะ' ;  score = await interpret_score(result_check_ans) ; console.log(score); }
             
          }else{ 
              score = await interpret_score(result_check_ans)
              msg = 'good job!'; 
              MaxPaly = false 
              console.log(score);
          }
          return score
      }else{
          MaxPaly = false
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
    
  
      onMount(async () => {
          gensolving();
          // console.log(interpret_score());
  
          
      })
  
  
      
  
  
      </script>
  
  
  <div class=" flex flex-col gap-4 justify-center items-center ">
  <small>{msg}</small>
  <div class="flex gap-3">
      {#each hitResult as item, i }
          <p class={`w-14 h-14 flex justify-center items-center text-5xl rounded-md ${item.type === 'hit' ? 'bg-ec-purple-400 text-ec-purple-900' : 'bg-stone-100 text-ec-purple '} ${result_check_ans[i].isMatch === true && item.type === 'ans' ? 'animate__animated animate__heartBeat bg-green-300 text-green-700' : result_check_ans[i].isMatch === false && item.type === 'ans' ? 'animate__animated animate__tada bg-rose-300 text-rose-700' : 'bg-stone-100 text-ec-purple'}`}>{item.letter}</p>
      {/each}
      
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
  <button on:click={async() => {await checkAns(); console.log(score);
       }}>submit</button>
  </div>    
  <!-- <Keybord /> -->