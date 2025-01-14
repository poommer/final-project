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
  let statusHit = false;
  let lessonID;

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
    content.push({type:'lesson', data:lesson.vocab});
    content.push({type:'sentence', data:lesson.sentence});
    lessonID = respone.data.lesson;
    choice_Listen = content[0].data
}

    const next_page = ()=>{
        statusHit = false
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

    const summary = async () => {
            set_progressLesson.update(values => {
                // อัปเดตเฉพาะ index 0
                values[4].progress += (100/values[4].qty);
                return values; // คืนค่า array เดิมที่ถูกปรับปรุงแล้ว
            });
            coin += score;
            score = 0
            statusNext = false

            const userID = JSON.parse(localStorage.getItem('user')).user_ID  ;
            console.log(userID);


            const NextLessonID = parseInt(lessonID.split('-')[1]) + 1

            console.log(NextLessonID);
            
            
            const urls = [
            `https://api-ecproject.poommer.in.th/api/user/${userID}/xp/1/`,
            `https://api-ecproject.poommer.in.th/api/user/${userID}/coin/1/`
            ];

            // ข้อมูลที่ต้องการส่งไปยังแต่ละเส้นทาง
            const payloads = [
                {"amount":coin*2, "description":"earned from lesson"},
                {"amount":coin, "description":"earned from lesson"},
            ];

            try {
    // ใช้ Promise.all เพื่อส่ง POST ไปยังทุก URL พร้อม payload
    const responses = await Promise.all(
      urls.map((url, index) =>
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payloads[index]),
        })
      )
    );

    // ตรวจสอบและแปลงข้อมูลการตอบกลับเป็น JSON
    let data = await Promise.all(
      responses.map(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
    );

   
    // data = [...data, updateLesson.data];

    const s = $page.url.searchParams.get('s');

    if(s == 0){
        const updateLesson = await axios.patch(`https://api-ecproject.poommer.in.th/api/lessons/enroll/`, {"lesson_ID":lessonID, "user_ID":userID})
        const enroll = await axios.post(`https://api-ecproject.poommer.in.th/api/lessons/enroll/`, {"lesson_ID":`1-${NextLessonID}`, "user_ID":userID})
        data = [...data, updateLesson.data, enroll.data];
    }



    // ใช้ข้อมูลที่ได้จากทุก API
    console.log('Response from all endpoints:', data);
  } catch (error) {
    console.error('Error posting data:', error);
  }
            console.log({xp:coin*2, coin});
            
    }
    
</script>


    <!-- <h1>lesson</h1> -->
    {#await load_data()}
        loading Please Wait....
    {:then} 
        {#if Math.round($set_progressLesson[0].progress) < 99}
            <EchoWord
            word={content[0].data[Math.round(($set_progressLesson[0].progress/100)*$set_progressLesson[0].qty) ]}
            configQuiz={configEcho}
            bind:score
            bind:statusNext
            />

        
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
                urlSound={content[0].data[Math.round(($set_progressLesson[2].progress/100)*$set_progressLesson[2].qty)].soundURL}
                word={content[0].data[Math.round(($set_progressLesson[2].progress/100)*$set_progressLesson[2].qty)].word_en}
                word_TH={content[0].data[Math.round(($set_progressLesson[2].progress/100)*$set_progressLesson[2].qty)].word_th}
                statusHit={statusHit}
            />

        {:else if Math.round($set_progressLesson[3].progress) < 100 && $set_progressLesson[4].progress === 0}
        <Read
            word={content[1].data[Math.round(($set_progressLesson[3].progress/100)*$set_progressLesson[3].qty)]}
            configQuiz={configEcho}
            bind:score
            bind:statusNext
            />
        
        {:else if Math.round($set_progressLesson[4].progress) < 100}
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
            {#if Math.round(($set_progressLesson[4].progress/100)*$set_progressLesson[4].qty)+1 < content[1].data.length}
                <Button 
                SetHeight={true}
                click={next_page}
                options = {{bg:statusNext === true ? 'green' : 'primary', style:'style1', }}
                >{statusNext === true  ? 'next' : 'skip'}</Button>
                {:else }
                <Button 
                SetHeight={true}
                click={summary}
                options = {{bg:statusNext === true || Math.round(($set_progressLesson[4].progress/100)*$set_progressLesson[4].qty) === content[1].data.length  ? 'green' : 'primary', style:'style2', }}
                >{statusNext === true || Math.round(($set_progressLesson[4].progress/100)*$set_progressLesson[4].qty) === content[1].data.length  ? 'next' : 'skip'}</Button>
                
            {/if}
        </div>
    {/await}
