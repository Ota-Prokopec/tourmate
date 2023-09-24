import { writable } from 'svelte/store'
import ImageJs from 'image-js'

export const imageStore = writable<ImageJs>()
