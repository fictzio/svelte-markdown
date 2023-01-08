export { default as Roll } from './Roll.svelte'
export { default as Random } from './Random.svelte'
export { default as SetValue } from './SetValue.svelte'
export { default as Goto } from './Goto.svelte'

export const macroComponents = {
    roll: Roll,
    random: Random,
    set: SetValue,
    goto: Goto
}