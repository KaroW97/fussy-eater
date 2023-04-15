import {
  Card,
  CardContent,
  Container,
  Typography,
  CardActions,
  CardMedia,
  IconButton,
  Grid,
} from '@mui/material'
import StickyBar from './CommonComponents/StickyBar'
import { StarRating, DollarRating } from './CommonComponents/Rating'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import PlaceIcon from '@mui/icons-material/Place'
import styles from './RestaurantStyles'
import { useState, useEffect } from 'react'
import axios from 'axios'

interface Restaurant {
  name: string
  formatted_address: unknown
  price_level: number
  rating: number
  geometry: Record<string, unknown>
  opening_hours: { open_now: number }
  photos: Record<string, unknown>
  place_id: string
  plus_code: unknown
  types: string[]
  vicinity: string
  distanceBetween: number
  user_ratings_total: number
}

const customCard = (data: Restaurant[], navigation) =>
  data.map((item: Restaurant, index: number) => (
    <Card sx={{ ...styles.restaurantCard }} variant="outlined" key={index}>
      <CardContent onClick={() => navigation.navigate('Restaurant', { item })}>
        <CardMedia component="img" height="194" image="" alt="Paella dish" />

        <Typography sx={{ fontSize: 19 }} color="text.secondary" gutterBottom>
          {item.name}
        </Typography>

        <Grid sx={{ marginTop: 2 }}>
          <Grid container spacing={2}>
            {StarRating(item.rating)}
            {DollarRating(item.price_level)}
          </Grid>

          <Grid container spacing={2} sx={{ marginTop: 1 }}>
            <Grid item xs={6}>
              <Typography>{item.vicinity}</Typography>
            </Grid>

            <Grid item xs={6}>
              <PlaceIcon style={{ ...styles.sideBySide, padding: '0 0.1em' }} />
              <Typography style={{ ...styles.sideBySide }}>
                {item.distanceBetween} km
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  ))

const GetPlaceByText = ({ navigation }) => {
  const [data, setData] = useState([] as Restaurant[])

  const fetchData = async () => {
    const test = await axios.get('http://localhost:3000/')

    setData((oldArray: any) => [...oldArray, ...test.data])
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Container fixed>
      {customCard(data, navigation)}

      <StickyBar />
    </Container>
  )
}

export default GetPlaceByText
