<script>
    import QuizMenu from '../../lib/component/quizMenu.svelte';
	import Nav from './../../lib/component/nav.svelte';
</script>

<div class="w-full h-full flex">
    <Nav  pageCurrent='quiz' />
    <div class="ml-[20%]">

        <QuizMenu/>
    </div>
</div>