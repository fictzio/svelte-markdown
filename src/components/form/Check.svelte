<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let multi
  export let i
  export let name
  export let checked = false

  function toggleCheck() {
    dispatch('TOGGLE_CHECK', {
      i:i,
      name: name,
      checked: !checked
    })
  }

  $: id = (!multi ? name : name + '_' + i)
</script>
{#if multi}
<label for="{id}">{name} {i}</label>
{/if}
<input type="checkbox" name={name} id="{id}" on:change={toggleCheck} bind:checked="{checked}" /><span></span>
