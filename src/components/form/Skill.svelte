<script>
  import Dice from '$lib/components/sheets/Dice.svelte'
  import { onMount } from 'svelte';
	import { data } from '$lib/stores/sheet';

  export let max
  export let min
  export let label
  export let name
  export let value

  /* Load value from store */
  onMount(() => {
    val = $data[name]
  })

  /* Save value to store */
  function save() {
    if (val===undefined) {
      val = ''
    }
    $data[name] = val
  }

  $: val = ''
  $: isError = (parseInt(val) < parseInt(min) || parseInt(val) > parseInt(max) || typeof val != 'number' ? true: false)
</script>

<div class="skill">
  <label for="{name}">{label}</label>
  <input id="{name}" type="number" class:is-error={isError} bind:value={val} max="{max}" min="{min}" on:blur={save} />
  <Dice type="skill" name={name} value={val} />
</div>
