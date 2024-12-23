<script>
       import { goto } from '$app/navigation';
    import 'animate.css';
    import axios from 'axios';
    import {onMount } from 'svelte';

    
    
	// import Conversation from './../../../lib/Learns/conversation.svelte';
	import Conver from './../../../lib/Learns/conver.svelte';
	import Echo_Word from './../../../lib/game/echo_Word.svelte';
	import Word_Guessing from './../../../lib/game/word_Guessing.svelte';
	import VocabImg from '../../../lib/Learns/vocabImg.svelte';
import VocabText from './../../../lib/Learns/vocabText.svelte';
  import Shuffle from '../../../lib/game/Shuffle.svelte';
  import ChioceSound from '../../../lib/game/chioceSound.svelte';
  import ChioceTxt from '../../../lib/game/chioceTxt.svelte';
    export let data;

    const unit = data.lesson.response[0].unit_No;
    const level = data.lesson.response[0].lesson_level

    let vocab = data.content.vocab
    let sentence = data.content.sentence
    let conversation = data.content.conversation

    // 

console.log(vocab,sentence);

    /* คำศัพท์มีรูป */
    let VocabImageCount = vocab.filter(val => val.status_image == 1);
    
    /* คำศัพท์ */
    let VocabText_Count = vocab.length

    /* ประโยค */
    let sentenceCount = sentence.length
    
    /* quiz 1 ประโยค */
    let quiz_sentence1 = sentence.length
    
    /* quiz 2 ประโยค */
    let quiz_sentence2 = sentence.length

    /* quiz ทายคำ */
    let Quiz_guess =  vocab.filter(val => val.word_en.length >= 3)
    
    /* quiz ช้อยรูปภาพ */
    let Quiz_choiceImg =  Math.floor(VocabText_Count / 2)
    
    /* quiz ช้อยเสียง */
    let Quiz_chioceSound =  VocabText_Count - Quiz_choiceImg
    
    /* quiz เสียง */
    let Quiz_sound =  VocabText_Count


    let contentCount = VocabImageCount.length + VocabText_Count + sentenceCount +  Quiz_sound + Quiz_chioceSound + Quiz_choiceImg + Quiz_guess.length + quiz_sentence1 + quiz_sentence2

    console.log({contentCount,VocabImageCount:VocabImageCount.length, sentenceCount, VocabText_Count, Quiz_guess:Quiz_guess.length, Quiz_choiceImg, Quiz_chioceSound, Quiz_sound, quiz_sentence1, quiz_sentence2});
    /*---------------------------------------------------------------*/
    
    let randomContent = []
    /*
    Cimg = 2
    Ctxt = all - Cimg = 4 - 2 = 2
    all = 4

    cimg = 0 - 1
    Ctxt = [Cimg] - [all - 1] = 2 - [4-1 = 3]
    */

    let check_count = {VocabImg:0, VocabTxt:0, sent:0, quiz_guess:0, quiz_echoVocab:0, Quiz_choiceImg:0, Quiz_chioceSound:Quiz_choiceImg, quiz_sentence1:0, quiz_sentence2:0}

    let cur_step = false

    let configQuiz = {msg:undefined,ansCheck:null,maxAns:2};
    let configQuiz_2 = {msg:'',maxAns:2, nextStatus:true};

    let score = 0;  // ประกาศตัวแปรสำหรับเก็บคะแนน
    let sumScore = 0;  // ประกาศตัวแปรสำหรับเก็บคะแนน

    let xp = 0;

    let status_send;
    let nowContent ;

    let widthStatus = 0;
    let progress = false;
    
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

