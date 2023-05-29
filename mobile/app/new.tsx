import { ScrollView, TouchableOpacity, View } from 'react-native'
import Icon from '@expo/vector-icons/Feather'
import LogoSvg from '@assets/logo.svg'
import { Link } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { NewMemoryForm } from './components/NewMemoryForm'

export default function Newmemory() {
  const { bottom, top } = useSafeAreaInsets()

  return (
    <ScrollView
      className="flex-1 px-8"
      contentContainerStyle={{ paddingTop: top, paddingBottom: bottom + 40 }}
    >
      <View className="mt-4 flex-row items-center justify-between">
        <LogoSvg />

        <Link href="/memories" asChild>
          <TouchableOpacity className="h-10 w-10 flex-row items-center justify-center rounded-full bg-purple-500">
            <Icon name="arrow-left" size={20} color={'#fff'} />
          </TouchableOpacity>
        </Link>
      </View>

      <NewMemoryForm />
    </ScrollView>
  )
}
