import { Module } from '@nestjs/common'
import { RestaurantModule } from './restaurant/restaurant.module'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    RestaurantModule,
    //  MongooseModule.forRoot('mongodb://localhost:27017/Stream'),
  ],
})
export class AppModule {}
