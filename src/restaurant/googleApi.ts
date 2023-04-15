import { config } from '../../config'
import {
  Client,
  Language,
  TextSearchRequest,
  PlacesNearbyRequest,
  LatLngLiteral,
} from '@googlemaps/google-maps-services-js'
import {
  GoogleGetByTextSearch,
  GoggleParams,
  GoogleGeocode,
} from './googleInterface'

const { GOOGLE_API_KEY } = config

let client: Client

const googleClient = (): Client => {
  if (!client) client = new Client({})

  return client
}

const composeParams = <T>(
  googlePrams: GoggleParams | GoogleGetByTextSearch,
) => {
  const { location, language, type, radius, pagetoken, minprice, maxprice } =
    googlePrams

  const params = {
    location,
    language: Language[language],
    type,
    radius: +radius ?? 4000,
    key: GOOGLE_API_KEY,
    pagetoken: pagetoken,
    query: 'query' in googlePrams ? googlePrams.query : undefined,
    minprice,
    maxprice,
  }

  if (pagetoken) params['pagetoken'] = pagetoken

  if ('query' in googlePrams) params['query'] = googlePrams.query

  return { params: JSON.parse(JSON.stringify(params)) } as undefined as T
}

/**
 * Function fetches data that are nearby
 */
export const getNearbyPlaces = async (
  body: GoggleParams,
  location: LatLngLiteral,
) => {
  try {
    const params = composeParams<PlacesNearbyRequest>({ ...body, location })

    const { data } = await googleClient().placesNearby(params)

    return data
  } catch (error) {
    throw error
  }
}

/**
 * Function fetches data of provided type e.g. restaurant serving Asian food
 */
export const getByTextSearch = async (
  body: GoogleGetByTextSearch,
  location: LatLngLiteral,
) => {
  try {
    const params = composeParams<TextSearchRequest>({ ...body, location })

    const { data } = await googleClient().textSearch(params)

    return data
  } catch (error) {
    throw error
  }
}

export const getMyLocalization = async (body: GoogleGeocode) => {
  try {
    const { address, language, city } = body

    const params = {
      address: `${address} ${city}`,
      key: GOOGLE_API_KEY,
      language: Language[language],
    }

    const { data } = await googleClient().geocode({ params })

    const { geometry, formatted_address, address_components } = data.results[0]

    return {
      formatted_address,
      location: geometry.location,
      house_number: address_components[0].long_name,
      street: address_components[1].long_name,
    }
  } catch (error) {
    throw error
  }
}
