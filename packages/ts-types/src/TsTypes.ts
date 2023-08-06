type Opaque<T, K extends string> = T & { __typename: K }

export type Base64 = Opaque<string, 'base64'>
