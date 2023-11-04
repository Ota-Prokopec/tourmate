import { Base64 } from './Others'

export type RequiredDeep<T> = {
	[P in keyof T]-?: T[P] extends object ? RequiredDeep<T[P]> : T[P]
}

export type DatabaseValueTypes =
	| string
	| number
	| string[]
	| number[]
	| boolean
	| URL
	| Base64
	| undefined
	| null
	| any[]
	| Record<
			string,
			string | number | string[] | number[] | boolean | URL | Base64 | undefined | null
	  >

export type GetTypesOfmethodsInClass<T> = {
	[K in keyof T]: T[K] extends (...args: any[]) => infer R ? R : never
}

export type PartialDeep<Obj> = {
	[Key in keyof Obj]?: Obj[Key] extends object ? PartialDeep<Obj[Key]> : Obj[Key]
}

// export type inferAppleProperty<T> = T extends (
// 	param0: any,
// 	param1: infer Param0,
// 	...args: any[]
// ) => any
// 	? Param0
// 	: never

// 	type t = Parameters

// const func = (x: number, y: string, z: boolean) => undefined

// type Test = inferAppleProperty<typeof func>
