<script>
    import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
   
</script>
<div class="h-screen w-full flex fixed">
            <div class="absolute p-2 flex items-center gap-3">
                <img src="favicon.png" alt="" class="w-12 h-12 sm:w-16 sm:h-16">
                <img src="it_logo.png" alt="" class="w-12 h-12 sm:w-16 sm:h-16">
                <img src="tvc_logo.png" alt="" class="w-12 h-12 sm:w-16 sm:h-16">
                <p class="text-[12px] sm:text-small">
                    presented & developed by <a href="#" class="text-ec-purple font-[600]">Grop 3</a> <br>
                    20901-8502 Project I & 20901-8503 Project II
                    </p>
            </div>
                    <!-- </div>  -->
                    
                    <div class="absolute w-full h-full xl:h-[70%] xl:w-[50%] z-[-1]">
                        <img src="/icon_compnnents/grid.svg" alt="" class="w-full h-full object-cover">
                    </div>
    <div 
    class="
    w-full h-full relative flex flex-col justify-end  items-center 
    xl:p-4 xl:flex-row xl:justify-center
    ">
    <div class="w-full xl:w-auto mt-12">
        <div class="max-w-[60%] md:max-w-[30%] xl:max-w-[80%]">
        <!-- <div class="max-w-[60%] sm:w-[270px] lg:w-[350px] xl:w-[390px]"> -->
            <img src="/icon_compnnents/mascot-man.png" alt="" class="max-w-full">
        </div>
    </div>
        <div 
        class={`
        h-[50%] w-[75rem]
        relative bg-[url('/icon_compnnents/Item-background.png')] bg-cover bg-no-repeat 
        sm:before:contents
        xl:h-[580px] xl:w-[830px] flex flex-col justify-center items-center
        `}>
          
            <div class="w-full flex flex-col items-center justify-center px-16 mx-16">
                <h1 class="text-header-2 sm:text-header-1 font-[700]">EC English learning</h1>
                <p class="text-[24px] sm:text-topic">Learning Made Easy, Feeling Ecstatic!</p>
                <p class="text-[24px] sm:text-topic">free, anywhere, anytime</p>
            </div>
            <button 
            on:click={()=>{ window.location =  `https://api-ecproject.poommer.in.th/api/user/auth/google`}}
            class=" sm:mt-8
            flex flex-col justify-center items-center
            xl:absolute bottom-[-2rem] right-8 bg-gray-200 w-[300px] h-[100px] rounded-[30%_33%_30%_80%/51%_60%_50%_49%] shadow-[0_4px_0_0_rgba(255,88,88,1)]
            sm:w-[450px] 
            hover:bg-gray-100
            " >
            <img src="/icon_compnnents/shadow-1.svg" alt="" class="hidden sm:absolute ml-6 rotate-[35deg]">
            <div class="flex items-center justify-center">
                <img src="https://img.icons8.com/color/48/000000/google-logo.png" class="w-16 h-16 sm:w-20 sm:h-20"/>
                <div class=" h-full text-[24px] sm:text-[36px] leading-none flex flex-col">
                    sign in with
                    <span class="text-[36px] sm:text-[60px]">Google</span>
                </div>
            </div>
            <div class="hidden absolute bottom-0 w-full sm:flex justify-end">
                <img src="/icon_compnnents/shadow-2.svg" alt="" class="mr-12  rotate-[18deg]">
            </div>
                
            </button> 
        </div> 
       
        <div class="    absolute  w-[10rem] md:w-[12rem]  lg:w-[15rem] xl:w-[20rem] 2xl:w-[25rem] z-[999] top-[20rem] md:top-[26rem] lg:top-[30rem] lg:left-[16rem] right-[1rem] md:left-[13rem] xl:bottom-[-5rem] xl:left-[22rem] 2xl:left-[40rem]">
            <img src="/icon_compnnents/ABC_block.svg" alt="" class="w-full h-full ">
        </div>     
        <div class="hidden md:block absolute  w-[15rem]  lg:w-[20rem] xl:w-[15rem] 2xl:w-[20rem]  z-[999] top-[27rem] right-0 lg:top-[30rem] lg:right-[4rem] xl:bottom-[-20rem] xl:right-0">
            <img src="/icon_compnnents/DE_block.svg" alt="" class="w-full h-full ">
        </div>     

        <div class="absolute  w-[20rem]  lg:w-[40rem] xl:w-[40rem] z-[999] top-16 right-[-9rem] xl:top-0 xl:right-[-15rem]">
            <img src="/icon_compnnents/line-Flower01.png" alt="" class="w-full h-full object-cover">
        </div>     
    </div>
    <div class="hidden xl:block absolute bottom-0 right-0 w-full h-full xl:h-[70%] xl:w-[50%] z-[-1]">
        <img src="/icon_compnnents/grid.svg" alt="" class="w-full h-full object-cover">
    </div>
</div>

