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

<div class="star">
    <div class="star-icon">
        <input type="radio" id="rating">
        <label for="rating" class="fa fa-star"></label>
    </div>
</div>