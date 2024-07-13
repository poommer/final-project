<script>
    import { onMount } from 'svelte';
    import axios from 'axios';
    import { goto } from '$app/navigation';
    import { fail } from '@sveltejs/kit';

    import { PUBLIC_BASE_API_URL } from '$env/static/public'

    let userlocal ;
    let userProps ;
    let userID;

onMount(() => {
    userlocal = localStorage.getItem('user')
    userProps = { ... JSON.parse(userlocal)};
    console.log(userProps);
    userID = userProps.user_ID

    if(userlocal === null){
        sessionStorage.setItem('error', 'login, please.')
        goto('/')
    }
})


    let username ;
    let gender = 'male' ;
    let birthday ;

let register = async () => {
    try{
        let response = await axios.put(`${PUBLIC_BASE_API_URL}/auth/register`,
        {
            "id": userID,
            "name": username,
            "birthday": birthday,
            "gender":gender
        }
    )
    
    if(response.data.status === 200){
        localStorage.setItem('user', JSON.stringify(response.data.response))
        goto('/')
    }
    console.log(response.data);
} catch(err) {

}

}


 
</script>

<div>
    <h1>welcome to register page ID: {userID}</h1>

    <form>
        <div>  
            <label for="username">username</label>  
            <input type="text" name="username" bind:value={username}>
        </div>
        
        <div>  
            <label for="gender">gender</label>  
            <input type="radio" name="gender" value="male"  bind:group={gender} checked> Male
            <input type="radio" name="gender" value="female" bind:group={gender}> Female
            <input type="radio" name="gender" value="other" bind:group={gender}> Other  
        </div>
        
        <div>  
            <label for="birthDay">birth day</label>  
            <input type="date" name="birthDay" bind:value={birthday}>
        </div>


        <button on:click={register}>submit</button>

    </form>
</div>

<style>
    form input{
        color: black;
    }
</style>