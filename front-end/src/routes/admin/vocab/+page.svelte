<script>
	import { goto } from '$app/navigation';
	import { PUBLIC_BASE_API_URL } from '$env/static/public';
  import { onMount } from 'svelte';

  import axios from 'axios';



    export let data;

    let msg;

    console.log(data);

    onMount(()=>{

        if(sessionStorage.getItem('msg')){
            msg = sessionStorage.getItem('msg');
        }
        sessionStorage.removeItem('msg')

    })


    let deleteVocal = async (id) => {
        console.log(id);
        let del = await axios.delete(`${PUBLIC_BASE_API_URL}/api/vocab/delete/${id}`)
        
        if(del.status === 200){
            sessionStorage.setItem('msg', 'ลบคำศัพท์แล้ว')
        }else{
            sessionStorage.setItem('msg', 'ไม่สามารถลบได้ โปรลองอีกครั้ง')
            
        }
        window.location.reload(false);
    }
    
</script>

{#if msg !== undefined}
    {msg}
{/if}

<div>
    <div class="flex justify-between items-center border-b-2 border-b-zinc-500 p-2">
        <h1 class="text-5xl">vocabulary</h1>
        <a href="/admin/vocab/uploads" class="w-[8rem] rounded bg-ec-purple text-white text-2xl p-2 flex justify-center items-center hover:bg-ec-purple-800">สร้างใหม่</a>
    </div>
</div>

<table class="w-[100%] border-ec-purple-800 border-[2px] mt-4">
    <thead>
      <tr class="bg-ec-purple-600 text-white text-center ">
        <th class="w-[30%]">word english</th>
        <th class="w-[30%]">word thai</th>
        <th class="w-[15%]">part of speech</th>
        <th class="w-[15%]">word list</th>
        <th class="w-[5%]">media</th>
        <th class="w-[5%]">action</th>
      </tr>
    </thead>
  
    <tbody>
        {#each data.result as item,i }
        <!-- {item} -->
      <tr  class=" text-center border-t-2 border-t-ec-purple-600" >
        <td  class=" border-r-2 border-r-ec-purple-600">{item.word_en}</td>
        <td class=" border-r-2 border-r-ec-purple-600">{item.word_th}</td>
        <td class=" border-r-2 border-r-ec-purple-600">{item.wl_name}</td>
        <td class=" border-r-2 border-r-ec-purple-600">{item.pos_name}</td>
        <td class=" border-r-2 border-r-ec-purple-600">
          <img src={item.imageURL} alt="" class='max-w-[10rem]' />
            <audio controls src={item.soundURL}></audio>
          </td>
          <td class="flex justify-center items-center text-center">
            <button on:click={()=>{deleteVocal(item.vocab_ID)}}>
                <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#EA3323"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
            </button>
            </td>
          </tr>
          
    
      {/each}
    </tbody>
  </table>