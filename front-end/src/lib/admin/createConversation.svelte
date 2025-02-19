<script>
    import 'animate.css';
    import { createEventDispatcher } from 'svelte';
  import CardInput from '../component/cardInput.svelte';
const dispatch = createEventDispatcher();

    let animationClass = "";
    export let convers_content ;
    export let convers_detail ;
    
    const create = () => {
        animationClass = ""; // ล้างคลาสแอนิเมชันก่อน
        setTimeout(() => {
      animationClass = "animate__slideInLeft"; // เพิ่มคลาสแอนิเมชันใหม่
    }, 10);
    convers_content = [...convers_content, {en:null, th:null, role:'a', sound_file:null}];
    }

    const save = () => {
        let data_not_isNULL = convers_content.filter((Item) => {
        return (!/[\u0E00-\u0E7F]/.test(Item.en) && !/[A-Za-z]/.test(Item.th));
    });
    console.log(data_not_isNULL);
    data_not_isNULL = data_not_isNULL.filter(Item => 
        (Item.en !== null || Item.en !== '') ||
        (Item.th !== null || Item.th !== '') ||
        (Item.sound_file !== null || Item.sound_file !== '')
    );

        // data_not_isNULL = data_not_isNULL.filter(Item => (Item.en !== null || Item.en !== '') || (Item.th !== null || Item.th !== '') || (Item.sound_file !== '' || Item.sound_file !== null ) )
        console.log(convers_detail);
        dispatch('saveContent', {data_not_isNULL, convers_detail})
    }

    const Delete = (index) => {
        console.log("ก่อนลบ:", convers_content);
    console.log("ตำแหน่งที่จะลบ:", index);
    console.log("ข้อมูลที่จะลบ:", convers_content[index]);
        // ลบข้อมูลที่ตำแหน่ง index
    convers_content.splice(index, 1);

convers_content = [...convers_content];

    dispatch("delete_data", convers_content);
    console.log("หลังลบ:", convers_content);

    }

</script>

