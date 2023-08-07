import { getUniqueListBy } from './utils/array'
import { removeKeysFromObject } from './utils/object'
import { post } from './utils/fetching'
import { removeItemsFromArray, uniqueArrayItems, getParsed, isBase64, isFile, base64ToBlob } from './utils/operations'
import browserStorage from './utils/localStorage'
import { isTrivial, proxify } from './utils/treasureUtils'
import { navigate } from './utils/navigation'
import { elementIdGenerator } from './utils/elementIdGenerator'
import { getUsersLocation, getDetailsByLatAndLong } from './utils/location'
import device from './utils/device'

export {
	browserStorage,
	navigate,
	getUsersLocation,
	base64ToBlob,
	elementIdGenerator,
	isFile,
	getUniqueListBy,
	isBase64,
	removeKeysFromObject,
	post,
	device,
	getParsed,
	uniqueArrayItems,
	removeItemsFromArray,
	isTrivial,
	proxify,
	getDetailsByLatAndLong,
}
