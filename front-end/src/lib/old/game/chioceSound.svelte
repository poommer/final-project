<script>
  import { createEventDispatcher } from "svelte";

    let msg='' ;

//    export let status_Next

let Ans;

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

const getThreeItems = (data, specificWord) => {
    // กรองเอาค่าที่กำหนดเอง
    const selectedItem = data.filter(item => item.word_en === specificWord);
    console.log('selectedItem', selectedItem);
    // กรองเอาค่าที่ไม่ใช่ค่าที่กำหนดเอง
    let otherItems = data.filter(item => item.word_en !== specificWord);

    // สุ่มค่าอีก 2 ค่า
    otherItems = shuffleArray(otherItems).slice(0, 2);

     // รวมค่าและ return เฉพาะ word_en และ soundURL
     return [...selectedItem, ...otherItems].map(item => ({
        word_en: item.word_en,
        soundURL: item.soundURL
    }));
}

   const dispatch = createEventDispatcher();

let handleClick = async() => {
  dispatch('cur_stepComponent');
//   status_send = false
}

const playSound = (url) =>{
    var sound = new Audio(url);
    sound.play();
    sound.addEventListener('canplaythrough', function() {
        sound.play();
    }, false);
}

let checkAns = async () => {
    console.log({check:Ans == word, Ans, word});
    
      if(maxAns > 0){
          maxAns -= 1
          if(Ans != word){
              if(maxAns >= 1){msg = 'ไม่เป็นไร ให้ลองอีกครั้ง'}else {  msg = 'ไว้ฝึกมาใหม่นะ' ;  score = 0 ; status_send = true; console.log(score); }
          }else{ 
              score = maxAns === 1 ? 5 : 3
              status_send = true
              msg = 'good job!'; 
              maxAns = false ;
              console.log(score);
          }
          
      }else{
          maxAns = false
      }

      nextStatus = false
      
      return score
  }

  
  export let config;
  $:({maxAns, msg, nextStatus} = config);
  
    export let score;
    export let status_send = false;
    
    export let word;
    let show_word = false;

    
    
   export let chioce ;
 
</script>

<div class=" flex flex-col gap-5 justify-center items-center ">
    <small>{msg}</small>

    <div class="Q w-[25rem]">
        <p class="text-2xl text-ec-yellow flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#EAC452"><path d="M240-80v-172q-57-52-88.5-121.5T120-520q0-150 105-255t255-105q125 0 221.5 73.5T827-615l52 205q5 19-7 34.5T840-360h-80v120q0 33-23.5 56.5T680-160h-80v80h-80v-160h160v-200h108l-38-155q-23-91-98-148t-172-57q-116 0-198 81t-82 197q0 60 24.5 114t69.5 96l26 24v208h-80Zm254-360Zm-14 120q17 0 28.5-11.5T520-360q0-17-11.5-28.5T480-400q-17 0-28.5 11.5T440-360q0 17 11.5 28.5T480-320Zm-30-128h61q0-25 6.5-40.5T544-526q18-20 35-40.5t17-53.5q0-42-32.5-71T483-720q-40 0-72.5 23T365-637l55 23q7-22 24.5-35.5T483-663q22 0 36.5 12t14.5 31q0 21-12.5 37.5T492-549q-20 21-31 42t-11 59Z"/></svg>
            เลือกเสียงให้ตรงกับคำศัพท์ที่ปรากฏ
        </p>
        <div class="w-full flex mt-4">
            <div class="w-full rounded-md bg-ec-dark-blue-3 text-ec-yellow flex justify-between items-center">
                <p class="w-full  p-4 text-center  text-5xl">
        
                    {word}
                </p>
                <!-- <button class="w-2/12 flex justify-center items-center" on:click={()=>{show_word = !show_word}}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#e8eaed">
                        <path d={`${ show_word ? "m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" : "M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" }`}/>
                        
                      
                    </svg>
                </button> -->
            </div>
            <!-- <button class="w-2/12 flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#FFFFFF"><path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z"/></svg>
            </button> -->
        </div>
    </div>

    <div class="a flex flex-col gap-5 justify-center items-center">
        {#each chioce as option,index}    
        <button on:click={()=>{playSound(option.soundURL); Ans = option.word_en}} 
            class={`
            btn border-2   bg-ec-dark-blue-5 w-[25rem] 
            ${Ans === option.word_en ? 'border-ec-yellow shadow-[5px_5px_0px_0px_#ffc700] hover:shadow-[3px_3px_0px_0px_#ffc700]' : 'border-ec-dark-blue-1 shadow-[0px_10px_0px_0px_#282c36] hover:border-ec-dark-blue-2 hover:shadow-[0px_5px_0px_0px_#343946] ta' }
            `}>
            <div class="w-full flex items-center justify-between">
                <div class="w-2/12 h-full flex items-center justify-center">
                    <p class={`w-[2rem] h-[2rem] border-2 rounded-md  text-2xl
                     ${Ans === option.word_en ? 'border-ec-yellow shadow-[1px_1px_0px_0px_#ffc700]' : 'border-ec-dark-blue-2 shadow-[2px_2px_0px_0px_#343946]'} `}>
                        {index+1}
                    </p>
                </div>
                <div class=" w-10/12 flex items-center justify-center">
                    <img src="/icon/sound-waves.png" class={`w-[9rem] h-[3rem]`}>
                </div>
            </div>
        </button>
        {/each}
       
    </div>

    {#if maxAns > 0}
  <div class={`flex gap-4`}>

      <button on:click={handleClick} class={`btn border-2  border-[#d3d3d3] w-[15rem] shadow-[10px_10px_0px_0px_#d3d3d3] hover:shadow-[5px_5px_0px_0px_#d3d3d3]`}>skip</button>
      <button on:click={checkAns} class={`btn bg-[#00d730] w-[15rem] shadow-[0px_10px_0px_0px_#00a725] hover:shadow-[0px_5px_0px_0px_#01891f] hover:bg-[#02df33] `}>submit</button>
    </div>
    {/if}
</div>