class A {}

export function executeFunctionBeforeAndAfterClassMethod<
	Methods extends {},
	TClass extends { new (): any },
>(
	classs: TClass,
	funs?: {
		before?: (
			classs: TClass,
			propertyName: keyof Methods,
		) => TClass | TClass | boolean | boolean
		after?: (
			result: Methods[keyof Methods],
			classs: TClass,
			propertyName: keyof Methods,
		) =>
			| Methods[keyof Methods]
			| false
			| undefined
			| null
			| void
			| Methods[keyof Methods]
			| false
			| undefined
			| null
			| void
	},
	excludedMethods?: {
		before?: (keyof Methods)[]
		after?: (keyof Methods)[]
	},
) {
	;(Object.getOwnPropertyNames(classs.prototype) as unknown as (keyof Methods)[]).forEach(
		(propertyName) => {
			classs.prototype[`_${propertyName.toString()}`] = classs.prototype[propertyName]

			classs.prototype[propertyName] = async function (...args: any[]) {
				if (funs?.before) {
					if (
						excludedMethods &&
						excludedMethods.before &&
						excludedMethods.before.includes(propertyName as keyof Methods)
					)
						return
					const beforeRes = await funs.before(classs, propertyName)
					if (!beforeRes) return
					if (beforeRes !== true) classs = beforeRes
				}

				let result = this['_' + propertyName.toString()](
					...args,
				) as Methods[keyof Methods]

				if (funs?.after) {
					if (
						!(
							excludedMethods &&
							excludedMethods.after &&
							excludedMethods.after.includes(propertyName as keyof Methods)
						)
					) {
						const afterRes = await funs.after(result, classs, propertyName)
						if (afterRes) result = afterRes
					}
				}

				return result
			}
		},
	)

	return classs
}
