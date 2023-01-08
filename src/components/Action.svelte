<script>
    export let href = ''
    export let title = undefined

    function runAction() {
        console.log(href)
    }
</script>

<button on:click={runAction}>{title}</button>