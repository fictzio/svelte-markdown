<script lang="ts">
    import { getMacroType, getMacroParams } from "../scripts/rpg-markdown";
    import { defaultMacros } from '../scripts/rpg-markdown'
    export let text = undefined
    
    let params = getMacroParams(text)
    let macro = getMacroType(text)

    console.log()
</script>

<svelte:component this={defaultMacros[macro]} {params} {...$$restProps}></svelte:component>