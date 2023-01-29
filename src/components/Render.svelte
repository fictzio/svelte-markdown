<script>
    import { supressWarnings } from './supress-warnings'
  
    export let type = undefined
    export let tokens = undefined
    export let header = undefined
    export let rows = undefined
    export let ordered = false
    export let renderers
  
    supressWarnings();
</script>

<svelte:component this={renderers[type]} {...$$restProps}>
    {#if tokens}
        <svelte:self {tokens} {renderers} />
    {:else}
        {$$restProps.raw}
    {/if}
</svelte:component>