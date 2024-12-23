<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    export let text ;
    export let status ;
    export let type ;
    
</script>

{#if type === 'Success'}
<div class="absolute w-[80%]  h-[20rem] top-0 right-0  flex justify-center">
    <div class="animate__animated animate__zoomInUp bg-[#bbf7d0d9] text-green-700 text-2xl min-w-[35rem] h-[4.5rem] p-2 flex justify-between  mt-8 border-2 border-green-600 rounded-lg">
    
      <div class="flex items-center gap-2 ">
        <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#15803d"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
        <p>{text}</p>
      </div>
      <button on:click={()=>{dispatch('close', false)}}>
        <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#fff"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
      </button>
    </div>
  </div>

  {:else if type === 'fail'}
 <div class="absolute w-[80%]  h-screen bottom-0 right-0  flex justify-center">
    <div class="animate__animated animate__zoomInUp bg-[#f7bbbbd9] text-red-700 text-2xl min-w-[35rem] h-[4.5rem] p-2 flex justify-between  mt-8 border-2 border-red-700 rounded-lg">
    
      <div class="flex items-center gap-2 ">
        <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#BB271A"><path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>
        <p>{text}</p>
      </div>
      <button on:click={()=>{dispatch('close', false)}}>
        <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#fff"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
      </button>
    </div>
  </div> 
{/if}

  <!-- 
 -->