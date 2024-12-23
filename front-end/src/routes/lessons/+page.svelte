<script>
	import axios  from 'axios';
  import Card from "../../lib/components/card.svelte";
  const load_data = async() => {
    const id = JSON.parse(localStorage.getItem('user')).user_ID;
    console.log(id);
    
    const response = await axios(`https://api-ecproject.poommer.in.th/api/lessons/chapterMenu?user_id=${id}`);

    console.log(response.data);
    return response.data;
  }
</script>

<div>
    <h1 class="text-5xl mb-4">lessons</h1>
    {#await load_data()}
        loading...
    {:then dataset}     
    <div class="w-full flex justify-center items-center ">
        <div class="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {#each dataset.response as lessons }
                {#each lessons as lesson }
                
                <Card data={lesson} />
                {/each}
            {/each}
        </div>
    </div>
    {/await}
</div>