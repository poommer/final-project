<script>
    import "../../app.css";
    import Nav from "../../lib/admin/nav.svelte";

    // let user = localStorage.getItem('user')
    // console.log(user);
  </script>
<style>
  :global(body){
        background-color: #f1f1f1;
        color: #353535;
      }

</style>
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




