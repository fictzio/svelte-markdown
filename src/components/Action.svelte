<script lang="ts">
    import { getMacroType, getMacroParams } from "../scripts/rpgmd";
    import { defaultMacros } from "../scripts/rpgmd";
    export let text = undefined
    
    let params = getMacroParams(text)
    let macro = getMacroType(text)

    console.log(macro)

    let component = defaultMacros[macro]
</script>

<svelte:component this={component} {...$$restProps}></svelte:component>