<script lang="ts">
  import Action from "../components/Action.svelte"
  import { isMacro } from "../components/macros";

  export let href:string|undefined = ''
  export let title:string|undefined = undefined
  
  let params:string = ''
  let macro:string = ''

  params = href.substring(href.indexOf(' '), href.length).trim()
	macro = href.substring(0, href.indexOf(' ')).trim()
</script>

{#if isMacro(href)}
  <Action {title} {params} {macro}><slot></slot></Action>
{:else}
  <a {href} {title}><slot></slot></a>
{/if}
