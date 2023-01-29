export const hasSubstring =  function(str:string, arr:Array<string>):string {
	let ret = arr.find(element => {
		return str.includes(element);
	});

	return ret
}