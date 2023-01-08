<script lang="ts">
    import { getMacroType, getMacroParams } from "../scripts/rpg-markdown";
    import { macroComponents } from "./macros";
    export let text = undefined
    
    let params = getMacroParams(text)
    let macro = getMacroType(text)
</script>

<p>Macro: {macro} </p>
<p>Params: {params}</p>

<svelte:component this={macroComponents[macro]} {...$$restProps}></svelte:component>