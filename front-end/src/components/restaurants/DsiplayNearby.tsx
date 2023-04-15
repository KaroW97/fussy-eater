import axios from 'axios'
import React from 'react'
import { View, Text, Image, ScrollView, TextInput } from 'react-native'

const ProfileScreen = ({ navigation, route }) => {
  console.log('route', route)
  return <Text>This is {route?.params?.name}'s profile</Text>
}

export default ProfileScreen
