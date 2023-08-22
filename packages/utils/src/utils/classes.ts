export const executeFunctionBeforeAndAfterClassMethod = <TClass extends Record<any, any>>(
	classs: TClass,
	funs?: {
		before?: () => any
		after?: (result: any) => any
	},
) => {
	Object.getOwnPropertyNames(classs.prototype).forEach((propertyName) => {
		// First to do: we save the original method. Adding it to prototype
		// is a good idea, we keep 'method1' as '_method1' and so on
		classs.prototype[`_${propertyName}`] = classs.prototype[propertyName]

		// Next, we replace the original method with one
		classs.prototype[propertyName] = function () {
			if (funs?.before) {
				const beforeRes = funs.before()
				if (!beforeRes) return //this means that call was ended when returned value was false
			}

			//call original method
			//@ts-ignore
			let result = this['_' + propertyName](...arguments)

			if (funs?.after) {
				const afterRes = funs.after(result)
				if (afterRes) result = afterRes
			}

			// and we need to return the original result of the method
			return result
		}
	})
}
