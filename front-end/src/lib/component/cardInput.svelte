<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let data;
  export let type = "default";
  export let width = 'w-[32.5%]'
  $:({ item, index } = data);

  const play_sound = (files) => {
    console.log(files);

    const reader_sound = new FileReader();
    reader_sound.readAsDataURL(files);
    reader_sound.onload = () => {
      const sound = new Audio(reader_sound.result);
      sound.volume = 0.5;
      sound.play();
    };
  };

  const Delete = (index) => {
    dispatch("delete_data", index);
  };
</script>

<div
  class={`bg-gray-200 ${width} p-2 rounded-lg flex flex-col gap-4 animate__animated animate__jackInTheBox text-2xl`}
>
  <div class="w-full flex items-center justify-between">
    {#if type === 'default'}
    <small class="text-sm text-zinc-400">
      ประโยคที่ {index + 1}
    </small>

    {:else if type === 'convers'}
    <div class="flex gap-4">
        role
        <div class="bg-zinc-300 w-24 flex justify-center items-center rounded-md overflow-hidden">
          <button 
          class={`w-full transition-all duration-[.2s] ease-in-out ${item.role === 'a' ? 'bg-ec-purple text-white' : ''}`}
          on:click={()=>{item.role === 'a' ? item.role = 'b' : item.role = 'a' }}
          >
            A
          </button>
          <button 
          class={`w-full transition-all duration-[.2s] ease-in-out ${item.role === 'b' ? 'bg-ec-purple text-white' : ''}`}
          on:click={()=>{item.role === 'a' ? item.role = 'b' : item.role = 'a' }}
          >
            B
          </button>
        </div>
      </div>
    {/if}

    <button
      class="bg-rose-200 w-7 h-7 rounded-md flex justify-center item"
      on:click={() => {
        Delete(index);
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="28px"
        viewBox="0 0 24 24"
        width="28px"
        fill="#EA3323"
        ><path d="M0 0h24v24H0V0z" fill="none" /><path
          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
        />
        
        </svg>
    </button>
  </div>

  <!-- <div
    class={`flex items-center bg-zinc-50 p-2 rounded-md border-2 
        ${
          item.role === null || item.role === ""
            ? ""
            : /[\u0E00-\u0E7F]/.test(item.role)
              ? "border-red-600 text-red-600"
              : "border-green-600 text-green-600"
        } `}
  >
    <img
      src="https://cdn-icons-png.flaticon.com/128/197/197374.png"
      alt="th_image"
      class="w-10 h-10"
    />
    <input
      type="text"
      name="role"
      class="focus:outline-none bg-transparent w-full ml-2 text-2xl p-2"
      bind:value={item.role}
    />
  </div> -->

  <div
    class={`flex items-center bg-zinc-50 p-2 rounded-md border-2 
        ${
          item.en === null || item.en === ""
            ? ""
            : /[\u0E00-\u0E7F]/.test(item.en)
              ? "border-red-600 text-red-600"
              : "border-green-600 text-green-600"
        } `}
  >
    <img
      src="https://cdn-icons-png.flaticon.com/128/197/197374.png"
      alt="th_image"
      class="w-10 h-10"
    />
    <input
      type="text"
      name="en"
      class="focus:outline-none bg-transparent w-full ml-2 text-2xl p-2"
      bind:value={item.en}
    />
  </div>

  <div
    class={`flex items-center bg-zinc-50 p-2 rounded-md border-2 
    ${
      item.th === null || item.th === ""
        ? ""
        : /[A-Za-z]/.test(item.th)
          ? "border-red-600 text-red-600"
          : "border-green-600 text-green-600"
    } `}
  >
    <img
      src="https://cdn-icons-png.flaticon.com/128/197/197452.png"
      alt=""
      class="w-10 h-10"
    />
    <input
      type="text"
      name="en"
      class="focus:outline-none bg-transparent w-full ml-2 text-2xl p-2"
      bind:value={item.th}
    />
  </div>

  <div
    class={`w-full h-32 border-2 border-dashed  flex justify-center items-center ${item.sound_file === null ? "border-zinc-400" : item.sound_file.length < 1 ? "border-red-600 " : "border-green-600 gap-2"}`}
  >
    <label
      for={index}
      class={`w-[80%] border-2 flex cursor-pointer text-2xl items-center justify-center 
            ${
              item.sound_file === null
                ? "text-zinc-400 "
                : item.sound_file.length < 1
                  ? "text-red-600 "
                  : "flex-col text-green-600"
            }`}
    >
      {#if item.sound_file === null}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          class={`${item.sound_file === null ? "fill-[#a1a1aa]" : "fill-[#dc2626]"}`}
          ><path
            d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"
          /></svg
        >
        upload file
      {:else if item.sound_file.length < 1}
        <div class="w-full flex flex-col justify-center items-center">
          Only audio files are allowed!
          <div class="flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              class={`${item.sound_file === null ? "fill-[#a1a1aa]" : "fill-[#dc2626]"}`}
              ><path
                d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"
              /></svg
            >
            upload file
          </div>
        </div>
      {:else}
        uploaded!
        <div
          class="w-full flex justify-between border-2 border-ec-purple text-zinc-700"
        >
          <span
            class="w-[80%] flex justify-between whitespace-nowrap overflow-hidden text-ellipsis"
          >
            {item.sound_file[0].name.split(".")[0]}
          </span>
          <span
            class="w-[20%] bg-ec-purple text-white flex justify-center items-center"
          >
            {item.sound_file[0].type.split("/")[1]}
          </span>
        </div>

        <button
          class="bg-ec-yellow mt-2 w-24 p-1 rounded-md text-ec-purple"
          on:click={() => {
            play_sound(item.sound_file[0]);
          }}
        >
          play
        </button>
      {/if}

      <input
        type="file"
        name={index}
        id={index}
        class="hidden"
        on:change={(event) => {
          event.target.files[0].type &&
          !event.target.files[0].type.startsWith("audio/")
            ? (event.target.value = "")
            : item;
        }}
        bind:files={item.sound_file}
      />
    </label>
  </div>

  {#if type === "vocab"}
    <div
      class={`w-full h-32 border-2 border-dashed  flex justify-center items-center ${item.sound_file === null ? "border-zinc-400" : item.sound_file.length < 1 ? "border-red-600 " : "border-green-600 gap-2"}`}
    >
      <label
        for={index}
        class={`w-[80%] border-2 flex cursor-pointer text-2xl items-center justify-center 
                ${
                  item.sound_file === null
                    ? "text-zinc-400 "
                    : item.sound_file.length < 1
                      ? "text-red-600 "
                      : "flex-col text-green-600"
                }`}
      >
        {#if item.sound_file === null}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            class={`${item.sound_file === null ? "fill-[#a1a1aa]" : "fill-[#dc2626]"}`}
            ><path
              d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"
            /></svg
          >
          upload file
        {:else if item.sound_file.length < 1}
          <div class="w-full flex flex-col justify-center items-center">
            Only audio files are allowed!
            <div class="flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                class={`${item.sound_file === null ? "fill-[#a1a1aa]" : "fill-[#dc2626]"}`}
                ><path
                  d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"
                /></svg
              >
              upload file
            </div>
          </div>
        {:else}
          uploaded!
          <div
            class="w-full flex justify-between border-2 border-ec-purple text-zinc-700"
          >
            <span
              class="w-[80%] flex justify-between whitespace-nowrap overflow-hidden text-ellipsis"
            >
              {item.sound_file[0].name.split(".")[0]}
            </span>
            <span
              class="w-[20%] bg-ec-purple text-white flex justify-center items-center"
            >
              {item.sound_file[0].type.split("/")[1]}
            </span>
          </div>

          <button
            class="bg-ec-yellow mt-2 w-24 p-1 rounded-md text-ec-purple"
            on:click={() => {
              play_sound(item.sound_file[0]);
            }}
          >
            play
          </button>
        {/if}

        <input
          type="file"
          name={index}
          id={index}
          class="hidden"
          on:change={(event) => {
            event.target.files[0].type &&
            !event.target.files[0].type.startsWith("audio/")
              ? (event.target.value = "")
              : item;
          }}
          bind:files={item.sound_file}
        />
      </label>
    </div>
  {/if}
</div>
