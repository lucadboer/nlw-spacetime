import {
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import Icon from '@expo/vector-icons/Feather'

import LogoSvg from '@assets/logo.svg'
import { Link } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useState } from 'react'

export default function NewMemmory() {
  const [isPublic, setIsPublic] = useState<boolean>()

  const { bottom, top } = useSafeAreaInsets()

  return (
    <ScrollView
      className="flex-1 px-8"
      contentContainerStyle={{ paddingTop: top, paddingBottom: bottom + 40 }}
    >
      <View className="mt-4 flex-row items-center justify-between">
        <LogoSvg />

        <Link href="/memmories" asChild>
          <TouchableOpacity className="h-10 w-10 flex-row items-center justify-center rounded-full bg-purple-500">
            <Icon name="arrow-left" size={18} color={'#fff'} />
          </TouchableOpacity>
        </Link>
      </View>

      <View className="mt-4 space-y-4">
        <View className="flex-row items-center gap-2">
          <Text className="font-body text-gray-100">
            Tornar memória pública
          </Text>
          <Switch
            value={isPublic}
            onValueChange={() => setIsPublic(!isPublic)}
            thumbColor={isPublic ? '#9b79ea' : '#9e9ea0'}
            trackColor={{
              true: '#372560',
              false: '#56565a',
            }}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.5}
          className="h-32 items-center justify-center rounded-lg border border-dashed  border-gray-500 bg-black/20"
        >
          <View className="flex-row items-center gap-2">
            <Icon name="image" color={'#9e9ea0'} size={14} />
            <Text className="font-body text-sm text-gray-200">
              Adicionar foto ou vídeo de capa
            </Text>
          </View>
        </TouchableOpacity>

        <TextInput
          multiline
          placeholder="Escreva sobre essa experiência..."
          placeholderTextColor={'#56565a'}
          className="m-0 p-0 font-body text-lg text-gray-100"
        />

        <TouchableOpacity className="self-end rounded-full bg-green-500 px-6 py-3">
          <Text className="font-alt text-sm leading-none">Salvar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
