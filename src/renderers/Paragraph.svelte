<script lang="ts">
    import Dummy from '../components/Dummy.svelte'
    export let text:string

    function isComponent(txt:string):boolean {
        let components = ['Component']
        if (components.some(v => txt.includes(v)) && txt.indexOf(':')>-1) {
            return true
        } else {
            return false
        }
    }
    $:hasComponent = isComponent(text)
</script>

{#if hasComponent}
<Dummy />
{:else}
<p><slot></slot></p>
{/if}
