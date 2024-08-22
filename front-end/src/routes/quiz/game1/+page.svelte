<script>
	import Word_Guessing from './../../../lib/game/word_Guessing.svelte';

    // let recognition;

  import EchoWord from "../../../lib/game/echo_Word.svelte";
  import EchoSentence from '../../../lib/game/echo_sentence.svelte';

  let word = 'what is your name?'

</script>

<div class=" h-screen flex flex-col gap-4 justify-center items-center ">
<!-- <EchoWord word={word}/> -->

<EchoSentence word={word}/>
<!-- <Word_Guessing word={word}/> -->
</div>


