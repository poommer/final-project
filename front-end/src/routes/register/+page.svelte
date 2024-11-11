<script>
    import axios from 'axios';
    import { goto } from '$app/navigation';
    import { fail } from '@sveltejs/kit';
  import Msg from '../../lib/component/msg.svelte';

//     import { PUBLIC_BASE_API_URL } from '$env/static/public'
//   import { parse } from 'svelte/compiler';

    

    let errorUpdate = false

    let username ;
    let gender = 'male' ;
    let birthday ;



    let userProps;
    let localUser;
let funcCheck = async () => {
    if(localStorage.getItem('user')){
    userProps = await JSON.parse(localStorage.getItem('user'));
    return userProps
    }else{
        sessionStorage.setItem('error', 'login, please.')
        goto('/')
    }
}





let register = async (userID) => {
    try{
        
        console.log({
            "id": userID,
            "name": username,
            "birthday": birthday,
            "gender":gender
        });
        if(username !== undefined && gender !== undefined && birthday !== undefined){
        let response = await axios.put(`https://api-ecproject.poommer.in.th/api/user/auth/register`,
        {
            "id": userID,
            "name": username,
            "birthday": birthday,
            "gender":gender
        }
        
    )
    
     console.log('data:',{
            lesson_ID:'1-1', 
            user_ID:userID
        });
    if(response.data.status === 200){
        const enroll = await axios.post('https://api-ecproject.poommer.in.th/api/lessons/enroll/',
        {
            lesson_ID:'1-1', 
            user_ID:userID
        }
        )
       
        
        if(enroll){
            const dataU = await JSON.parse(localStorage.getItem('user'));
            const status = 'verified'
            localStorage.setItem('user',JSON.stringify({...dataU, user_name:username, user_status:status}))
            goto('/')
        }
    }
}else{
    errorUpdate = true
}

}catch(err){
        console.log(err);
        
    }
}

console.log('userProps', userProps);




let keyupUpdate = async () =>{

    if(errorUpdate){
        if(username.length > 0 ||  birthday.length > 0){
            errorUpdate = false
        }
    }
}


 
</script>


{#await funcCheck()}
    <p>loading...</p>
{:then userlocal} 
{#if userlocal && userlocal.user_status === 'wait verify'}
    <div>
    <h1>welcome to register page ID: {userlocal.user_ID}</h1>
{#if errorUpdate}
<Msg status={false} text={'error, Fill in all fields.'} />
    <p class="text-ec-light-yellow">error, Fill in all fields.</p>
{/if}
    <div>
        <div>  
            <label for="username">username</label>  
            <input type="text" name="username" bind:value={username} class="text-black" on:keyup={keyupUpdate}>
        </div>
        
        <div>  
            <label for="gender">gender</label>  
            <input type="radio" name="gender" value="male"  bind:group={gender} checked> Male
            <input type="radio" name="gender" value="female" bind:group={gender}> Female
            <input type="radio" name="gender" value="other" bind:group={gender}> Other  
        </div>
        
        <div>  
            <label for="birthDay">birth day</label>  
            <input type="date" name="birthDay" bind:value={birthday}  class="text-black" on:keyup={keyupUpdate}>
        </div>


        <button on:click={()=>{register(userlocal.user_ID)}} class="bg-slate-100 text-gray-800 p-1 rounded-sm mt-4">submit</button>

    </div>
</div>

{:else}
<h1>
        404 <br>
        <span>Not Found</span>
    </h1>
{/if}
{/await}
    



