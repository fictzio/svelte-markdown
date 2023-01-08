export { default as Roll } from './Roll.svelte'
export { default as Random } from './Random.svelte'
export { default as SetValue } from './SetValue.svelte'
export { default as Goto } from './Goto.svelte'

import Roll__SvelteComponent_ from './Roll.svelte'
import Random__SvelteComponent_ from './Random.svelte'
import SetValue__SvelteComponent_ from './SetValue.svelte'
import Goto__SvelteComponent_ from './Goto.svelte'

export const macroComponents = {
    roll: Roll__SvelteComponent_,
    random: Random__SvelteComponent_,
    set: SetValue__SvelteComponent_,
    goto: Goto__SvelteComponent_
}