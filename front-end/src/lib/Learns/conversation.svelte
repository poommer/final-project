<script>
   export let data ;
</script>

<body>
    {#each data.res as topic}
        <div>
            <div
                class={` ${topic.speaker === "a" ? "" : "flex justify-end items-end"}`}
            >
                <div class={`w-[20rem] h-[10rem] flex  ${topic.speaker === "a" ? "" : "flex-row-reverse"}`}>
                    <div class="flex items-end justify-end">
                        <img
                            src={topic.speaker === "a" ? data.speaker_img.a : data.speaker_img.b}
                            alt=""
                            class="w-[5rem] rounded-full border-2"
                        />
                    </div>
                    <div class={`w-[20rem] h-[5rem] relative bg-[#373C4A] rounded-[5px] flex flex-col items-center justify-center before:contents-[''] before:absolute before:border-solid before:border-x-[1.5rem] before:border-x-red-600 before:border-x-transparent before:border-t-transparent before:border-y-[1.5rem] before:border-[#373C4A] before:rounded-[10px] ${topic.speaker === "a" ? "before:bottom-0 before:left-[-20px]" : "before:bottom-0 before:right-[-20px]"}`}>
                        <span class=" text-[#FFC700]">{topic.text_en}</span>
                        {topic.text_th}
                    </div>
                </div>
            </div>
        </div>
    {/each}
</body>
