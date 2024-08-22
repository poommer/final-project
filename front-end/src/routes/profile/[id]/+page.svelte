<script>
	import ChapterMenu from './../../../lib/component/chapterMenu.svelte';
   import { onMount } from 'svelte';

    
import { PUBLIC_BASE_API_URL } from '$env/static/public'



import { goto } from '$app/navigation';
  import Nav from '../../../lib/component/nav.svelte';


  let dataLocal = {};

let profileData = async () => {
    
}

onMount( ()=> {
  dataLocal = JSON.parse(localStorage.getItem('user'))
  return dataLocal ;
})
</script>

<div class="w-full h-full flex">
    <nav class="w-[20%] bg-slate-50">
        <Nav  pageCurrent='home' />
    </nav>


  <main class="w-[80%] ">


    <div class=" flex flex-row justify-end space-x-3 mr-[50px] mt-[30px]">
      <button class=" w-[200px]  bg-red-600 rounded-xl shadow-[0px_10px_0_0#a11f1f] active:translate-y-[5px] active:shadow-[0px_5px_0_0_#a11f1f] ">chang password</button>
      <button class="w-[160px]  bg-ec-yellow rounded-xl shadow-[0px_10px_0_0#A66702] active:translate-y-[5px] active:shadow-[0px_5px_0_0_#A66702] ">quiz history</button>  
    </div>

      <img src="/imgProfile/man/1.jpg" alt="profile" class=" w-[200px] rounded-full ml-[600px] mt-[100px]" >

      <div class=" w-[400px] h-[50px] bg-ec-dark-blue-4 text-center text-[30px] ml-[500px] mt-[10px]  text-ec-yellow">
        username profile
      </div>

          <div class="flex flex-row gap-[100px] ml-[50px] mt-[30px]">
            <div class=" w-[700px] h-[350px] text-ec-yellow  bg-ec-dark-blue-3 rounded-sm">
            <p class=" ml-[20px] mt-[20px] text-[30px] ">Skill Grapg</p>
          </div>

      <div class=" w-[400px] h-[350px] bg-ec-dark-blue-3 rounded-sm">
            <p class=" ml-[20px] mt-[20px]  text-ec-yellow text-[30px] ">about me</p>
            <div class="flex space-x-[80px] text-[15px] text-ec-dark-blue-400 ml-[20px] ">
              <p>gender</p> 
              <p>birthday</p>
            </div>

            <div class="flex flex-row gap-[30px] text-center text-ec-dark-blue-300">
              <div class=" w-[100px] bg-ec-dark-blue-100 rounded-sm ml-[20px] ">
              <p>male</p>
            </div>

            <div class=" w-[220px] bg-ec-dark-blue-100 rounded-sm">
              <p>00/00/00</p>
            </div>
          
        </div>

            <div class="w-[350px] bg-ec-dark-blue-100 rounded-sm text-center text-ec-dark-blue-300 mt-[10px] ml-[20px]">
              <p>username@example.com</p>
            </div>

            <p class=" ml-[20px] mt-[20px]  text-ec-yellow text-[30px] ">your level</p>
             
            <div class="flex flex-row gap-[10px] text-center text-[25px] ml-[10px] text-ec-yellow">
              <div class=" w-[120px] bg-ec-dark-blue-1 rounded-2xl">
                <p>Chapter</p>
              </div>
              <div class="w-[120px] flex flex-row bg-ec-dark-blue-1 rounded-2xl gap-[15px]">
                <img src="/icon/coin.png" alt="" class=" w-[25px] h-[25px] mt-[7px] ml-[10px]">
                <p>120</p>
              </div>
              <div class="w-[120px] flex flex-row bg-ec-dark-blue-1 rounded-2xl gap-[10px]">
                <img src="/icon/xp.png" alt="" class=" w-[30px] h-[30px] ml-[5px]">
                <p>3200</p>
              </div>
              
            </div>
            <div class=" w-[380px] bg-ec-dark-blue-1 rounded-2xl mt-[10px] ml-[10px]">
              ...
            </div>
    </div>  
    

  </main>
</div>
