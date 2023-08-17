import * as mapTiler from '@maptiler/client'

console.log(process.env.MAP_TILER_API_KEY)

mapTiler.config.apiKey = process.env.MAP_TILER_API_KEY

export default mapTiler
