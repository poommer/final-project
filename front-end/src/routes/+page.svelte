<script>
  import { onMount } from 'svelte';
	import Homepage from '../lib/pages/homepage.svelte';
import Login from './../lib/pages/login.svelte';
let user
    const loadData = async()=>{
      user =  localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : localStorage.getItem('user');
      console.log(user);
      return user
    }
</script>

{#await loadData()}
loading...    
{:then loaded} 
    {#if user == null}
        <Login />
    {:else}
    
      <Homepage />

    {/if}
{/await}