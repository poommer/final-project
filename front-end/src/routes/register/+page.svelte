<script>
    import axios from 'axios';
    import { goto } from '$app/navigation';
    import 'animate.css';
  import Input from '../../lib/components/input.svelte';
  import Button from '../../lib/components/button.svelte';

    export let prop_layout  ;
    let errorUpdate = false

    let username = 'dddd' ;
    let value;
    // let gender = 'male' ;
    let birthday ;

    let info = {username:null, gender:null, birthday:null};



    let userProps;
    let localUser;
let funcCheck = async () => {
    if(localStorage.getItem('user')){
    userProps = await JSON.parse(localStorage.getItem('user'));
    prop_layout = 'This is sent from +page.svelte';
    return userProps
    }else{
        sessionStorage.setItem('error', 'login, please.')
        goto('/')
    }
}





let register = async (userID) => {
    try{
        let {username, gender, birthday} = info ;
            console.log({
            "id": userID,
            "name": username,
            "birthday": birthday,
            "gender":gender
        });
        if(username !== null && gender !== null && birthday !== null){
        let response = await axios.put(`https://api-ecproject.poommer.in.th/api/user/auth/register`,
        {
            "id": userID,
            "name": username,
            "birthday": birthday,
            "gender":gender
        }
        
    )
    
     console.log('data:',{
            lesson_ID:'1-1', 
            user_ID:userID
        });
    if(response.data.status === 200){
        const enroll = await axios.post('https://api-ecproject.poommer.in.th/api/lessons/enroll/',
        {
            lesson_ID:'1-1', 
            user_ID:userID
        }
        )
       
        
        if(enroll){
            const dataU = await JSON.parse(localStorage.getItem('user'));
            const status = 'verified'
            localStorage.setItem('user',JSON.stringify({...dataU, user_name:username, user_status:status}))
            goto('/')
        }
    }
}else{
    errorUpdate = true
}

}catch(err){
        console.log(err);
        
    }
}

console.log('userProps', userProps);




let keyupUpdate = async () =>{

    if(errorUpdate){
        if(username.length > 0 ||  birthday.length > 0){
            errorUpdate = false
        }
    }
}


const handleValue = (value, key) => {
    info[key] = value.detail;
    console.log(value.detail);  
    keyupUpdate();
}


 
</script>


