<script>
	import { goto } from '$app/navigation';
     import Conver from './../../../lib/Learns/conver.svelte';
 import Echo_Word from './../../../lib/game/echo_Word.svelte';
 import Word_Guessing from './../../../lib/game/word_Guessing.svelte';
 import VocabImg from '../../../lib/Learns/vocabImg.svelte';
import VocabText from './../../../lib/Learns/vocabText.svelte';
import Shuffle from '../../../lib/game/Shuffle.svelte';
import ChioceSound from '../../../lib/game/chioceSound.svelte';
import ChioceTxt from '../../../lib/game/chioceTxt.svelte';
  import QAndA from '../../../lib/game/qAndA.svelte';
  import axios from 'axios';
  import Summary from '../../../lib/component/summary.svelte';
    export let data;
    console.log(data);

    let content = data.content.result.content
    let typeGame = data.content.result.quizDetail[0].quiz_type.split(' ')
    let time = data.content.result.quizDetail[0].quiz_timer
    // let time = 5
    console.log(typeGame);
    

    let check_count = {}
    let contentCount = 0

    let randomContent = []

    let cur_step = false

    let count_TF = {T:0, F:0}

    let configQuiz = {msg:undefined,ansCheck:null,maxAns:99, timeLeft:10};
    let configQuiz_2 = {msg:'',maxAns:1, nextStatus:true};

    let score = 0;  // ประกาศตัวแปรสำหรับเก็บคะแนน
    let sumScore = 0;  // ประกาศตัวแปรสำหรับเก็บคะแนน

    let xp = 0;

    let health = data.content.result.quizDetail[0].quiz_Health ;
    let health_UI = []

    let status_send;
    let nowContent ;

    let widthStatus = 0;
    let progress = false;

    let skill_save = [{
        Reading:{ received:0, full:0 },
        Listening:{ received:0, full:0},
        Speaking:{ received:0, full: 0 },
        Writing:{ received:0, full: 0 },
        vocab:{ received:0, full: 0, vocab_learning:content.length  },
        grammar:{ received:0, full: 0 }
    }]

    const shuffleArray = (array) => {
     
        for(let r = 1; r<=3; r++){
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        return array;
}

    const load_data = async () => {
        typeGame.forEach(item => {
            // check_count[item] = 0
            contentCount += data.content.result.quizDetail[0].quiz_qty
            if(item === 'Guessing'){
                skill_save[0].Writing.full += contentCount*5
                skill_save[0].vocab.full += contentCount*5
            }else if(item === 'Echo_Word'){
                skill_save[0].Reading.full += contentCount*5
                skill_save[0].vocab.full += contentCount*5
            }else if(item === 'Match_sound'){
                skill_save[0].Listening.full += contentCount*5
                skill_save[0].vocab.full += contentCount*5
            }else if(item === 'Pick_sound_for_word'){
                skill_save[0].Listening.full += contentCount*5
                skill_save[0].vocab.full += contentCount*5
            }else if(item === 'grammar'){
                skill_save[0].Writing.full += contentCount*5
                skill_save[0].grammar.full += contentCount*5
            }
        });

        content = shuffleArray(content);
        console.log(content);

        for(let i = 0; i<contentCount;i++){
            randomContent.push(content[i])
            
        }

        for(let i = 0; i<health; i++){
            health_UI.push(i)
        }
    
        
        console.log(health_UI);
        console.log(randomContent);
    }


    const next_to = () => {
        score = Math.floor(score /= 5)
        sumScore += score
        xp += 5
        status_send = undefined

        
       

        configQuiz = {msg:undefined,ansCheck:null,maxAns:99, timeLeft:10};
        configQuiz_2 = {msg:'',maxAns:1, nextStatus:true};
     
        if(cur_step === contentCount-1){
            cur_step = true
            widthStatus = 100
        }else{
            configQuiz = {msg:undefined,ansCheck:null,maxAns:99, timeLeft:10};
            configQuiz_2 = {msg:'',maxAns:1, nextStatus:true}
            if(cur_step === false){
                cur_step = 0
                startCountdown()
            }else{ 
                if (score < 1) {
    // ผู้ใช้ตอบผิด
    count_TF.F += 1;
    health -= 1;
    if (health < 1) {
        cur_step = true;
        widthStatus = 100;
        health = 0;
        changeStatudBar();
        check_out();
        return;
    }
} else {
    // ผู้ใช้ตอบถูก
    count_TF.T += 1;
}

                cur_step += 1
                changeStatudBar()
            }
            typeGame.forEach(item => {
                if(item === 'Guessing'){
                    skill_save[0].Writing.received += score
                    skill_save[0].vocab.received += score
                }else if(item === 'Echo_Word'){
                    skill_save[0].Reading.received += score
                    skill_save[0].vocab.received += score
                }else if(item === 'Match_sound'){
                    skill_save[0].Listening.received += score
                    skill_save[0].vocab.received += score
                }else if(item === 'Pick_sound_for_word'){
                    skill_save[0].Listening.received += score
                    skill_save[0].vocab.received += score
                }else if(item === 'grammar'){
                    skill_save[0].Writing.received += score
                    skill_save[0].grammar.received += score
                }
                })

                    score = 0
        }

 console.log(score);
 console.log(skill_save);
 
}

let changeStatudBar = ()=>{
     progress = false;
     // ทำให้แอนิเมชันเล่นใหม่โดยการรีเซ็ตค่า `progress`
     setTimeout(() => {
         progress = true;
     }, 0);

     widthStatus += ((1/(contentCount))*100); 
 }

 function handlecur_stepComponent() {
    
    configQuiz = {msg:undefined,ansCheck:null,maxAns:99, timeLeft:10};
    configQuiz_2 = {msg:'',maxAns:2, nextStatus:true};
 next_to()
}


    let minutes, seconds;
  let interval;

  const startCountdown = () => {
    interval = setInterval(() => {
      if (time > 0) {
        time--;
      } else {
        clearInterval(interval);
        widthStatus = 100
        changeStatudBar()
        cur_step = true
      }
    }, 1000);
  };

 
    
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

const check_out = async () => {
    clearInterval(interval);
    const local = localStorage.getItem('user')
     const id = await JSON.parse(local).user_ID;
    const response_play = await axios.post(`https://api-ecproject.poommer.in.th/api/quiz/${id}/play/${data.content.result.quizDetail[0].quiz_id}`);
    const response_coin = await axios.post(`https://api-ecproject.poommer.in.th/api/user/${id}/coin/1/`,{
        "amount":sumScore, 
        "description":`earned from quiz [name:${typeGame[0]}]`
    });
    const response_xp = await axios.post(`https://api-ecproject.poommer.in.th/api/user/${id}/xp/1/`,{
        "amount":xp, 
        "description":`earned from quiz [name:${typeGame[0]}]`
    });
    const response_skill = await axios.post(`https://api-ecproject.poommer.in.th/api/user/${id}/statistic`,{
        "skill":skill
    });
    console.log(response_play.data);
    console.log(response_coin.data);
    console.log(response_xp.data);

    widthStatus = 100
    cur_step = true
    
}

 $: minutes = Math.floor(time / 60);
  $: seconds = time % 60;

  $: displayTime = `${String(minutes).padStart(1, '0')}:${String(seconds).padStart(2, '0')}`;
    
</script>

<svelte:head>
<title>{`${data.content.result.quizDetail[0].quiz_name} | EC English Larning`}</title>
</svelte:head>

<div class="h-screen flex flex-col bg-neutral-600 justify-center items-center">

{#await load_data()}
    loading...
{:then loaded } 
    <!-- {health} -->
     <div class="w-full h-screen flex flex-col items-center justify-between">
         <div class="w-full flex flex-col items-center gap-4 mt-6 ">
             <div class="w-[70%] flex items-center justify-between bg-indigo-800 p-2 rounded-xl">
                 <div class="flex items-center  gap-2">
                     <a class="bg-white rounded-lg" href="/quiz">
                         <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 0 24 24" width="40px" fill="#ff2424"><path d="M0 0h24v24H0V0z" fill="none" opacity=".87"/><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm4.3 14.3c-.39.39-1.02.39-1.41 0L12 13.41 9.11 16.3c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41L10.59 12 7.7 9.11c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L12 10.59l2.89-2.89c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41L13.41 12l2.89 2.89c.38.38.38 1.02 0 1.41z"/></svg>
                     </a>
                     <h1 class="text-5xl text-ec-yellow">{data.content.result.quizDetail[0].quiz_name}</h1>
                 </div>
                 <div class="flex gap-2">
                     <div class="flex items-center justify-center gap-2 bg-ec-dark-blue-1 p-2 w-[12rem] rounded-full">
                       {#each health_UI as item }
                       {#if (health >= 1 && item === 0 ) || (health >= 2 && item === 1 ) || (health === 3 && item === 2 )  }
                       <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#ff2424">
                        <path d="M0 0h24v24H0V0z" fill="none"/>
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    {:else if (health < 3 && item === 2 ) || (health < 2  && item === 1 ) || (health === 0  && item === 0 )}
                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="48px" viewBox="0 0 24 24" width="48px" fill="#D9D9D9">
                        <g><rect fill="none" height="24" width="24"/></g><g><path d="M16.5,3c-0.96,0-1.9,0.25-2.73,0.69L12,9h3l-3,10l1-9h-3l1.54-5.39C10.47,3.61,9.01,3,7.5,3C4.42,3,2,5.42,2,8.5 c0,4.13,4.16,7.18,10,12.5c5.47-4.94,10-8.26,10-12.5C22,5.42,19.58,3,16.5,3z M10.24,16.73C6.45,13.34,4,11,4,8.5 C4,6.54,5.54,5,7.5,5c0.59,0,1.19,0.15,1.73,0.42L7.35,12h3.42L10.24,16.73z M15.13,15.53L17.69,7h-2.91l0.61-1.82 C15.75,5.06,16.13,5,16.5,5C18.46,5,20,6.54,20,8.5C20,10.71,17.98,12.93,15.13,15.53z"/></g>
                    </svg>
                    {/if}
        
                       {/each}
                    </div>
     
                    <div class="flex items-center justify-center gap-2 bg-ec-dark-blue-1 p-2 w-[10rem] rounded-full text-4xl">
                     <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 0 24 24" width="40px" fill="#ffc700"><path d="M-618-568H782v3600H-618zM0 0h24v24H0z" fill="none"/><path d="M22 5.7l-4.6-3.9-1.3 1.5 4.6 3.9L22 5.7zM7.9 3.4L6.6 1.9 2 5.7l1.3 1.5 4.6-3.8zM12.5 8H11v6l4.7 2.9.8-1.2-4-2.4V8zM12 4c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 16c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7z"/></svg>
                     {displayTime}
                    </div>
                 </div>
             </div>
             <div class="w-[40rem] h-4 flex items-center justify-center">
                  <div class="w-full h-full bg-gray-200 rounded-full overflow-hidden shadow-[1px_1px_5px_4px_#ff2bff]">
                      <div class=" w-2/12 h-full bg-ec-purple-600 ease-out duration-75" class:animate={progress} style={`width:${widthStatus}%; --target-width:${widthStatus}%; --start-width:${widthStatus-((1/(randomContent.length+1))*100)}%;`}></div>
                  </div>
                 </div>
                
            </div>
     
            <div class="w-full h-[80vh] flex flex-col items-center ">
                <div class=" w-[50rem] h-[40rem] flex flex-col justify-center items-center ">
         
                 {#if cur_step === true}
                     <!-- <p>end</p> -->
                     <Summary count_TF={count_TF} time={data.content.result.quizDetail[0].quiz_timer - time} xp={xp} sumScore={sumScore} quizName={data.content.result.quizDetail[0].quiz_name} />
                 {:else if cur_step === false}
                     <p>start</p>
                
                 {:else if cur_step < contentCount && typeGame[0] == 'Guessing'}
                 <Word_Guessing word={content[cur_step].word_en} image={content[cur_step].imageURL} config={configQuiz_2} bind:score={score} bind:status_send={status_send} on:cur_stepComponent={handlecur_stepComponent}/>
                 {:else if cur_step < contentCount && typeGame[0] == 'Echo_Word'}
                 <Echo_Word word={content[cur_step].word_en} soundFile={content[cur_step].soundURL} configQuiz={configQuiz} bind:score={score}  bind:status_send={status_send} on:cur_stepComponent={handlecur_stepComponent}/>
                 {:else if cur_step < contentCount && typeGame[0] == 'Pick_sound_for_word'}
                 <ChioceTxt config={configQuiz_2} word={content[cur_step].word_en} word_th={content[cur_step].word_th} bind:score={score} bind:status_send={status_send} on:cur_stepComponent={handlecur_stepComponent}  />
                 {:else if cur_step < contentCount && typeGame[0] == 'Match_sound'}
                 <ChioceSound config={configQuiz_2} word={content[cur_step].word_en} chioce={shuffleArray(getThreeItems(content, content[cur_step].word_en))} bind:score={score} bind:status_send={status_send} on:cur_stepComponent={handlecur_stepComponent} />
                 <!-- {:else if cur_step < contentCount && typeGame[0] == 'quiz_sentence1'}
                 <Echo_Word word={sentence[randomContent[cur_step].index].sen_en} soundFile={sentence[randomContent[cur_step].index].sound_url} configQuiz={configQuiz} bind:score={score}  bind:status_send={status_send} on:cur_stepComponent={handlecur_stepComponent}/>
                 {:else if cur_step < contentCount && typeGame[0] == 'quiz_sentence2'}
                 <Shuffle config={configQuiz_2} word={sentence[randomContent[cur_step].index].sen_en} bind:score={score} bind:status_send={status_send} on:cur_stepComponent={handlecur_stepComponent} />
                 {:else if cur_step >= contentCount - 2 && randomContent[cur_step-1].name == 'Quiz_conver'}
                 <QAndA configQuiz={configQuiz} conversation={randomContent[cur_step-1].content} bind:score={score} bind:status_send={status_send} on:cur_stepComponent={handlecur_stepComponent}/> -->
                
               
                 {/if}    
                
                 <div class="mt-4">
                     {#if cur_step === true}
                     <button class="btn bg-ec-green" on:click={()=>{goto('/quiz')}}>
                         exit
                     </button>
                     {:else if cur_step === false}
                     <button class="btn bg-amber-300   shadow-[0px_10px_0px_0px_#d19100] text-ec-purple hover:shadow-[0px_5px_0px_0px_#fbbf24] hover:bg-amber-200" on:click={next_to}>
                         start
                     </button>
                     {:else if cur_step === contentCount-1 && status_send === true}
                         <div>
                             <button class="btn bg-ec-green" on:click={()=>{check_out()}}>
                                 send
                             </button>
                         </div>
                     
                     {:else if status_send === true}
                     <div>
                         <button class="btn bg-ec-green" on:click={()=>{status_send = false; next_to()}}>
                             Next 
                         </button>
                     </div>
                    
                     {/if}
                 </div>
                
                 </div>
            </div>
    </div>

{/await}

</div>
