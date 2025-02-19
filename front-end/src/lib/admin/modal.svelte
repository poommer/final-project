<script>

</script>


    <div class="bg-gray-200 w-[40rem] h-[22rem] rounded-lg">
        <div class={`p-2 flex justify-between border-b-[1.5px] border-gray-300`}>
            <h1>hello</h1>
            <button>
                <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#EA3323"><path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
            </button>
        </div>

        <div class={`p-2 flex flex-col justify-between items-center`}>
            <svg xmlns="http://www.w3.org/2000/svg" height="128px" viewBox="0 -960 960 960" width="128px" fill="#00c721"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
            <p class="text-5xl">สร้างบทเรียนสำเร็จ</p>
            <p class="text-2xl">ต้องการสร้างหัวข้อ และเนื้อหาของบทเรียนเลยหรือไม่</p>
        </div>

        <div class="flex gap-4 justify-center">
            <button on:click={()=>{goto('../lesson')}} class="w-[12rem] rounded bg-gray-300 text-gray-700 text-2xl p-2 flex justify-center items-center hover:bg-gray-400">เอาไว้ก่อน</button>
            <button on:click={create} class="w-[12rem] rounded bg-ec-purple text-white text-2xl p-2 flex justify-center items-center hover:bg-ec-purple-800">ไปสร้างเลย</button>
        </div>
    </div>
