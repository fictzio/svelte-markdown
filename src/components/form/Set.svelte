<script>
	import { data } from '$lib/stores/sheet';

  export let label
  export let value = ''
  export let name
  export let max = 1

  /*
  Init

  Should check if name is unique
  */

  function save() {
    if (value===undefined) {
      value = ''
    }
    $data[name] = value
  }
</script>

<div class="text">
  <label for="{name}">{label}</label>
  <input bind:value="{value}" type="text" disabled="disabled" />
  <button on:click={save}>Set to this value</button>
</div>

<style>
</style>
