<script>
	import ChapterMenu from './../component/chapterMenu.svelte';
	
	import { onMount } from 'svelte';
    import Nav from "../../lib/component/nav.svelte";
    
import { PUBLIC_BASE_API_URL } from '$env/static/public'



import { goto } from '$app/navigation';
  import Ranking from '../component/ranking.svelte';
  import axios from 'axios';


export let error ;
let userCheck ;

let dataUser;
let user_name;
let user_email;
let user_ID;

let ranking ;

let ChapMenu = [];

let LoadChapMenu = async (id) => {
    const load = await axios.get(`https://api-ecproject.poommer.in.th/api/lessons/chapterMenu?user_id=${id}`)
    ChapMenu = load.data.response
    
}

let load_data = async() => {
    userCheck = localStorage.getItem('user')

    if(userCheck){
        user_name = JSON.parse(userCheck).user_name
        user_email = JSON.parse(userCheck).user_email
         user_ID = JSON.parse(userCheck).user_ID
        if(JSON.parse(userCheck).user_status === "wait verify"){
        goto('../register')
    }
    
    const load = await LoadChapMenu(user_ID);
    ChapMenu = ChapMenu
    const response = await axios.get(`https://api-ecproject.poommer.in.th/api/user/rank?user_ID=${user_ID}`);
    ranking = response.data;  // แก้ไขให้เก็บ response.data แทน response


    }else{   
        sessionStorage.setItem('error', 'login, please.')
        goto('/')
    }


}


</script>


{#await load_data()}
    loading 2...
{:then loaded} 
<div class="w-full h-full flex">
    <nav class="w-[20%] bg-slate-50">
        <Nav  pageCurrent='home' />
    </nav>

    <main class="w-[80%]     flex">
        <div class="w-[70%] flex">
            {#if error !== null}
        <p class="text-rose-400 text-xl">{error}</p>
    {/if}

<div class="ml-3  w-full overflow-scroll flex flex-col  items-center">

        {#each ChapMenu as Item,index}
        <!-- <p>{}</p> -->
        <!-- {Item[index]} -->
        <ChapterMenu  chapter_data={Item} />
        {/each} 

    
    
    

</div>


      
        </div>

        <div class="w-[30%] flex flex-col items-center">
            <Ranking id={user_ID} ranking={ranking} />
        </div>
    </main>
    
  </div>
{/await}




