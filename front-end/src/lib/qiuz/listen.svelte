<script>
	import { count } from './../../store/store.js';
  import { onMount } from "svelte";
//   let chioce ;
//    let Ans;
  export let Ans ;
  let sound_Ans;
  export let vocab ;

  export let word ;

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
      sound_Ans = selectedItem[0].soundURL
      console.log('sound_Ans', sound_Ans);
      // กรองเอาค่าที่ไม่ใช่ค่าที่กำหนดเอง
      let otherItems = data.filter(item => item.word_en !== specificWord);
  
      // สุ่มค่าอีก 2 ค่า
      otherItems = shuffleArray(otherItems).slice(0, 3);
  
       // รวมค่าและ return เฉพาะ word_en และ soundURL
       return [...selectedItem, ...otherItems].map(item => ({
          word_en: item.word_en,
          soundURL: item.soundURL,
          check:null
      }));
  }

  const playSound = (url) =>{
      var sound = new Audio(url);
      sound.play();
      sound.addEventListener('canplaythrough', function() {
          sound.play();
      }, false);
  }

//   const checkAns = () => {

//   }

  $: chioce = shuffleArray(getThreeItems(vocab, word.word_en))
  

</script>

<div class="w-full h-full flex flex-col md:flex-row gap-8">
    <div class="h-[25rem] w-[20rem] flex flex-col justify-center items-center bg-white p-2 border-4 border-rose-700 rounded-3xl overflow-hidden">
        <div class="w-full h-[75%] flex justify-center items-center">
            <img src={word.imageURL} alt="" class="max-w-full max-h-full">
        </div>
        <div class="w-full h-[25%] flex flex-col justify-between items-center pt-2">
            <p class="text-4xl">{word.word_th}</p>
            <button on:click={()=>{playSound(word.soundURL)}}>
                <img src="https://cdn-icons-png.flaticon.com/128/3917/3917598.png" alt="" class="w-8 h-8">
            </button>
        </div>
    </div>

    <div>
        <p>what is the word? (listen)</p>
        <div class="a flex flex-col gap-5 ">
            <!-- {Ans} -->
            {#each chioce as option,index}    
            <button on:click={
            ()=>{
                playSound(option.soundURL); 
                Ans = option.word_en
                option.check = word.word_en === option.word_en ? true : false;
                if(word.word_en === option.word_en){
                   let check_null = 0;
                   chioce.forEach(item => {
                    if(item.check === null){
                        item.check = false;
                        check_null ++ ;
                    }
                   });
                   console.log(check_null);
                   
                   
                }
                }
            } 
                class={`
                border-2 w-[25rem] p-2 rounded-lg 
                disabled:cursor-not-allowed 
                ${option.check === true 
                ? 'bg-green-50 border-[#0DA100] shadow-[10px_10px_0px_0px_#0DA100] text-[#206400]' 
                : option.check === false 
                ? 'bg-zinc-200 border-zinc-300 shadow-[0px_5px_0px_0px_#d4d4d8] text-zinc-500' 
                : 'bg-ec-dark-blue-5 border-ec-dark-blue-1 shadow-[0px_10px_0px_0px_#282c36] hover:border-ec-dark-blue-2 hover:bg-ec-dark-blue-500 hover:shadow-[0px_10px_0px_0px_#343946] active:shadow-[0px_5px_0px_0px_#343946] active:active:translate-y-[5px]' }
                `}
                
                disabled={
                    option.check !== null
                }
                >
                <div class="w-full flex items-center justify-between">
                    <div class="w-2/12 h-full flex items-center justify-center">
                        <p class={`w-[2rem] h-[2rem] border-2 rounded-md  text-2xl
                         ${option.check === true ? 'border-[#206400] shadow-[3px_3px_0px_0px_#206400]' : option.check === false ? 'bg-red-50 border-[#a33232] shadow-[3px_3px_0px_0px_#a33232] text-[#ef4444]' : 'border-ec-dark-blue-2 shadow-[2px_2px_0px_0px_#343946]'} `}>
                            {option.check === true ? '✔' 
                            : option.check === false ? '✘' : index+1}
                        </p>
                    </div>
                    <div class="text-3xl w-10/12 flex items-center justify-center">
                        {option.word_en} 
                    </div>
                </div>
            </button>
            {/each}
           
        </div>
    </div>

</div>