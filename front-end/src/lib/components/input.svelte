<script>
     import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();
let options = [{value:'', label:'-'}, {value:'test', label:'test'},] ;

export let type = 'dropdown';
export let label = 'label';
export let validate = null;
export let name = '';
export let id = '';
export let validateMSG = 'message';
export let value = '';

const updateValue = () => {
    dispatch('update', value); // ส่งค่ากลับไปให้แม่
  };
</script>


<div class="flex flex-col ">
    <label for={id}>{label}</label>
    {#if type === 'text'}
    <input 
    bind:value
    on:input={updateValue}
    type='text'
    name={name}
    id={id}

    
    class={`
    w-full text-2xl p-2 rounded-md border-2 ring-0 focus:ring-0 outline-0 transition-all  
    ${validate === true 
    ? 'border-green-500 shadow-[5px_5px_0_0_#22c55e] translate-x-1 focus:shadow-[10px_10px_0_0_#22c55e] focus:translate-x-0' 
    : validate === false 
    ? 'border-rose-500 shadow-[5px_5px_0_0_#f43f5e] translate-x-1 focus:shadow-[10px_10px_0_0_#f43f5e] focus:translate-x-0 text-rose-600' 
    : 'border-ec-dark-blue-3 shadow-[10px_10px_0_0_#3a4252] focus:shadow-[5px_5px_0_0_#3a4252] focus:translate-y-1 focus:translate-x-1'}
    `}
    > 
    {:else if type === 'password'}
        <input 
        bind:value  
        on:input={updateValue}
        type='password'
        name={name}
        id={id}

        
        class={`
        w-full text-2xl p-2 rounded-md border-2 ring-0 focus:ring-0 outline-0 transition-all  
        ${validate === true 
        ? 'border-green-500 shadow-[5px_5px_0_0_#22c55e] translate-x-1 focus:shadow-[10px_10px_0_0_#22c55e] focus:translate-x-0' 
        : validate === false 
        ? 'border-rose-500 shadow-[5px_5px_0_0_#f43f5e] translate-x-1 focus:shadow-[10px_10px_0_0_#f43f5e] focus:translate-x-0 text-rose-600' 
        : 'border-ec-dark-blue-3 shadow-[10px_10px_0_0_#3a4252] focus:shadow-[5px_5px_0_0_#3a4252] focus:translate-y-1 focus:translate-x-1'}
        `}
        > 
    {:else if type === 'date'}
        <input 
        bind:value  
        on:input={updateValue}
        type='date'
        name={name}
        id={id}

        
        class={`
        w-full text-2xl p-2 rounded-md border-2 ring-0 focus:ring-0 outline-0 transition-all  
        ${validate === true 
        ? 'border-green-500 shadow-[5px_5px_0_0_#22c55e] translate-x-1 focus:shadow-[10px_10px_0_0_#22c55e] focus:translate-x-0' 
        : validate === false 
        ? 'border-rose-500 shadow-[5px_5px_0_0_#f43f5e] translate-x-1 focus:shadow-[10px_10px_0_0_#f43f5e] focus:translate-x-0 text-rose-600' 
        : 'border-ec-dark-blue-3 shadow-[10px_10px_0_0_#3a4252] focus:shadow-[5px_5px_0_0_#3a4252] focus:translate-y-1 focus:translate-x-1'}
        `}
        > 
        

        {:else if type === 'dropdown'}
        <select 
        bind:value  
        on:input={updateValue}
        name={name}
        id={id}
  
        class={`
            w-full text-2xl p-2 rounded-md border-2 ring-0 focus:ring-0 outline-0 transition-all  
            ${validate === true 
            ? 'border-green-500 shadow-[5px_5px_0_0_#22c55e] translate-x-1 focus:shadow-[10px_10px_0_0_#22c55e] focus:translate-x-0' 
            : validate === false 
            ? 'border-rose-500 shadow-[5px_5px_0_0_#f43f5e] translate-x-1 focus:shadow-[10px_10px_0_0_#f43f5e] focus:translate-x-0 text-rose-600' 
            : 'border-ec-dark-blue-3 shadow-[10px_10px_0_0_#3a4252] focus:shadow-[5px_5px_0_0_#3a4252] focus:translate-y-1 focus:translate-x-1'}
            `}
        >
            {#each options as opt}
                <option value={opt.value} selected={value === opt.value}>{opt.label}</option>
            {/each}
        </select>
    {/if}
    {#if validate !== null}
        <p class={`${validate === true ? 'text-green-600' : 'text-rose-600' } text-lg`}>{validateMSG}</p>
    {/if}
</div>
