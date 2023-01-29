<script>
  import { supressWarnings } from './supress-warnings'
  import Renderer from './renderers/Renderer.svelte'
  import Section from './renderers/Section.svelte'

  export let tokens = undefined
  export let renderers

  supressWarnings();
</script>


  {#each tokens as token}
    <Section {token}>
        <Renderer tokens={ token.children } {renderers} />
    </Section>
  {/each}
