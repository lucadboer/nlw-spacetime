import { StatusBar } from 'expo-status-bar'
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'

import blurBg from '@assets/blur.png'
import Stripes from '@assets/stripes.svg'
import Logo from '@assets/logo.svg'
import { styled } from 'nativewind'

export default function App() {
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  if (!hasLoadedFonts) {
    return null
  }

  const StyledStripe = styled(Stripes)

  return (
    <SafeAreaProvider>
      <ImageBackground
        source={blurBg}
        className="relative flex-1 items-center justify-center bg-gray-900"
        imageStyle={{ position: 'absolute', left: '-100%' }}
      >
        <StatusBar style="light" translucent />
        <StyledStripe className="absolute left-2" />

        <View className="flex-1 items-center justify-center space-y-6 px-4">
          <Logo />
          <View className="flex items-center">
            <Text className="font-title text-3xl text-gray-50">
              Sua cápsula do tempo
            </Text>
            <Text className="mt-2 text-center font-body text-base leading-relaxed text-gray-100">
              Colecione momentos marcantes da sua jornada e compartilhe (se
              quiser) com o mundo!
            </Text>
          </View>
          <TouchableOpacity className="rounded-full bg-green-500 px-4 py-3">
            <Text className="font-alt text-sm leading-none">
              COMEÇAR A CADASTRAR
            </Text>
          </TouchableOpacity>
        </View>
        <Text className="pb-10 text-xs text-gray-200">
          Feito com 💜 no NLW da Rocketseat
        </Text>
      </ImageBackground>
    </SafeAreaProvider>
  )
}