{#await funcCheck()}
    <p>loading...</p>
{:then userlocal} 
<!-- {#if userlocal && userlocal.user_status === 'wait verify'} -->
<div class="relative h-lvh bg-[#fafafa] bg-[url('/icon_compnnents/grid.svg')] bg-no-repeat bg-cover bg-center p-8 z-0
before:absolute before:bg-ec-yellow before:w-full before:h-[20rem] before:left-0 before:bottom-0 before:z-0
">
    <main class="relative w-full h-full bg-[#FFFFFFD4] p-4 rounded-xl overflow-auto shadow-[0_0_5px_0_#00000096] z-50">
        <div class="text-sm  md:text-xl h-auto md:h-[8%] font-bold mt-1 flex flex-col md:flex-row items-center md:items-start gap-4 text-gray-700 ">
            <div class="flex justify-center sm:justify-end items-center gap-2">

              <img src="/logo-ec-none-border.png" 
              alt=""
              class="w-[64px] h-[64px]"
              >
   
              <a href="https://www.facebook.com/ittvc" target="_blank">
                  <img src="/it_logo.png" 
                  alt=""
                  class="w-[64px] h-[64px] rounded-full  border-[3px] border-[#1a78f4]"
                  >
              </a>
      
              <a href="https://www.thonburi.ac.th" target="_blank">
                  <img src="/tvc_logo.png"
                  alt=""
                  class="w-[64px] h-[64px]"
                  >
              </a>
            </div>
            <div class="hidden md:flex flex-col-reverse md:flex-col items-center md:items-start gap-2"> 
              <p>
                  power by <a href="#" class="text-ec-yellow-700 underline">group 2</a>
              </p>
              <p>
                  Vocational Skills Development Project
              </p>
            </div>
          </div>

        <div class="h-auto md:h-[90%] flex flex-col md:justify-center md:items-center">
    <h1 class="text-3xl w-full md:w-[30rem] ">
        <div class="h-[2.5rem] my-4">
            <Button 
                            options={{bg:'red', style:'style1'}}
                            SetHeight={true}
                            click={()=>{
                                localStorage.removeItem('user'); 
                                window.location = '/';
                                }}>
                                logout
                            </Button>
        </div>
        Hello, welcome to 
        <br><span class="text-6xl font-bold text-ec-yellow-600 ">EC english learning</span>
    </h1>

    {#if errorUpdate}
    <p class="text-ec-yellow-700 bg-ec-light-yellow p-2 rounded-xl mt-2 shadow-[3px_3px_0px_0px_#abababfa]">error, Fill in all fields.</p>
    {/if}

    <div class="w-full md:w-[30rem] flex flex-col gap-2">
            <p>let's get to know each other😍</p>
            <Input 
            type='text'
            label='username'
            on:update={(event)=>{handleValue(event, 'username')}}
            > 
            
            </Input>

            <Input 
            type='date'
            label='birth day'
            on:update={(event)=>{handleValue(event, 'birthday')}}
            > 
            
            </Input>

        <div>  
            <label for="gender">gender</label> 
            <div 
            class={`
            flex justify-between items-center
                w-full h-16 text-2xl p-2 rounded-md border-2 ring-0 focus:ring-0 outline-0 transition-all bg-white 
                border-ec-dark-blue-3 shadow-[10px_10px_0_0_#3a4252] focus:shadow-[5px_5px_0_0_#3a4252] focus:translate-y-1 focus:translate-x-1
                `}
            >
                <label for="male" class={`w-[30%] p-2 flex justify-center items-center rounded-[10px] transition-all cursor-pointer ${info.gender == 'male' ? 'bg-[#4099FF] hover:bg-[#3b7bc5]' : 'bg-[#F6F6F6] hover:bg-[#e9e9e9]'}`}>
                    <input type="radio" name="gender" value="male" id="male"  bind:group={info.gender} class="hidden" checked>
                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" class={`w-[32px] h-[32px] transition-all ${info.gender == 'male' ? 'fill-white' : 'fill-[#4099FF]'}`}>
                        <path
                            d="M20,8a8,8,0,1,0-9,7.931V19H9a1,1,0,0,0,0,2h2v2a1,1,0,0,0,2,0V21h2a1,1,0,0,0,0-2H13V15.931A8.008,8.008,0,0,0,20,8ZM6,8a6,6,0,1,1,6,6A6.006,6.006,0,0,1,6,8Z" />
                    </svg>
                </label>

                <label for="female" class={`w-[30%] p-2 flex justify-center items-center rounded-[10px] transition-all cursor-pointer ${info.gender == 'female' ? 'bg-[#DE6A91] hover:bg-[#cf4774]' : 'bg-[#F6F6F6] hover:bg-[#e9e9e9]'}`}>
                    <input type="radio" name="gender" value="female" id="female"  bind:group={info.gender} class="hidden" checked>
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px"
                        y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"  class={`w-[32px] h-[32px] transition-all ${info.gender == 'female' ? 'fill-white' : 'fill-[#DE6A91]'}`}>
                        <path
                            d="M448.249,0H341.999c-11.736,0-21.25,9.53-21.25,21.285s9.514,21.285,21.25,21.285h97.453L294.271,187.991  c-78.572-62.08-192.511-48.605-254.488,30.097S-8.742,410.916,69.83,472.996s192.511,48.605,254.488-30.097  c51.91-65.917,51.91-158.893,0-224.81L469.5,72.668v97.614c0,11.756,9.514,21.285,21.25,21.285s21.25-9.53,21.25-21.285V63.856  C512,28.589,483.458,0,448.249,0z M182.622,468.275c-76.285,0-138.126-61.943-138.126-138.354s61.841-138.354,138.126-138.354  s138.126,61.943,138.126,138.354C320.655,406.293,258.868,468.181,182.622,468.275z" />
                    </svg>
                </label>

                <label for="other" class={` w-[30%] p-2 flex justify-center items-center rounded-[10px] transition-all cursor-pointer ${info.gender == 'other' ? 'bg-[#BA4ACB] hover:bg-[#8c2f9b]' : 'bg-[#F6F6F6] hover:bg-[#e9e9e9]'}`}>
                    <input type="radio" name="gender" value="other" id="other"  bind:group={info.gender} class="hidden" checked> 
                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" class={`w-[32px] h-[32px] transition-all ${info.gender == 'other' ? 'fill-white' : 'fill-[#BA4ACB]'}`}>
                        <path
                            d="M22,0H18V2h2.586l-2.4,2.4a6.941,6.941,0,0,0-7.693-.449A6.989,6.989,0,1,0,6,16.92V19H3v2H6v3H8V21h3V19H8V16.927a6.934,6.934,0,0,0,2.491-.88A6.986,6.986,0,0,0,19.6,5.816l2.4-2.4V6h2V2A2,2,0,0,0,22,0ZM2,10A4.971,4.971,0,0,1,8.788,5.344a6.956,6.956,0,0,0,0,9.312A4.971,4.971,0,0,1,2,10Zm12,5a5,5,0,1,1,5-5A5.006,5.006,0,0,1,14,15Z" />
                    </svg>
                </label>
            </div>
        </div>
        

        <div class="h-[3rem] mt-4">
            <Button 
            options={{bg:'green', style:'style1'}}
            SetHeight={true}
            click={()=>{register(userlocal.user_ID)}}
            >submit</Button>
        </div>
        <!-- <button on:click={()=>{register(userlocal.user_ID)}} class="bg-slate-100 text-gray-800 p-1 rounded-sm mt-4"></button> -->

    </div>
        </div>
</main>
</div>

<!-- {:else} -->
<!-- <h1>
        404 <br>
        <span>Not Found</span>
    </h1>
{/if}-->
{/await} 
    



