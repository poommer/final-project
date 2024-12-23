<script>
	import Listen from './../../../lib/qiuz/listen.svelte';
	import { page } from '$app/stores';
  import axios from "axios";
  import { name, set_progressLesson } from '../../../store/lesson';
  let lesson ;
  let content = [] ;
  let choice_Listen ;
  let Ans = '' ;
  const load_data = async() => {
        const id = $page.url.pathname.split('/')[2];

        const respone_title = await axios(`https://api-ecproject.poommer.in.th/api/lessons/topic/${id.split('-')[0]}`);
        const nameLesson = respone_title.data.response.filter(value=>value.lesson_ID == id)[0].lesson_title;
        name.set(nameLesson)
        await load_lesson(id)
    }
    
    const load_lesson = async (id) => {
    const respone = await axios(`https://api-ecproject.poommer.in.th/api/lessons/detail/${id}`);
    lesson = respone.data
    $set_progressLesson[0].qty = lesson.vocab.length*3
    $set_progressLesson[1].qty = lesson.sentence.length*3
    $set_progressLesson[2].qty = 10
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
                choice_Listen = content[0].data
                Ans = '';
                return values; // คืนค่า array เดิมที่ถูกปรับปรุงแล้ว
            });
        }
        else if($set_progressLesson[1].progress < 99){
            set_progressLesson.update(values => {
                // อัปเดตเฉพาะ index 0
                values[1].progress += (100/values[1].qty);
                return values; // คืนค่า array เดิมที่ถูกปรับปรุงแล้ว
            });
        }
        else if($set_progressLesson[2].progress < 99){
            set_progressLesson.update(values => {
                // อัปเดตเฉพาะ index 0
                values[2].progress += (100/values[2].qty);
                return values; // คืนค่า array เดิมที่ถูกปรับปรุงแล้ว
            });
        }
        else if($set_progressLesson[3].progress < 99){
            set_progressLesson.update(values => {
                // อัปเดตเฉพาะ index 0
                values[3].progress += (100/values[3].qty);
                return values; // คืนค่า array เดิมที่ถูกปรับปรุงแล้ว
            });
        }
        else if($set_progressLesson[4].progress < 99){
            set_progressLesson.update(values => {
                // อัปเดตเฉพาะ index 0
                values[4].progress += (100/values[4].qty);
                return values; // คืนค่า array เดิมที่ถูกปรับปรุงแล้ว
            });
        }
    }
    
</script>

<div>
    <!-- <h1>lesson</h1> -->
    {#await load_data()}
        loading Please Wait....
    {:then} 
    <!-- {Math.round(($set_progressLesson[0].progress/100)*$set_progressLesson[0].qty)}
    {Math.round(($set_progressLesson[0].progress/100)*$set_progressLesson[0].qty) - 4}
    {Math.round(($set_progressLesson[0].progress/100)*$set_progressLesson[0].qty) - 8} -->
        {#if Math.round($set_progressLesson[0].progress) < 99}
            <!-- <h1 class="text-3xl">Vocab</h1> -->
            {#if Math.round(($set_progressLesson[0].progress/100)*$set_progressLesson[0].qty) < content[0].data.length}
                <p>{content[0].data[Math.round(($set_progressLesson[0].progress/100)*$set_progressLesson[0].qty)].word_en}</p>                    
                <Listen 
                vocab={choice_Listen} 
                word={content[0].data[Math.round(($set_progressLesson[0].progress/100)*$set_progressLesson[0].qty)]}
                bind:Ans
                 />
            {:else if Math.round(($set_progressLesson[0].progress/100)*$set_progressLesson[0].qty) < content[0].data.length*2}
                read
                <p>{content[0].data[Math.round(($set_progressLesson[0].progress/100)*$set_progressLesson[0].qty) - content[0].data.length].word_en}</p> 
            {:else if Math.round(($set_progressLesson[0].progress/100)*$set_progressLesson[0].qty) < content[0].data.length*3}
                spell
                <p>{content[0].data[Math.round(($set_progressLesson[0].progress/100)*$set_progressLesson[0].qty) - (content[0].data.length*2)].word_en}</p> 
            {:else}
                not
            {/if}
        {:else if Math.round($set_progressLesson[1].progress) < 100 && $set_progressLesson[2].progress === 0}
        <h1 class="text-3xl">sentence</h1>

            {#if Math.round(($set_progressLesson[1].progress/100)*$set_progressLesson[1].qty) <= content[1].data.length}
            read
            {:else if Math.round(($set_progressLesson[1].progress/100)*$set_progressLesson[1].qty) <= content[1].data.length*2}
                grammar
            {:else if Math.round(($set_progressLesson[1].progress/100)*$set_progressLesson[1].qty) <= content[1].data.length*3}
                choice
            {:else}
                not
            {/if}
        {:else if Math.round($set_progressLesson[2].progress) < 100 && $set_progressLesson[3].progress === 0}
        <h1 class="text-3xl">post test</h1>
            {$set_progressLesson[2].progress}
        {:else if Math.round($set_progressLesson[3].progress) < 100 && $set_progressLesson[4].progress === 0}
            {$set_progressLesson[3].progress}
        {:else if Math.round($set_progressLesson[4].progress) < 100}
            {$set_progressLesson[4].progress}
        {/if}
        <button on:click={next_page}>+</button>
    {/await}
</div>