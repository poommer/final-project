<script>
	import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    export let data ;

    


onMount(async () => {
    localStorage.setItem('user', JSON.stringify(data.user))
    if (data.status === 200 && data.user.user_status === 'verified') {
        //goto('/');
    }else{
       // goto('register/')
    }
});

    
    
</script>

{data.user.user_status}
