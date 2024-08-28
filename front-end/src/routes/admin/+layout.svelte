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
<div class="w-full h-screen flex">
  <nav class=" w-2/12 fixed">
    <Nav/>
  </nav>

  <main class="w-10/12 p-4 ml-[16.666667%] overflow-hidden overflow-y-scroll">
    <slot />   

  </main>
</div>




