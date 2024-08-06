<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    export let data;

    onMount(async () => {
            localStorage.setItem('user', JSON.stringify(data.user));
            if (data.status === 200 && data.user.user_status === 'verified') {
                goto('/');
            } else {
                goto('/register/');
            }
    });
</script>

<!-- {#if data && data.user}
    {data.user.user_status}
{:else}
    <p>User data is not available.</p>
{/if} -->

{data.user.user_status}