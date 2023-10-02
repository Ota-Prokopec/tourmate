class A {}

export function executeFunctionBeforeAndAfterClassMethod<Methods extends {}, TClass extends { new (): A }>(
	classs: TClass,
	funs?: {
		before?: (classs: TClass) => TClass | Promise<TClass> | Promise<boolean> | boolean
		after?: (
			result: Methods[keyof Methods],
			classs: TClass,
		) => Promise<Methods[keyof Methods] | false | undefined | null | void> | Methods[keyof Methods] | false | undefined | null | void
	},
	excludedMethods?: {
		before?: (keyof Methods)[]
		after?: (keyof Methods)[]
	},
) {
	Object.getOwnPropertyNames(classs.prototype).forEach(function (propertyName) {
		// First to do: we save the original method. Adding it to prototype
		// is a good idea, we keep 'method1' as '_method1' and so on

		classs.prototype[`_${propertyName}`] = classs.prototype[propertyName]

		// Next, we replace the original method with one
		classs.prototype[propertyName] = async function (...args: any[]) {
			if (funs?.before) {
				if (excludedMethods && excludedMethods.before && excludedMethods.before.includes(propertyName as keyof Methods)) return
				const beforeRes = await funs.before(classs)
				if (!beforeRes) return
				if (beforeRes !== true) classs = await beforeRes
			}

			//call original method

			let result = (await this['_' + propertyName](...args)) as Methods[keyof Methods]

			if (funs?.after) {
				if (excludedMethods && excludedMethods.after && excludedMethods.after.includes(propertyName as keyof Methods)) return
				const afterRes = await funs.after(result, classs)
				if (afterRes) result = afterRes
			}

			// and we need to return the original result of the method
			return result
		}
	})

	return classs
}
