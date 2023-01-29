export const hasSubstring =  function(str:string, arr:Array<string>):string {
	let ret = arr.find(element => {
		return str.includes(element);
	});

	return ret
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
 * Add sections to tree of tokens
 */

type Section = {
	type: "section",
	depth: number,
	children: Array<any>,
	id: string
}

const HEADER_CUTOF_LEVEL = 2

export const toSections = function(tokens:Array<any>):Array<any> {
	let sections:Array<Section> = []
	let section:Section
    let lastSection:Section
    
	let introSection:Section = {
          type: "section",
          depth: 1,
          children: [],
		  id: ""
        }

    let isChapter = false

    tokens.forEach(token => {
      if (token.type==="heading" && token.depth===HEADER_CUTOF_LEVEL) {
        isChapter = true
        
        // This is where we parse ID
        section = {
          type: "section",
          depth: token.depth,
          children: [token],
          id: "section-" + toSlug(token.text)
        }

        sections.push(section)

        lastSection = section
      } else if (isChapter) {
        lastSection.children.push(token)
      } else {
        // Its the intro slide
        introSection.children.push(token)
      }
    });
    
    tokens = [introSection, ...sections]

	return tokens
}


const newSection = function(token: any):Section {
	let section:Section = {
		type: "section",
		depth: token.depth,
		children: [],
		id: toSlug(token.text)
	}
	return section
}
/**
 * Build a sectionized tree from a flat HAST tree
 * Cannot be previewed yet
 * @param tokens 
 * @returns 
 */
export const sectionHeaders = function(tokens:Array<any>):Array<any> {
	let section:Section
	let lastLevel = 0
	let lastNode:Section
	let parentNode:Section
	let parents:Array<any> = [] // Push pop
	let tree:Array<any> = []

	tokens.forEach(token => {
		if (token.type==="heading") {
			section = newSection(token)
			section.children.push(token)

			// Initialize first section
			if (parents.length === 0 && token.depth===1) {
				tree.push(section)
				lastNode = section
				lastLevel = 1
			}

			if (token.depth === lastLevel + 1) {
				// Moving down
				parentNode = lastNode
				console.log(parentNode)
				parentNode.children.push(section)
				parents.push(lastNode)
				lastNode = section
				lastLevel = token.depth

			} else if (token.depth === lastLevel && lastLevel !== 1) {
				// Same level
				parentNode.children.push(section)
				lastNode = section

			} else if (token.depth < lastLevel) {
				// Moving up. We don't know how many levels
				for (let i=0;i <=lastLevel - token.depth; i++) {
					console.log('Removing')
					console.log(parents.pop())
				}

				lastLevel = token.depth

			} else {
				// Wrong heading levels
			}
		} else {
			// Add content to current section
			section.children.push(token)
		}
	})

	return tokens
}