<script lang="ts">
    import Dummy from '../components/Dummy.svelte'
    import Action from "../components/Action.svelte"
    export let text:string

    import { isMacro } from '../scripts/rpg-markdown'
    import { isComponent } from '../scripts/rpg-markdown'

    $:hasComponent = isComponent(text)
    $:hasMacro = isMacro(text)
</script>

{#if hasComponent}
<Dummy />
{:else if hasMacro}
<Action />
{:else}
<p><slot></slot></p>
{/if}
