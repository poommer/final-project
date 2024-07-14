<script>
	import { onMount } from 'svelte';
import { PUBLIC_BASE_API_URL } from '$env/static/public'



import { goto } from '$app/navigation';

let error ;
let userCheck ;

let dataUser;
let user_name;
let user_email;

onMount(() => {
    console.log('Hello');
    userCheck = localStorage.getItem('user')
    console.log(userCheck);

    if(userCheck){
        user_name = JSON.parse(userCheck).user_name
        user_email = JSON.parse(userCheck).user_email
        if(JSON.parse(userCheck).user_status === "wait verify"){
        goto('/register')
    }
    }

    
    error = sessionStorage.getItem('error')
    sessionStorage.removeItem('error')

})


</script>





<div>
    {#if error !== null}
        <p class="text-rose-400 text-xl">{error}</p>
    {/if}
    
    <h1 class="text-rose-800 text-9xl">อย่าลืมระบบจัดอันดับคะแนนเด้ออ</h1>
    <a href="lesson/">chapter1 level1</a>

    <!-- <form action="?/login" method="post">
    <button class="flex justify-center items-center gap-1 bg-slate-100 text-gray-800 p-1 rounded-sm">
        <img src="https://cdn-icons-png.flaticon.com/128/300/300221.png" alt="google-login" class="w-[2rem]">
        continue with google
    </button>
</form> -->


<!-- {:else}
--->

{#if userCheck === null }
<a href={`${PUBLIC_BASE_API_URL}/auth/google`} class="flex justify-center items-center gap-1 bg-slate-100 text-gray-800 p-1 rounded-sm">
    <img src="https://cdn-icons-png.flaticon.com/128/300/300221.png" alt="google-login" class="w-[2rem]">
    continue with google
</a>
{:else}
    <button class="flex justify-center items-center gap-1 bg-slate-100 text-gray-800 p-1 rounded-sm" on:click={()=>{localStorage.removeItem('user'); userCheck = localStorage.getItem('user')}}>logout</button>
{/if} 


{#if userCheck}
    <h1 class="text-4xl">welcome <span class="text-5xl text-ec-yello">{user_name}</span></h1>
    <p class="text-2xl">login with google account: <span class="text-2xl text-ec-green">{user_email}</span></p>
{/if}
</div>