<script>
	import Msg from './../../../lib/component/msg.svelte';
	import { Chart } from 'chart.js/auto';
	import  moment  from 'moment-timezone';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Nav from '../../../lib/component/nav.svelte';
  import axios from 'axios';
  import ChartUser from '../../../lib/component/chartUser.svelte';
  import 'animate.css';

  let dataLocal = {};

  let data ;
  let skill ;
  let statistic ;
  let bd;

  let msg;

  let Edit = false

  let name ;


let profileData = async () => {
    dataLocal =  JSON.parse(localStorage.getItem('user'))
    const response = await axios.get(`https://api-ecproject.poommer.in.th/api/user/profile/${dataLocal.user_ID}/show`)
    const response_skill = await axios.get(`https://api-ecproject.poommer.in.th/api/user/${dataLocal.user_ID}/statistic`)
    data = response.data
    skill = response_skill.data.result[0]
    bd = moment(data.result.profile.user_birthday).format('YYYY/MM/DD')
    name = data.result.profile.user_name
    console.log(skill);
    
}

let saveProfile = async () => {
  let response = await axios.put(`https://api-ecproject.poommer.in.th/api/user/auth/register`,
        {
            "id": data.result.profile.user_ID,
            "name": name,
            "birthday": bd,
            "gender":data.result.profile.user_gender
        }
      )

      if(response.data.status == 200){
        dataLocal.user_name = name
        console.log(dataLocal);
        localStorage.setItem('user',JSON.stringify(dataLocal))
      }
      msg = true
  Edit = false
      console.log(response);
      

}



onMount( ()=> {
  
  
  console.log(dataLocal);
})
</script>

{#await profileData() }
  load
{:then loaded } 
<div class="w-full h-full flex">
    <nav class="w-[20%] bg-slate-50">
        <Nav  pageCurrent='profile' />
    </nav>


  <main class="w-[80%] ">
    <div class="w-full h-screen b flex flex-col justify-between items-center">
      <div class="w-full h-[10vh] ">
        <div class=" flex flex-row justify-end space-x-3 mr-[50px] mt-[30px]">
          <button class="w-[160px]  bg-ec-yellow rounded-xl shadow-[0px_10px_0_0#A66702] active:translate-y-[5px] active:shadow-[0px_5px_0_0_#A66702] ">quiz history</button>  
        </div>
      </div>
      
      <div class="w-full h-[35vh] flex flex-col justify-center items-center">
        <img src="/imgProfile/man/1.jpg" alt="profile" class=" w-[200px] rounded-full" >
  
        <div class={`w-[400px] h-[50px] flex items-center justify-center gap-2 ${Edit?'bg-slate-200 border-2 border-ec-purple-800 text-ec-purple':'bg-ec-dark-blue-4 text-ec-yellow'} text-center text-[30px] mt-4  rounded-lg`}>
          {#if Edit}
          <input class="w-full text-center bg-transparent" type="text"  bind:value={name}>
          <button on:click={saveProfile}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#00c721"><path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z"/></svg>
          </button>
          {:else}
          {name}
          <button on:click={()=>{Edit = !Edit}}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
          </button>
          {/if}
        </div>
      </div>
      
      <div class="w-full h-[55vh] flex justify-center  gap-4 ">
        <div class=" w-[40rem] h-[30rem] text-ec-yellow  bg-ec-dark-blue-3 rounded-lg">
        <!-- <p class=" ml-[20px] mt-[20px] text-[30px] ">Skill chart</p> -->
        <div class="w-full flex justify-center items-center ">
          <ChartUser result={skill} />
        </div>
      </div>

      <div class="flex flex-col justify-between items-center h-[30rem] ">

        <div class=" w-[400px] h-[400px] bg-ec-dark-blue-3 rounded-lg">
              <p class=" ml-[20px] mt-[20px]  text-ec-yellow text-[30px] ">about me</p>
              <div class="flex space-x-[80px] text-[15px] text-ec-dark-blue-400 ml-[20px] ">
                <p>gender</p> 
                <p>birthday</p>
              </div>
  
              <div class="flex flex-row gap-[30px] text-center text-ec-dark-blue-500">
                <div class=" w-[100px] bg-ec-dark-blue-100 rounded-lg ml-[20px] ">
                  <p>{data.result.profile.user_gender}</p>
                </div>
  
                <div class=" w-[220px] bg-ec-dark-blue-100 rounded-lg">
                  <p>{bd}</p>
                </div>
            
              </div>
  
              <div class="flex space-x-[80px] text-[15px] text-ec-dark-blue-400 ml-[20px] ">
                <p>email</p> 
              </div>

              <div class="w-[350px] bg-ec-dark-blue-100 rounded-lg text-center text-ec-dark-blue-500 ml-[20px]">
                <p>{data.result.profile.user_email}</p>
              </div>
  
              <p class=" ml-[20px] mt-[20px]  text-ec-yellow text-[30px] ">your level</p>
                
              <div class="flex flex-row gap-[10px] text-center text-[25px] ml-[10px] text-ec-yellow">
                <div class="w-[120px] bg-ec-dark-blue-1 rounded-full overflow-hidden">
                  <div class="w-full h-full">
                    <div class={`lesson-currant h-full bg-ec-purple-600 relative `} style={`--lesson-content:'${data.result.progress.lesson}'; width:${data.result.progress.lesson_percen}%;`}>
                    </div>
                  </div>
                </div>

                <div class="w-[120px] flex flex-row bg-ec-dark-blue-1 rounded-full gap-[15px]">
                  <img src="/icon/coin.png" alt="" class=" w-[25px] h-[25px] mt-[7px] ml-[10px]">
                  <p>{data.result.profile.coin_balance}</p>
                </div>
                <div class="w-[120px] flex flex-row bg-ec-dark-blue-1 rounded-full gap-[10px]">
                  <img src="/icon/xp.png" alt="" class=" w-[30px] h-[30px] ml-[5px]">
                  <p>{data.result.profile.xp}</p>
                </div>
                
              </div>

              <div class="">
                <div class=" w-[380px] h-[3rem] bg-ec-dark-blue-1 rounded-full mt-[10px] ml-[10px] overflow-hidden">
                  <div class="w-full h-full ">
                    <div class="bg-ec-yellow h-full" style={`width:${data.result.progress.learning_percen}%`}></div>
                  </div>
                </div>

                <div class="flex justify-between items-center ml-2 mr-2 mt-2">
                  <p class="text-xl">
                    lesson 1
                  </p>
                  <p class="text-xl">
                    lesson 6
                  </p>
                  <p class="text-xl">
                    lesson 11
                  </p>
                </div>

              </div>
  
              <div>
              </div>
        </div>  
    

      </div>
    </div>
      
    </div>
    

  </main>
</div>
{/await}

{#if msg}
<Msg text={'Profile saved.'}  bind:status={msg} />
{/if}


