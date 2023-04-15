import {
  Language,
  LatLng,
  LatLngLiteral,
  PlacesNearbyRanking,
  PlaceType1,
} from '@googlemaps/google-maps-services-js'

export interface GoogleGeocode {
  address: string
  language?: Language
  city: string
}

export interface GoggleParams extends GoogleGeocode {
  amount?: number
  location: LatLng | LatLngLiteral
  radius?: number
  keyword?: string
  language?: Language
  minprice?: number
  maxprice?: number
  name?: string
  opennow?: boolean
  rankby?: PlacesNearbyRanking
  type?: string
  pagetoken?: string
}

export interface GoogleGetByTextSearch extends GoggleParams {
  query: string
  region?: string
  type?: PlaceType1
  client_id?: string
  client_secret?: string
}
