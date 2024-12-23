<script>
	import { goto } from '$app/navigation';
    import Button from "./button.svelte";
    export let data ;
  </script>
  
  <div class="relative w-[300px] h-[240px]  lg:w-[390px] lg:h-[290px] bg-white border-2 border-[#373C4A] shadow-[10px_10px_0px_0px_#373C4A] rounded-[10px] overflow-hidden">
      <img src={data.image_url} alt="" class="w-full h-[10rem] object-cover object-center">
      <div class="bg-white shadow-[-9px_-1px_18px_#00000047] absolute bottom-[-10px] lg:bottom-[-20px] left-[-1rem] w-[450px] lg:h-[170px] h-[160px]  z-[999] rotate-[-6deg]">
          <div class="rotate-[6deg]  h-[190px]  lg:w-full lg:h-[280px] pt-4  pl-5 pr-36 lg:pr-16">
              <div class="">
                  <h1 class="text-3xl line-clamp-1">{data.quiz_name}</h1>
              </div>
              <div class={`w-full flex justify-between items-center mr-6 mt-10`}>
                <div class="flex gap-2">
                    <span class="flex gap-1">
                        <img src="/icons/fi-ss-document.svg" alt="">
                        {data.quiz_qty}
                    </span>
                    <span class="flex gap-1">
                        <img src="/icons/fi-sr-time-quarter-to.svg" alt="">
                        {data.quiz_timer/60}m
                    </span>
                </div>  
                <div class="w-[120px]">
                      <Button 
                      click={()=>{goto(`quiz/${data.quiz_id}`)}}
                      typeBtn={'A1'}
                      options={{bg:`green`, style:'style1'}}>
                          play
                      </Button>
                  </div>
              </div>
          </div>
      </div>
  </div>
  