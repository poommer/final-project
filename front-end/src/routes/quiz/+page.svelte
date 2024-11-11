<script>
  import axios from 'axios';
  import QuizMenu from '../../lib/component/quizMenu.svelte';
    
	import Nav from './../../lib/component/nav.svelte';

  let infoMenu = [{
            "quiz_id": 3,
            "quiz_name": "fruits #01",
            "quiz_type": "Guessing",
            "quiz_qty": 10,
            "quiz_timer": 180000,
            "quiz_Health": 3,
            "quiz_palyed": 0,
            "image_url": "https://cdn-icons-png.flaticon.com/128/1625/1625099.png",
            "quiz_created": "2024-10-05T17:35:03.000Z"
        }]

  let dataList; 

 const load_data = async () => {
  const response = await axios.get('https://api-ecproject.poommer.in.th/api/quiz/title');
  dataList = response.data.result
  console.log(dataList);
  
 }
</script>




<div class="w-full h-full flex">

  <div class="w-[20%]">
    <Nav  pageCurrent='quiz' />

  </div>

  <main class="w-[80%]">
    <div class="p-2">
      <div class="flex justify-between items-center mx-4">
        <h1 class="text-5xl my-4">Quiz games</h1>
        <a href="#" class="w-[3rem] h-[3rem] rounded bg-gray-500 text-white text-2xl p-2 flex justify-center items-center hover:bg-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M440-120v-240h80v80h320v80H520v80h-80Zm-320-80v-80h240v80H120Zm160-160v-80H120v-80h160v-80h80v240h-80Zm160-80v-80h400v80H440Zm160-160v-240h80v80h160v80H680v80h-80Zm-480-80v-80h400v80H120Z"/></svg>
        </a>
      </div>
      {#await load_data() }
  loading...
{:then loaded }   
<div class="flex flex-wrap gap-2 content-center items-center">
  {#each dataList as menu }
    <QuizMenu data={menu}/>
  {/each}
</div>
{/await}
    </div>
  </main>

</div>
