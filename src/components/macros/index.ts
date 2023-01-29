import { hasSubstring } from '../../scripts/utils'

export const macros = ['roll ','random ','set ','goto ','theme ']

export { default as Roll } from './Roll.svelte'
export { default as Random } from './Random.svelte'
export { default as SetValue } from './SetValue.svelte'
export { default as Goto } from './Goto.svelte'
export { default as Theme } from './Theme.svelte'

import Roll from './Roll.svelte'
import Random from './Random.svelte'
import SetValue from './SetValue.svelte'
import Goto from './Goto.svelte'
import Theme from './Theme.svelte'

export const defaultMacros = {
    roll: Roll,
    random: Random,
    set: SetValue,
    goto: Goto,
	theme: Theme
}

export const isMacro = function(txt:string):boolean {
	if (macros.some(v => txt.includes(v))) {   	
        return true
    } else {
		return false
	}
}

/**
 * 
 * @param txt | Expected delimeters [...]
 * @returns 
 */
 export const getMacroParams = function(txt:string):string {
	let strMacro = '/' + getMacroType(txt) + ' '
	let ret = txt.substring(txt.indexOf('(') + strMacro.length, txt.indexOf(')'))
	return ret
}

export const getMacroType = function(txt:string):string {
	return hasSubstring(txt, macros).trim()
}