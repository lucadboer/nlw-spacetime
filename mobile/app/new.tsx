import { Text, TouchableOpacity, View } from 'react-native'
import Icon from '@expo/vector-icons/Feather'

import LogoSvg from '@assets/logo.svg'
import { Link } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function NewMemmory() {
  const { bottom, top } = useSafeAreaInsets()

  return (
    <View
      className="flex-1 px-8"
      style={{ paddingTop: top, paddingBottom: bottom }}
    >
      <View className="mt-4 flex-row items-center justify-between">
        <LogoSvg />

        <Link href="/memmories" asChild>
          <TouchableOpacity className="h-10 w-10 flex-row items-center justify-center rounded-full bg-purple-500">
            <Icon name="arrow-left" size={18} color={'#fff'} />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  )
}
