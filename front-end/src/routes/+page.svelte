<script>
    import { onMount } from 'svelte';

    // component import
    import Button from "../lib/component/button.svelte";
    import UserHomePage from '../lib/page/userHomePage.svelte';
    import Login from '../lib/page/login.svelte';
    
    // variable
    let error ;
    let userCheck;

/*****************************************************************/

    onMount(() => {

        error = sessionStorage.getItem('error')
        sessionStorage.removeItem('error')

        userCheck = localStorage.getItem('user')
        console.log(userCheck);

 

})
</script>
  
<title>home page</title>
  
  <!-- โค้ดหน้าเว็บ -->

<div class="w-full h-screen flex">
    {#if userCheck === undefined}
        loading....
    {:else if !userCheck}
        <Login error={error}/>

    {:else if userCheck}
    <UserHomePage error={error} />
    {/if}
  
</div>
  