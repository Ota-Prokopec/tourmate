const generator = (function* () {
	let index = -1
	while (true) yield index++
})()

export const elementIdGenerator = (pre: string = 'input') => `${pre.split(' ').join('-')}-${generator.next().value}`
