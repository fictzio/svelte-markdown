<script>
  import { onMount } from 'svelte';
  import { data } from '$lib/stores/sheet';

  export let label
  export let value
  export let max
  export let min
  export let name

  /* Load value from store */
  onMount(() => {
    val = $data[name]
  })

  /* Save value to store */
  function save() {
    if (val===undefined) {
      val = ''
    }
    if (isError===false) {
      $data[name] = val
    }
  }

  $: val = ''
  $: isError = (parseInt(val) < parseInt(min) || parseInt(val) > parseInt(max) || typeof val != 'number' ? true: false)
</script>

<div class="number">
  <label for="{name}">{label}</label>
  <input id="{name}" class:is-error={isError} type="number" bind:value={val} max="{max}" min="{min}" on:blur={save} />
</div>

<style>
</style>
