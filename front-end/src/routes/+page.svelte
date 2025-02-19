<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
	import Homepage from '../lib/pages/homepage.svelte';
import Login from './../lib/pages/login.svelte';
let user
let  path;
    const loadData = async()=>{
      path = $page.url.pathname.split('/')[1] ;
      user =  localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : localStorage.getItem('user');
      console.log(user);
      return user
    }
</script>

{#await loadData()}
loading...    
{:then loaded} 
    {#if user == null && path !== 'admin'}
        <Login />
    {:else}
    
      <Homepage />

    {/if}
{/await}