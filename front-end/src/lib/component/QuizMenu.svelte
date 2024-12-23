<script>
  import { goto } from "$app/navigation";

    export let data;
    const {quiz_palyed, quiz_name, quiz_qty, quiz_timer, image_url} = data
</script>
<button on:click={()=>{goto(`/quiz/${data.quiz_id}`)}}>
    <div class="w-[30rem] h-[28rem] rounded-xl bg-ec-dark-blue-2 flex flex-col justify-between  p-2">
        <div class="flex justify-center items-center w-full h-full">
    <img src={image_url} alt="animals" class="w-[15rem]">
    </div>

    <div>
        <div class="flex  text-ec-yellow text-5xl">
            <h2>{quiz_name}</h2>
        </div>
    
        <div class="w-full flex justify-between text-2xl mt-4">
            <div class="flex gap-2 ">
                <div class="flex items-center gap-1">
                    <img src="icon/test.png" alt="docs"style="height: 24px;">
                    <span>{quiz_qty}</span>
                </div>
                <div class="flex items-center gap-1">
                    <img src="/icon/alarm-clock.png" alt="" style="height: 24px;" >
                    <span>{quiz_timer/60} m</span>
                </div>
            </div>

            <div class="flex items-center gap-1">
                <img src="/icon/eye.png" alt="" style="height: 24px;" >
                <span>{quiz_palyed}</span>
            </div>
        </div>
    </div>
    </div>
    <!-- <div class="flex flex-row space-x-1">
        <img src="icon/star.png" alt="" width="20px">
        <img src="icon/star.png" alt="" width="20px">
        <img src="icon/star.png" alt="" width="20px">
    </div> -->
    
</button>


