<script>
  import { onMount } from "svelte";

  export let word;

  let result = [];

  let recognition;

  onMount(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("SpeechRecognition is not supported in this browser.");
      return;
    }

    recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;
  });

  let timeLeft = 10;
  let intervalId;
  let msg;
  let ansCheck = null;

  let ShowAns = true

  export let score;

  let micStatus = false;

  let maxAns = 2;

  let clickToSpeck = () => {
    console.log("SpeechRecognition initialized");
    micStatus = true;
    recognition.start(); // เริ่มการตรวจจับครั้งแรก
    console.log("Speech recognition started");

    // ตัวจับเวลาที่จะนับถอยหลังทุกวินาที
    intervalId = setInterval(() => {
      timeLeft--;
      console.log(`Time left: ${timeLeft} seconds`);

      // ถ้าหมดเวลาให้หยุดการทำงาน
      if (timeLeft === 0) {
        ansCheck = false;
        recognition.stop();
        clearInterval(intervalId); // หยุดตัวจับเวลาเมื่อหมดเวลา
        micStatus = false;
      }
    }, 1000); // อัปเดตทุก 1 วินาที

    // ตั้งค่าให้หยุดการทำงานหลังจาก 10 วินาที
    setTimeout(() => {
      if (!ansCheck || ansCheck === null) {
        // ถ้าคำตอบไม่ถูกต้องภายใน 10 วินาที
        recognition.stop();
        clearInterval(intervalId);
        maxAns -= 1;
        if (maxAns > 0) {
          msg = "ไม่เป็นไรลองใหม่อีกรอบ";
          timeLeft = 10;
          ansCheck = false;
          ShowAns = null
        } else {
          msg = "โอ้ ฝึกฝนทุกวัน จะเก่งขึ้นเอง";
          ansCheck = false;
          score = 0;
          ShowAns = null
        }
        console.log(maxAns);
      }
    }, timeLeft * 1000);

    recognition.addEventListener("result", (event) => {
      const arr_result = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript);
      const result = arr_result[arr_result.length - 1]
        .replace(/\./g, "")
        .toLowerCase();

      console.log("Result:", result);

      // ตรวจสอบว่าคำตอบถูกต้องหรือไม่
      if (result === word.toLowerCase()) {
        console.log("Correct!");
        ansCheck = true;
        recognition.stop();
        clearInterval(intervalId); // หยุดตัวจับเวลาเมื่อคำตอบถูกต้อง
        score = scoreRener(timeLeft);
        msg = "good job👏";
        micStatus = false;
        ShowAns = null
      }
    });
  };

  let playSound = (soundFile) => {
    console.log(`http://localhost:3000/upload/url/sound/wl002/${word}.wav`);

    var sound = new Audio(soundFile);
    sound.play();
    sound.addEventListener(
      "canplaythrough",
      function () {
        sound.play();
      },
      false
    );
  };

  let scoreRener = (time) => {
    if (time >= 8) {
      return 5;
    } else if (time >= 7) {
      return 4;
    } else if (time >= 5) {
      return 3;
    } else if (time >= 3) {
      return 2;
    } else if (time >= 1) {
      return 1;
    } else {
      return 0;
    }
  };
</script>

<!-- <div class={` w-[20rem] flex justify-center items-center p-2 rounded-xl ${ansCheck === true ? 'bg-green-500' : ansCheck === false ? 'bg-rose-500' : 'bg-ec-dark-blue-4' }`}>
      <p class="text-7xl">{msg}</p>
  </div> -->

<div class="flex flex-col justify-center items-center gap-2 w-full">
  {#if msg !== undefined}
    <p>{msg}</p>
  {/if}

 
      <div class="flex justify-start items-center gap-4  w-[70rem]">
          
          <img src="../mascot.png" alt="" class="max-w-[15rem]" />
          <div class="flex justify-start h-full">
              <div class={` min-w-[35rem] h-[10rem] relative rounded-[5px] flex flex-col items-center justify-center before:contents-['']  before:absolute before:border-solid before:border-x-[1.5rem] before:border-x-red-600 before:border-x-transparent before:border-t-transparent before:border-y-[1.5rem]  before:rounded-[10px] before:bottom-0 before:left-[-20px] bg-ec-dark-blue-4 before:border-ec-dark-blue-4`}>
                     <span
                       class={`text-5xl text-ec-yellow`}>{word}</span
                     >
                     <div class={`w-full flex justify-end pr-4`}>
                       <button
                         on:click={() => {
                           playSound(
                             `http://localhost:3000/upload/url/sound/wl002/${word}.wav`
                           );
                         }}><img src="../icon/volume.png" alt="" class="w-5 h-5" /></button
                       >
                     </div>
                   </div>
          </div>
        
    </div>


        <div class="flex justify-end items-center gap-4  w-[70rem]">
      
            <div class="h-full flex flex-col justify-between items-center">
              <div class={` min-w-[35rem] h-[10rem] relative rounded-[5px] flex flex-col items-center justify-center before:contents-[''] before:absolute before:border-solid before:border-x-[1.5rem] before:border-x-red-600 before:border-x-transparent before:border-t-transparent before:border-y-[1.5rem] before:border-[#374e8a] before:rounded-[10px]  before:bottom-0 before:right-[-20px] ${ansCheck === true ? "bg-green-500 before:border-green-500" : ansCheck === false ? "bg-rose-500 before:border-rose-500" : "bg-ec-dark-blue-4 before:border-ec-dark-blue-4"}`}>
               <div class="flex gap-2"> 
                   <p
                     class={`text-5xl ${ansCheck === null ? "text-ec-yellow" : "text-white"} bg-ec-dark-blue-3 p-4 min-w-[20rem] min-h-[5rem] rounded-xl`}
                     >
                     {ShowAns === false || maxAns < 2 || ansCheck === true ? word : ''}
                 </p>
                   <button on:click={() => {ShowAns = !ShowAns}}>
                    {#if ShowAns === true}
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFC700"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg>
                    
                    {:else if ShowAns === false}
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFC700"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/></svg>
            
                    {/if}
                </button>
               </div>
                <div class={`w-full flex justify-end pr-4`}>
                  <button
                    on:click={() => {
                      playSound(
                        `http://localhost:3000/upload/url/sound/wl002/${word}.wav`
                      );
                    }}><img src="../icon/volume.png" alt="" class="w-5 h-5" /></button
                  >
                </div>
              </div>
        
              <div class="  mb-12">
                {#if ansCheck === null || (ansCheck === false && maxAns > 0)}
                  <button
                    class={`w-[4rem] h-[4rem] ${micStatus === true ? "bg-green-500" : "bg-ec-purple-600"} rounded-full flex justify-center items-center`}
                    on:click={clickToSpeck}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="64px"
                      viewBox="0 -960 960 960"
                      width="64px"
                      fill="#e8eaed"
                      ><path
                        d="M480-400q-50 0-85-35t-35-85v-240q0-50 35-85t85-35q50 0 85 35t35 85v240q0 50-35 85t-85 35Zm0-240Zm-40 520v-123q-104-14-172-93t-68-184h80q0 83 58.5 141.5T480-320q83 0 141.5-58.5T680-520h80q0 105-68 184t-172 93v123h-80Zm40-360q17 0 28.5-11.5T520-520v-240q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v240q0 17 11.5 28.5T480-480Z"
                      /></svg
                    >
                  </button>
                {/if}
              </div>
            </div>
              <img src="../mascot.png" alt="" class="max-w-[15rem]" />
      
      
        </div>
   
    

</div>
