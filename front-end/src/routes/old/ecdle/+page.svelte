<script>
	import  moment  from 'moment-timezone';
	import axios  from 'axios';
  import 'animate.css';

  import Nav from '../../lib/component/nav.svelte';

  let word ;

  let word_set = [
    {set:[{letter:null, check:undefined},{letter:null, check:undefined},{letter:null, check:undefined},{letter:null, check:undefined},{letter:null, check:undefined}], result:null},
    {set:[{letter:null, check:undefined},{letter:null, check:undefined},{letter:null, check:undefined},{letter:null, check:undefined},{letter:null, check:undefined}], result:null},
    {set:[{letter:null, check:undefined},{letter:null, check:undefined},{letter:null, check:undefined},{letter:null, check:undefined},{letter:null, check:undefined}], result:null},
    {set:[{letter:null, check:undefined},{letter:null, check:undefined},{letter:null, check:undefined},{letter:null, check:undefined},{letter:null, check:undefined}], result:null},
    {set:[{letter:null, check:undefined},{letter:null, check:undefined},{letter:null, check:undefined},{letter:null, check:undefined},{letter:null, check:undefined}], result:null},
    {set:[{letter:null, check:undefined},{letter:null, check:undefined},{letter:null, check:undefined},{letter:null, check:undefined},{letter:null, check:undefined}], result:null}
    ]

  let wordCount = {};

// ตรวจสอบแต่ละตัวอักษรใน word


console.log("Final wordCount: ", wordCount);  // แสดงผลลัพธ์สุดท้าย

let check_null = false
let line = 0

let user_id ;

let info_No;
let info_forDate;
const load_data = async() =>{
  const local = localStorage.getItem('user')
  user_id = await JSON.parse(local).user_ID;
  const response_wordToday = await axios.get(`https://api-ecproject.poommer.in.th/api/mission/today`);
  console.log('response_wordToday',response_wordToday.data);
  word = response_wordToday.data[0].mis_word.toLowerCase()
  info_No = response_wordToday.data[0].mis_id
  info_forDate = moment(response_wordToday.data[0].mis_forDate).format('YYYY/MM/DD')
  console.log('info_forDate',info_forDate);
  
  for (let letter_once of word) {
console.log("Before lowercase: ", letter_once);  // แสดงตัวอักษรก่อนแปลง
letter_once = letter_once.toLowerCase();  // แปลงเป็นพิมพ์เล็ก
console.log("After lowercase: ", letter_once);  // แสดงตัวอักษรหลังแปลง

// นับจำนวนการปรากฏของตัวอักษรใน wordCount
wordCount[letter_once] = (wordCount[letter_once] || 0) + 1;  
console.log("wordCount so far: ", wordCount);  // แสดงผลลัพธ์ wordCount ที่อัปเดตแล้ว
}


  const response_statusMission = await axios.get(`https://api-ecproject.poommer.in.th/api/mission/${user_id}/${moment.tz('Asia/Bangkok').format('YYYY-MM-DD')}/play`);
  console.log(response_statusMission.data);
  if(response_statusMission.data.status_create){
    word_set = JSON.parse(response_statusMission.data.result[0].misPlay_Ans);
    console.log(word_set);
  }else{
    const response_statusMission = await axios.post(`https://api-ecproject.poommer.in.th/api/mission/${user_id}/play`,{
    "Ans":JSON.stringify(word_set), 
    "round":"0", 
    "xp":"0", 
    "coin":"0", 
    "status_mission":"wait"
    });
    console.log(response_statusMission);
    
  }
  
}

