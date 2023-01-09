<script lang="ts">
const roll = function():boolean {
    console.log('Rolling')
    return true
}
</script>

<button on:click={roll}>Roll</button>