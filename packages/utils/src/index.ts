import { getUniqueListBy } from './utils/array'
import { removeKeysFromObject } from './utils/object'
import { post, get } from './utils/fetching'
import {
	removeItemsFromArray,
	uniqueArrayItems,
	getParsed,
	isBase64,
	isFile,
	base64ToBlob,
	countSameItemsInArray,
} from './utils/operations'
import browserStorage from './utils/localStorage'
import { isTrivial, proxify } from './utils/treasureUtils'
import { navigate } from './utils/navigation'
import { elementIdGenerator } from './utils/elementIdGenerator'
import { getUsersLocation, getDetailsByLatAndLong } from './utils/location'
import device from './utils/device'
import { roundNumber } from './utils/operations'
import clipboard from './utils/clipboard'

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
	get,
	device,
	getParsed,
	uniqueArrayItems,
	removeItemsFromArray,
	isTrivial,
	proxify,
	getDetailsByLatAndLong,
	countSameItemsInArray,
	roundNumber,
	clipboard,
}