const checkAns = async() => {
  let Count_TF = {T:0, F:0}
  const index = word_set.findIndex(item => item.result === null)
  check_null = word_set[index].set.filter(val => val.letter === null).length >= 1 ? true : false 
  
  if(!check_null){
    let wordAns=''
    word_set[index].set.forEach(val => {wordAns += val.letter})
    console.log(wordAns);
    try{
      let response_checkWord = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordAns}`);
      console.log(response_checkWord);
      check_null = false
    } catch (err) {
      if (err.response && err.response.status === 404){
        check_null = true
      }
      
    }

    
  }

  if(!check_null){
    line += 1
  word_set[index].set.forEach((item,index) => {
  if(item.letter && item.letter === word[index]){
   item.check = true
    wordCount[item.letter]--;
    Count_TF.T += 1
  }
  else if(item.letter && wordCount[item.letter] && wordCount[item.letter] > 0){
    item.check = 'toggle'
    wordCount[item.letter]--;
    Count_TF.F += 1
  }
  else{
    item.check = false
    Count_TF.F += 1
  }
  console.log(item); 
});

let map_ans = word_set[index].set.map(val=>{
 return val.check === true ? '🟩' :  val.check === 'toggle' ? '🟨' : '⬜'
})

word_set[index].Convert = map_ans

if(Count_TF.T < 5){
  word_set[index].result = false
  let statusMis = line === 6 ? 'fail' : 'todo'
  const response_UpdatestatusMission = await axios.patch(`https://api-ecproject.poommer.in.th/api/mission/${user_id}/${moment.tz('Asia/Bangkok').format('YYYY-MM-DD')}/play`,{
    "Ans":JSON.stringify(word_set), 
    "round":line, 
    "xp":0, 
    "coin":0, 
    "status_mission":statusMis
  });
  
}else{
  word_set[index].result = true
  const latest_index = word_set.findIndex(item => item.result === null);
  for(let i_wordSet_latest = latest_index; i_wordSet_latest <word_set.length; i_wordSet_latest++ ){
    console.log(i_wordSet_latest);
    word_set[i_wordSet_latest].result = false
    const response_UpdatestatusMission = await axios.patch(`https://api-ecproject.poommer.in.th/api/mission/${user_id}/${moment.tz('Asia/Bangkok').format('YYYY-MM-DD')}/play`,{
    "Ans":JSON.stringify(word_set), 
    "round":line, 
    "xp":Math.floor400/line, 
    "coin":Math.floor800/line, 
    "status_mission":'true'
  }
  
)
console.log(response_UpdatestatusMission.data);
  }
  
}




}
console.log({word_set,jsonText:JSON.stringify(word_set)});
}


console.log(wordCount);


  let typeLet = async (letter) => {
    check_null = false
          letter = letter.toLowerCase()
          const index = word_set.findIndex(item => item.result === null)
          const index_letter = word_set[index].set.findIndex(item => item.check === undefined)
          // word_set[index]
          word_set[index].set[index_letter].letter = letter
          word_set[index].set[index_letter].check = null
          console.log('index',index);
          console.log('word_set',word_set[index]);
          console.log('index_letter',index_letter);
          console.log('word_set[index_letter]',word_set[index].set[index_letter]);
          
      }
  
      let DelLetter = async () => {
          const index_wordSet = word_set.findIndex(item => item.result === null)
          const reversedIndex = word_set[index_wordSet].set.slice().reverse().findIndex(item => item.check === null);
  const index = reversedIndex !== -1 ? word_set[index_wordSet].set.length - reversedIndex - 1 : -1;
          if(index>=0){
              word_set[index_wordSet].set[index].letter = ''
              word_set[index_wordSet].set[index].check = undefined
              // result_check_ans[index] = {isMatch:null, type:undefined}
          }
          // hitResult = hitResult
          console.log(index);
          
  
      }

</script>

<svelte:head>
<title>{`Misson #${info_No} @${info_forDate} | EC English Larning`}</title>
</svelte:head>

