import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

export default function ServiceRequest({ navigation }) {
  return (
    <Background>
         <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={styles.container}>
              <Image
                  style={styles.image}
                  source={require('../assets/arrow_back.png')}
              />
          </TouchableOpacity>
      <Header>Service Request</Header>
      <Paragraph>
        Ethiopian Electric Utility.
      </Paragraph>
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10 + getStatusBarHeight(),
    left: 4,
  },
  image: {
    width: 24,
    height: 24,
  },
})
