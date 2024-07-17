<script>
    import Button from "./button.svelte";
    export let username;
    export let email;
    export let userCheck;

    let popupLogout = false;
</script>

<div class=" w-[20%] h-screen bg-ec-dark-blue-2 fixed">
    <div class=" relative">
        <div class="absolute w-auto">
            <img src="favicon.png" alt="icon" class="m-0 p-0 w-20">
        </div>

        <div class="bg-ec-dark-blue-3 flex items-end justify-end p-2">
            <button class="max-w-[80%]  flex justify-end p-2 gap-2 bg-ec-dark-blue-1 rounded-full" on:click={()=>{popupLogout = !popupLogout; console.log(popupLogout);
            }}>
                <img src="imgProfile/man/1.jpg" alt="" class="w-[40px] h-[40px] rounded-full">
                <div class="text-ec-light-yellow">{username}</div>
            </button>
        </div>

        

    </div>

    <div class={`absolute right-0 mt-1 mr-1 bg-slate-600 min-w-[16rem] p-2 min-h-[7rem] ${popupLogout === true ? 'flex' : 'hidden'} flex-col justify-between`}>
        <!-- <a href="#" class="flex justify-center items-center gap-2">
            Edit profile
            <span class="material-symbols-outlined">
                edit
                </span>
        </a> -->
        <div>
            <p><span class="text-ec-yellow text-xl">login with email:</span> <br>
                {email}</p>
        </div>
        <div class="flex justify-end pb-2">
            <Button funcBtn={()=>{localStorage.removeItem('user'); userCheck = localStorage.getItem('user'); window.location = '/'}} compoData={{bg:'white', Text:'rose-800', shadowColor:'#cdcdcd', shadowColorActive:'#B4B4B4',other:''}}>
                logout
            </Button>
        </div>
    </div>
</div>