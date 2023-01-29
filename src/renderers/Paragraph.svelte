<script lang="ts">
    import Field from '../components/Field.svelte'
    import Action from "../components/Action.svelte"
    export let text:string

    import { isMacro } from '../components/macros';
    import { isComponent } from '../scripts/rpgmd'

    $:hasComponent = isComponent(text)
    $:hasMacro = isMacro(text)
</script>

{#if hasComponent}
<Field {text} />
{:else if hasMacro}
<Action {text} />
{:else}
<p><slot></slot></p>
{/if}
