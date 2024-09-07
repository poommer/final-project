<script>
	import Conversation from './../../../lib/Learns/conversation.svelte';
	import Echo_Word from './../../../lib/game/echo_Word.svelte';
	import Word_Guessing from './../../../lib/game/word_Guessing.svelte';
	import VocabImg from '../../../lib/Learns/vocabImg.svelte';
import VocabText from './../../../lib/Learns/vocabText.svelte';
    /** @type {import('./$types').PageData} */
    export let data;
    console.log(data);

    let vocab = data.content.vocab
    let sentence = data.content.sentence
    let conversation = data.content.conversation

    let VocabImageCount = vocab.filter(val => val.status_image === 1).length;
    let VocabTextCount = vocab.length

    let VocabCount = VocabImageCount + VocabTextCount
    let sentenceCount = sentence.length

    let contentCount = VocabCount + (VocabTextCount*2) + (sentenceCount*2)

    let randomContent = []

    let check_count = {VocabImg:0, VocabTxt:0, sent:0, quizVocab:0, quiz_echoVocab:0, quizSent:0  }

    let cur_step = 0

    let configQuiz = {msg:undefined,ansCheck:null,maxAns:2};

    let score = 0;  // ประกาศตัวแปรสำหรับเก็บคะแนน
    let sumScore = 0;  // ประกาศตัวแปรสำหรับเก็บคะแนน

    // const SumScore = (score) => {
    //     score += event.detail.score;  // รับค่า score จาก event
    //     console.log('Updated score:', score);
    // };



    let load_lesson = () => {
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

    let next_to = () => {
        sumScore += score
        if(cur_step === contentCount){
            cur_step = true
        }else{
            console.log('before:', configQuiz);
            configQuiz = {msg:undefined,ansCheck:null,maxAns:2};
            console.log('After:', configQuiz);
            cur_step+=1;
        }
        score = 0
    }
    // console.log({VocabCount, sentenceCount, contentCount});
    


    
    
    
</script>

<div class="h-screen flex flex-col bg-neutral-600 justify-center items-center">
    <h1 class="text-5xl">Welcome to lesson</h1>
   
    {#await load_lesson()}
        ...loading
    {:then loaded } 
    <p class="p-4 bg-violet-600">{cur_step}</p>
    <p class="p-4 bg-violet-600">core:{sumScore}</p>
    
     <div class=" w-[50rem] h-[40rem] flex flex-col justify-center items-center">
    {#if cur_step === true}
        congratulation 👏
    
    {:else if cur_step < contentCount && randomContent[cur_step].name === 'lesson_vocabImg'}
        {randomContent[cur_step].name}
        <VocabImg word={vocab[randomContent[cur_step].index].word_en} image_url={vocab[randomContent[cur_step].index].imageURL} sound_URL={vocab[randomContent[cur_step].index].soundURL}/>
    
    {:else if cur_step < contentCount && randomContent[cur_step].name === 'lesson_vocabTxt'}
        {randomContent[cur_step].name}
        <VocabText wordEN={vocab[randomContent[cur_step].index].word_en} wordTH={vocab[randomContent[cur_step].index].word_th} sound_URL={vocab[randomContent[cur_step].index].soundURL} />
        
        {:else if cur_step < contentCount && randomContent[cur_step].name === 'lesson_sentence'}
        {randomContent[cur_step].name}
        <VocabText wordEN={sentence[randomContent[cur_step].index].sen_en} wordTH={sentence[randomContent[cur_step].index].sen_th} sound_URL={vocab[randomContent[cur_step].index].soundURL}/>
        
    {:else if cur_step < contentCount && randomContent[cur_step].name === 'quiz_vocab'}
        {randomContent[cur_step].name}
        <Word_Guessing word={vocab[randomContent[cur_step].index].word_en} bind:score={score}/>
    
        
    {:else if cur_step < contentCount && randomContent[cur_step].name === 'quiz_echoVocab'}
        {randomContent[cur_step].name}
        <Echo_Word word={vocab[randomContent[cur_step].index].word_en} soundFile={vocab[randomContent[cur_step].index].soundURL} configQuiz={configQuiz} bind:score={score} />
        
        
        
        {:else if cur_step < contentCount && randomContent[cur_step].name === 'quiz_sentence'}
        {randomContent[cur_step].name}
        <Echo_Word word={sentence[randomContent[cur_step].index].sen_en} soundFile={vocab[randomContent[cur_step].index].soundURL} configQuiz={configQuiz} bind:score={score} />
        
        {:else if cur_step === contentCount}
        conversation
        {/if}
</div>
    {/await}

    <button class="btn bg-amber-300" on:click={next_to}>
        Next
    </button>

</div>