console.log('before1: ',vocab);
const load_lesson =  () => {
    console.log('before2: ',vocab);
    vocab = shuffleArray(vocab);
    console.log('after: ',vocab);
    console.log('before_VocabImageCount: ',VocabImageCount);
    VocabImageCount = shuffleArray(VocabImageCount);
    console.log('after_VocabImageCount: ',VocabImageCount);
    sentence = shuffleArray(sentence);
        for(let i=1; i<=contentCount; i++){
        let randomType;
        let check_satatus = true;
        while(check_satatus){
            randomType = Math.floor(Math.random()*10);
            // console.log({i,randomType});
            
            if(randomType !== 0){
                // คำศัพท์ แบบมีรูป
                if(randomType === 1 && check_count.VocabImg <= VocabImageCount.length - 1){
                    randomContent.push({index:check_count.VocabImg, name:'lesson_vocabImg'})
                    check_count.VocabImg += 1
                    break
                }
                else if(randomType === 2 && check_count.VocabTxt <= VocabText_Count - 1){
                    randomContent.push({index:check_count.VocabTxt, name:'lesson_VocabText_Count'})
                    check_count.VocabTxt += 1
                    break
                }
                else if(randomType === 3 && check_count.sent <= sentenceCount - 1){
                    randomContent.push({index:check_count.sent, name:'lesson_sent'})
                    check_count.sent += 1
                    break
                }
                else if(randomType === 4 && check_count.quiz_guess <= Quiz_guess.length - 1){
                    randomContent.push({index:check_count.quiz_guess, name:'quiz_guess'})
                    check_count.quiz_guess += 1
                    break
                }
                else if(randomType === 5 && check_count.quiz_echoVocab <= Quiz_sound - 1){
                    randomContent.push({index:check_count.quiz_echoVocab, name:'quiz_echoVocab'})
                    check_count.quiz_echoVocab += 1
                    break
                }
                else if(randomType === 6 && check_count.Quiz_choiceImg <= Quiz_choiceImg - 1){
                    randomContent.push({index:check_count.Quiz_choiceImg, name:'Quiz_choiceImg'})
                    check_count.Quiz_choiceImg += 1
                    break
                }
                else if(randomType === 7 && check_count.Quiz_chioceSound <= VocabText_Count - 1){
                    randomContent.push({index:check_count.Quiz_chioceSound, name:'Quiz_chioceSound'})
                    check_count.Quiz_chioceSound += 1
                    break
                }
                else if(randomType === 8 && check_count.quiz_sentence1 <= quiz_sentence1 - 1){
                    randomContent.push({index:check_count.quiz_sentence1, name:'quiz_sentence1'})
                    check_count.quiz_sentence1 += 1
                    break
                }
                else if(randomType === 9 && check_count.quiz_sentence2 <= quiz_sentence2 - 1){
                    randomContent.push({index:check_count.quiz_sentence2, name:'quiz_sentence2'})
                    check_count.quiz_sentence2 += 1
                    break
                }
                else if(randomType === 10){
                    randomContent.push('error')
                    break
                }
                
                // break
                }
            }
        
        
    }



    console.log('randomContent',randomContent);
    
    randomContent = shuffleArray(randomContent);
    
    }

const next_to = () => {
         sumScore += score
        xp += 10
        status_send = undefined
    if(cur_step === contentCount){
        cur_step = true
        changeStatudBar()
    }else{
        configQuiz = {msg:undefined,ansCheck:null,maxAns:2};
        configQuiz_2 = {msg:'',maxAns:2, nextStatus:true}
        if(cur_step === false){
            cur_step = 0
        }else{
            cur_step += 1
            changeStatudBar()
        }
        if(randomContent[cur_step].name === 'lesson_sent' ){
            playSound(sentence[randomContent[cur_step].index].sound_url)
        }else if(randomContent[cur_step].name == 'lesson_vocabImg'){
            playSound(VocabImageCount[randomContent[cur_step].index].soundURL)
        }else if(randomContent[cur_step].name == 'lesson_VocabText_Count')
        playSound(vocab[randomContent[cur_step].index].soundURL)
    }
    score = 0
}

