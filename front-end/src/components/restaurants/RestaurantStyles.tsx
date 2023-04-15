const RestaurantCss = {
  sideBySide: {
    display: 'inline-block',
    verticalAlign: 'middle',
    fontSize: 17,
  },

  restaurantCard: {
    marginBottom: '4%',
    minWidth: 275,
    boxShadow: '-4px 15px 24px -12px rgba(185, 188, 209, 1);',
    '&:hover': {
      backgroundColor: 'rgba(219, 225, 236, 1)',
      opacity: [0.9, 0.8, 0.7],
    },
  },

  stickyBar: {
    position: 'sticky',
    bottom: 0,
  },
}

export default RestaurantCss
