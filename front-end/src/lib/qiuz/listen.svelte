<script>
	import { count } from './../../store/store.js';
  import { onMount } from "svelte";
//   let chioce ;
//    let Ans;
  export let Ans ;
  let sound_Ans;
  export let vocab ;

  export let statusNext = false ;

  export let word ;


  export let score = 0 ;

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
      otherItems = shuffleArray(otherItems).slice(0, 2);
  
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

<div class="flex flex-col md:flex-row justify-center items-center md:gap-8">
    <div class="h-[20rem] w-[15rem] md:h-[25rem] md:w-[30rem] flex flex-col justify-center items-center bg-white p-2 border-4 border-rose-700 rounded-3xl overflow-hidden">
        <div class="w-full h-[75%] flex justify-center items-center">
            <img src={word.imageURL} alt="" class="max-w-full max-h-full">
        </div>
        <div class="w-full h-[25%] flex flex-col justify-between items-center pt-2">
            <p class="text-4xl">{word.word_th}</p>
            <button on:click={()=>{playSound(word.soundURL)}}>
                <div class="w-8 h-8">
                    <svg class="w-8 h-8" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
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

    <div class="w-full">
        <p>what is the word? (listen)</p>
        <div class=" flex flex-col gap-9 flex-grow">
            <!-- {Ans} -->
            {#each chioce as option,index}    
            <button on:click={
            ()=>{
                playSound(option.soundURL); 
                Ans = option.word_en
                option.check = word.word_en === option.word_en ? true : false;
                if(word.word_en === option.word_en){
                   let check_null = 0;
                   statusNext = true ;
                   chioce.forEach(item => {
                    if(item.check === null){
                        item.check = false;
                        check_null ++ ;
                        if(check_null === 3){
                            score = 5
                        }else if(check_null === 2){
                            score = 3
                        }else if(check_null === 1){
                            score = 1
                        }else{
                            score = 0
                        }
                    }
                   });
                   console.log(score);
                   
                   
                }
                }
            } 
                class={`
                border-2 w-full p-2 rounded-lg transition-all
                disabled:cursor-not-allowed
                ${option.check === true 
                ? 'bg-green-50 border-[#0DA100] shadow-[10px_10px_0px_0px_#0DA100] text-[#206400]' 
                : option.check === false 
                ? 'bg-zinc-200 border-zinc-300 shadow-[0px_5px_0px_0px_#d4d4d8] text-zinc-500' 
                : 'bg-ec-dark-blue-5 border-ec-dark-blue-1 shadow-[0px_10px_0px_0px_#282c36] text-slate-200 hover:border-ec-dark-blue-2 hover:bg-ec-dark-blue-500 hover:shadow-[0px_10px_0px_0px_#343946] active:shadow-[0px_5px_0px_0px_#343946] active:active:translate-y-[5px]' }
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