let changeStatudBar = ()=>{
        progress = false;
        // ทำให้แอนิเมชันเล่นใหม่โดยการรีเซ็ตค่า `progress`
        setTimeout(() => {
            progress = true;
        }, 0);

        widthStatus += ((1/(contentCount+1))*100); 
    }

    function handlecur_stepComponent() {
    next_to()
  }
  const check_out = async() => {
        const local = localStorage.getItem('user')
        const id = await JSON.parse(local).user_ID;

        console.log(data.status);
        
        
        if(data.status == 'false'){
            // const next_level
            const next_unit = level == 4 ? parseInt(unit) + 1 : unit
            const next_level = level == 4 ? 1 : parseInt(level) + 1
            const next_lesson = `${next_unit}-${next_level}`
            console.log(next_lesson);     
            const enroll_lesson = await axios.post(`https://api-ecproject.poommer.in.th/api/lessons/enroll/`,{
    lesson_ID:next_lesson, 
    user_ID:id
})       
            const updateStatus_lesson = await axios.patch(`https://api-ecproject.poommer.in.th/api/lessons/enroll/`,{
    lesson_ID:data.lesson.response[0].lesson_ID, 
    user_ID:id
})       
        }else{
            xp = Math.floor(xp /= 2)
            sumScore = Math.floor(sumScore /= 2)
        }
        


        const saveXP = await axios.post(`https://api-ecproject.poommer.in.th/api/user/${id}/xp/1/`,{
            amount:xp, 
            description:"earned from lesson"
})
const saveCoin = await axios.post(`https://api-ecproject.poommer.in.th/api/user/${id}/coin/1/`,{
            amount:sumScore, 
            description:"earned from lesson"
        })
        next_to();
        changeStatudBar();
// cur_step = 999;


    }
    
    onMount(async()=>{
        
    if(!localStorage.getItem('user')){

        sessionStorage.setItem('error', 'login, please.')
        goto('/')
    }

    })

    const playSound = (url) =>{
    var sound = new Audio(url);
    sound.play();
    sound.addEventListener('canplaythrough', function() {
        sound.play();
    }, false);
}



    
</script>
<svelte:head>
   <title>{`[ lesson ${data.lesson.response[0].lesson_ID} ] - ${data.lesson.response[0].lesson_title} | EC English Larning`}</title>
</svelte:head>

<div class="h-screen flex flex-col bg-neutral-600 justify-center items-center">

