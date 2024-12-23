<script>
	import { goto } from '$app/navigation';
	import { PUBLIC_BASE_API_URL } from '$env/static/public';
  import { onMount } from 'svelte';

  import axios from 'axios';



    export let data;

    let msg;

   let pagin = data.result.pagination;

   let article = [];

   let currant_ArticlePage 
   let currant_Article = []
   
console.log(data);
    onMount(()=>{
      setArticle();

// for(let i = 1; i<=pagin; i++){
    
//     article.push(i)
//    }
//    article = article
   
   
        if(sessionStorage.getItem('msg')){
            msg = sessionStorage.getItem('msg');
        }
        sessionStorage.removeItem('msg')

    })

    let setArticle = () => {
      currant_ArticlePage  = 0

      let page_pagin = Math.ceil(pagin / 10)

      for(let i = 0; i<page_pagin; i++){
        article[i] = []
        let st =  (i*10)+1 
        let end =  st + 9 > pagin ? pagin : st + 9
        for(let y = st; y<=end; y++){
          article[i].push(y);
          console.log({pagin,i,y,st,end});
        }
        
      }
      article = article
      currant_Article  = article[currant_ArticlePage]
      console.log(article);
    }

    let nextPage = () => {
      currant_ArticlePage += 1
      currant_Article  = article[currant_ArticlePage]
    }
    let prev = () => {
      currant_ArticlePage -= 1
      currant_Article  = article[currant_ArticlePage]
    }

    let deleteVocal = async (id,word) => {
      console.log(id);
        const id_wordlist = id.split('-')[0]
        let del = await axios.delete(`https://api-ecproject.poommer.in.th/api/content/vocab/${id}?wl=${id_wordlist}&we=${word}`)
        
        if(del.status === 200){
            sessionStorage.setItem('msg', 'ลบคำศัพท์แล้ว')
        }else{
            sessionStorage.setItem('msg', 'ไม่สามารถลบได้ โปรลองอีกครั้ง')
            
        }
        window.location.reload(false);
    }
    
    console.log(data.result.resultLest);
    
</script>

{#if msg !== undefined}
    {msg}
{/if}

<div>
    <div class="flex justify-between items-center border-b-2 border-b-zinc-500 p-2 ">
        <h1 class="text-5xl">vocabulary</h1>
        <div class="flex gap-2">
          <a href="/admin/vocab/uploads" class="w-[8rem] rounded bg-ec-purple text-white text-2xl p-2 flex justify-center items-center hover:bg-ec-purple-800">สร้างใหม่</a>
          <div class="flex">
            <a href="/admin/vocab/uploads" class="w-[3rem] rounded bg-gray-500 text-white text-2xl p-2 flex justify-center items-center hover:bg-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M440-120v-240h80v80h320v80H520v80h-80Zm-320-80v-80h240v80H120Zm160-160v-80H120v-80h160v-80h80v240h-80Zm160-80v-80h400v80H440Zm160-160v-240h80v80h160v80H680v80h-80Zm-480-80v-80h400v80H120Z"/></svg>
            </a>
          </div>
        </div>
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
        {#each data.result.resultLest as item,i }
        <!-- {item} -->
      <tr  class=" text-center border-t-2 border-t-ec-purple-600" >
        <td  class=" border-r-2 border-r-ec-purple-600">{item.word_en}</td>
        <td class=" border-r-2 border-r-ec-purple-600">{item.word_th}</td>
        <td class=" border-r-2 border-r-ec-purple-600">{item.wl_name}</td>
        <td class=" border-r-2 border-r-ec-purple-600">{item.pos_name}</td>
        <td class=" border-r-2 border-r-ec-purple-600">
          {#if item.imageURL !== 'none'}
          <img src={item.imageURL} alt="" class='max-w-[10rem]' />
          {/if}
            <audio controls src={item.soundURL}></audio>
          </td>
          <td class="flex justify-center items-center text-center">
            <button on:click={()=>{deleteVocal(item.vocab_ID,item.word_en)}}>
                <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#EA3323"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
            </button>
            </td>
          </tr>
          
    
      {/each}
    </tbody>
  </table>

  <div class="flex gap-4 mt-4">
    <button class={`w-12 h-12 flex items-center justify-center text-4xl rounded-lg hover:bg-ec-purple-300  bg-ec-purple-900 text-white disabled:bg-gray-200 disabled:text-gray-400`} disabled={currant_ArticlePage === 0} on:click={prev}>
      &larr;</button>
    {#each currant_Article as item }
    <a href={`?page=${item}`} class={`w-12 h-12 flex items-center justify-center text-4xl rounded-lg hover:bg-ec-purple-300 ${data.result.currangePage === item ? 'bg-ec-purple text-white' : 'bg-slate-300'}`}>{item}</a>
    
    {/each}
    <button class={`w-12 h-12 flex items-center justify-center text-4xl rounded-lg hover:bg-ec-purple-300  bg-ec-purple-900 text-white disabled:bg-gray-200 disabled:text-gray-400`} disabled={currant_ArticlePage === Math.ceil(pagin/10) - 1} on:click={nextPage}>&rarr;</button>

  </div>