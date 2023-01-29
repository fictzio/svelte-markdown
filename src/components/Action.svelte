<script lang="ts">
    import { defaultMacros, getMacroType, getMacroParams } from "./macros";

    export let text = undefined
    
    let params = getMacroParams(text)
    let macro = getMacroType(text)

    console.log(macro)

    let component = defaultMacros[macro]
</script>

<svelte:component this={component} params={params} macro={macro} {...$$restProps}></svelte:component>