import type * as Kit from '@sveltejs/kit';

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
type RouteParams = { myId: string }
type RouteId = '/(app)/account/[myId]';
type MaybeWithVoid<T> = {} extends T ? T | void : T;
export type RequiredKeys<T> = { [K in keyof T]-?: {} extends { [P in K]: T[K] } ? never : K; }[keyof T];
type OutputDataShape<T> = MaybeWithVoid<Omit<App.PageData, RequiredKeys<T>> & Partial<Pick<App.PageData, keyof T & keyof App.PageData>> & Record<string, any>>
type EnsureDefined<T> = T extends null | undefined ? {} : T;
type OptionalUnion<U extends Record<string, any>, A extends keyof U = U extends U ? keyof U : never> = U extends unknown ? { [P in Exclude<A, keyof U>]?: never } & U : never;
export type Snapshot<T = any> = Kit.Snapshot<T>;
type PageParentData = Omit<Omit<EnsureDefined<import('../../../$types.js').LayoutData>, keyof import('../../$types.js').LayoutData> & EnsureDefined<import('../../$types.js').LayoutData>, keyof LayoutData> & EnsureDefined<LayoutData>;
type LayoutRouteId = RouteId | "/(app)/account/[myId]" | "/(app)/account/[myId]/edit"
type LayoutParams = RouteParams & { myId?: string }
type LayoutServerParentData = Omit<EnsureDefined<import('../../../$types.js').LayoutServerData>, keyof import('../../$types.js').LayoutServerData> & EnsureDefined<import('../../$types.js').LayoutServerData>;
type LayoutParentData = Omit<EnsureDefined<import('../../../$types.js').LayoutData>, keyof import('../../$types.js').LayoutData> & EnsureDefined<import('../../$types.js').LayoutData>;

export type EntryGenerator = () => Promise<Array<RouteParams>> | Array<RouteParams>;
export type PageServerData = null;
export type PageData = Expand<PageParentData>;
export type LayoutServerLoad<OutputData extends OutputDataShape<LayoutServerParentData> = OutputDataShape<LayoutServerParentData>> = Kit.ServerLoad<LayoutParams, LayoutServerParentData, OutputData, LayoutRouteId>;
export type LayoutServerLoadEvent = Parameters<LayoutServerLoad>[0];
export type LayoutServerData = Expand<OptionalUnion<EnsureDefined<Kit.AwaitedProperties<Awaited<ReturnType<typeof import('./proxy+layout.server.js').load>>>>>>;
export type LayoutData = Expand<Omit<LayoutParentData, keyof LayoutServerData> & EnsureDefined<LayoutServerData>>;
export type RequestEvent = Kit.RequestEvent<RouteParams, RouteId>;