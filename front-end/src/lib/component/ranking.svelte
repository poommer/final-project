<script>
	 import axios from 'axios'
  import { onMount } from 'svelte';

  let userID
      let loadData = async() => {
        loadData = await axios.get('http://localhost:3000/api/user/rank')
        console.log(loadData);
        userID = await JSON.parse(localStorage.getItem('user')).user_ID
        console.log(userID);
        return loadData
        
      }
</script>

<div class=" bg-ec-dark-blue-4 w-11/12 mt-4 rounded-lg p-4">
    <h1 class="text-5xl text-center uppercase text-ec-yellow-400">EC Ranking</h1>
    {#await loadData()}
        loading....
    {:then data} 
            {#each data.data as item, index }
            {#if item.user_ID === userID}
            <div class="myRank bg-ec-purple-500">
                <span class=" text-ec-yellow">{index+1}</span>
                {item.user_name}
                <span class=" text-ec-yellow">exp:{item.xp}</span>
                your rank
            </div>
            {:else}
            <div>
                <span class=" text-ec-yellow">{index+1}</span>
                {item.user_name}
                <span class=" text-ec-yellow">exp:{item.xp}</span>
            </div>
            {/if}
            {/each}
    {/await}
</div>