<script>
import 'animate.css';
let max = 3
    let typeLetters = []
    let show = 'try type letter...' ;

    let typeLet = async (letter) => {
        typeLetters.push(letter);
        typeLetters = typeLetters
        show = typeLetters.join("")
    }
</script>

<div class="bg-zinc-200 text-amber-600 ">
    <p class="border-r-2 border-r-amber-400">{show}<span class="animate__animated animate__flash animate__infinite text-slate-900">|</span></p>
</div>


<div class="flex flex-col justify-center items-center gap-2 w-[42rem]">
    <div class="flex gap-3">
        <button class="bg-yellow-500 p-2 w-12 h-15 font-bold text-2xl rounded-lg" on:click={() => {typeLet('Q')}}>Q</button>
        <button class="bg-yellow-500 p-2 w-12 h-15 font-bold text-2xl rounded-lg" on:click={() => {typeLet('W')}}>W</button>
        <button class="bg-yellow-500 p-2 w-12 h-15 font-bold text-2xl rounded-lg" on:click={() => {typeLet('E')}}>E</button>
        <button class="bg-yellow-500 p-2 w-12 h-15 font-bold text-2xl rounded-lg" on:click={() => {typeLet('R')}}>R</button>
        <button class="bg-yellow-500 p-2 w-12 h-15 font-bold text-2xl rounded-lg" on:click={() => {typeLet('T')}}>T</button>
        <button class="bg-yellow-500 p-2 w-12 h-15 font-bold text-2xl rounded-lg" on:click={() => {typeLet('Y')}}>Y</button>
        <button class="bg-yellow-500 p-2 w-12 h-15 font-bold text-2xl rounded-lg" on:click={() => {typeLet('U')}}>U</button>
        <button class="bg-yellow-500 p-2 w-12 h-15 font-bold text-2xl rounded-lg" on:click={() => {typeLet('I')}}>I</button>
        <button class="bg-yellow-500 p-2 w-12 h-15 font-bold text-2xl rounded-lg" on:click={() => {typeLet('O')}}>O</button>
        <button class="bg-yellow-500 p-2 w-12 h-15 font-bold text-2xl rounded-lg" on:click={() => {typeLet('P')}}>P</button>
        <button class="bg-yellow-500 p-2 w-12 h-15 font-bold text-2xl rounded-lg" on:click={() => {typeLetters.pop(); typeLetters = typeLetters; show = typeLetters.join("")}}>Del</button>
    </div>
    <div class="flex gap-3">
        <button class="bg-yellow-500 p-2 w-12 h-15 font-bold text-2xl rounded-lg" on:click={() => {typeLet('A')}}>A</button>
        <button class="bg-yellow-500 p-2 w-12 h-15 font-bold text-2xl rounded-lg" on:click={() => {typeLet('S')}}>S</button>
        <button class="bg-yellow-500 p-2 w-12 h-15 font-bold text-2xl rounded-lg" on:click={() => {typeLet('D')}}>D</button>
        <button class="bg-yellow-500 p-2 w-12 h-15 font-bold text-2xl rounded-lg" on:click={() => {typeLet('F')}}>F</button>
        <button class="bg-yellow-500 p-2 w-12 h-15 font-bold text-2xl rounded-lg" on:click={() => {typeLet('G')}}>G</button>
        <button class="bg-yellow-500 p-2 w-12 h-15 font-bold text-2xl rounded-lg" on:click={() => {typeLet('H')}}>H</button>
        <button class="bg-yellow-500 p-2 w-12 h-15 font-bold text-2xl rounded-lg" on:click={() => {typeLet('J')}}>J</button>
        <button class="bg-yellow-500 p-2 w-12 h-15 font-bold text-2xl rounded-lg" on:click={() => {typeLet('K')}}>K</button>
        <button class="bg-yellow-500 p-2 w-12 h-15 font-bold text-2xl rounded-lg" on:click={() => {typeLet('L')}}>L</button>
        <button class="bg-yellow-500 p-2 w-12 h-15 font-bold text-2xl rounded-lg" on:click={() => {typeLet("'")}}>'</button>
    </div>
    <div class="flex gap-3">
        <button class="bg-yellow-500 p-2 w-12 h-15 font-bold text-2xl rounded-lg" on:click={() => {typeLet('Z')}}>Z</button>
        <button class="bg-yellow-500 p-2 w-12 h-15 font-bold text-2xl rounded-lg" on:click={() => {typeLet('X')}}>X</button>
        <button class="bg-yellow-500 p-2 w-12 h-15 font-bold text-2xl rounded-lg" on:click={() => {typeLet('C')}}>C</button>
        <button class="bg-yellow-500 p-2 w-12 h-15 font-bold text-2xl rounded-lg" on:click={() => {typeLet('V')}}>V</button>
        <button class="bg-yellow-500 p-2 w-12 h-15 font-bold text-2xl rounded-lg" on:click={() => {typeLet('B')}}>B</button>
        <button class="bg-yellow-500 p-2 w-12 h-15 font-bold text-2xl rounded-lg" on:click={() => {typeLet('N')}}>N</button>
        <button class="bg-yellow-500 p-2 w-12 h-15 font-bold text-2xl rounded-lg" on:click={() => {typeLet('M')}}>M</button>
        <button class="bg-yellow-500 p-2 w-12 h-15 font-bold text-2xl rounded-lg" on:click={() => {typeLet('.')}}>.</button>
    </div>
    <div class="flex gap-3">
        <button class="bg-yellow-500 p-2 w-[20rem] h-15 font-bold text-2xl rounded-lg" on:click={() => {typeLet(' ')}}>space</button>
        <button class="bg-yellow-500 p-2 w-12 h-15 font-bold text-2xl rounded-lg" on:click={() => {typeLet('.')}}>.</button>
    </div>
</div>
