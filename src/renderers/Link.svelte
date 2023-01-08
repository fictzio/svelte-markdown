<script>
    import { isAsyncFunction } from "util/types"
  import Action from "../components/Action.svelte";

  export let href = ''
  export let title = undefined

  function isAction(txt) {
    let macros = ['roll','add']
    return macros.includes(txt)
  }

</script>

{#if isAction(href)}
<Action {href} {title} />
{:else}
<a {href} {title}><slot></slot></a>
{/if}
