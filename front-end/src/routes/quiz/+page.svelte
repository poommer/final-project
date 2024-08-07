<script>
    import QuizMenu from '../../lib/component/quizMenu.svelte';
	import Nav from './../../lib/component/nav.svelte';
    /** @type {import('./$types').PageData} */
    export let data;
</script>

<div class="w-full h-full flex">
    <Nav  pageCurrent='quiz' />
</div>
