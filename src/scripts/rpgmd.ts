import { Range, NumberEntity, StringEntity } from '../types/rpgmd'

export const macros = ['roll ','random ','set ','goto ']
export const components = ['Number','Skill','Stat','Text']

/**
 * @constant 
 * @description Max label size. Capped to make it readable.
 */
const MAX_LABEL_SIZE = 24
const VALID_COMPONENTS = ['Actor','Checks','Computed','Number','Item','Skill','Stat','Select','Text','Editor','LI','Option','P','Roll','Set']

import {
    Random,
    Roll,
    SetValue,
    Goto
} from '../components/macros'
import { getByTestId } from '@testing-library/svelte'

export const defaultMacros = {
    roll: Roll,
    random: Random,
    set: SetValue,
    goto: Goto
}

const hasSubstring =  function(str:string, arr:Array<string>):string {
	let ret = arr.find(element => {
		return str.includes(element);
	});

	return ret
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

/*---- Component specific code ----- */
/**
 * 
 * @param txt | the paragraph text
 * @returns 
 */

export const isComponent = function(txt:string):boolean {   
	if (components.some(v => txt.includes(v)) && txt.indexOf(':')>-1) {
		return true
	} else {
		return false
	}
}
const isValidType = (s:string):boolean => {
  let isValid = VALID_COMPONENTS.includes(s.trim())
  return isValid
}

/**
 * 
 * @param s Capitalize a string
 * @returns 
 */
const capitalize = (s:string):string => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

/**
 * @function
 * @description Strips parenthesized values from string
 * @param text 
 * @returns 
 */
const removeDefaults = (text:string):string => {
  let hasParenthesis = text.indexOf('(')

  if (hasParenthesis > -1) {
    text = text.substring(0, hasParenthesis)
  }

  return text
}

/**
 * @function
 * @description Retrieve an ID from a string. Ex. '## Attributes (#stats)'
 * @param text 
 * @returns 
 */
const getIdFromString = (text:string):string|undefined => {
	let regExp = /\(\#([A-Za-z0-9- ]*)\)/;
    let id = regExp.exec(text)

    if (id!==null) {
      text = id[1]
    } else {
      text =  undefined
    }

	return text
}

/**
 * @function
 * @description Creates a URL friendly string, if it contains an ID use that
 * @param text 
 * @returns 
 */
const toSlug = (text:string):string => {
  let regexSlug = /([A-Za-z0-9- ]*)/
  let slug = regexSlug.exec(text)[0]
  let id = getIdFromString(slug)
  slug = (id ? id : slug)

  return slug
  .trim()
  .toLowerCase()
  .replace(/[^\w ]+/g, '')
  .replace(/\s/g, "_");
}


/**
* @function
* Extract numberic attributes from string
*
* 5 - value=5
* 1/7 - value=1, max=7. Usually used by checks
* 0-5 - min=0, max=5
* 0/0-5 - value=0, min=0, max=5
* TODO: Rewrite to regexp
* @param str 
* @returns 
*/
export const getValues = (str:string):NumberEntity|StringEntity|null => {
	let isKeyValue = str.indexOf(':')
	let isList = str.indexOf(',')
  
	if (isKeyValue === -1) {
	  return null
	}
  
	let strVal = str.substring(isKeyValue + 1, str.length).trim()
	// TODO: Handle list values
  
	// We have defaults, range or similar
	if (strVal.indexOf('(')>-1) {
		let obj = getDefaults(strVal)
		return obj
	} else {
	  return null
	}
  }

/*
* Function
* Get the label from a key value string
*/
export const getLabel = (str:string):string => {
	let isKeyValue = str.indexOf(':')
	let regexLabel = /([A-Za-z0-9- ]+)/
  
	if(isKeyValue) {
	  let label = str.substring(0, isKeyValue)
	  label = regexLabel.exec(str)[0].trim()
	  return label
	} else {
	  return ''
	}
  }

/**
 * @function
 * Get type from string
 * @param str 
 * @returns 
 * @todo Validate against types
 */
export function getType(str:string):string {
	let isKeyValue = str.indexOf(':')
	let isList = str.indexOf(',')
  
	if (isKeyValue > MAX_LABEL_SIZE) {
	  isKeyValue = -1
	}
  
	let type = str.substring(isKeyValue + 1, str.length).trim()
  
	/** @todo: Select handling is wrong */
	if(isKeyValue && isList===-1) {
	  if (type.indexOf('(')>-1) {
		type = type.substring(0, type.indexOf('('))
	  }
  
	  // Escape type to make it a valid tag
	  type = toSlug(type.trim())
	  return type
	} else if (isKeyValue && isList>-1 && type === '') {
	  type = 'Select'
	  return type
	} else {
	  return ''
	}
  }

/**
 * @function
 * @description Create an object of all individual components of a defaults
 * @param str
 * @returns 
 */
export const getDefaults = (str:string):NumberEntity => {
	let regexDefaults = /\(([\w\W]*)\)/
	let regexHasRngAndDefault = /\(([\d]*\/[\d]*[ -]*[\d]*)\)/
	let regexHasRngOnly = /\(([\d]*\-[\d]*)\)/
  
	let arr = regexDefaults.exec(str)
	let arrRng = regexHasRngOnly.exec(str)
	let arrRngAndDefault = regexHasRngAndDefault.exec(str)
  
	str = (arr !== null) ? arr[1] :arr[3];
  
	let range:Range = { max:0,min:0}
	
	range = (arrRng!==null) ? getRng(arrRng[1]) : { max:0,min:0}
	range = (arrRngAndDefault !== null) ? getRng(arr[1]) :range
	str = (arrRngAndDefault !== null) ? getVal(str): str
	
	let formula = (arrRngAndDefault === null && arrRng===null) ? getFormula(str) :''
	let defaultVal = (formula !== '') ? '' :str;
  
	return {
	  range: {
		max: range.max,
		min: range.min,
	  },
	  default: Number.parseInt(defaultVal),
	  value: Number.parseInt(defaultVal),
	  formula: formula
	}
  }

const getFormula = (str:string):string => {
	let arrFormula = [/\-/,/\+/,/\//,/\*/,/([@][a-zA-Z]*)/,/[\d]*d[\d]*/]
	let isFormula = arrFormula.some(rx => rx.test(str));

	if (isFormula) {
	// Formula handling
	}
	return (isFormula === true) ? str :'';
}

const getVal = (str:string):string => {
  let pos = str.indexOf('/')
  let newStr = (pos>-1) ? str.substring(0,pos):str

  return newStr
}

/**
 * @function
 * @description Check for pattern: 1-10, 1/1-10, 1/10
 * @param str 
 * @returns 
 */
const getRng = (str:string):Range => {
  let regexRng = /([\d]*[\/]?[\d]*)[ -]*([\d]*)/
  let regexHasDefault = /([\d]*)[\/]?([\d]*)/
  let regexSimple = /[\d]*[\/]?([\d]*)[ -]*([\d]*)/

  let arr:Array<string> = regexRng.exec(str)

  if (arr[1].indexOf('/')>-1 && arr[2]!=='') {
    arr = regexSimple.exec(arr[0])
  }

  let min:string = (arr[1]!=undefined) ? arr[1]: ''
  let max:string = (arr[2]!=undefined) ? arr[2]: ''

  if (max==='' && min!=='') {
    arr = regexHasDefault.exec(min)
    max = arr[2]
    min = arr[1]
  } else {
    // Get Max range

  }

  return {
	  max: Number.parseInt(max), 
	  min: Number.parseInt(min)
	}
}