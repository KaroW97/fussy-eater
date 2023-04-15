import { GeoPosition } from 'geo-position.ts'
import { LatLngLiteral, Place } from '@googlemaps/google-maps-services-js'

export const getRandomRestaurants = (data: Place[], amount: number) =>
  data.sort(() => 0.5 - Math.random()).slice(0, amount)

export const filterResponse = (data: Place[]) =>
  data.map((item) => ({
    name: item.name,
    price_level: item.price_level,
    rating: item.rating,
    geometry: item.geometry,
    opening_hours: item.opening_hours,
    photos: item.photos,
    place_id: item.place_id,
    plus_code: item.plus_code,
    types: item.types,
    vicinity: item.vicinity,
    user_ratings_total: item.user_ratings_total,
  }))

/**
 * Function returns updated restaurant array with objects containing
 * additional information about distance between user and the place
 */
export const addDistance = (myLocation: LatLngLiteral, places: Place[]) => {
  const { lat, lng } = myLocation

  const myPosition = new GeoPosition(lat, lng)

  return places.map(({ geometry, ...rest }) => {
    const { location } = geometry

    const restaurantPosition = new GeoPosition(location.lat, location.lng)

    return {
      ...rest,
      distanceBetween: (
        +myPosition.Distance(restaurantPosition).toFixed(0) / 1000
      ).toFixed(2),
    }
  })
}
