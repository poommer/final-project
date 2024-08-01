<script>
	import ChapterMenu from './../component/chapterMenu.svelte';
	import { onMount } from 'svelte';
    import Nav from "../../lib/component/nav.svelte";
import { PUBLIC_BASE_API_URL } from '$env/static/public'



import { goto } from '$app/navigation';

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
    <Nav  pageCurrent='home' />



    <div class="ml-[20%]">

        <div>
            {#if error !== null}
        <p class="text-rose-400 text-xl">{error}</p>
    {/if}
           
            

            <ChapterMenu/>
            

            <!-- <form action="?/login" method="post">
            <button class="flex justify-center items-center gap-1 bg-slate-100 text-gray-800 p-1 rounded-sm">
                <img src="https://cdn-icons-png.flaticon.com/128/300/300221.png" alt="google-login" class="w-[2rem]">
                continue with google
            </button>
        </form> -->


        <!-- {:else}
        --->

      
        </div>


    </div>
    
  </div>





