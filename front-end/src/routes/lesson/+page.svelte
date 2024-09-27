<script>
  import { onMount } from "svelte";
  import axios from "axios";
  import Conver from "../../lib/Learns/conver.svelte";

    // export let data;
    // let conversation = data.content.conversation

    // console.log(data);

    let data ;
   const loadData = async() => {
        const content = await axios.get(`https://api-ecproject.poommer.in.th/api/lessons/detail/1-1`);
        data = content.data.conversation[0].conver_content
        return data
        // console.log(data);
    }


    
</script>

<div class="h-screen flex flex-col bg-neutral-600 justify-center items-center">
    {#await loadData() then loaded }
        <!-- {data.conver_lesID} -->
        <Conver converData={data} />
    {/await}
    <!-- {data.conver_lesID} -->
    <!-- <Conver converData={conversation[0].conver_content} /> -->
</div>