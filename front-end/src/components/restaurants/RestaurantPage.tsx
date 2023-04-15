import { Box, Card, Container, Grid, Typography } from '@mui/material'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import React from 'react'

import StickyBar from './CommonComponents/StickyBar'
import { StarRating, DollarRating } from './CommonComponents/Rating'
import styles from './RestaurantStyles'

const RestaurantPage = ({ navigation, route }) => {
  console.log('route', route?.params.item)
  const { item } = route?.params
  return (
    <Container fixed>
      <Box>
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
          <ImageListItem key={item.img}>
            <img
              src={`${item.photos[0].html_attributions[0]}`}
              srcSet={`${item.photos[0].html_attributions[0]}`}
              alt="test"
              loading="lazy"
            />
          </ImageListItem>
        </ImageList>

        <Grid container spacing={4}>
          {StarRating(item.rating)}
          {DollarRating(item.price_level)}
        </Grid>
        <Typography>{item.name}</Typography>
        <Typography>{item.distanceBetween} km</Typography>

        <Typography>{item.user_ratings_total}</Typography>
        <Typography>{item.price_level}</Typography>
        <Typography>{item.rating}</Typography>
        <Typography>{item.vicinity}</Typography>
      </Box>
      <StickyBar />
    </Container>
  )
}

export default RestaurantPage
