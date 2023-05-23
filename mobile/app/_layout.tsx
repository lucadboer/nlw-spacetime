/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react'
import { styled } from 'nativewind'
import { StatusBar } from 'expo-status-bar'
import { ImageBackground } from 'react-native'
import { SplashScreen, Stack } from 'expo-router'
import * as SecureStore from 'expo-secure-store'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'

import blurBg from '@assets/blur.png'
import Stripes from '@assets/stripes.svg'

const StyledStripe = styled(Stripes)

export default function Layout() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<
    boolean | undefined
  >(undefined)

  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  async function checkIsUserAuthenticated() {
    const token = await SecureStore.getItemAsync('token')
    setIsUserAuthenticated(!!token)
  }

  useEffect(() => {
    checkIsUserAuthenticated()
  }, [])

  if (!hasLoadedFonts) {
    return <SplashScreen />
  }

  return (
    <ImageBackground
      source={blurBg}
      className="relative flex-1 bg-gray-900"
      imageStyle={{ position: 'absolute', left: '-100%' }}
    >
      <StatusBar style="light" translucent />
      <StyledStripe className="absolute left-2" />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: 'transparent',
          },
        }}
      >
        <Stack.Screen name="index" redirect={isUserAuthenticated} />
        <Stack.Screen name="new" />
        <Stack.Screen name="memories" />
      </Stack>
    </ImageBackground>
  )
}
