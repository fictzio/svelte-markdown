<script>
  import { onMount } from 'svelte';
  import { data } from '$lib/stores/sheet';
  import Dice from '$lib/components/sheets/Dice.svelte'

  export let label
  export let value
  export let max
  export let min
  export let name

  /* Load value from store */
  onMount(() => {
    console.log(value)
    val = $data[name]
  })

  /* Save value to store */
  function save() {
    console.log('SAVING STAT:' + val)
    if (val===undefined) {
      val = ''
    }
    $data[name] = val
  }

  $: val = ''
  $: isError = (parseInt(val) < parseInt(min) || parseInt(val) > parseInt(max) || typeof val != 'number' ? true: false)
</script>

<div class="stat">
  <label for="{name}">{label}</label>
  <input id="{name}" type="number" class:is-error={isError} bind:value={val} max="{max}" min="{min}" on:blur={save} />
  <Dice type="stat" name={name} value={val} />
</div>
