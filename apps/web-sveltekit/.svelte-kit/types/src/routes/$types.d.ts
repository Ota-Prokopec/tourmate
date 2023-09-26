import type * as Kit from '@sveltejs/kit';

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
type RouteParams = {  }
type RouteId = '/';
type MaybeWithVoid<T> = {} extends T ? T | void : T;
export type RequiredKeys<T> = { [K in keyof T]-?: {} extends { [P in K]: T[K] } ? never : K; }[keyof T];
type OutputDataShape<T> = MaybeWithVoid<Omit<App.PageData, RequiredKeys<T>> & Partial<Pick<App.PageData, keyof T & keyof App.PageData>> & Record<string, any>>
type EnsureDefined<T> = T extends null | undefined ? {} : T;
type OptionalUnion<U extends Record<string, any>, A extends keyof U = U extends U ? keyof U : never> = U extends unknown ? { [P in Exclude<A, keyof U>]?: never } & U : never;
export type Snapshot<T = any> = Kit.Snapshot<T>;
type LayoutRouteId = RouteId | "/(app)/(main)" | "/(app)/account/[myId]" | "/(app)/account/[myId]/edit" | "/(app)/addMonument" | "/(app)/addMonument/detail/[lat]-[lng]" | "/(app)/createNewExperience" | "/(app)/experience/[experienceId]" | "/(app)/monument/[monumentId]" | "/(app)/search" | "/(authorization)/auth/forgottonpassword" | "/(authorization)/auth/forgottonpassword/resetpassword" | "/(authorization)/auth/login" | "/(authorization)/auth/oauth2/failure" | "/(authorization)/auth/oauth2/success" | "/(authorization)/auth/register" | "/(authorization)/auth/register/[username]-[myId]" | "/(authorization)/auth/register/verifyemail/[myId]" | "/test" | null
type LayoutParams = RouteParams & { myId?: string,lat?: string,lng?: string,experienceId?: string,monumentId?: string,username?: string }
type LayoutServerParentData = EnsureDefined<{}>;
type LayoutParentData = EnsureDefined<{}>;

export type LayoutServerLoad<OutputData extends OutputDataShape<LayoutServerParentData> = OutputDataShape<LayoutServerParentData>> = Kit.ServerLoad<LayoutParams, LayoutServerParentData, OutputData, LayoutRouteId>;
export type LayoutServerLoadEvent = Parameters<LayoutServerLoad>[0];
export type LayoutServerData = Expand<OptionalUnion<EnsureDefined<Kit.AwaitedProperties<Awaited<ReturnType<typeof import('./proxy+layout.server.js').load>>>>>>;
export type LayoutData = Expand<Omit<LayoutParentData, keyof LayoutServerData> & EnsureDefined<LayoutServerData>>;
export type RequestEvent = Kit.RequestEvent<RouteParams, RouteId>;