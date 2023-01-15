<script lang="ts">
    import { getLabel, getType } from '../scripts/rpgmd'
    export let text

    /**
     * 
    */

   // Decide type of component
   // Check for defaults

   let type = getType(text)
   let label = getLabel(text)
</script>

<p><em>{label}: {type.toUpperCase()}</em></p>