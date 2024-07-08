<script>
    import 'animate.css';
    
    import Conversation from "../../lib/Learns/conversation.svelte";
    import VocabText from "../../lib/Learns/vocabText.svelte";
    import VocabImg from "../../lib/Learns/vocabImg.svelte";

    let xp = 10;
    let coin = 5;
    let widthStatus = 0;

    let progress = false;

    let contentNext;

    let converStatus = false;

    let noCon = false;

    let contentNo = 0;

    let Learns = [{
        chapter:1,
        level1:{
        level:1,   
        vocab:
            [
                {text_th:"สวัสดี", text_en: "hello", img: "https://cdn-icons-png.flaticon.com/256/8995/8995966.png", status: false },
                {text_th:"ลาก่อน", text_en: "goodbye", img: "https://cdn-icons-png.flaticon.com/256/7024/7024284.png", status: false },
                {text_th:"ขอบคุณ", text_en: "thank you", img: "https://i.pinimg.com/originals/2d/96/bf/2d96bfd4a947bc64518bae765758144b.gif", status: false },
                {text_th:"ฉัน", text_en: "I", img: "https://cdn-icons-png.flaticon.com/256/7880/7880180.png", status: false },
                {text_th:"คุณ", text_en: "You", img: "https://cdn-icons-png.flaticon.com/256/9791/9791190.png", status: false },
                {text_th:"เด็กผู้ชาย", text_en: "boy", img: "https://cdn-icons-png.flaticon.com/256/7985/7985419.png", status: false },
                {text_th:"เด็กผู้หญิง", text_en: "girl", img: "https://cdn-icons-png.flaticon.com/256/10776/10776277.png", status: false },
                {text_th:"แอปเปิล", text_en: "apple", img: "https://cdn-icons-png.flaticon.com/256/6439/6439923.png", status: false },
                {text_th:"กิน", text_en: "eat", img: "https://cdn-icons-png.flaticon.com/256/13466/13466736.png", status: false },
            ],
        sentence:[
                {text_th:"สวัสดัแจ๊ค", text_en: "Hello Jack.", img: "", status: false },
                {text_th:"เป็ยอย่างไรบ้าง", text_en: "How are you?", img: "", status: false },
                {text_th:"ก็ดี ขอบคุณมาก", text_en: "very well, thank you.", img: "", status: false },
                {text_th:"เด็กผู้ชายคนหนึ่งกินแอปเปิล", text_en: "a boy eats an apple", img: "", status: false },
                {text_th:"เธอเป็นเด็กผู้หญิง", text_en: "she is a girl.", img: "", status: false },
                {text_th:"ฉันเป็นผู้ชายและเธอเป็นผู้หญิง", text_en: "I'm a boy and she is a girl", img: "", status: false },
                {text_th:"เขาเป็นเด็กผู้ชายคนหนึ่ง", text_en: "he is a boy.", img: "", status: false },
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

    let indexImg = 0;
    let indexTxt = 0;
    let indexsen = 0;

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
            if(contentTxt < vocabCount ){
            randomContent.push('text');
            contentTxt+=1
        }else if(contentIMG < vocabCount ){
            randomContent.push('image');
            contentIMG+=1
        }

        }
    }
let data = {
        immageSrc:Learns[0].level1.vocab[indexImg].img,
        word:Learns[0].level1.vocab[indexImg].text_en,
        chapter:Learns[0].chapter,
        lev:Learns[0].level1.level
    }

    let changeStatudBar = ()=>{
        progress = false;
        // ทำให้แอนิเมชันเล่นใหม่โดยการรีเซ็ตค่า `progress`
        setTimeout(() => {
            progress = true;
        }, 0);
        
        widthStatus += ((1/(randomContent.length+1))*100); 
        contentNo+=1
        if(randomContent[contentNo] === 'image'){
            if(contentNo !== randomContent.indexOf('image')){
                    indexImg +=1
            }
             data = {
                immageSrc:Learns[0].level1.vocab[indexImg].img,
                word:Learns[0].level1.vocab[indexImg].text_en,
                chapter:Learns[0].chapter,
                lev:Learns[0].level1.level
            } 
            
        }else if(randomContent[contentNo] === 'text'){
            if(contentNo !== randomContent.indexOf('text')){
                indexTxt +=1
            }
        }else  if(randomContent[contentNo] === 'sentence'){
            if(contentNo !== randomContent.indexOf('sentence')){
                indexsen +=1
            }
        }else if(contentNo === randomContent.length){
            converStatus = true
        }

        if(noCon === 6){
            noCon = true
        }

        console.table({converStatus:converStatus, noCon:noCon});
    }
console.table({indexImg:indexImg, indexTxt:indexTxt, indexsen:indexsen, widthStatus:widthStatus, contentNo:contentNo});
    console.log(randomContent);

    randomContent[0] === 'text' ? contentTxt+=1 : contentIMG+=1
       
</script>

<svelte:head>
   <title>{`lesson chapter${Learns[0].chapter}-${Learns[0].level1.level} | EC English Larning`}</title>
</svelte:head>

<div class="flex flex-col justify-center items-center p-10">
    <h3>chapter 1 [lev.1] - greeting my friend</h3>
    <div class="w-[40rem] h-8 bg-slate-300 rounded-full relative overflow-hidden">
        <div class="animate__animated animate__lightSpeedInLeft w-0 h-8 bg-orange-500 transition ease-in-out delay-150" class:animate={progress} style={`width:${widthStatus}%; --target-width:${widthStatus}%; --start-width:${widthStatus-((1/(randomContent.length+1))*100)}%;`}  ></div>
    </div>
    <div  class="h-[40rem] w-[50rem] bg-[#484E5F] p-5 rounded-xl flex flex-col items-center justify-between mt-4">
        {#if !converStatus}
        not conversation!
        <div class="w-full h-full flex justify-center items-center">
            {#if randomContent[contentNo] === 'text'}

                <VocabText wordEN={Learns[0].level1.vocab[indexTxt].text_th} wordTH={Learns[0].level1.vocab[indexTxt].text_en} /> 
            {:else if randomContent[contentNo] === 'image'}
                <VocabImg data={data} on:updateBtn={(event)=>{contentNext = event.detail.contentNext; console.log(contentNext);}}  /> 
            {:else}
                <VocabText wordEN={Learns[0].level1.sentence[indexsen].text_th} wordTH={Learns[0].level1.sentence[indexsen].text_en} /> 
            {/if}
             
            
        </div>
    
        {:else if converStatus === true && noCon !== true}
        <Conversation data={Learns[0].level1} {noCon} on:updateNoCon={(event)=>{noCon = event.detail.noCon; console.log(noCon);}}  />
        
        {:else}
        <div class="flex flex-col justify-between items-center h-full animate__animated animate__zoomIn">
            <h1 class="animate__animated  animate__swing text-5xl text-rose-400">You are really improving🥇🏆👏</h1>
            <div class="w-full p-4 gap-4 flex justify-between items-center">
                <div class="flex flex-col justify-center items-center h-40 w-6/12 p-2 rounded-[5rem]">
                    <img src="icon/xp.png" alt="" class="w-[200px]">
                    <p class="text-5xl mt-4">+{xp}</p>
                </div>
                <div class="flex flex-col justify-center items-center h-40 w-6/12 p-2 rounded-[5rem]">
                    <img src="icon/coin.png" alt="" class="w-[200px]">
                    <p class="text-5xl mt-4">+{coin}</p>
                </div>
            </div>
            <a href="/" class="w-[10rem] h-12 text-[20px] text-center bg-teal-200 text-emerald-700 p-1 rounded-xl m-10 relative top-[1.22rem] disabled:bg-slate-300 disabled:text-slate-700">exit</a>
        </div>
            
        {/if}


    

    </div>


    {#if !converStatus || noCon === 6}
    <div class="flex justify-center items-center">
        <button class="w-[10rem] h-12 text-[20px] bg-teal-200 text-emerald-700 p-1 rounded-xl m-10 relative top-[1.22rem] shadow-[0px_10px_0px_0px_#064e3b] active:shadow-[0px_10px_0px_0px_#053126] active:translate-y-[5px] disabled:bg-slate-300 disabled:text-slate-700" on:click={changeStatudBar} disabled={widthStatus > 98 ? true : false}>next</button>
    </div>
    {/if}


    
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