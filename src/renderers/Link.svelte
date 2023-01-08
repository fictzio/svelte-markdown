<script>
  import Action from "../components/Action.svelte";

  export let href = ''
  export let title = undefined
  
  let params = undefined

  function isAction(txt) {
    let macros = ['/roll','/add','/tell','/go','/open']
    let isMacro = macros.some(macro => txt.includes(macro));
    
    params = txt.substring(txt.firstIndexOf(' ') , txt.length)
    return isMacro
  }

</script>

{#if isAction(href)}
<Action {href} {title} {params}><slot></slot></Action>
{:else}
<a {href} {title}><slot></slot></a>
{/if}
