<script>
    export let title = undefined
    export let params = undefined
    export let macro = undefined
    export let text = undefined

    function runAction() {
        console.log('Run macro: ' + macro)
        console.log('Params: ' + params)
    }

    console.log(text)    
</script>

<button on:click={runAction} {title}><slot></slot> ({macro})</button>