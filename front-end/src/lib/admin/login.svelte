<script>
    import axios from "axios";
let username = '';
let password = '';

let msg_status = false;
let msg = '';

const login = async()=>{
    const response = await axios.get(`https://api-ecproject.poommer.in.th/api/admin/account?username=${username}&password=${password}`)
    console.log('response',response.data);
    if(response.data.status == 200){
        const adminData = {
            id:response.data.ad_ID,
            username:response.data.username
        }
        localStorage.setItem('admin', JSON.stringify(adminData))
        console.log('adminData', adminData);
        window.location = '/admin';
    }else{
        msg_status = true;
        msg = response.data.message;
    }

    
}
</script>

<div class="w-full h-screen bg-zinc-200 flex justify-center items-center">
    <div class="w-[30rem] h-[25rem] bg-white shadow-[0px_0px_5px_2px_#00000036]">
        <div class="bg-purple-800 p-4">
            <h1 class="text-white text-5xl uppercase text-center">login to Admin</h1>
        </div>

        <div class="p-4 flex flex-col gap-4">
            
            <input 
            type="text" 
            
            bind:value={username}
            class={`w-full border-2 text-2xl p-4 rounded-full ring-0 focus:ring-0 outline-0 focus:border-violet-500 ${username !== ''? 'border-violet-700' : ''}`}
            placeholder="username"
            >
            <input 
            type="password" 
            
            bind:value={password}
            class={`w-full border-2 text-2xl p-4 rounded-full ring-0 focus:ring-0 outline-0 focus:border-violet-500 ${password !== ''? 'border-violet-700' : ''}`}
            placeholder="password"
            >

            <button
            on:click={login}
            class={`w-full border-2 text-2xl p-4 rounded-lg ring-0 focus:ring-0 outline-0 bg-purple-800 hover:bg-purple-600 border-purple-800 text-white`}
            >
                login
            </button>
            {#if msg_status == true}
                <p class=" text-red-600">
                    {msg}
                </p>
            {/if}
        </div>
    </div>
</div>