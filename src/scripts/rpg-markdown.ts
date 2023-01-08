export const macros = ['roll ','add ','tell ','go ','open ']
export const components = ['Component']

export const isMacro = function(txt:string):boolean {
	if (macros.some(v => txt.includes(v))) {   	
        return true
    } else {
		return false
	}
}

export const isComponent = function(txt:string):boolean {   
	if (components.some(v => txt.includes(v)) && txt.indexOf(':')>-1) {
		return true
	} else {
		return false
	}
}