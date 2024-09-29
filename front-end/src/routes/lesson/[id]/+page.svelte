<script>
    import { goto } from '$app/navigation';
    import 'animate.css';
    
    
	// import Conversation from './../../../lib/Learns/conversation.svelte';
	import Conver from './../../../lib/Learns/conver.svelte';
	import Echo_Word from './../../../lib/game/echo_Word.svelte';
	import Word_Guessing from './../../../lib/game/word_Guessing.svelte';
	import VocabImg from '../../../lib/Learns/vocabImg.svelte';
import VocabText from './../../../lib/Learns/vocabText.svelte';
  import axios from 'axios';
  import { onMount } from 'svelte';
    /** @type {import('./$types').PageData} */
    export let data;

    const unit = data.lesson.response[0].unit_No;
    const level = data.lesson.response[0].lesson_level

    let vocab = data.content.vocab
    let sentence = data.content.sentence
    let conversation = data.content.conversation

    console.log(conversation);
    
    

    let VocabImageCount = vocab.filter(val => val.status_image === 1).length;
    let VocabTextCount = vocab.length

    let VocabCount = VocabImageCount + VocabTextCount
    let sentenceCount = sentence.length

    let contentCount = VocabCount + (VocabTextCount*2) + (sentenceCount*2)

    let randomContent = []

    let check_count = {VocabImg:0, VocabTxt:0, sent:0, quizVocab:0, quiz_echoVocab:0, quizSent:0  }

    let cur_step = 0

    let configQuiz = {msg:undefined,ansCheck:null,maxAns:2};
    let configQuiz_2 = {msg:'',maxAns:2, nextStatus:true};

    let score = 0;  // ประกาศตัวแปรสำหรับเก็บคะแนน
    let sumScore = 0;  // ประกาศตัวแปรสำหรับเก็บคะแนน

    let xp = 0;

    let status_send;

    let setNewVocab;
    let setNewSentence;
    let noCon = 2;

    let nowContent ;



    let widthStatus = 0;
    let progress = false;
    
    const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}



    const load_lesson = () => {
        // setNewVocab = 
        shuffleArray(vocab);
        // setNewSentence = 
        shuffleArray(sentence);
        for(let i=1; i<=contentCount; i++){
        let randomType;
        let check_satatus = true;
        while(check_satatus){
            randomType = Math.floor(Math.random()*7);
            // console.log({i,randomType});
            if(randomType !== 0){
                if(randomType === 1 && check_count.VocabImg <= VocabImageCount - 1){
                    randomContent.push({index:check_count.VocabImg, name:'lesson_vocabImg'})
                    check_count.VocabImg += 1
                    break
                }
                if(randomType === 2 && check_count.VocabTxt <= VocabTextCount - 1){
                    randomContent.push({index:check_count.VocabTxt, name:'lesson_vocabTxt'})
                    check_count.VocabTxt += 1
                    break
                }
                if(randomType === 3 && check_count.sent <= sentenceCount - 1){
                    randomContent.push({index:check_count.sent, name:'lesson_sentence'})
                    check_count.sent += 1
                    break
                }

                if(randomType === 4 && check_count.quizVocab <= VocabTextCount - 1){
                    randomContent.push({index:check_count.quizVocab, name:'quiz_vocab'})
                    check_count.quizVocab += 1
                    break
                }
                if(randomType === 5 && check_count.quiz_echoVocab <= VocabTextCount - 1){
                    randomContent.push({index:check_count.quiz_echoVocab, name:'quiz_echoVocab'})
                    check_count.quiz_echoVocab += 1
                    break
                }
                if(randomType === 6 && check_count.quizSent <= sentenceCount - 1){
                    randomContent.push({index:check_count.quizSent, name:'quiz_sentence'})
                    check_count.quizSent += 1
                    break
                }
                }
            }

        
        // console.log({i,randomType});
        // console.log(randomContent);
        
        
    }
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

    const next_to = () => {
        sumScore += score
        xp += 10
        status_send = undefined
        if(cur_step === contentCount){
            cur_step = 999
            changeStatudBar();
        }else{
            configQuiz = {msg:undefined,ansCheck:null,maxAns:2};
            configQuiz_2 = {msg:'',maxAns:2, nextStatus:true}
            changeStatudBar();
            cur_step+=1;
        }
        score = 0
    }

    const check_out = async() => {
        const local = localStorage.getItem('user')
        const id = await JSON.parse(local).user_ID;
        
        if(data.status == 0){
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
        changeStatudBar();
cur_step = 999;


    }
    
    onMount(async()=>{
        
    if(!localStorage.getItem('user')){

        sessionStorage.setItem('error', 'login, please.')
        goto('/')
    }

    })
    
    
</script>

<svelte:head>
   <title>{`[ lesson ${data.lesson.response[0].lesson_ID} ] - ${data.lesson.response[0].lesson_title} | EC English Larning`}</title>
</svelte:head>

<div class="h-screen flex flex-col bg-neutral-600 justify-center items-center">
    
    {#await load_lesson()}
    ...loading
    {:then loaded } 
    <div class=" flex flex-col items-center gap-4">
        status_send = {status_send} <br>
        cur_step = {cur_step}
        <h1 class="text-3xl">lesson {unit} level {level} - {data.lesson.response[0].lesson_title}</h1>
        <div class="w-[40rem] h-4 ">
             <div class="w-full h-full bg-gray-200 rounded-full overflow-hidden">
                 <div class="w-2/12 h-full bg-ec-purple-600" class:animate={progress} style={`width:${widthStatus}%; --target-width:${widthStatus}%; --start-width:${widthStatus-((1/(randomContent.length+1))*100)}%;`}></div>
             </div>
        </div>
    </div>
    <!-- <p class="p-4 bg-violet-600">core:{sumScore}</p> -->
    
     <div class=" w-[50rem] h-[40rem] flex flex-col justify-center items-center">
         
    {#if cur_step === 999}
        congratulation 👏
        <br>score: {sumScore}
        <br>xp: {xp}
    
    {:else if cur_step < contentCount && randomContent[cur_step].name === 'lesson_vocabImg'}
        
        <VocabImg word={vocab[randomContent[cur_step].index].word_en} image_url={vocab[randomContent[cur_step].index].imageURL} sound_URL={vocab[randomContent[cur_step].index].soundURL}/>
    
    {:else if cur_step < contentCount && randomContent[cur_step].name === 'lesson_vocabTxt'}
        
        <VocabText wordEN={vocab[randomContent[cur_step].index].word_en} wordTH={vocab[randomContent[cur_step].index].word_th} sound_URL={vocab[randomContent[cur_step].index].soundURL} />
        
        {:else if cur_step < contentCount && randomContent[cur_step].name === 'lesson_sentence'}
        
        <VocabText wordEN={sentence[randomContent[cur_step].index].sen_en} wordTH={sentence[randomContent[cur_step].index].sen_th} sound_URL={sentence[randomContent[cur_step].index].sound_url}/>
        
    {:else if cur_step < contentCount && randomContent[cur_step].name === 'quiz_vocab'}
        
        <Word_Guessing word={vocab[randomContent[cur_step].index].word_en} image={vocab[randomContent[cur_step].index].imageURL} config={configQuiz_2} bind:score={score} bind:status_send={status_send} on:cur_stepComponent={handlecur_stepComponent}/>
        
    {:else if cur_step < contentCount && randomContent[cur_step].name === 'quiz_echoVocab'}
        
        <Echo_Word word={vocab[randomContent[cur_step].index].word_en} soundFile={vocab[randomContent[cur_step].index].soundURL} configQuiz={configQuiz} bind:score={score}  bind:status_send={status_send} on:cur_stepComponent={handlecur_stepComponent}/>
        
        
        
        {:else if cur_step < contentCount && randomContent[cur_step].name === 'quiz_sentence'}
        
        <Echo_Word word={sentence[randomContent[cur_step].index].sen_en} soundFile={sentence[randomContent[cur_step].index].sound_url} configQuiz={configQuiz} bind:score={score}  bind:status_send={status_send} on:cur_stepComponent={handlecur_stepComponent}/>
        
        {:else if cur_step === contentCount}
        <p>
            <Conver converData={conversation} bind:nowContent={nowContent} />
            {nowContent}
        </p>
            <!-- <Conversation data={conversation[0].conver_content} {noCon} on:updateNoCon={(event)=>{noCon = event.detail.noCon; console.log(noCon);}}  /> -->
        {/if}
</div>

{#if cur_step === 999}
    <button class="btn bg-ec-green" on:click={()=>{goto('/')}}>
        exit
    </button>
    {:else if nowContent === conversation.result.length}
        <div>
            <button class="btn bg-ec-green" on:click={()=>{status_send = false; check_out()}}>
                Next
            </button>
        </div>
    {:else if cur_step < contentCount && (randomContent[cur_step].name === 'lesson_sentence' || randomContent[cur_step].name === 'lesson_vocabTxt' || randomContent[cur_step].name === 'lesson_vocabImg') }
        <button class="btn bg-amber-300   shadow-[0px_10px_0px_0px_#d19100] text-ec-purple hover:shadow-[0px_5px_0px_0px_#fbbf24] hover:bg-amber-200" on:click={next_to}>
            Next
        </button>
    {:else if status_send === true}
    <div>
        <button class="btn bg-ec-green" on:click={()=>{status_send = false; next_to()}}>
            Next
        </button>
    </div>
    

    
    {/if}
    {/await}

</div>


<style>
    @keyframes progressAnimation {
        from { width: var(--start-width); }
        to { width: var(--target-width); }
    }


    .animate {
        animation: progressAnimation .2s forwards;
    }
</style>