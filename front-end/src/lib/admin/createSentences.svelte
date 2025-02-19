<script>
    import 'animate.css';
    import { createEventDispatcher } from 'svelte';
  import CardInput from '../components/cardInput.svelte';
const dispatch = createEventDispatcher();

    let animationClass = "";
    export let set_data ;
    
    const create = () => {
        animationClass = ""; // ล้างคลาสแอนิเมชันก่อน
        setTimeout(() => {
      animationClass = "animate__slideInLeft"; // เพิ่มคลาสแอนิเมชันใหม่
    }, 10);
    set_data = [...set_data, { en: null, th: null, sound_file: null }];
    }

    const save = () => {
        let data_not_isNULL = set_data.filter((Item) => {
        return (!/[\u0E00-\u0E7F]/.test(Item.en) && !/[A-Za-z]/.test(Item.th));
    });
    console.log(data_not_isNULL);
    data_not_isNULL = data_not_isNULL.filter(Item => 
        (Item.en !== null || Item.en !== '') ||
        (Item.th !== null || Item.th !== '') ||
        (Item.sound_file !== null || Item.sound_file !== '')
    );

        // data_not_isNULL = data_not_isNULL.filter(Item => (Item.en !== null || Item.en !== '') || (Item.th !== null || Item.th !== '') || (Item.sound_file !== '' || Item.sound_file !== null ) )
        console.log(data_not_isNULL);
        dispatch('set_data', data_not_isNULL)
    }

    const Delete = (index) => {
        set_data.splice(index, 1)
        set_data = [...set_data];
    }
</script>

<h1  class="text-5xl">สร้างประโยคหรือวลี</h1>
<div class="border-b-2 border-b-zinc-500 mb-2"></div>
<div class="w-full flex flex-wrap items-center gap-3 ">
    {#each set_data as item,index }
    <CardInput 
    data={{item, index}} 
    on:delete_data={(event)=>{Delete(event.detail)}} />
    {/each}

    <button class={`bg-ec-yellow w-12 h-12 rounded-md text-5xl animate__animated ${animationClass}`} on:click={create}>
        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="48px" viewBox="0 0 24 24" width="48px" fill="#3a4252"><g><rect fill="none" height="24" width="24"/></g><g><g/><g><path d="M17,19.22H5V7h7V5H5C3.9,5,3,5.9,3,7v12c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2v-7h-2V19.22z"/><path d="M19,2h-2v3h-3c0.01,0.01,0,2,0,2h3v2.99c0.01,0.01,2,0,2,0V7h3V5h-3V2z"/><rect height="2" width="8" x="7" y="9"/><polygon points="7,12 7,14 15,14 15,12 12,12"/><rect height="2" width="8" x="7" y="15"/></g></g></svg>
    </button>
    <button class={`bg-green-200 w-12 h-12 rounded-md text-5xl animate__animated ${animationClass}`} on:click={save}>
        <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#007228"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6 6h9v4H6z"/></svg>
    </button>
</div>