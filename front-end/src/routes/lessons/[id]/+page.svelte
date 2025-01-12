<script>
	import Word_Guessing from './../../../lib/qiuz/word_Guessing.svelte';
	import Button from './../../../lib/components/button.svelte';
	import Listen from './../../../lib/qiuz/listen.svelte';
	import { page } from '$app/stores';
  import axios from "axios";
  import { name, set_progressLesson } from '../../../store/lesson';
  import EchoWord from '../../../lib/qiuz/echo_Word.svelte';
  import WordGuessing from '../../../lib/qiuz/word_Guessing.svelte';
  import Read from '../../../lib/qiuz/read.svelte';
  import Writing from '../../../lib/qiuz/writing.svelte';
  let lesson ;
  let content = [] ;
  let choice_Listen ;
  let Ans = '' ;
  let coin = 0 ;
  let score = 0 ;
  let statusNext ;

  let configEcho = {msg:'', ansCheck:false, maxAns:2, timeLeft:10, micStatus:false, NextWord:true} ;
  const load_data = async() => {
        const id = $page.url.pathname.split('/')[2];

        const respone_title = await axios(`https://api-ecproject.poommer.in.th/api/lessons/topic/${id.split('-')[0]}`);
        const nameLesson = respone_title.data.response.filter(value=>value.lesson_ID == id)[0].lesson_title;
        name.set(nameLesson)
        return load_lesson(id)
    }
    
    const load_lesson = async (id) => {
    const respone = await axios(`https://api-ecproject.poommer.in.th/api/lessons/detail/${id}`);
    lesson = respone.data
    $set_progressLesson[0].qty = lesson.vocab.length
    $set_progressLesson[1].qty = lesson.vocab.length
    $set_progressLesson[2].qty = lesson.vocab.length
    $set_progressLesson[3].qty = lesson.sentence.length
    $set_progressLesson[4].qty = lesson.sentence.length
    // $set_progressLesson[2].qty = 10
    // $set_progressLesson[3].qty = lesson.sentence.length*3
    // $set_progressLesson[0].progress = 0
    content.push({type:'lesson', data:lesson.vocab});
    content.push({type:'sentence', data:lesson.sentence});

    console.log(content);
    choice_Listen = content[0].data
}

    const next_page = ()=>{
        if($set_progressLesson[0].progress < 99){
            set_progressLesson.update(values => {
                // อัปเดตเฉพาะ index 0
                values[0].progress += (100/values[0].qty);
                return values; // คืนค่า array เดิมที่ถูกปรับปรุงแล้ว
            });
            choice_Listen = content[0].data
            Ans = '';
            coin += score;
            configEcho = {msg:'', ansCheck:false, maxAns:2, timeLeft:10, micStatus:false, NextWord:true};
        }
        else if($set_progressLesson[1].progress < 99){
            set_progressLesson.update(values => {
                // อัปเดตเฉพาะ index 0
                values[1].progress += (100/values[1].qty);
                return values; // คืนค่า array เดิมที่ถูกปรับปรุงแล้ว
            });
            choice_Listen = content[0].data
            Ans = '';
            coin += score;
            configEcho = {msg:'', ansCheck:false, maxAns:2, timeLeft:10, micStatus:false, NextWord:true};
        }
        else if($set_progressLesson[2].progress < 99){
            set_progressLesson.update(values => {
                // อัปเดตเฉพาะ index 0
                values[2].progress += (100/values[2].qty);
                return values; // คืนค่า array เดิมที่ถูกปรับปรุงแล้ว
            });
            choice_Listen = content[0].data
            Ans = '';
            coin += score;
            configEcho = {msg:'', ansCheck:false, maxAns:2, timeLeft:10, micStatus:false, NextWord:true};
        }

        else if($set_progressLesson[3].progress < 99){
            set_progressLesson.update(values => {
                // อัปเดตเฉพาะ index 0
                values[3].progress += (100/values[3].qty);
                return values; // คืนค่า array เดิมที่ถูกปรับปรุงแล้ว
            });
            choice_Listen = content[1].data
            Ans = '';
            coin += score;
            configEcho = {msg:'', ansCheck:false, maxAns:2, timeLeft:10, micStatus:false, NextWord:true};
        }
        else if($set_progressLesson[4].progress < 99){
            set_progressLesson.update(values => {
                // อัปเดตเฉพาะ index 0
                values[4].progress += (100/values[4].qty);
                return values; // คืนค่า array เดิมที่ถูกปรับปรุงแล้ว
            });
            choice_Listen = content[1].data
            Ans = '';
            coin += score;
            configEcho = {msg:'', ansCheck:false, maxAns:2, timeLeft:10, micStatus:false, NextWord:true};
        }
        score = 0
        statusNext = false
    }
    
