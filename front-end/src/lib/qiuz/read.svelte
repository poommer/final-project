<script>
    import { onMount, createEventDispatcher } from 'svelte';
  
    export  let word ;
    console.log(word);
    
    export  let soundFile ;
    export let statusNext = false ;
  
      

export let configQuiz;
  $:({ msg, ansCheck, maxAns, timeLeft, micStatus } = configQuiz);
 console.log('component',{msg, ansCheck});  
 console.log('component',configQuiz);  
export let score ;
export let status_send  = false ;



let result = [];
  
  let recognition;
  let intervalId;
  let timeoutId;   

  onMount(() => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
      if (!SpeechRecognition) {
          console.error("SpeechRecognition is not supported in this browser.");
          return;
      }
  
      recognition = new SpeechRecognition();
      recognition.lang = "en-US"; 
      recognition.continuous = true;
      recognition.interimResults = true;
  
  });


  const dispatch = createEventDispatcher();

function handleClick() {
    // ansCheck = false
    micStatus = false
    recognition.stop();
    clearInterval(intervalId); // หยุดตัวจับเวลาเมื่อหมดเวลา
    clearInterval(timeoutId);
    // micStatus = false
    // timeLeft = 10
    // maxAns = 2
  dispatch('cur_stepComponent');
//   status_send = false

}

  


 

  let clickToSpeck = () => {
    micStatus = !micStatus
    console.log('Before', configQuiz);
    
    if(micStatus){
        msg = 'กำลังฟังเสียงอยู่'
        console.log("SpeechRecognition initialized");
        recognition.start();  // เริ่มการตรวจจับครั้งแรก
        console.log("Speech recognition started");
    
        // ตัวจับเวลาที่จะนับถอยหลังทุกวินาที
        intervalId = setInterval(() => {
            timeLeft--;
            console.log(`Time left: ${timeLeft} seconds`);
    
            // ถ้าหมดเวลาให้หยุดการทำงาน
            if (timeLeft === 0) {
                ansCheck = false
                recognition.stop();
                clearInterval(intervalId); // หยุดตัวจับเวลาเมื่อหมดเวลา
              //   clearInterval(timeoutId); // หยุดตัวจับเวลาเมื่อหมดเวลา
                micStatus = false
    
            }
        }, 1000); // อัปเดตทุก 1 วินาที
    
        // ตั้งค่าให้หยุดการทำงานหลังจาก 10 วินาที
        timeoutId = setTimeout(() => {
            if (!ansCheck || ansCheck === null) { // ถ้าคำตอบไม่ถูกต้องภายใน 10 วินาที
                recognition.stop();
              //   clearInterval(intervalId);
              clearInterval(intervalId)
            clearInterval(timeoutId);
                maxAns-=1
                if(maxAns > 0){
                    msg = 'ไม่เป็นไรลองใหม่อีกรอบ'
                    timeLeft = 10
                    ansCheck = false
    
                } else{
                    msg = 'โอ้ ฝึกฝนทุกวัน จะเก่งขึ้นเอง'
                    ansCheck = false
                    score = 0
                    status_send = true
                    statusNext = true;
                }
                console.log(maxAns);
                
            }
            
        }, timeLeft * 1000);
    
        recognition.addEventListener('result', (event) => {
            const arr_result = Array.from(event.results)
                .map(result => result[0])
                .map(result => result.transcript);
            const result = arr_result[arr_result.length - 1].replace(/[^a-zA-Z0-9\s]/g, '').toLowerCase();
    
            console.log('Result:', result);
    
            // ตรวจสอบว่าคำตอบถูกต้องหรือไม่
            if (result === word.sen_en.replace(/[^a-zA-Z0-9\s]/g, '').toLowerCase()) {
                console.log('Correct!');
                ansCheck = true;
                recognition.stop();
                clearInterval(intervalId); // หยุดตัวจับเวลาเมื่อคำตอบถูกต้อง
                clearInterval(timeoutId);
                score = scoreRender(timeLeft)
                status_send = true
               msg = 'good job👏'
               micStatus = false
               statusNext = true;
            }
        });
    }else{
        msg = ''
        recognition.stop();
        clearInterval(intervalId); // หยุดตัวจับเวลาเมื่อคำตอบถูกต้อง
        clearInterval(timeoutId);
        maxAns-=1
                if(maxAns > 0){
                    msg = 'ไม่เป็นไรลองใหม่อีกรอบ'
                    timeLeft = 10
                    ansCheck = false
    
                } else{
                    msg = 'โอ้ ฝึกฝนทุกวัน จะเก่งขึ้นเอง'
                    ansCheck = false
                    score = 0
                    status_send = true
                }
    }

      console.log('After', configQuiz);
      
  };
  
  let playSound = (soundFile) =>{
    console.log(soundFile);
    
      var sound = new Audio(soundFile);
      sound.play();
      sound.addEventListener('canplaythrough', function() {
          sound.play();
      }, false);
  }
  
  
  let scoreRender = (time) => {
      if(time >= 8){
          return 5
      }
  
      else if(time >= 7){
          return 4
      }
  
      else if(time >= 5){
          return 3
      }
  
      else if(time >= 3){
          return 2
      }
  
      else if(time >= 1){
          return 1
      }
  
      else{
          return 0
      }
  }


  
  
  </script>
  
  

  <div class="w-full h-full flex flex-col md:flex-row items-center justify-center gap-8">   
    <div class="w-full md:w-auto flex flex-col justify-start items-center">
        <div class="w-full">
            say the text.
        <div class="w-full md:w-[30rem] rounded-xl text-5xl  flex flex-col justify-center items-center gap-4 text-center bg-white shadow-[10px_10px_0px_0px_#373C4A] border-2 border-ec-dark-blue-1">
           <div class="py-2 px-2 flex flex-col gap-2 ">
               {word.sen_en}
               <span class={`text-2xl`}>
                   {word.sen_th}
               </span>
           </div>

            <div class="w-full flex justify-end pb-2 px-2">
                <button on:click={()=>{playSound(word.sound_url)}}>
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
        </div>
        {#if msg !== ''}
            <p class={`p-2 mt-8 w-full flex justify-center items-center rounded-lg ${micStatus === true ? 'bg-zinc-300 text-zinc-700' : micStatus === false && score > 0 ?'bg-green-500 text-green-50'  : 'bg-red-600 text-red-50'}`}>{msg}</p>
        {/if}
        {#if ansCheck === null || (ansCheck === false && maxAns > 0) }    
          <button class={`w-[4rem] h-[4rem] mt-6 ${micStatus === true ? 'bg-green-300 animate-pulse animate-infinite' : 'bg-ec-purple-600'} rounded-full flex justify-center items-center`} on:click={clickToSpeck}>
            <div class={`w-[3.75rem] h-[3.75rem] ${micStatus === true ?'bg-green-500' : 'bg-ec-purple-600'} rounded-full flex justify-center items-center`}>
                <svg xmlns="http://www.w3.org/2000/svg" height="64px" viewBox="0 -960 960 960" width="64px" fill="#e8eaed"><path d="M480-400q-50 0-85-35t-35-85v-240q0-50 35-85t85-35q50 0 85 35t35 85v240q0 50-35 85t-85 35Zm0-240Zm-40 520v-123q-104-14-172-93t-68-184h80q0 83 58.5 141.5T480-320q83 0 141.5-58.5T680-520h80q0 105-68 184t-172 93v123h-80Zm40-360q17 0 28.5-11.5T520-520v-240q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v240q0 17 11.5 28.5T480-480Z"/></svg>
            </div>  
            </button>
            {/if}

            <!-- <button on:click={handleClick} class={`btn border-2  border-[#d3d3d3] w-[15rem] shadow-[10px_10px_0px_0px_#d3d3d3] hover:shadow-[5px_5px_0px_0px_#d3d3d3]`}>skip</button> -->
    </div>
  </div>

  