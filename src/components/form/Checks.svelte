<script>
  import { data } from '$lib/stores/sheet';
  import { onMount } from 'svelte';

  import Check from "$lib/components/sheets/Check.svelte";
  export let max = 0
  export let min = 0
  export let value = 0
  export let label
  export let name

  let arrChecks = []

    /* Load value from store */
  onMount(() => {
    value = $data[name]
    setChecks()
  })

  function setChecks() {
    arrChecks = new Array(Number(max))
    for (let j=0;j<value;j++) {
      if (j<value) {
        arrChecks[j] = true
      } else {
        arrChecks[j] = false
      }
    }
  }

  function toggleCheck(e) {
    arrChecks[e.detail.i] = e.detail.checked
    value = arrChecks.reduce((x, y) => x + y);
    value = +value
    save()

  }

  /* Save value to store */
  function save() {
    if (value===undefined) {
      value = ''
    }
    console.log($data[name])
    $data[name] = value
  }

  function reset() {
    value = 0
    setChecks(0)
    save()
  }
  value = +value
  setChecks(value)

  $: checkCount = arrChecks.length
  $: isMultiCheck = checkCount>1 ? true : false
</script>

<div class="checks count-{checkCount}{isMultiCheck?' is-multicheck':''}">
  {#if isMultiCheck}
  <label>{label}</label>
  {:else}
  <label for="{name}">{label}:</label>
  {/if}

  {#each arrChecks as check, i}
    <Check name={name} i={i} on:TOGGLE_CHECK={toggleCheck} checked={check} multi={isMultiCheck} />
  {/each}

  {#if isMultiCheck}
  <button on:click="{reset}">Clear all</button>
  {/if}

  <slot></slot>
</div>
