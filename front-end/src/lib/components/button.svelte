<script>
    let bg = {
        primary: { bg: '#f6d20c', shadow: '#595103' },
        disable: { bg: '#d2d2d2', shadow: '#808080' },
        while: { bg: '#fff', shadow: '#000' },
        green: { bg: '#0DA100', shadow: '#206400' },
        red: { bg: '#ef4444', shadow: '#a33232' },
    }

    let style = {
        style1:{main:'0px 10px 0 0', hover:'0px 5px 0 0'},
        style2:{main:'10px 10px 0 0', hover:'5px 5px 0 0'},
    }

    export let typeBtn = '' ; 

    export let options = {bg:'primary', style:'style1', }
    export let click ;

    export let SetHeight = false ;

</script>

<button
on:click={click}
disabled={options.bg === 'disable'}
class={`w-full ${SetHeight === true ? 'h-full' : ''} ${typeBtn === 'A1' ? 'rounded-full' : 'rounded-lg'} text-2xl ${options.style === 'style1' && options.bg != 'disable' ? 'active:translate-y-[3px]' : ''} transition-all ${options.bg === 'disable' ? 'cursor-not-allowed' : ''}`}
style={`
--bg :${bg[options.bg].bg} ; 
--shadow: ${style[options.style].main} ${bg[options.bg].shadow}; 
--shadow-hover: ${style[options.style].hover} ${bg[options.bg].shadow}; 
--color: ${options.bg === 'green' || options.bg === 'red' ? 'white' :bg[options.bg].shadow} ;`}
>
<slot />
</button>

<style>
    button{
        background-color: var(--bg); 
        box-shadow: var(--shadow); 
        border:solid 2px var(--shadow);
        color: var(--color);
    }
    button:disabled:active{
        box-shadow: var(--shadow);
    }
    button:active{
        box-shadow: var(--shadow-hover);
    }
</style>