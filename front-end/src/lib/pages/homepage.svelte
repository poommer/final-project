<script>
  import axios from "axios";
  import Button from "../components/button.svelte";
  import ChartUser from "../components/chartUser.svelte";
  import Input from "../components/input.svelte";
  import Ranking from "../components/ranking.svelte";

  let rank;

  let profileData = async () => {
    const dataLocal =  JSON.parse(localStorage.getItem('user'))
    const response = await axios.get(`https://api-ecproject.poommer.in.th/api/user/rank?user_ID=${dataLocal.user_ID}`)
    rank = response.data
    console.log(rank);
    
}

</script>
<div class="w-full flex flex-col lg:flex-row justify-stretch gap-6">
    <div class="h-[43rem] w-full lg:w-[30%] flex flex-col">
        <div class="flex gap-3 justify-start items-center">
            <img src="/icons/ranking-stars.svg" alt="" class="p-[10px] bg-ec-dark-blue-2 rounded-lg">
            <div class="flex flex-col uppercase justify-between">
                <h2 class="text-4xl">ranking</h2>
                <p class="text-base">update:yyyy/mm/dd; hh:ss</p>
            </div>
        </div>

        <div class="h-full border-2 border-ec-dark-blue-2 rounded-lg shadow-[10px_10px_0_0_#282C36] bg-white w-full mt-4 p-4 flex flex-col overflow-auto">
            {#await profileData()}
                loading...
            {:then} 
                <Ranking ranking={rank} />
            {/await}
        </div>

    </div> 

   <div class="h-full md:h-[43rem] w-full lg:w-[40%]  flex flex-col">
        <div class="w-full  h-full flex flex-col ">
            <div class="flex gap-3 items-center">
                <img src="/icons/ranking-stars.svg" alt="" class="p-[10px] bg-ec-dark-blue-2 rounded-lg">
                <div class="flex flex-col uppercase justify-between">
                    <h2 class="text-4xl">Progress Chart</h2>
                    <p class="text-base">Skills gained from studying</p>
                </div>
            </div>

            <div class="w-full h-full mt-4 flex justify-center items-center border-2 border-ec-dark-blue-2 rounded-lg shadow-[10px_10px_0_0_#282C36] bg-white">
                <div class="w-[80%]">
                    <ChartUser />
                </div>
            </div>
        </div> 
    </div>  
    
    <div class="h-[43rem] min-w-[30%] flex flex-col">
        <div class="flex gap-3 items-center">
            <img src="/icons/megaphone.svg" alt="" class="p-[10px] bg-ec-dark-blue-2 rounded-lg">
            <div class="flex flex-col uppercase justify-between">
                <h2 class="text-4xl">blog & news</h2>
                <p class="text-base">form <a href="https://www.scholarship.in.th" target="_blank" rel="noopener noreferrer">ScholarShip</a></p>
            </div>
        </div>

        <div class="w-full h-full mt-4 flex flex-col justify-center items-start gap-4 border-2 border-ec-dark-blue-2 rounded-lg shadow-[10px_10px_0_0_#282C36] bg-white overflow-auto">
            
        </div>
    </div>  
</div>