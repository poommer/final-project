<script>
  import { onMount } from "svelte";

  export let ranking;
 let id;
  onMount(async()=>{
    id =  await localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : localStorage.getItem('user');
    id = id.user_ID
  })
     console.log(ranking);
</script>

<div class="">

    {#each ranking.topRanks as item,index }
        {#if item.rank == 1}
            <!-- first -->
    <div class="w-full relative mt-6">
        <div class="  flex justify-center items-center absolute">
            <img src="/icon/first.png" class="flex justify-center items-center w-[5rem]" alt="">
            <!-- <img src="/icon/first.png" class="w-[5rem] h-[5rem] rounded-full bg-ec-purple flex justify-center items-center "/> -->
        </div>
        <div class="ml-[10%]  w-[90%]  text-ec-yellow">
            <span class={`pl-2 ml-[5%] ${id == item.user_ID ? 'text-ec-yellow' : ' text-ec-dark-blue-3'}`}>{item.user_name} <span class={`text-sm`}>{id == item.user_ID ? '[your rank]' : ''}</span></span>
            <div class={`w-full h-10 flex  items-center  pl-12 rounded-full gap-4 text-lg ${id == item.user_ID ? 'bg-ec-light-yellow text-ec-yellow' : 'bg-ec-dark-blue-5 text-ec-dark-blue-3'}`}>
                <div class="bg-ec-dark-blue-3 w-[7rem] h-[2rem] flex items-center gap-2 rounded-full">
                    <img src="icon/xp.png" alt="" class="w-8 h-8 ml-2">
                    {item.xp}
                </div>
                <div class="bg-ec-dark-blue-3 w-[7rem] h-[2rem] flex items-center gap-2 rounded-full">
                    <img src="icon/coin.png" alt="" class="w-5 h-5 ml-2">
                    {item.coin_balance}
                </div>
            </div>
        </div>
        
    </div>

    {:else if item.rank == 2}
    <!-- second -->
    <div class="w-full relative mt-6 mb-4">
        <div class="  flex justify-center items-center absolute">
            <img src="/icon/second.png" class="flex justify-center items-center w-[4.5rem]" alt="">
            <!-- <img src="/icon/first.png" class="w-[5rem] h-[5rem] rounded-full bg-ec-purple flex justify-center items-center "/> -->
        </div>
        <div class="ml-[10%]  w-[90%]  text-ec-yellow">
            <span class={`pl-2 ml-[5%] ${id == item.user_ID ? 'text-ec-yellow' : ' text-ec-dark-blue-3'}`}>{item.user_name}</span>
            <div class={`w-full h-10 flex  items-center  pl-12 rounded-full gap-4 text-lg ${id == item.user_ID ? 'bg-ec-light-yellow text-ec-dark-blue-1' : 'bg-ec-dark-blue-5 text-white'}`}>
                <div class="bg-ec-dark-blue-3 w-[7rem] h-[2rem] flex items-center gap-2 rounded-full">
                    <img src="icon/xp.png" alt="" class="w-8 h-8 ml-2">
                    {item.xp}
                </div>
                <div class="bg-ec-dark-blue-3 w-[7rem] h-[2rem] flex items-center gap-2 rounded-full">
                    <img src="icon/coin.png" alt="" class="w-5 h-5 ml-2">
                    {item.coin_balance}
                </div>
            </div>
        </div>
        
    </div>

    {:else if item.rank == 3}

    <!-- third -->
    <div class="w-full relative mt-6 mb-8">
        <div class="  flex justify-center items-center absolute">
            <img src="/icon/third.png" class="flex justify-center items-center w-[4.5rem]" alt="">
            <!-- <img src="/icon/third.png" class="w-[5rem] h-[5rem] rounded-full bg-ec-purple flex justify-center items-center "/> -->
        </div>
        <div class="ml-[10%]  w-[90%]   ">
            <span class={`pl-2 ml-[5%] ${id == item.user_ID ? 'text-ec-yellow' : ' text-ec-dark-blue-3'}`}>{item.user_name}</span>
            <div class={`w-full h-10 flex  items-center  pl-12 rounded-full gap-4 text-lg ${id == item.user_ID ? 'bg-ec-light-yellow text-ec-dark-blue-1' : 'bg-ec-dark-blue-5 text-white'}`}>
                <div class="bg-ec-dark-blue-3 w-[7rem] h-[2rem] flex items-center gap-2 rounded-full">
                    <img src="icon/xp.png" alt="" class="w-8 h-8 ml-2">
                    {item.xp}
                </div>
                <div class="bg-ec-dark-blue-3 w-[7rem] h-[2rem] flex items-center gap-2 rounded-full">
                    <img src="icon/coin.png" alt="" class="w-5 h-5 ml-2">
                    {item.coin_balance}
                </div>
            </div>
        </div>
        
    </div>

    
    {:else}
    <div class={`w-full flex mt-2  ${id == item.user_ID ? 'bg-ec-light-yellow text-ec-dark-blue-1 p-1  rounded-full' : 'text-ec-dark-blue-3'}`}>
    <span class="w-[50%] mt-[5px] text-lg ">#{item.rank} {item.user_name}</span>
   
    <div class="w-[50%] h-10 flex  items-center   gap-4 text-lg text-white">
        <div class="bg-ec-dark-blue-3 w-[7rem] h-[2rem] flex items-center gap-2 rounded-full ">
            <img src="icon/xp.png" alt="" class="w-8 h-8 ml-2">
            {item.xp}
        </div>
        <div class="bg-ec-dark-blue-3 w-[7rem] h-[2rem] flex items-center gap-2 rounded-full ">
            <img src="icon/coin.png" alt="" class="w-5 h-5 ml-2">
            {item.coin_balance}
        </div>
    </div>
    </div>
        {/if}

      
    {/each}
    
      {#if ranking.userRank && id == ranking.userRank.user_ID}
        
        <div class="w-full relative mt-4  p-2 bg-ec-dark-blue-3">
            <div class="  flex justify-center items-center absolute">
                <div class="w-[5rem] h-[5rem] rounded-full bg-ec-purple flex justify-center items-center text-4xl text-ec-yellow">
                    #{ranking.userRank.rank}
                </div>
            </div>
            <div class="ml-[10%]  w-[90%]  text-ec-yellow">
                <span class="pl-2 ml-[12%]">{ranking.userRank.user_name}</span>
                <div class="w-full h-10 flex  items-center bg-ec-light-yellow pl-12 rounded-full gap-4 text-lg">
                    <div class="bg-ec-dark-blue-3 w-[7rem] h-[2rem] flex items-center gap-2 rounded-full">
                        <img src="icon/xp.png" alt="" class="w-8 h-8 ml-2">
                        {ranking.userRank.xp}
                    </div>
                    <div class="bg-ec-dark-blue-3 w-[7rem] h-[2rem] flex items-center gap-2 rounded-full">
                        <img src="icon/coin.png" alt="" class="w-5 h-5 ml-2">
                        {ranking.userRank.coin_balance}
                    </div>
                </div>
            </div>
            
        </div>
        {/if}
    
    
    
    

   
     
    

   
    

   </div>