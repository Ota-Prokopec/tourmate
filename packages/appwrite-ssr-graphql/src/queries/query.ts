import { Query } from 'appwrite'

export default <DatabaseType extends Record<string, any>>() => {
	type Key = keyof DatabaseType

	return {
		equal: <TKey extends Key>(
			attribute: TKey,
			value: DatabaseType[TKey] | DatabaseType[TKey][],
		) => Query.equal(attribute.toString(), value),
		between: (attribute: Key, start: number, end: number) =>
			Query.between(attribute.toString(), start, end),
		cursorAfter: (documentId: string) => Query.cursorAfter(documentId),
		cursorBefore: (documentId: string) => Query.cursorBefore(documentId),
		endsWith: <TKey extends Key>(attribute: Key, value: DatabaseType[TKey]) =>
			Query.endsWith(attribute.toString(), value),
		greaterThan: <TKey extends Key>(attribute: Key, value: DatabaseType[TKey]) =>
			Query.greaterThan(attribute.toString(), value),
		greaterThanEqual: <TKey extends Key>(attribute: Key, value: DatabaseType[TKey]) =>
			Query.greaterThanEqual(attribute.toString(), value),
		isNotNull: (attribute: Key) => Query.isNotNull(attribute.toString()),
		isNull: (attribute: Key) => Query.isNull(attribute.toString()),
		lessThan: <TKey extends Key>(attribute: Key, value: DatabaseType[TKey]) =>
			Query.lessThan(attribute.toString(), value),
		lessThanEqual: <TKey extends Key>(attribute: Key, value: DatabaseType[TKey]) =>
			Query.lessThanEqual(attribute.toString(), value),
		limit: (limit: number) => Query.limit(limit),
		notEqual: <TKey extends Key>(attribute: Key, value: DatabaseType[TKey]) =>
			Query.notEqual(attribute.toString(), value),
		offset: (offset: number) => Query.offset(offset),
		orderAsc: (attribute: Key) => Query.orderAsc(attribute.toString()),
		orderDesc: (attribute: Key) => Query.orderDesc(attribute.toString()),
		search: (attribute: Key, value: string) => Query.search(attribute.toString(), value),
		select: (attributes: Key[]) => Query.select(attributes.map((att) => att.toString())),
		startsWith: <TKey extends Key>(attribute: Key, value: DatabaseType[TKey]) =>
			Query.startsWith(attribute.toString(), value),
		noLimit: () => Query.limit(9223372036854775),
	}
}
