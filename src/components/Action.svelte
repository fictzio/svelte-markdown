<script lang="ts">
    import { getMacroType, getMacroParams } from "../scripts/rpg-markdown";
    import { macroComponents } from "./macros";
    export let text = undefined
    
    let params = getMacroParams(text)
    let macro = getMacroType(text)

    let component = macroComponents[macro]
    console.log(component)
</script>

<svelte:component this={component} {...$$restProps}></svelte:component>