class A {}

export function executeFunctionBeforeAndAfterClassMethod<Methods extends {}, TClass extends { new (): A }>(
	classs: TClass,
	funs?: {
		before?: (classs: TClass) => TClass | TClass | boolean | boolean
		after?: (
			result: Methods[keyof Methods],
			classs: TClass,
		) => Methods[keyof Methods] | false | undefined | null | void | Methods[keyof Methods] | false | undefined | null | void
	},
	excludedMethods?: {
		before?: (keyof Methods)[]
		after?: (keyof Methods)[]
	},
) {
	Object.getOwnPropertyNames(classs.prototype).forEach(function (propertyName) {
		classs.prototype[`_${propertyName}`] = classs.prototype[propertyName]

		classs.prototype[propertyName] = function (...args: any[]) {
			if (funs?.before) {
				if (excludedMethods && excludedMethods.before && excludedMethods.before.includes(propertyName as keyof Methods)) return
				const beforeRes = funs.before(classs)
				if (!beforeRes) return
				if (beforeRes !== true) classs = beforeRes
			}

			let result = this['_' + propertyName](...args) as Methods[keyof Methods]

			if (funs?.after) {
				if (!(excludedMethods && excludedMethods.after && excludedMethods.after.includes(propertyName as keyof Methods))) {
					const afterRes = funs.after(result, classs)
					if (afterRes) result = afterRes
				}
			}

			return result
		}
	})

	return classs
}
