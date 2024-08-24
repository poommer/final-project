<script>
	import { goto } from '$app/navigation';
  import 'animate.css';
  import { onMount } from 'svelte';
  import axios from 'axios';

  export let data;

  let inputNum = 5;
  let entries = [];
  let err = null;

  let sound_src;

  let checkArray = async (arr) => {
    return arr.map(obj => {
      const { imgTag, ...rest } = obj;
      const values = Object.values(rest);

      const hasNull = values.includes(null);

      if (hasNull && values.every(value => value === null || value === '')) {
        return null;
      }

      if (hasNull) {
        return false;
      }

      return true;
    });
  };

  let createRowInput = async () => {
    if (entries.length > inputNum) {
      entries[entries.length - 1].imgTag.remove();
      entries = entries.slice(0, entries.length - 1);
      console.log({ count: entries.length, input: inputNum });
      [...entries] = entries
      return;
    }
    for (let i = entries.length; i < inputNum; i++) {
      entries.push({
        word_en: null,
        word_th: null,
        pos: null,
        word_List: null,
        file_img: null,
        file_sound: null,
        imgTag: null,
        audioSRC: null
      });
    }
    entries = entries
    console.log({ count: entries.length, input: inputNum });
  };

  let create = async () => {
    try {
      console.log('clicked!');
      
      let checkInput = await checkArray(entries);
      let nullInput = [];
      for (const [ind, result] of checkInput.entries()) {
        if (result === false) {
          nullInput.push(ind + 1);
          err = { msg: `Fill in all fields. [${nullInput}]` };
          return;
        } else if (result === true) {
          const formData = new FormData();
          formData.append('file_image', entries[ind].file_img);
          formData.append('file_sound', entries[ind].file_sound);
          formData.append('word_en', entries[ind].word_en);
          formData.append('word_th', entries[ind].word_th);
          formData.append('pos', entries[ind].pos);
          formData.append('word_List', entries[ind].word_List);

          try {
            let createData = await axios.post(`http://localhost:3000/api/vocab/create?wl=${entries[ind].word_List}&we=${entries[ind].word_en}`, formData, {
              headers: {
            'Content-Type': 'multipart/form-data'
        }
            });
            console.log(createData);
            if(createData.status === 200){
              sessionStorage.setItem('msg','created!')
            }else{
              sessionStorage.setItem('msg','not created!')

            }

            goto('/admin/vocab')
          } catch (uploadError) {
            console.error('Upload error:', uploadError.message);
          }
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  let play_sound = async (src) => {
	const	song = new Audio(src)
		song.volume = 0.5
		song.play()		

  }

  let changeRow = async (event) => {
    console.log(event);
    
    let checkInput = await checkArray(entries);
    
    let nullInput = [];
    for (const [ind, result] of checkInput.entries()) {
      if (result === false) {
        nullInput.push(ind + 1);
        nullInput = nullInput
        err = { msg: `Fill in all fields. ${nullInput}` };
        // return;
      }else if (result === null){
        if (entries[ind].imgTag) {
          entries[ind].imgTag?.remove();  // ตรวจสอบว่ามี imgTag ก่อนที่จะพยายามลบ
        }
        
        // entries.splice(ind, 1);
        // console.log(entries[ind].imgTag);
        entries = entries.splice(ind, 1);
        // [...entries] = entries
      }
    }

    // if(nullInput.length > 1){
    //   return
    // }


    nullInput = nullInput
    console.log(checkInput);
  }

  onMount(async () => {
    createRowInput();
  });

  function handleFileChange(event, index) {
    const { name, files } = event.target;

    if (name === 'file_image') {
      entries[index].file_img = files[0];
      const reader_image = new FileReader();
      reader_image.onload = () => {
        entries[index].imgTag.src = reader_image.result;
        entries[index].imgTag.alt = files[0].name;
      };
      reader_image.readAsDataURL(files[0]);
    } else if (name === 'file_sound') {
      entries[index].file_sound = files[0];
      const reader_sound = new FileReader();
      reader_sound.readAsDataURL(files[0]);
      reader_sound.onload = () => {
        entries[index].audioSRC = reader_sound.result;
      };
    }

    console.log(entries);
  }
</script>





<div class="flex gap-2">
  {#if err !== null}
    <p class="text-rose-700">{err.msg}</p>
  {/if}
  <div class="w-full flex items-center gap-4">
    <h1 class="text-5xl">add vocabulary</h1>
  </div>
</div>

<div class="">
  <small>rows:</small>
  <div class="flex gap-2">
    <input class="w-56  rounded border-ec-purple-400 border-[2px] focus:border-ec-purple focus:border-[2px]" type="number" bind:value={inputNum} on:keyup={createRowInput} on:change={createRowInput} />
    <button class="w-20 rounded bg-ec-purple text-white text-2xl" on:click={() => { changeRow(); [...entries] = entries }}>add</button>
  </div>
</div>
<table class="w-[100%] border-ec-purple-800 border-[2px] mt-4">
  <thead>
    <tr class="bg-ec-purple-600 text-white text-center ">
      <th>word english</th>
      <th>word thai</th>
      <th>part of speech</th>
      <th>word list</th>
      <!-- <th>image</th>
      <th>sound</th> -->
    </tr>
  </thead>

  <tbody>
    {#each entries as n, index}
    <tr  class=" text-center border-t-2 border-t-ec-purple-600" >
      <td  class=" border-r-2 border-r-ec-purple-600"><input type="text" name="word_en" bind:value={entries[index].word_en} class="w-full h-[2.5rem]" /></td>
      <td class=" border-r-2 border-r-ec-purple-600"><input type="text" name="word_th" bind:value={entries[index].word_th} class="w-full h-[2.5rem]" /></td>
      <td class=" border-r-2 border-r-ec-purple-600">
        <select name="word_List" bind:value={entries[index].pos} class="w-full h-[2.5rem]">
          {#each data.pos as item}
          <option value={item.pos_id}>{item.pos_name}</option>
          {/each}
        </select>
      </td>
      <td>
        <select name="word_List" bind:value={entries[index].word_List} class="w-full h-[2.5rem]">
          {#each data.wordlist as item}
          <option value={item.wl_id}>{item.wl_name}</option>
          {/each}
        </select>
      </td>
      <!-- <td>
        <input type="file" name="file_image" on:change={(event) => handleFileChange(event, index)} />
        <img bind:this={entries[index].imgTag} src="" alt="" />
        </td>
        <td>
          <input type="file" name="file_sound" on:change={(event) => handleFileChange(event, index)} />
          </td> -->
        </tr>
        
    <tr class="h-[5rem] border-t-2 border-t-ec-purple-600">
      <td colspan="2" class="text-center w-6/12 border-r-2 border-r-ec-purple-600">
        <label for={`file_image${index}`}>
          <div class="flex justify-center items-center">
          <input type="file" name="file_image" id={`file_image${index}`} on:change={(event) => handleFileChange(event, index)} hidden />
          <p class="bg-neutral-300 text-ec-purple cursor-pointer min-w-6/12 p-2 rounded-lg hover:bg-neutral-400 text-ec-purple-800  ">{entries[index].file_img === null ? 'image upload' : entries[index].file_img.name}</p>
          </div>
        </label>
      </td>
      <td colspan="2" class="text-center">
        <label for={`file_sound${index}`} class="">
          <div class="flex justify-center items-center">
            <p class="bg-neutral-300 text-ec-purple cursor-pointer min-w-6/12 p-2 rounded-lg hover:bg-neutral-400 text-ec-purple-800  ">{entries[index].audioSRC === null ? 'sound upload' : entries[index].file_sound.name}</p>
            <input type="file" name="file_sound" id={`file_sound${index}`} on:change={(event) => handleFileChange(event, index)} hidden />
          </div>
        </label>
      </td>
    </tr>
    <tr >
      <td colspan="2" class="text-center  border-r-2 border-r-ec-purple-600 p-2"> 
        <div class="w-full flex justify-center items-center">
          <img bind:this={entries[index].imgTag} src="" alt="" class="max-w-[10rem]" />
        </div>  
      </td>
      <td colspan="2" class="text-center border-b-2 border-b-ec-purple-600  p-2">
        {#if entries[index].audioSRC !== null}
        <button on:click={() => {play_sound(entries[index].audioSRC)}} class="w-20 rounded bg-ec-purple text-white text-2xl">play</button>
        {/if}
      </td>
    </tr>
    {/each}
  </tbody>
</table>

<div class="flex justify-end mt-2"> 
  <button class="w-[6rem] rounded bg-ec-purple text-white text-2xl p-2" on:click={create}>create</button>
</div>
