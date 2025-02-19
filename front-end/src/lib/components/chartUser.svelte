<script>
  import { onMount } from 'svelte';
	import Input from './input.svelte';
  import axios from 'axios';
    import moment from "moment-timezone"
  import Button from './button.svelte';
  let userData = {} ;
  let readonly = true;
  export let user_ID ;

  
  onMount(async()=>{
    const response_dataUser = await axios.get(`https://api-ecproject.poommer.in.th/api/user/profile/${user_ID}/show`);
    userData = response_dataUser.data.result.profile;
    console.log(userData.profile);
  })
</script>

<div>
  <!-- <div class="w-2/12">
    <Button
    click={()=>{readonly = !readonly}}
    >
      Edit
    </Button>
  </div> -->
  <div class="w-full flex justify-center items-center">
    <img src="/image-default.png" alt="" class="p-1 w-[128px] h-[128px] rounded-full border-2 border-gray-500 object-cover object-center overflow-hidden">
  </div>
    <div class="flex flex-col gap-2">
      <Input 
      type={'text'} 
      readonly={readonly}
      label={'username'}
      value={userData.user_name}
      />
      <Input 
      type={'text'} 
      readonly={readonly}
      label={'Email'}
      value={userData.user_email}
      />
      <div class="flex gap-4">
        <div class="w-2/6">
          <Input 
          type={'text'} 
          readonly={readonly}
          label={'gender'}
          value={userData.user_gender}
          />
        </div>
        <div class="w-4/6">
          <Input 
          type={'text'} 
          readonly={readonly}
          label={'birthday'}
          value={moment(userData.user_birthday).tz('Asia/Bangkok').format('YYYY/DD/MM')}
          />
        </div>
      </div>
    </div>
    
  </div>