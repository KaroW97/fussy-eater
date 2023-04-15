import { Injectable } from '@nestjs/common'
import * as googleApi from './googleApi'
import * as fs from 'fs'
import {
  GoogleGetByTextSearch,
  GoggleParams,
  GoogleGeocode,
} from './googleInterface'
import { filterResponse, getRandomRestaurants, addDistance } from './utils'
import { Place } from '@googlemaps/google-maps-services-js'

const googlePlacesMock = JSON.parse(
  fs.readFileSync('./mocks/googlePlacesMock.json').toString(),
)
const googleLocationMock = JSON.parse(
  fs.readFileSync('./mocks/googleLocationMock.json').toString(),
)
const googleTextSearchMock = JSON.parse(
  fs.readFileSync('./mocks/googleTextSearchMock.json').toString(),
)

const getMyLocalization = async (body: GoogleGeocode) =>
  googleLocationMock || (await googleApi.getMyLocalization(body))

@Injectable()
export class RestaurantService {
  async getNearbyPlaces(body: GoggleParams) {
    const resultArray: Place[] = []
    let allFetched = false

    const { location } = await getMyLocalization(body)

    while (!allFetched) {
      const data =
        googlePlacesMock || (await googleApi.getNearbyPlaces(body, location))

      const { next_page_token, results } = data ?? undefined

      if (!next_page_token) allFetched = true

      body.pagetoken = next_page_token

      resultArray.push(...results)
    }

    const filteredResponse = filterResponse(resultArray)

    return addDistance(location, filteredResponse)
  }

  async getPlaceByText(body: GoogleGetByTextSearch) {
    const resultArray: Place[] = []
    let allFetched = false

    const { location } = await getMyLocalization(body)

    while (!allFetched) {
      const data =
        googleTextSearchMock ||
        (await googleApi.getByTextSearch(body, location))

      const { next_page_token, results } = data ?? undefined

      if (!next_page_token) allFetched = true

      body.pagetoken = next_page_token

      resultArray.push(...results)
    }

    const filteredResponse = filterResponse(resultArray)

    return addDistance(location, filteredResponse)
  }

  async getRandomRestaurantNearBy(body: GoggleParams, amount: number) {
    const response = await this.getNearbyPlaces(body)

    return getRandomRestaurants(response, amount)
  }

  async getRandomRestaurantByType(body: GoogleGetByTextSearch, amount: number) {
    const response = await this.getPlaceByText(body)

    return getRandomRestaurants(response, amount)
  }
}
