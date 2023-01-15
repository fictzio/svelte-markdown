<script>
	import { onMount } from 'svelte';
	import { data } from '$lib/stores/sheet';

  export let label
  export let value = ''
  export let name
  export let max = 1

  /*
  Init

  Should check if name is unique
  */

  function isList(val) {
    if (val==="*"){
      return true
    } else {
      return false
    }
  }

  function getText(i) {
    let newArr = []

    for (let j=0;j<=i;j++) {
      newArr.push['text']
    }

    return newArr
  }

  function addText() {
    count += 1
  }

  function save() {
    if (val===undefined) {
      val = ''
    }
    $data[name] = val
  }

  onMount(() => {
    val = $data[name]
  })

  $: val = ''
  $: isList = isList(max)
  $: count = 1
  $: arrText = getText(count)
</script>

<div class="text">
  <label for="{name}">{label}</label>
  <input bind:value="{val}" type="text" on:blur={save} />
</div>
{#each arrText as text }
{text}
{/each}

{#if isList}
<button on:click={addText}>Add {max}</button>
{/if}

<style>
</style>
