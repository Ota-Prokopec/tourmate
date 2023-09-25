export const executeFunctionBeforeAndAfterClassMethod = <TClass extends Record<any, any>, Methods extends {}>(
	classs: TClass,
	funs?: {
		before?: (classs: TClass) => TClass | Promise<TClass> | boolean
		after?: (result: Methods[keyof Methods]) => Methods[keyof Methods] | false | undefined | null
	},
) => {
	Object.getOwnPropertyNames(classs.prototype).forEach((propertyName) => {
		// First to do: we save the original method. Adding it to prototype
		// is a good idea, we keep 'method1' as '_method1' and so on
		classs.prototype[`_${propertyName}`] = classs.prototype[propertyName]

		// Next, we replace the original method with one
		classs.prototype[propertyName] = async function () {
			if (funs?.before) {
				const beforeRes = funs.before(classs)
				if (!beforeRes) return
				if (beforeRes !== true) classs = await beforeRes
			}

			//call original method

			let result = this['_' + propertyName](...arguments) as Methods[keyof Methods]

			if (funs?.after) {
				const afterRes = funs.after(result)
				if (afterRes) result = afterRes
			}

			// and we need to return the original result of the method
			return result
		}
	})
	return classs
}
