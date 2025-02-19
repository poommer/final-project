<script>
  import { onMount } from "svelte";
    import "../../app.css";
    import Nav from "../../lib/admin/nav.svelte";
  import Login from "../../lib/admin/login.svelte";

    // let user = localStorage.getItem('user')
    // console.log(user);
    const Auth = async() => {
      const checkUser = await localStorage.getItem('user');
      if(checkUser){
        window.location = "/"
      }else{
        const checkAdmin = await localStorage.getItem('admin');
        return checkAdmin ;
      }
    }

  </script>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Prompt&display=swap');
  :global(body){
    font-family: "Prompt", serif;
        background-color: #f1f1f1;
        color: #353535;
      }

</style>


{#await Auth()}
  loading...
{:then response} 
  {#if response === null}
    <Login />
  {:else}
    <div class="w-full h-screen flex flex-col-reverse sm:flex-row">
      <nav class="
      fixed bottom-0 w-full
      sm:w-2/12 
      ">
        <Nav/>
      </nav>
    
      <main class="
      w-full p-4 h-screen
      sm:w-10/12 sm:ml-[16.666667%] sm:overflow-hidden sm:overflow-y-scroll">
        <slot />   
    
      </main>
    </div>
  {/if}
{/await}





