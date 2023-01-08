export const macros = ['roll ','random ','set ','goto ']
export const components = ['Component']

import {
    Random,
    Roll,
    SetValue,
    Goto
} from '../components/macros'

export const defaultMacros = {
    roll: Roll,
    random: Random,
    set: SetValue,
    goto: Goto
}

const hasSubstring =  function(str:string, arr:Array<string>):string {
	arr.some(element => {
		if (str.includes(element)) {
			console.log(element)
			return element;
		};
	})
	return ''
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
	let strMacro = getMacroType(txt)
	let ret = txt.substring(txt.indexOf(strMacro) + strMacro.length, txt.indexOf(']'))
	return ret
}

export const getMacroType = function(txt:string):string {
	return hasSubstring(txt, macros)
}

export const isComponent = function(txt:string):boolean {   
	if (components.some(v => txt.includes(v)) && txt.indexOf(':')>-1) {
		return true
	} else {
		return false
	}
}
