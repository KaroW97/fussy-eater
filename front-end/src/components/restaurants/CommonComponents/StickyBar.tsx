import { useState } from 'react'

import RestoreIcon from '@mui/icons-material/Restore'
import FavoriteIcon from '@mui/icons-material/Favorite'
import LocationOnIcon from '@mui/icons-material/LocationOn'

import styles from '../RestaurantStyles'

import { BottomNavigation, BottomNavigationAction } from '@mui/material'

const StickyBar = () => {
  const [value, setValue] = useState(2)

  return (
    <BottomNavigation
      showLabels
      value={value}
      sx={{ ...styles.stickyBar }}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
    >
      <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
      <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
      <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
    </BottomNavigation>
  )
}

export default StickyBar
