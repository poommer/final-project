<script>
	import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import Button from "./button.svelte";


    export let pageCurrent;

    export let fileNav ;

    let popupLogout = false;


let dataLocal;

let profileData = async () => {
    if(localStorage.getItem('user')){
        dataLocal = JSON.parse(localStorage.getItem('user'))
        return dataLocal ;
    }

    sessionStorage.setItem('error', 'login, please.')
    goto('/')

}
</script>

<div class=" w-[20%] h-screen bg-ec-dark-blue-2 fixed">
    {#await profileData() then dataLocal }
    <div class=" relative">
        <!-- <div class="absolute w-auto">
           <a href="/"> <img src="/favicon.png" alt="icon" class="m-0 p-0 w-20"></a>
        </div> -->

        

        <div class={`bg-ec-dark-blue-3   flex items-center justify-between p-2`}>
            <a href={`/profile/${dataLocal.user_ID}`}
            class={`flex  rounded-full p-2 ${ pageCurrent === 'profile' ? 'bg-ec-purple text-ec-light-yellow shadow-[5px_5px_0px_0px_#FFC700] hover:bg-[#8b43d3] hover:text-[#f5d975] hover:shadow-[3px_3px_0px_0px_#d5b64a] active:shadow-[2px_2px_0px_0px_#FFC700]' : 'bg-ec-dark-blue-1  text-white shadow-[5px_5px_0px_0px_#181b24] hover:bg-[#434752] hover:text-[#939393] hover:shadow-[3px_3px_0px_0px_#2a2f3c] active:shadow-[2px_2px_0px_0px_#181b24] active:bg-ec-dark-blue-1  active:text-white'}`}
            >
                <img src="/imgProfile/man/1.jpg" alt="" class="w-[40px] h-[40px] rounded-full">
                <div class="text-ec-light-yellow ml-2">{dataLocal.user_name}</div>
            </a>

            <button on:click={()=>{localStorage.removeItem('user'); dataLocal = localStorage.getItem('user'); window.location = '/'}} class="btn bg-white h-[2.5rem]  w-[5rem] text-rose-800 shadow-[0px_5px_0px_0px_#cdcdcd] hover:shadow-[0px_2px_0px_0px_#B4B4B4]">
                logout
            </button>
        </div>

        

    </div>


    <ul class="flex flex-col justify-center items-center gap-8 mt-8">
        <li class={`btn ${ pageCurrent === 'home' ? 'bg-ec-purple text-ec-light-yellow shadow-[0px_10px_0px_0px_#FFC700] hover:bg-[#8b43d3] hover:text-[#f5d975] hover:shadow-[0px_5px_0px_0px_#d5b64a] active:shadow-[0px_5px_0px_0px_#FFC700]' : 'bg-ec-dark-blue-1  text-white shadow-[0px_10px_0px_0px_#181b24] hover:bg-[#434752] hover:text-[#939393] hover:shadow-[0px_5px_0px_0px_#2a2f3c] active:shadow-[0px_5px_0px_0px_#181b24] active:bg-ec-dark-blue-1  active:text-white'} `} on:click={()=>{window.location = '/'}}>Homepage</li>
        <li class={`btn ${ pageCurrent === 'quiz' ? 'bg-ec-purple text-ec-light-yellow shadow-[0px_10px_0px_0px_#FFC700] hover:bg-[#8b43d3] hover:text-[#f5d975] hover:shadow-[0px_5px_0px_0px_#d5b64a] active:shadow-[0px_5px_0px_0px_#FFC700]' : 'bg-ec-dark-blue-1  text-white shadow-[0px_10px_0px_0px_#181b24] hover:bg-[#434752] hover:text-[#939393] hover:shadow-[0px_5px_0px_0px_#2a2f3c] active:shadow-[0px_5px_0px_0px_#181b24] active:bg-ec-dark-blue-1  active:text-white'} `} on:click={()=>{window.location = '/quiz'}}>Quiz game</li>
        <li class={`btn ${ pageCurrent === 'mission' ? 'bg-ec-purple text-ec-light-yellow shadow-[0px_10px_0px_0px_#FFC700] hover:bg-[#8b43d3] hover:text-[#f5d975] hover:shadow-[0px_5px_0px_0px_#d5b64a] active:shadow-[0px_5px_0px_0px_#FFC700]' : 'bg-ec-dark-blue-1  text-white shadow-[0px_10px_0px_0px_#181b24] hover:bg-[#434752] hover:text-[#939393] hover:shadow-[0px_5px_0px_0px_#2a2f3c] active:shadow-[0px_5px_0px_0px_#181b24] active:bg-ec-dark-blue-1  active:text-white'} `} on:click={()=>{window.location = '/ecdle'}}>ECdle Mission</li>
    </ul>

    


    {/await}

</div>