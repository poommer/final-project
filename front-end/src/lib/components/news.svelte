<script>
  import axios from "axios";
  import { onMount } from "svelte";

// import news from '/static/blog.json';
let news;
const fechData = async ()=>{
    const response = await axios.get('/blog.json');
    news = response.data ;
    console.log(news);
    return response.data ;
}


</script>

<div>
    {#await fechData() then data }
    <div class="p-2 flex flex-col gap-4">
        {#each data.result.Blog as Item }
        <a 
        href={Item.link} 
        target="_blank" 
        rel="noopener noreferrer"
        class="w-full h-[10rem] bg-sky-50 flex overflow-hidden rounded-lg hover:bg-sky-100  hover:text-sky-600 border-2 border-blue-200 hover:border-sky-600"
        >
  
        <img src={Item.image} alt={Item.title}>
        <div class="p-2 flex flex-col justify-between">
            <p class="">{Item.title}</p>
            <div>
                <div class="w-full flex justify-between  text-[#646464]">
                    <p>by {Item.author}</p>    
                <p>{Item.date}</p>
                </div>
                
            </div>
        </div>
</a>
        {/each}
        {#each data.result.news as Item }
        <a 
        href={Item.link} 
        target="_blank" 
        rel="noopener noreferrer"
        class="w-full h-[10rem] bg-[#fff0f0] flex overflow-hidden rounded-lg hover:bg-[#ffe6e6]  hover:text-pink-600 border-2 border-pink-300 hover:border-pink-600"
        >
  
        <img src={Item.image} alt={Item.title}>
        <div class="p-2 flex flex-col justify-between">
            <p class="">{Item.title}</p>
            <div>
                <div class="w-full flex justify-between  text-[#646464]">
                    <p>by {Item.author}</p>    
                <p>{Item.date}</p>
                </div>
                
            </div>
        </div>
</a>
        {/each}
    </div>
    {/await}
</div>