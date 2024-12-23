<script>
	import axios  from 'axios';
  import CardQuiz from '../../lib/components/cardQuiz.svelte';
  // import Card from "../../lib/components/card.svelte"; 
  const load_data = async() => {
    // const id = JSON.parse(localStorage.getItem('user')).user_ID;
    // console.log(id);
    
    const response = await axios(`https://api-ecproject.poommer.in.th/api/quiz/title`);

    console.log(response.data);
    return response.data;
  }

  
</script>

<div>
    <h1 class="text-5xl mb-4">Quiz</h1>
    {#await load_data()}
        loading...
    {:then dataset}     
    <div class="w-full flex justify-center items-center ">
        <div class="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {#each dataset.result as quiz }             
            
                <CardQuiz data={quiz} />
            {/each}
        </div>
    </div>
    {/await}
</div>