<script>
	import { PUBLIC_BASE_API_URL } from '$env/static/public';
    import { onMount } from 'svelte';

// component import
import Button from "../../lib/component/button.svelte";
    export let error ;
</script>

<div class=" flex">
             
    <div class="w-6/12 flex flex-col justify-center items-center gap-20">
        {#if error !== null}
        <p class="text-rose-400 text-xl">{error}</p>
    {/if}
        <h1 class="text-5xl text-center font-bold">SIGN IN TO <br><span  class="text-ec-yellow">EC ENGLISH LEARNING</span></h1>
   <div class="flex flex-col justify-center items-center"> 
       <Button funcBtn={()=>{window.location = `${PUBLIC_BASE_API_URL}/auth/google`}} compoData={{bg:'white', Text:'gray-800', shadowColor:'#cdcdcd', shadowColorActive:'#B4B4B4',other:''}}>
           <img src="https://img.icons8.com/color/48/000000/google-logo.png" class="w-6 h-6 mr-2"/>
           continue with google
        </Button>
        <small class="mt-4 text-[16px]">or <a href="/admin" class=" text-ec-yellow underline">login to admin</a></small>
    </div>
    </div>


    <div class="w-6/12 relative z-1 flex flex-col justify-center items-center gap-20 after:contents-['test'] after:absolute  after:z-[-1] after:w-full after:h-screen after:top-0 after:bg-gradient-to-br after:from-[#121212]/45 after:form-32% after:via-ec-purple/45 after:via-68% after:to-ec-yellow/45 after:to-100%" style="background: url('bg2.png');">

        <div class="w-full flex flex-col justify-center items-center">
            <img src="favicon.png" alt="">
            <h1 class="text-8xl text-ec-yellow text-center">EC English learning</h1>
            <h3 class="text-4xl  text-center">Learning Made Easy, Feeling Ecstatic!</h3>
        </div>
        
        <p class="text-3xl text-center">
            This is a product of the EC English Learning project, which is an application for  improve English language skills. 
            <span class="text-ec-yellow">Available for free, anytime, and suitable for all ages.</span>
        </p>

        <small class="text-center">
            develop by group 3 - [<a href="#" class="text-ec-light-yellow">Siripoom</a>, <a href="#" class="text-ec-light-yellow">pasayakorn</a>, <a href="#" class="text-ec-light-yellow">chakkee</a>] <br>
            <a href="#" class="text-ec-light-yellow">Privacy Policy</a> and <a href="#" class="text-ec-light-yellow">Terms And Conditions</a>
        </small>

    </div>

</div>