import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'

import GetPlaceByText from './src/components/restaurants/GetPlaceByText'
import DsiplayNearby from './src/components/restaurants/DsiplayNearby'
import RestaurantPage from './src/components/restaurants/RestaurantPage'

import * as React from 'react'
import { NavigationContainer, ParamListBase } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={GetPlaceByText}
          options={{ title: 'Near By Restaurants' }}
        />
        <Stack.Screen name="SearchByText" component={DsiplayNearby} />
        <Stack.Screen name="Restaurant" component={RestaurantPage} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
