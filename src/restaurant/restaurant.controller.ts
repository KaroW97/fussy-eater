import { Controller, Get, Param, Req, Res } from '@nestjs/common'
import { RestaurantService } from './restaurant.service'
import { Response } from 'express'
import { GoogleGetByTextSearch, GoggleParams } from './googleInterface'

// A basic controller with a single route
@Controller()
export class RestaurantController {
  constructor(private readonly appService: RestaurantService) {}

  @Get()
  async getNearbyPlaces(@Req() request: Request, @Res() res: Response) {
    const body = request.body as unknown as GoggleParams

    const response = await this.appService.getNearbyPlaces(
      body as unknown as GoggleParams,
    )

    res.send(response)
  }

  @Get('/getByType')
  async getPlaceByText(@Req() request: Request, @Res() res: Response) {
    const body = request.body as unknown as GoogleGetByTextSearch

    const response = await this.appService.getPlaceByText(body)

    res.send(response)
  }

  @Get('/getRandomRestaurantNearBy')
  async getRandomRestaurantNearBy(@Req() req: Request, @Res() res: Response) {
    const { amount, ...rest } = req.body as unknown as GoggleParams

    const response = await this.appService.getRandomRestaurantNearBy(
      rest,
      amount,
    )

    res.send(response)
  }

  @Get('/getRandomRestaurantByType')
  async getRandomRestaurantByType(@Req() req: Request, @Res() res: Response) {
    const { amount, ...rest } = req.body as unknown as GoogleGetByTextSearch

    const response = await this.appService.getRandomRestaurantByType(
      rest,
      amount,
    )

    res.send(response)
  }
}