{#await load_lesson()}
    loading....
{:then loaded} 
<div class=" flex flex-col items-center gap-4">
    status_send = {status_send} <br>
    cur_step = {cur_step}
    <h1 class="text-3xl">lesson {unit} level {level} - {data.lesson.response[0].lesson_title}</h1>
    <div class="w-[40rem] h-4 ">
         <div class="w-full h-full bg-gray-200 rounded-full overflow-hidden">
             <div class=" w-2/12 h-full bg-ec-purple-600 ease-out duration-75" class:animate={progress} style={`width:${widthStatus}%; --target-width:${widthStatus}%; --start-width:${widthStatus-((1/(randomContent.length+1))*100)}%;`}></div>
         </div>
    </div>
</div>
<!-- <p class="p-4 bg-violet-600">core:{sumScore}</p> -->

 <div class=" w-[50rem] h-[40rem] flex flex-col justify-center items-center">
     
{cur_step}
    {#if cur_step === true}
        <p>end</p>
        <p>score: {sumScore}</p>
        <p>xp: {xp}</p>
    {:else if cur_step === false}
        <p>start</p>

    {:else if cur_step < contentCount && randomContent[cur_step].name == 'lesson_vocabImg'}
    <VocabImg word={VocabImageCount[randomContent[cur_step].index].word_en} image_url={VocabImageCount[randomContent[cur_step].index].imageURL} sound_URL={VocabImageCount[randomContent[cur_step].index].soundURL}/>
    {:else if cur_step < contentCount && randomContent[cur_step].name == 'lesson_VocabText_Count'}
    <VocabText wordEN={vocab[randomContent[cur_step].index].word_en} wordTH={vocab[randomContent[cur_step].index].word_th} sound_URL={vocab[randomContent[cur_step].index].soundURL} />
    {:else if cur_step < contentCount && randomContent[cur_step].name == 'lesson_sent'}
    <VocabText wordEN={sentence[randomContent[cur_step].index].sen_en} wordTH={sentence[randomContent[cur_step].index].sen_th} sound_URL={sentence[randomContent[cur_step].index].sound_url}/>
    {:else if cur_step < contentCount && randomContent[cur_step].name == 'quiz_guess'}
    <Word_Guessing word={vocab[randomContent[cur_step].index].word_en} image={vocab[randomContent[cur_step].index].imageURL} config={configQuiz_2} bind:score={score} bind:status_send={status_send} on:cur_stepComponent={handlecur_stepComponent}/>
    {:else if cur_step < contentCount && randomContent[cur_step].name == 'quiz_echoVocab'}
    <Echo_Word word={vocab[randomContent[cur_step].index].word_en} soundFile={vocab[randomContent[cur_step].index].soundURL} configQuiz={configQuiz} bind:score={score}  bind:status_send={status_send} on:cur_stepComponent={handlecur_stepComponent}/>
    {:else if cur_step < contentCount && randomContent[cur_step].name == 'Quiz_choiceImg'}
    <ChioceTxt config={configQuiz_2} word={vocab[randomContent[cur_step].index].word_en} word_th={vocab[randomContent[cur_step].index].word_th} bind:score={score} bind:status_send={status_send} on:cur_stepComponent={handlecur_stepComponent}  />
    {:else if cur_step < contentCount && randomContent[cur_step].name == 'Quiz_chioceSound'}
    <ChioceSound config={configQuiz_2} word={vocab[randomContent[cur_step].index].word_en} bind:score={score} bind:status_send={status_send} on:cur_stepComponent={handlecur_stepComponent} />
    {:else if cur_step < contentCount && randomContent[cur_step].name == 'quiz_sentence1'}
    <Echo_Word word={sentence[randomContent[cur_step].index].sen_en} soundFile={sentence[randomContent[cur_step].index].sound_url} configQuiz={configQuiz} bind:score={score}  bind:status_send={status_send} on:cur_stepComponent={handlecur_stepComponent}/>
    {:else if cur_step < contentCount && randomContent[cur_step].name == 'quiz_sentence2'}
    <Shuffle config={configQuiz_2} word={sentence[randomContent[cur_step].index].sen_en} bind:score={score} bind:status_send={status_send} on:cur_stepComponent={handlecur_stepComponent} />
    {:else if cur_step === contentCount }
    <Conver converData={conversation} bind:nowContent={nowContent} />

    {/if}    

    <div class="mt-4">
        {#if cur_step === true}
        <button class="btn bg-ec-green" on:click={()=>{goto('/')}}>
            exit
        </button>
        {:else if cur_step === false}
        <button class="btn bg-amber-300   shadow-[0px_10px_0px_0px_#d19100] text-ec-purple hover:shadow-[0px_5px_0px_0px_#fbbf24] hover:bg-amber-200" on:click={next_to}>
            start
        </button>
        {:else if cur_step < contentCount && (randomContent[cur_step].name === 'lesson_vocabImg' || randomContent[cur_step].name === 'lesson_VocabText_Count' || randomContent[cur_step].name === 'lesson_sent') }
        <button class="btn bg-amber-300   shadow-[0px_10px_0px_0px_#d19100] text-ec-purple hover:shadow-[0px_5px_0px_0px_#fbbf24] hover:bg-amber-200" on:click={next_to}>
            Next
        </button>
        {:else if nowContent == conversation.result.length}
            <div>
                <button class="btn bg-ec-green" on:click={()=>{check_out()}}>
                    send
                </button>
            </div>
        <button  on:click={cur_step === true ? '' : next_to}>next</button>
        
        {:else if status_send === true}
        <div>
            <button class="btn bg-ec-green" on:click={()=>{status_send = false; next_to()}}>
                Next 
            </button>
        </div>
       
        {/if}
    </div>
   
    </div>
{/await}
</div>