<script>
import { PUBLIC_BASE_API_URL } from '$env/static/public'


import { onMount } from 'svelte';

let error ;
let userCheck ;
onMount(() => {
    userCheck = localStorage.getItem('user')
    console.log(userCheck);


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
</div>