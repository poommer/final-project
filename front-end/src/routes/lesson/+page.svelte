<script>
	import QAndA from './../../lib/game/qAndA.svelte';
  import { onMount } from "svelte";
  import axios from "axios";
  import Conver from "../../lib/Learns/conver.svelte";
  import Shuffle from '../../lib/game/Shuffle.svelte';
  import ChioceSound from '../../lib/game/chioceSound.svelte';
  import ChioceTxt from '../../lib/game/chioceTxt.svelte';

    // export let data;
    // let conversation = data.content.conversation

    // console.log(data);

    let data ;

    let status_send;
    let score ;

    let configQuiz_2 = {msg:'',maxAns:2, nextStatus:true};
    let configQuiz = {msg:undefined,ansCheck:null,maxAns:2};
let conver_QandA;
let conver_QandA_index = false;
    function getRandomQuestionAnswerPair(conversation) {
    let questionAnswers = [];
    
    // สุ่มรายการแรก (ต้องเป็น speaker 'a')
    const questions = conversation.filter(item => conver_QandA_index === false ? item.speaker === 'a' : item.speaker === 'a' && item.index !== conver_QandA_index );
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    conver_QandA_index = randomQuestion.index
    console.log(conver_QandA_index);
    
    // หา reply ที่ตรงกับคำถาม โดย speaker ต้องเป็น 'b' และ index ต้องต่อจากคำถาม
    const answers = conversation.filter(item => item.speaker === 'b' && item.index === randomQuestion.index + 1);
    
    if (answers.length > 0) {
        const randomAnswer = answers[0];
        questionAnswers = [randomQuestion, randomAnswer];
    }
    conver_QandA = questionAnswers
    return true;
}



const conversation = [
    {
        "text_th": "สวัสดีผมชื่อจอห์น แล้วคุณชื่ออะไร?",
        "text_en": "Hello, my name is John. What’s your name?",
        "speaker": "a",
        "index": 1,
        "url_sound": "https://api-ecproject.poommer.in.th/media/sound/conversation/conver-1-1/1.wav"
    },
    {
        "text_th": "สวัสดีฉันชื่อแอนนา ยินดีที่ได้รู้จัก",
        "text_en": "Hi, I’m Anna. Nice to meet you.",
        "speaker": "b",
        "index": 2,
        "url_sound": "https://api-ecproject.poommer.in.th/media/sound/conversation/conver-1-1/2.wav"
    },
    {
        "text_th": "ยินดีที่ได้รู้จักเช่นกัน คุณเป็นอย่างไรบ้าง",
        "text_en": "Nice to meet you too. How are you?",
        "speaker": "a",
        "index": 3,
        "url_sound": "https://api-ecproject.poommer.in.th/media/sound/conversation/conver-1-1/3.wav"
    },
    {
        "text_th": "ฉันสบายดี ขอบคุณ แล้วคุณล่ะ",
        "text_en": "I’m good, thank you. And you?",
        "speaker": "b",
        "index": 4,
        "url_sound": "https://api-ecproject.poommer.in.th/media/sound/conversation/conver-1-1/4.wav"
    },
    {
        "text_th": "ฉันสบายดี ขอบคุณ แล้วคุณมาจากที่ไหน",
        "text_en": "I’m fine, thank you. Where are you from?",
        "speaker": "a",
        "index": 5,
        "url_sound": "https://api-ecproject.poommer.in.th/media/sound/conversation/conver-1-1/5.wav"
    },
    {
        "text_th": "ฉันมาจากประเทศไทย แล้วคุณล่ะ",
        "text_en": "I’m from thailand. And you?",
        "speaker": "b",
        "index": 6,
        "url_sound": "https://api-ecproject.poommer.in.th/media/sound/conversation/conver-1-1/6.wav"
    },
    {
        "text_th": "ฉันมาจากประเทศญี่ปุ่น เอาล่ะ ยินดีที่ได้พูดคุยกันนะ",
        "text_en": "I’m from japanese. Well, it was nice talking to you.",
        "speaker": "a",
        "index": 7,
        "url_sound": "https://api-ecproject.poommer.in.th/media/sound/conversation/conver-1-1/7.wav"
    },
    {
        "text_th": "ยินดีที่ได้คุยเช่นกัน ขอให้คุณมีวันที่ดีนะ",
        "text_en": "It was nice talking to you too. Have a good day!",
        "speaker": "b",
        "index": 8,
        "url_sound": "https://api-ecproject.poommer.in.th/media/sound/conversation/conver-1-1/8.wav"
    },
    {
        "text_th": "เช่นกัน ลาก่อน",
        "text_en": "You too. Goodbye!",
        "speaker": "a",
        "index": 9,
        "url_sound": "https://api-ecproject.poommer.in.th/media/sound/conversation/conver-1-1/9.wav"
    }
];


</script>

<div class="h-screen flex flex-col bg-neutral-600 justify-center items-center">

        <!-- {data.conver_lesID} -->
        <!-- <Shuffle config={configQuiz_2} word={'This is an apple'} /> -->
         <!-- <ChioceTxt config={configQuiz_2} word={'water'} word_th={'น้ำ'} bind:score={score} bind:status_send={status_send}  /> -->
{#await getRandomQuestionAnswerPair(conversation) then loaded }
  
<QAndA configQuiz={configQuiz} conversation={conver_QandA}/>
{/await}
    <!-- {data.conver_lesID} -->
    <!-- <Conver converData={conversation[0].conver_content} /> -->
</div>