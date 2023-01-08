<script>
    export let href = ''
    export let title = undefined
    export let params = undefined
    let macro = href.substring(0, href.firstIndexOf(' '))

    function runAction() {
        console.log('Run macro: ' + macro)
        console.log('Params: ' + params)
    }
</script>

<button on:click={runAction} {title}><slot></slot></button>