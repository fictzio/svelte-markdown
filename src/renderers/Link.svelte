<script>
  import Action from "../components/Action.svelte";

  export let href = ''
  export let title = undefined
  
  let params = undefined
  let macro = undefined
  let macros = ['roll','add','tell','go','open']

  let isMacro = function(txt) {
		 if (macros.some(v => txt.includes(v))) {
        params = val.substring(val.indexOf(' '), val.length).trim()
			  macro = val.substring(0, val.indexOf(' ')).trim()
      return true
    } else {
			return false
		}
	 }

</script>

{#if isMacro(href)}
  <Action {title} {params} {macro}><slot></slot></Action>
{:else}
  <a {href} {title}><slot></slot></a>
{/if}
