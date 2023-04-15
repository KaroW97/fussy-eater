import React, { useState } from 'react'
import { Grid, Rating, styled } from '@mui/material'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#85bb65 ',
  },
})

const DollarRating = (price_level: number) => {
  return (
    <Grid item xs={6}>
      <StyledRating
        name="customized-color"
        defaultValue={0}
        value={price_level}
        precision={0.5}
        max={4}
        icon={<AttachMoneyIcon fontSize="inherit" />}
        emptyIcon={<AttachMoneyIcon fontSize="inherit" />}
        readOnly
      />
    </Grid>
  )
}

const StarRating = (rating: number) => {
  return (
    <Grid item xs={6}>
      <Rating name="read-only" value={rating} precision={0.1} readOnly />
    </Grid>
  )
}

export { StarRating, DollarRating }