<h1  class="text-5xl">สร้างบทสนทนา</h1>
<div class="border-b-2 border-b-zinc-500 mb-2"></div>
<div class="w-full flex flex-wrap items-center gap-4 ">
    <div class="w-full  flex">
        <div class="w-[50%] f">
            {#each convers_detail as item,index }
            <input type="text" bind:value={item.name}>
            <div  class="w-full flex gap-4 ">
                <div class="w-[50%] flex flex-col justify-center items-center ">
                    person A
                    <div  class="w-full flex flex-wrap gap-2">
                        <label for="personA-1">
                            <img 
                            src="https://thumbs.dreamstime.com/b/indian-young-boy-face-glasses-profile-picture-avatar-cartoon-character-portrait-vector-illustration-graphic-design-indian-boy-150842813.jpg" 
                            alt=""
                            class={`w-16 h-16 rounded-full overflow-hidden cursor-pointer ${item.role_A === 'https://thumbs.dreamstime.com/b/indian-young-boy-face-glasses-profile-picture-avatar-cartoon-character-portrait-vector-illustration-graphic-design-indian-boy-150842813.jpg' ? 'border-4 border-ec-purple' : 'border-2 border-zinc-400'}`}
                            >
                            <input id='personA-1' name="personA" type="radio" class="hidden" bind:group={item.role_A} value="https://thumbs.dreamstime.com/b/indian-young-boy-face-glasses-profile-picture-avatar-cartoon-character-portrait-vector-illustration-graphic-design-indian-boy-150842813.jpg">
                        </label>
                        
                        <label for="personA-2">
                            <img 
                            src="https://img.freepik.com/premium-vector/smiling-cartoon-boy-face_1639-60446.jpg" 
                            alt=""
                            class={`w-16 h-16 rounded-full overflow-hidden cursor-pointer 
                            ${item.role_A === 'https://img.freepik.com/premium-vector/smiling-cartoon-boy-face_1639-60446.jpg' ? 'border-4 border-ec-purple' : 'border-2 border-zinc-400'}`}
                            >
                            <input 
                            id="personA-2" 
                            name="personA" 
                            type="radio" 
                            class="hidden" 
                            value="https://img.freepik.com/premium-vector/smiling-cartoon-boy-face_1639-60446.jpg"
                            bind:group={item.role_A} 
                            >
                        </label>
    
                        <label for="personA-3">
                            <img 
                            src="https://img.freepik.com/free-vector/boy-cartoon-head-isolated_1308-141008.jpg?semt=ais_hybrid" 
                            alt=""
                            class={`w-16 h-16 rounded-full overflow-hidden cursor-pointer 
                            ${item.role_A === 'https://img.freepik.com/free-vector/boy-cartoon-head-isolated_1308-141008.jpg?semt=ais_hybrid' ? 'border-4 border-ec-purple' : 'border-2 border-zinc-400'}`}
                            >
                            <input 
                            id="personA-3" 
                            name="personA" 
                            type="radio" 
                            class="hidden" 
                            value="https://img.freepik.com/free-vector/boy-cartoon-head-isolated_1308-141008.jpg?semt=ais_hybrid"
                            bind:group={item.role_A} 
                            >
                        </label>
    
                        <label for="personA-4">
                            <img 
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSztaQlOhjbOBCU0hF93bVXF8QKJqWVzHVlA&s" 
                            alt=""
                            class={`w-16 h-16 rounded-full overflow-hidden cursor-pointer 
                            ${item.role_A === 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSztaQlOhjbOBCU0hF93bVXF8QKJqWVzHVlA&s' ? 'border-4 border-ec-purple' : 'border-2 border-zinc-400'}`}
                            >
                            <input 
                            id="personA-4" 
                            name="personA" 
                            type="radio" 
                            class="hidden" 
                            value="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSztaQlOhjbOBCU0hF93bVXF8QKJqWVzHVlA&s"
                            bind:group={item.role_A} 
                            >
                        </label>
                        
                        <label for="personA-5">
                            <img 
                            src="https://png.pngtree.com/png-clipart/20230511/original/pngtree-boys-cartoon-design-png-image_9158013.png" 
                            alt=""
                            class={`w-16 h-16 rounded-full overflow-hidden cursor-pointer 
                            ${item.role_A === 'https://png.pngtree.com/png-clipart/20230511/original/pngtree-boys-cartoon-design-png-image_9158013.png' ? 'border-4 border-ec-purple' : 'border-2 border-zinc-400'}`}
                            >
                            <input 
                            id="personA-5" 
                            name="personA" 
                            type="radio" 
                            class="hidden" 
                            value="https://png.pngtree.com/png-clipart/20230511/original/pngtree-boys-cartoon-design-png-image_9158013.png"
                            bind:group={item.role_A} 
                            >
                        </label>
    
                        <label for="personA-6">
                            <img 
                            src="https://img.freepik.com/free-vector/smiling-female-avatar-illustration_1308-173253.jpg" 
                            alt=""
                            class={`w-16 h-16 rounded-full overflow-hidden cursor-pointer 
                            ${item.role_A === 'https://img.freepik.com/free-vector/smiling-female-avatar-illustration_1308-173253.jpg' ? 'border-4 border-ec-purple' : 'border-2 border-zinc-400'}`}
                            >
                            <input id='personA-6' name="personA" type="radio" class="hidden" bind:group={item.role_A} value="https://img.freepik.com/free-vector/smiling-female-avatar-illustration_1308-173253.jpg">
                        </label>
                        
                        <label for="personA-7">
                            <img 
                            src="https://as2.ftcdn.net/v2/jpg/01/85/86/93/1000_F_185869375_SSnzyNyebmFMyz6zUjsogPYZKlGDIgRb.jpg" 
                            alt=""
                            class={`w-16 h-16 rounded-full overflow-hidden cursor-pointer 
                            ${item.role_A === 'https://as2.ftcdn.net/v2/jpg/01/85/86/93/1000_F_185869375_SSnzyNyebmFMyz6zUjsogPYZKlGDIgRb.jpg' ? 'border-4 border-ec-purple' : 'border-2 border-zinc-400'}`}
                            >
                            <input 
                            id="personA-7" 
                            name="personA" 
                            type="radio" 
                            class="hidden" 
                            value="https://as2.ftcdn.net/v2/jpg/01/85/86/93/1000_F_185869375_SSnzyNyebmFMyz6zUjsogPYZKlGDIgRb.jpg"
                            bind:group={item.role_A} 
                            >
                        </label>
    
                        <label for="personA-8">
                            <img 
                            src="https://i.pinimg.com/736x/62/6e/98/626e984ab20bf23fbaacaf4530dbff0b.jpg" 
                            alt=""
                            class={`w-16 h-16 rounded-full overflow-hidden cursor-pointer 
                            ${item.role_A === 'https://i.pinimg.com/736x/62/6e/98/626e984ab20bf23fbaacaf4530dbff0b.jpg' ? 'border-4 border-ec-purple' : 'border-2 border-zinc-400'}`}
                            >
                            <input 
                            id="personA-8" 
                            name="personA" 
                            type="radio" 
                            class="hidden" 
                            value="https://i.pinimg.com/736x/62/6e/98/626e984ab20bf23fbaacaf4530dbff0b.jpg"
                            bind:group={item.role_A} 
                            >
                        </label>
    
                        <label for="personA-9">
                            <img 
                            src="https://easydrawingguides.com/wp-content/uploads/2018/04/how-to-draw-an-anime-girl-face-featured-image-1200.png" 
                            alt=""
                            class={`w-16 h-16 rounded-full overflow-hidden cursor-pointer 
                            ${item.role_A === 'https://easydrawingguides.com/wp-content/uploads/2018/04/how-to-draw-an-anime-girl-face-featured-image-1200.png' ? 'border-4 border-ec-purple' : 'border-2 border-zinc-400'}`}
                            >
                            <input 
                            id="personA-9" 
                            name="personA" 
                            type="radio" 
                            class="hidden" 
                            value="https://easydrawingguides.com/wp-content/uploads/2018/04/how-to-draw-an-anime-girl-face-featured-image-1200.png"
                            bind:group={item.role_A} 
                            >
                        </label>
                        
                        <label for="personA-10">
                            <img 
                            src="https://media.istockphoto.com/id/923978140/vector/beautiful-girl-face-cartoon.jpg?s=612x612&w=0&k=20&c=Eu76iGFOjecfJExOCu7RF4m7eMoEDqj4cQ95LdYmwvE=" 
                            alt=""
                            class={`w-16 h-16 rounded-full overflow-hidden cursor-pointer 
                            ${item.role_A === 'https://media.istockphoto.com/id/923978140/vector/beautiful-girl-face-cartoon.jpg?s=612x612&w=0&k=20&c=Eu76iGFOjecfJExOCu7RF4m7eMoEDqj4cQ95LdYmwvE=' ? 'border-4 border-ec-purple' : 'border-2 border-zinc-400'}`}
                            >
                            <input 
                            id="personA-10" 
                            name="personA" 
                            type="radio" 
                            class="hidden" 
                            value="https://media.istockphoto.com/id/923978140/vector/beautiful-girl-face-cartoon.jpg?s=612x612&w=0&k=20&c=Eu76iGFOjecfJExOCu7RF4m7eMoEDqj4cQ95LdYmwvE="
                            bind:group={item.role_A} 
                            >
                        </label>
                       
                    </div>
                </div>

                <div class="w-[50%] flex flex-col justify-center items-center">
                    person B
                    <div  class="w-full flex flex-wrap gap-2">
                        <label for="personB-1">
                            <img 
                            src="https://thumbs.dreamstime.com/b/indian-young-boy-face-glasses-profile-picture-avatar-cartoon-character-portrait-vector-illustration-graphic-design-indian-boy-150842813.jpg" 
                            alt=""
                            class={`w-16 h-16 rounded-full overflow-hidden cursor-pointer 
                            ${item.role_B === 'https://thumbs.dreamstime.com/b/indian-young-boy-face-glasses-profile-picture-avatar-cartoon-character-portrait-vector-illustration-graphic-design-indian-boy-150842813.jpg' ? 'border-4 border-ec-purple' : 'border-2 border-zinc-400'}`}
                            >
                            <input id='personB-1' name="personB" type="radio" class="hidden" bind:group={item.role_B} value="https://thumbs.dreamstime.com/b/indian-young-boy-face-glasses-profile-picture-avatar-cartoon-character-portrait-vector-illustration-graphic-design-indian-boy-150842813.jpg">
                        </label>
                        
                        <label for="personB-2">
                            <img 
                            src="https://img.freepik.com/premium-vector/smiling-cartoon-boy-face_1639-60446.jpg" 
                            alt=""
                            class={`w-16 h-16 rounded-full overflow-hidden cursor-pointer 
                            ${item.role_B === 'https://img.freepik.com/premium-vector/smiling-cartoon-boy-face_1639-60446.jpg' ? 'border-4 border-ec-purple' : 'border-2 border-zinc-400'}`}
                            >
                            <input 
                            id="personB-2" 
                            name="personB" 
                            type="radio" 
                            class="hidden" 
                            value="https://img.freepik.com/premium-vector/smiling-cartoon-boy-face_1639-60446.jpg"
                            bind:group={item.role_B} 
                            >
                        </label>
    
                        <label for="personB-3">
                            <img 
                            src="https://img.freepik.com/free-vector/boy-cartoon-head-isolated_1308-141008.jpg?semt=ais_hybrid" 
                            alt=""
                            class={`w-16 h-16 rounded-full overflow-hidden cursor-pointer 
                            ${item.role_B === 'https://img.freepik.com/free-vector/boy-cartoon-head-isolated_1308-141008.jpg?semt=ais_hybrid' ? 'border-4 border-ec-purple' : 'border-2 border-zinc-400'}`}
                            >
                            <input 
                            id="personB-3" 
                            name="personB" 
                            type="radio" 
                            class="hidden" 
                            value="https://img.freepik.com/free-vector/boy-cartoon-head-isolated_1308-141008.jpg?semt=ais_hybrid"
                            bind:group={item.role_B} 
                            >
                        </label>
    
                        <label for="personB-4">
                            <img 
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSztaQlOhjbOBCU0hF93bVXF8QKJqWVzHVlA&s" 
                            alt=""
                            class={`w-16 h-16 rounded-full overflow-hidden cursor-pointer 
                            ${item.role_B === 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSztaQlOhjbOBCU0hF93bVXF8QKJqWVzHVlA&s' ? 'border-4 border-ec-purple' : 'border-2 border-zinc-400'}`}
                            >
                            <input 
                            id="personB-4" 
                            name="personB" 
                            type="radio" 
                            class="hidden" 
                            value="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSztaQlOhjbOBCU0hF93bVXF8QKJqWVzHVlA&s"
                            bind:group={item.role_B} 
                            >
                        </label>
                        
                        <label for="personB-5">
                            <img 
                            src="https://png.pngtree.com/png-clipart/20230511/original/pngtree-boys-cartoon-design-png-image_9158013.png" 
                            alt=""
                            class={`w-16 h-16 rounded-full overflow-hidden cursor-pointer 
                            ${item.role_B === 'https://png.pngtree.com/png-clipart/20230511/original/pngtree-boys-cartoon-design-png-image_9158013.png' ? 'border-4 border-ec-purple' : 'border-2 border-zinc-400'}`}
                            >
                            <input 
                            id="personB-5" 
                            name="personB" 
                            type="radio" 
                            class="hidden" 
                            value="https://png.pngtree.com/png-clipart/20230511/original/pngtree-boys-cartoon-design-png-image_9158013.png"
                            bind:group={item.role_B} 
                            >
                        </label>
    
                        <label for="personB-6">
                            <img 
                            src="https://img.freepik.com/free-vector/smiling-female-avatar-illustration_1308-173253.jpg" 
                            alt=""
                            class={`w-16 h-16 rounded-full overflow-hidden cursor-pointer 
                            ${item.role_B === 'https://img.freepik.com/free-vector/smiling-female-avatar-illustration_1308-173253.jpg' ? 'border-4 border-ec-purple' : 'border-2 border-zinc-400'}`}
                            >
                            <input id='personB-6' name="personB" type="radio" class="hidden" bind:group={item.role_B} value="https://img.freepik.com/free-vector/smiling-female-avatar-illustration_1308-173253.jpg">
                        </label>
                        
                        <label for="personB-7">
                            <img 
                            src="https://as2.ftcdn.net/v2/jpg/01/85/86/93/1000_F_185869375_SSnzyNyebmFMyz6zUjsogPYZKlGDIgRb.jpg" 
                            alt=""
                            class={`w-16 h-16 rounded-full overflow-hidden cursor-pointer 
                            ${item.role_B === 'https://as2.ftcdn.net/v2/jpg/01/85/86/93/1000_F_185869375_SSnzyNyebmFMyz6zUjsogPYZKlGDIgRb.jpg' ? 'border-4 border-ec-purple' : 'border-2 border-zinc-400'}`}
                            >
                            <input 
                            id="personB-7" 
                            name="personB" 
                            type="radio" 
                            class="hidden" 
                            value="https://as2.ftcdn.net/v2/jpg/01/85/86/93/1000_F_185869375_SSnzyNyebmFMyz6zUjsogPYZKlGDIgRb.jpg"
                            bind:group={item.role_B} 
                            >
                        </label>
    
                        <label for="personB-8">
                            <img 
                            src="https://i.pinimg.com/736x/62/6e/98/626e984ab20bf23fbaacaf4530dbff0b.jpg" 
                            alt=""
                            class={`w-16 h-16 rounded-full overflow-hidden cursor-pointer 
                            ${item.role_B === 'https://i.pinimg.com/736x/62/6e/98/626e984ab20bf23fbaacaf4530dbff0b.jpg' ? 'border-4 border-ec-purple' : 'border-2 border-zinc-400'}`}
                            >
                            <input 
                            id="personB-8" 
                            name="personB" 
                            type="radio" 
                            class="hidden" 
                            value="https://i.pinimg.com/736x/62/6e/98/626e984ab20bf23fbaacaf4530dbff0b.jpg"
                            bind:group={item.role_B} 
                            >
                        </label>
    
                        <label for="personB-9">
                            <img 
                            src="https://easydrawingguides.com/wp-content/uploads/2018/04/how-to-draw-an-anime-girl-face-featured-image-1200.png" 
                            alt=""
                            class={`w-16 h-16 rounded-full overflow-hidden cursor-pointer 
                            ${item.role_B === 'https://easydrawingguides.com/wp-content/uploads/2018/04/how-to-draw-an-anime-girl-face-featured-image-1200.png' ? 'border-4 border-ec-purple' : 'border-2 border-zinc-400'}`}
                            >
                            <input 
                            id="personB-9" 
                            name="personB" 
                            type="radio" 
                            class="hidden" 
                            value="https://easydrawingguides.com/wp-content/uploads/2018/04/how-to-draw-an-anime-girl-face-featured-image-1200.png"
                            bind:group={item.role_B} 
                            >
                        </label>
                        
                        <label for="personB-10">
                            <img 
                            src="https://media.istockphoto.com/id/923978140/vector/beautiful-girl-face-cartoon.jpg?s=612x612&w=0&k=20&c=Eu76iGFOjecfJExOCu7RF4m7eMoEDqj4cQ95LdYmwvE=" 
                            alt=""
                            class={`w-16 h-16 rounded-full overflow-hidden cursor-pointer 
                            ${item.role_B === 'https://media.istockphoto.com/id/923978140/vector/beautiful-girl-face-cartoon.jpg?s=612x612&w=0&k=20&c=Eu76iGFOjecfJExOCu7RF4m7eMoEDqj4cQ95LdYmwvE=' ? 'border-4 border-ec-purple' : 'border-2 border-zinc-400'}`}
                            >
                            <input 
                            id="personB-10" 
                            name="personB" 
                            type="radio" 
                            class="hidden" 
                            value="https://media.istockphoto.com/id/923978140/vector/beautiful-girl-face-cartoon.jpg?s=612x612&w=0&k=20&c=Eu76iGFOjecfJExOCu7RF4m7eMoEDqj4cQ95LdYmwvE="
                            bind:group={item.role_B} 
                            >
                        </label>
                       
                    </div>
                </div>

            </div>
            
            <pre>
                {JSON.stringify(item, null, 2)}
            </pre>
            {/each}
        </div>
        <div class="w-[50%] flex flex-col gap-4">
            {#each convers_content as item,index }
            <CardInput 
            data={{item, index}} 
            type={'convers'}
            width={`w-full`}
            on:delete_data={(event)=>{Delete(event.detail)}} />
            {/each}
            <div class="flex justify-end gap-4">
                <button class={`bg-ec-yellow w-12 h-12 rounded-md text-5xl animate__animated ${animationClass}`} on:click={create}>
                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="48px" viewBox="0 0 24 24" width="48px" fill="#3a4252"><g><rect fill="none" height="24" width="24"/></g><g><g/><g><path d="M17,19.22H5V7h7V5H5C3.9,5,3,5.9,3,7v12c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2v-7h-2V19.22z"/><path d="M19,2h-2v3h-3c0.01,0.01,0,2,0,2h3v2.99c0.01,0.01,2,0,2,0V7h3V5h-3V2z"/><rect height="2" width="8" x="7" y="9"/><polygon points="7,12 7,14 15,14 15,12 12,12"/><rect height="2" width="8" x="7" y="15"/></g></g></svg>
                </button>
                <button class={`bg-green-200 w-12 h-12 rounded-md text-5xl animate__animated ${animationClass}`} on:click={save}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#007228"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6 6h9v4H6z"/></svg>
                </button>
            </div>
        </div>
    </div>

</div>