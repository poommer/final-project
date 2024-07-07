<script>
    import Conversation from "../lib/Learns/conversation.svelte";
    import VocabText from "../lib/Learns/vocabText.svelte";
    import VocabImg from "../lib/Learns/vocabImg.svelte";
    import { afterUpdate } from 'svelte';
    let mainContent;
    let score = 30
    let widthStatus = 0

    let noCon;
    let Learns = [{
        chapter:1,
        level1:{
        level:1,   
        vocab:
            [
                {text_th:"สวัสดี", text_en: "hello", img: "", status: false },
                {text_th:"ลาก่อน", text_en: "goodbye", img: "", status: false },
                {text_th:"ขอบคุณ", text_en: "thank you", img: "", status: false },
                {text_th:"ฉัน", text_en: "I", img: "", status: false },
                {text_th:"คุณ", text_en: "You", img: "", status: false },
                {text_th:"เด็กผู้ชาย", text_en: "boy", img: "https://cdn-icons-png.flaticon.com/256/7985/7985419.png", status: false },
                {text_th:"เด็กผู้หญิง", text_en: "girl", img: "https://cdn-icons-png.flaticon.com/256/10776/10776277.png", status: false },
                {text_th:"แอปเปิล", text_en: "apple", img: "", status: false },
                {text_th:"กิน", text_en: "eat", img: "", status: false },
            ],
        sentence:[
                { text: "Hello pussy.", img: "", status: false },
                { text: "How are you?", img: "", status: false },
                { text: "very well, thank you.", img: "", status: false },
                { text: "a boy eats an apple", img: "", status: false },
                { text: "she is a girl.", img: "", status: false },
                { text: "I'm a boy and she is a girl", img: "", status: false },
                { text: "she is a girl.", img: "", status: false },
            ],
        conversation:{
            speaker_img: {
                a: "https://cdn-icons-png.flaticon.com/256/9559/9559035.png",
                b: "https://cdn-icons-png.flaticon.com/256/9725/9725273.png",
            },
            res: [
                {
                    text_en: "Hello, Jack.",
                    text_th: "สวัสดีแจ็ค",
                    speaker: "a",
                    status: false,
                },
                {
                    text_en: "Hello, Harry",
                    text_th: "สวัสดีแฮรี",
                    speaker: "b",
                    status: false,
                },
                {
                    text_en: "How are you today?",
                    text_th: "คุณเป็นอย่างบ้าง",
                    speaker: "a",
                    status: false,
                },
                {
                    text_en: "very well, thank you. and you?",
                    text_th: "สบายดี แล้วคุณล่ะ",
                    speaker: "b",
                    status: false,
                },
                {
                    text_en: "I'm good, thank you.",
                    text_th: "ฉันสบาย ขอบคุณ",
                    speaker: "a",
                    status: false,
                },
                {
                    text_en: "I have to go now. goodbye!",
                    text_th: "ฉันต้องไปแล้ว ลาก่อน",
                    speaker: "b",
                    status: false,
                },
                {
                    text_en: "goodbye!",
                    text_th: "ลาก่อน",
                    speaker: "a",
                    status: false,
                },
            ]
        }
        }
    }]

    let vocabCount = Learns[0].level1.vocab.length
    let sentenceCount = Learns[0].level1.sentence.length

    let contentIMG = 0
    let contentTxt = 0
    let contentSentence = 0

    let randomContent = []
    for(let i=1; i<=(vocabCount*2)+sentenceCount; i++){
        let randomNo = Math.floor(Math.random()*3);
        
        if((randomNo === 1 || contentSentence === sentenceCount) && contentTxt < vocabCount ){
            randomContent.push('text');
            contentTxt+=1
        }else if((randomNo === 2 || contentSentence === sentenceCount) && contentIMG < vocabCount ){
            randomContent.push('image');
            contentIMG+=1
        }else if((randomNo === 0 || contentSentence === sentenceCount) && contentSentence < sentenceCount){
            randomContent.push('sentence');
            contentSentence+=1
        }else{
            randomContent.push(randomNo)
        }
    }


    let changeStatudBar = ()=>{widthStatus += 5}
console.log(randomContent);
    

    afterUpdate(() => {
       if (mainContent) {
           mainContent.scrollTo({
               top: mainContent.scrollHeight,
               behavior: 'smooth'
           });
       }
   });
       
</script>

<div class="flex flex-col justify-center items-center p-10">
    <h3>chapter 1 [lev.1] - greeting my friend</h3>
    <div class="w-[40rem] h-8 bg-slate-300 rounded-full relative overflow-hidden">
        <div class="w-0 h-8 bg-orange-500" style={`width:${widthStatus}%;`}></div>
    </div>
    <div  class="h-[40rem] w-[50rem] bg-[#484E5F] p-5 rounded-xl flex flex-col items-center justify-between">
        <div class="w-full h-full flex justify-center items-center">
             <!-- <VocabText wordEN={Learns[0].level1.vocab[0].text_th} wordTH={Learns[0].level1.vocab[0].text_en} />  -->
             <VocabImg immageSrc={Learns[0].level1.vocab[5].img} /> 
            
        </div>
<!-- <Conversation data={Learns[0].level1} {noCon} on:updateNoCon={(event)=>{noCon = event.detail.noCon; console.log(noCon);}}  />
     -->
       
    </div>
     <div class="flex justify-center items-center">
            <button class="w-[10rem] h-12 text-[20px] bg-teal-200 text-emerald-700 p-1 rounded-xl m-10 relative top-[1.22rem]" on:click={changeStatudBar}>next</button>
        </div>
</div>




