<script lang="ts">
  import Action from "../components/Action.svelte";

  export let href:string|undefined = ''
  export let title:string|undefined = undefined
  
  let params:string = ''
  let macro:string = ''
  let macros = ['roll ','add ','tell ','go ','open ']

  let isMacro = function(txt:string):boolean {
		if (macros.some(v => txt.includes(v))) {
        params = href.substring(href.indexOf(' '), href.length).trim()
			  macro = href.substring(0, href.indexOf(' ')).trim()
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