</script>


    <!-- <h1>lesson</h1> -->
    {#await load_data()}
        loading Please Wait....
    {:then} 
    coin:{coin} <br>
    score:{score}
        {#if Math.round($set_progressLesson[0].progress) < 99}
            <h1 class="text-3xl">Vocab</h1>
            <EchoWord
            word={content[0].data[Math.round(($set_progressLesson[0].progress/100)*$set_progressLesson[0].qty) ]}
            configQuiz={configEcho}
            bind:score
            bind:statusNext
            />
            <!-- {#if Math.round(($set_progressLesson[0].progress/100)*$set_progressLesson[0].qty) < content[0].data.length}                 
            {:else if Math.round((($set_progressLesson[0].progress/100)*$set_progressLesson[0].qty) >= 99 && ($set_progressLesson[1].progress/100)*$set_progressLesson[1].qty) < content[0].data.length}
 
            {:else if Math.round((($set_progressLesson[1].progress/100)*$set_progressLesson[1].qty) >= 99 && ($set_progressLesson[2].progress/100)*$set_progressLesson[2].qty) < content[0].data.length}
                <WordGuessing
                config={configEcho}
                bind:score
                bind:statusNext
                imageURL={content[0].data[Math.round(($set_progressLesson[0].progress/100)*$set_progressLesson[0].qty) - (content[0].data.length*2)].imageURL}
                urlSound={content[0].data[Math.round(($set_progressLesson[0].progress/100)*$set_progressLesson[0].qty) - (content[0].data.length*2)].soundURL}
                word={content[0].data[Math.round(($set_progressLesson[0].progress/100)*$set_progressLesson[0].qty) - (content[0].data.length*2)].word_en}
                word_TH={content[0].data[Math.round(($set_progressLesson[0].progress/100)*$set_progressLesson[0].qty) - (content[0].data.length*2)].word_th}
                />
            {:else}
                not
            {/if} -->
        
        {:else if Math.round($set_progressLesson[1].progress) < 100 && $set_progressLesson[2].progress === 0}
        <Listen 
        vocab={choice_Listen} 
        word={content[0].data[Math.round(($set_progressLesson[1].progress/100)*$set_progressLesson[1].qty)]}
        bind:Ans
        bind:score
        bind:statusNext
        />

        {:else if Math.round($set_progressLesson[2].progress) < 100 && $set_progressLesson[3].progress === 0}
            <WordGuessing
                config={configEcho}
                bind:score
                bind:statusNext
                imageURL={content[0].data[Math.round(($set_progressLesson[2].progress/100)*$set_progressLesson[2].qty)].imageURL}
                urlSound={content[0].data[Math.round(($set_progressLesson[2].progress/100)*$set_progressLesson[2].qty)].soundURL}
                word={content[0].data[Math.round(($set_progressLesson[2].progress/100)*$set_progressLesson[2].qty)].word_en}
                word_TH={content[0].data[Math.round(($set_progressLesson[2].progress/100)*$set_progressLesson[2].qty)].word_th}
            />

        {:else if Math.round($set_progressLesson[3].progress) < 100 && $set_progressLesson[4].progress === 0}
        {($set_progressLesson[3].progress/100)*$set_progressLesson[3].qty}
        <Read
            word={content[1].data[Math.round(($set_progressLesson[3].progress/100)*$set_progressLesson[3].qty)]}
            configQuiz={configEcho}
            bind:score
            bind:statusNext
            />
        
        {:else if Math.round($set_progressLesson[4].progress) < 100}
        <h1>sentence</h1>
        <Writing
                config={configEcho}
                bind:score
                bind:statusNext
               
                urlSound={content[1].data[Math.round(($set_progressLesson[4].progress/100)*$set_progressLesson[4].qty)].sound_url}
                word={content[1].data[Math.round(($set_progressLesson[4].progress/100)*$set_progressLesson[4].qty)].sen_en}
                word_TH={content[1].data[Math.round(($set_progressLesson[4].progress/100)*$set_progressLesson[4].qty)].sen_th}
            />
        
        {:else}
        <h1>end</h1>
        coin: {coin}


        {/if}
        <div class="w-full h-14 mt-6">
            {Math.round(($set_progressLesson[4].progress/100)*$set_progressLesson[4].qty)}
            {#if Math.round(($set_progressLesson[4].progress/100)*$set_progressLesson[4].qty)+1 < content[1].data.length}
                <Button 
                SetHeight={true}
                click={next_page}
                options = {{bg:statusNext === true ? 'green' : 'primary', style:'style1', }}
                >{statusNext === true  ? 'next' : 'skip'}</Button>
                {:else }
                <Button 
                SetHeight={true}
                click={next_page}
                options = {{bg:'green', style:'style2', }}
                >next</Button>
                
            {/if}
        </div>
    {/await}
