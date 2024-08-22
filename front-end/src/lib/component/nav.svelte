<script>
    import { onMount } from 'svelte';
    import Button from "./button.svelte";


    export let pageCurrent;

    export let fileNav ;

    let popupLogout = false;


let dataLocal;

let profileData = async () => {
    dataLocal = JSON.parse(localStorage.getItem('user'))

    return dataLocal ;
}
</script>

<div class=" w-[20%] h-screen bg-ec-dark-blue-2 fixed">
    {#await profileData() then dataLocal }
    <div class=" relative">
        <div class="absolute w-auto">
            <img src="/favicon.png" alt="icon" class="m-0 p-0 w-20">
        </div>

        <div class="bg-ec-dark-blue-3 flex items-end justify-end p-2">
            <button class="max-w-[80%]  flex justify-end p-2 gap-2 bg-ec-dark-blue-1 rounded-full" on:click={()=>{popupLogout = !popupLogout; console.log(popupLogout);
            }}>
                <img src="/imgProfile/man/1.jpg" alt="" class="w-[40px] h-[40px] rounded-full">
                <div class="text-ec-light-yellow">{dataLocal.user_name}</div>
            </button>
        </div>

        

    </div>

    <div class={`absolute right-0 mt-1 mr-1 bg-slate-600 min-w-[16rem] p-2 min-h-[7rem] ${popupLogout === true ? 'flex' : 'hidden'} flex-col justify-between`}>
        <div>
            <p><span class="text-ec-yellow text-xl">login with email:</span> <br>
                {dataLocal.user_email}</p>
        </div>
        <a href={`profile/${dataLocal.user_ID}`}>profile</a>
        <div class="flex justify-end pb-2">
            <Button funcBtn={()=>{localStorage.removeItem('user'); dataLocal = localStorage.getItem('user'); window.location = '/'}} compoData={{bg:'white', Text:'rose-800', shadowColor:'#cdcdcd', shadowColorActive:'#B4B4B4',other:''}}>
                logout
            </Button>
        </div>
    </div>

    <ul class="flex flex-col justify-center items-center gap-8 mt-8">
        <li class={`btn ${ pageCurrent === 'home' ? 'bg-ec-purple text-ec-light-yellow shadow-[0px_10px_0px_0px_#FFC700] hover:bg-[#8b43d3] hover:text-[#f5d975] hover:shadow-[0px_5px_0px_0px_#d5b64a] active:shadow-[0px_5px_0px_0px_#FFC700]' : 'bg-ec-dark-blue-1  text-white shadow-[0px_10px_0px_0px_#181b24] hover:bg-[#434752] hover:text-[#939393] hover:shadow-[0px_5px_0px_0px_#2a2f3c] active:shadow-[0px_5px_0px_0px_#181b24] active:bg-ec-dark-blue-1  active:text-white'} `} on:click={()=>{window.location = '/'}}>Homepage</li>
        <li class={`btn ${ pageCurrent === 'quiz' ? 'bg-ec-purple text-ec-light-yellow shadow-[0px_10px_0px_0px_#FFC700] hover:bg-[#8b43d3] hover:text-[#f5d975] hover:shadow-[0px_5px_0px_0px_#d5b64a] active:shadow-[0px_5px_0px_0px_#FFC700]' : 'bg-ec-dark-blue-1  text-white shadow-[0px_10px_0px_0px_#181b24] hover:bg-[#434752] hover:text-[#939393] hover:shadow-[0px_5px_0px_0px_#2a2f3c] active:shadow-[0px_5px_0px_0px_#181b24] active:bg-ec-dark-blue-1  active:text-white'} `} on:click={()=>{window.location = '/quiz'}}>Quiz game</li>
        <li class={`btn ${ pageCurrent === 'mission' ? 'bg-ec-purple text-ec-light-yellow shadow-[0px_10px_0px_0px_#FFC700] hover:bg-[#8b43d3] hover:text-[#f5d975] hover:shadow-[0px_5px_0px_0px_#d5b64a] active:shadow-[0px_5px_0px_0px_#FFC700]' : 'bg-ec-dark-blue-1  text-white shadow-[0px_10px_0px_0px_#181b24] hover:bg-[#434752] hover:text-[#939393] hover:shadow-[0px_5px_0px_0px_#2a2f3c] active:shadow-[0px_5px_0px_0px_#181b24] active:bg-ec-dark-blue-1  active:text-white'} `} on:click={()=>{window.location = '/ecdle'}}>ECdle Mission</li>
    </ul>

    


    {/await}

</div>