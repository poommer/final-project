<script>
    	import { page } from '$app/stores';
        import { goto } from '$app/navigation';
    import 'animate.css';
  import Button from './button.svelte';
    export let username ; 
    export let id ; 
    
    // let name = username.user_name ;
    $: path = $page.url.pathname.split('/')[1] ;
    export let burger_status = false ;
    export let profile_status = false ;

    let active = "text-[#8D5EBB] before:w-full"
    let nav_hover = `relative hover:text-ec-purple before:contents-[''] before:bottom-0 before:absolute before:h-[3px] before:bg-ec-purple-800 before:hover:w-full before:transition-all `
</script>
<div class="header-nav w-full flex justify-between items-center bg-ec-yellow rounded-full px-5 py-[5px] border-2 border-ec-dark-blue-2 shadow-[5px_5px_0px_0px_#343946]">
    <a href="/" class="flex items-center justify-center gap-[10px]">
        <img src="/logo_for_white.png" alt="" class="w-[50px] h-[50px]">
        <h1 class="hidden sm:block text-ec-dark-blue-1 uppercase">EC english learning</h1>
    </a>

    <ul 
    on:click={()=>{burger_status = false; profile_status = false;}}
    class={`
     text-lg sm:text-xl z-[99999]
    shadow-[5px_5px_0px_0px_#373C4A] p-2 rounded-md border-2 border-[#373C4A]
    ${
    burger_status === true 
    ? 'absolute bg-[#fffffff5] right-8 top-[5rem]'
    : 'hidden'
    }
    md:shadow-none md:border-none
    md:bg-transparent md:static md:flex gap-5`}>
        <li class={`${path === '' ? active : 'before:w-0'} ${nav_hover}`}>
            <a href="/">HOME</a>
        </li>
        <li class={`${path === 'lessons' ? active : 'before:w-0'} ${nav_hover}`}>
            <a href="/lessons">LESSONS</a>
        </li> 
        <li class={`$ ${nav_hover}`}>
            <a target="_blank"  href="https://docs.google.com/forms/d/e/1FAIpQLSd3AxNXDsI0ks3qUq2UkCL1On4XU2fCkPkOa0EPsIIskqC8IQ/viewform">ประเมิน</a>
        </li> 
        <li on:click|stopPropagation>
            <button on:click={()=>{profile_status = !profile_status}} class={`flex justify-center items-center gap-2 ${path === 'user' ? active : 'before:w-0'} ${nav_hover}`}>
                <span class="hidden md:block">{username}</span>
                <img src="/icons/angle-small-down.svg" alt=""  class="hidden md:block w-[16px] h-[16px]">
            </button>
            <ul class={`
                ${profile_status === true 
                ? ' md:absolute md:bg-white md:right-12 md:top-[5.25rem] ': 'md:hidden'}
                text-lg shadow-none border-0 bg-transparent w-[10rem]
                md:shadow-[5px_5px_0px_0px_#373C4A] md:p-2 md:rounded-md md:border-2 md:border-[#373C4A]
                sm:text-xl  
               `}>
                   <li class="mt-4 p-2 rounded-2xl flex justify-center items-center">

                        <Button 
                        options={{bg:'red', style:'style1'}}
                        click={()=>{
                            localStorage.removeItem('user'); 
                            window.location = '/';
                            }}>
                            logout
                        </Button>

       
                </li>
               </ul>
        </li>
    </ul>

    <button 
    on:click={()=>{burger_status = !burger_status}}
    class="md:hidden w-[40px] h-[40px] flex justify-center items-center bg-white rounded-full border-2 border-[#373C4A] shadow-[3px_3px_0px_0px_#373C4A]">
        <img 
        src="/icons/menu-burger.svg" 
        alt=""
        class="w-5 h-5"
        >
    </button>
</div>