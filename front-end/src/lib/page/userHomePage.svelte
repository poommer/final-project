<script>
	import ChapterMenu from './../component/chapterMenu.svelte';
	import { onMount } from 'svelte';
    import Nav from "../../lib/component/nav.svelte";
    
import { PUBLIC_BASE_API_URL } from '$env/static/public'



import { goto } from '$app/navigation';
  import Ranking from '../component/ranking.svelte';

export let error ;
let userCheck ;

let dataUser;
let user_name;
let user_email;

// onMount(() => {
//     console.log('Hello');
//     userCheck = localStorage.getItem('user')
//     console.log(userCheck);

//     if(userCheck){
//         user_name = JSON.parse(userCheck).user_name
//         user_email = JSON.parse(userCheck).user_email
//         if(JSON.parse(userCheck).user_status === "wait verify"){
//         goto('../register')
//         sessionStorage.setItem('error', 'login, please.')
//     }
//     }else{ 
//         goto('/')
//     }


// })


</script>


<div class="w-full h-full flex">
    <nav class="w-[20%] bg-slate-50">
        <Nav  pageCurrent='home' />
    </nav>

    <main class="w-[80%]     flex">
        <div class="w-[70%] flex">
            {#if error !== null}
        <p class="text-rose-400 text-xl">{error}</p>
    {/if}
<!--            
           <ChapterMenu/>   -->
<!-- <div class="">
    <ChapterMenu/>
</div> -->
<div class="ml-3 w-full overflow-scroll flex flex-col items-center">
    <div class=" mb-4">
        <ChapterMenu />
    </div>
    <div class="relative w-[150px] border-b-[5px] border-ec-purple border-dashed ml-[100px] z-[-1] transform rotate-[-45deg]"></div>
    
    <div class=" mb-4">
        <ChapterMenu />
    </div>
</div>


      
        </div>

        <div class="w-[30%] flex flex-col items-center">
            <Ranking/>
        </div>
    </main>
    
  </div>





