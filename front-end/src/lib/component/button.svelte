<script>
    export let compoData ;  
    export let funcBtn ;
   
</script>

<button on:click={funcBtn} class={`px-2 rounded-lg mt-2 flex items-center justify-center   active:translate-y-[5px] bg-${compoData.bg} text-${compoData.Text}  ${compoData.other}`} style={`--start-color:0px 10px 0px 0px ${compoData.shadowColor}; --start-color-active:0px 5px 0px 0px ${compoData.shadowColorActive};`}>
   <slot></slot>
  </button>

  <style>
    button{
      box-shadow: var(--start-color);
    }
    button:active{
        box-shadow: var(--start-color-active);
    }
  </style>