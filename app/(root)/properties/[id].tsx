import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';


const property = () => {
    const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>property {id}</Text>
    </View>
  )
}

export default property