<div class="w-full h-full flex">
  <div class="w-[20%]">
    <Nav pageCurrent='mission' />
  </div>
  
  <main class="w-[80%] p-4 flex flex-col justify-center items-center">
    {#await load_data()}
      loading...
    {:then loaded } 
    <h1 class="text-5xl flex flex-col justify-center items-center">
      Mission #{info_No} 
      <span class="text-3xl">[{info_forDate}]</span>
      </h1>
    <div class="flex flex-col gap-4 mt-4">
      {#each word_set as item,i }
      <div class={`flex items-center justify-center gap-4 text-6xl ${check_null === true && line === i ? 'animate__animated animate__shakeX' : ''}`}>
        {#each item.set as letter,index }
          <p class={`w-[4.5rem] h-[4.5rem] flex items-center justify-center  rounded-lg 
          ${letter.check == true ? 'bg-green-500  animate__animated animate__flipInX' : letter.check == 'toggle' ? 'bg-amber-400  animate__animated animate__flipInX' : letter.check == false ? ' bg-gray-400 animate__animated animate__flipInX' : 'bg-slate-50 text-ec-purple'}`}>

          {letter.letter === null ? '' : letter.letter }
        
        </p>
        {/each}
      </div>
      {/each}
    </div>

    <div class={`flex flex-col justify-center items-center gap-2 w-[42rem] mt-6`}>
      <div class="flex gap-3 lowercase">
          <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg capitalize `} on:click={() => {typeLet('Q')}}>Q</button>
          <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg capitalize `} on:click={() => {typeLet('W')}}>W</button>
          <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg capitalize `} on:click={() => {typeLet('E')}}>E</button>
          <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg capitalize `} on:click={() => {typeLet('R')}}>R</button>
          <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg capitalize `} on:click={() => {typeLet('T')}}>T</button>
          <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg capitalize `} on:click={() => {typeLet('Y')}}>Y</button>
          <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg capitalize `} on:click={() => {typeLet('U')}}>U</button>
          <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg capitalize `} on:click={() => {typeLet('I')}}>I</button>
          <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg capitalize `} on:click={() => {typeLet('O')}}>O</button>
          <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg capitalize `} on:click={() => {typeLet('P')}}>P</button>
      </div>
      <div class="flex gap-3">
          <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg capitalize `} on:click={() => {typeLet('A')}}>A</button>
          <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg capitalize `} on:click={() => {typeLet('S')}}>S</button>
          <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg capitalize `} on:click={() => {typeLet('D')}}>D</button>
          <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg capitalize `} on:click={() => {typeLet('F')}}>F</button>
          <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg capitalize `} on:click={() => {typeLet('G')}}>G</button>
          <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg capitalize `} on:click={() => {typeLet('H')}}>H</button>
          <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg capitalize `} on:click={() => {typeLet('J')}}>J</button>
          <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg capitalize `} on:click={() => {typeLet('K')}}>K</button>
          <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg capitalize `} on:click={() => {typeLet('L')}}>L</button>
      </div>
      <div class="flex gap-3">
          <button class={`bg-yellow-500 p-2 w-[6rem] h-16 font-bold text-3xl rounded-lg capitalize `} on:click={() => {checkAns()}}>check</button>
          <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg capitalize `} on:click={() => {typeLet('Z')}}>Z</button>
          <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg capitalize `} on:click={() => {typeLet('X')}}>X</button>
          <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg capitalize `} on:click={() => {typeLet('C')}}>C</button>
          <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg capitalize `} on:click={() => {typeLet('V')}}>V</button>
          <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg capitalize `} on:click={() => {typeLet('B')}}>B</button>
          <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg capitalize `} on:click={() => {typeLet('N')}}>N</button>
          <button class={`bg-yellow-500 p-2 w-12 h-16 font-bold text-3xl rounded-lg capitalize `} on:click={() => {typeLet('M')}}>M</button>
          <button class={`bg-yellow-600 p-2 w-16 h-16 font-bold text-3xl rounded-lg flex justify-center items-center`} on:click={DelLetter}><svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#e8eaed"><path d="M360-200q-20 0-37.5-9T294-234L120-480l174-246q11-16 28.5-25t37.5-9h400q33 0 56.5 23.5T840-680v400q0 33-23.5 56.5T760-200H360Zm400-80v-400 400Zm-400 0h400v-400H360L218-480l142 200Zm96-40 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Z"/></svg></button>
      </div>
  </div>
  {/await}
  </main>


</div>