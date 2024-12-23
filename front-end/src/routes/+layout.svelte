<script>
	import LayoutQuiz from './../layout/layout_quiz.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
  import { onMount, onDestroy } from "svelte";
  import "../app.css";
  import HeaderNav from '../lib/components/header-nav.svelte';
  let profile_status = false ;
  let burger_status = false ;

    $: path = $page.url.pathname.split('/')[1] ;
    console.log(path);
    $: user = {};
    
    const loadLayout = async()=>{
      if(localStorage.getItem('user')){
        const loadLocal =   JSON.parse(localStorage.getItem('user')) ;
        user = {...loadLocal} ;
        console.log(user);
      }else{
        user = null
        goto('/');
      }
      
    }

    // ฟังก์ชันปิดเมนูเมื่อคลิกนอก
  const closeMenus = (event) => {
    // เช็คว่า target ของคลิกไม่ได้อยู่ใน HeaderNav
    if (!event.target.closest(".header-nav")) {
      profile_status = false;
      burger_status = false;
    }
  };

// เช็คว่าไม่ใช่ SSR ก่อน
if (!import.meta.env.SSR) {
    onMount(() => {
      window.addEventListener("click", closeMenus);
      // 
    });

    onDestroy(() => {
      window.removeEventListener("click", closeMenus);
    });
  }

  </script>

    <!-- page = {$page.url.pathname} -->

{#await loadLayout()}
<div class="loading-spinner">Loading...12</div>
{:then} 
{#if user === null}
<slot  />
{:else if path === 'admin'}
<slot  />
{:else if (path === 'quiz' && $page.url.pathname.split('/')[2]) || (path === 'lessons' && $page.url.pathname.split('/')[2])}
<div class="w-full h-screen  fixed">
  <LayoutQuiz>
  <slot />
  </LayoutQuiz>
</div>



{:else }
<div class="h-lvh bg-[#F2F2F2] bg-[url('/background.png')] bg-no-repeat bg-cover bg-center " >
  <div class="h-full p-[10px] sm:p-5">
    <header class="h-[10%] ">
      <HeaderNav 
      class="header-nav" 
      username={user.user_name} 
      id={user.user_ID} 
      bind:profile_status 
      bind:burger_status />
    </header>
    <main class="w-full h-[82%] bg-[#FFFFFFD4] p-5 rounded-xl overflow-auto shadow-[0_0_5px_0_#00000096]">
        <slot  />
    </main>  
    <footer class="h-[8%] text-sm mt-1 flex flex-col justify-end text-gray-700">
      <div class="flex justify-center sm:justify-end items-center gap-2">
        Copyright © & With support from
        <a href="https://www.facebook.com/ittvc" target="_blank">
            <img src="/it_logo.png" 
            alt=""
            class="w-[32px] h-[32px]"
            >
        </a>

        <a href="https://www.thonburi.ac.th" target="_blank">
            <img src="/tvc_logo.png"
            alt=""
            class="w-[32px] h-[32px]"
            >
        </a>
      </div>
      <div class="flex justify-center sm:justify-end items-center gap-2">
        power by group 3 | Vocational Skills Development Project
      </div>
    </footer>
  </div>
</div>

{/if}
{/await}