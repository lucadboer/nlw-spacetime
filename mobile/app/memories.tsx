import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Icon from '@expo/vector-icons/Feather'
import LogoSvg from '@assets/logo.svg'
import { Link, useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as SecureStore from 'expo-secure-store'
import { api } from '../src/lib/api'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'

dayjs.locale(ptBr)

interface MemoriesData {
  id: string
  excerpt: string
  isPublic: boolean
  coverUrl: string
  createdAt: string
}

export default function Memories() {
  const [memories, setMemories] = useState<MemoriesData[]>([])

  const router = useRouter()
  const { bottom, top } = useSafeAreaInsets()

  async function signOut() {
    await SecureStore.deleteItemAsync('token')

    router.push('/')
  }

  async function fetchMemories() {
    const token = await SecureStore.getItemAsync('token')

    const response = await api.get('/memories', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const memories = response.data

    setMemories(memories)
  }

  console.log(memories)

  useEffect(() => {
    fetchMemories()
  }, [])

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingTop: top, paddingBottom: bottom + 40 }}
    >
      <View className="mt-4 flex-row items-center justify-between px-8">
        <LogoSvg />

        <View className="flex-row items-center gap-3">
          <Link href="/new" asChild>
            <TouchableOpacity className="h-10 w-10 flex-row items-center justify-center rounded-full bg-green-600">
              <Icon name="plus" size={20} color={'#fff'} />
            </TouchableOpacity>
          </Link>
          <TouchableOpacity
            onPress={signOut}
            className="h-10 w-10 flex-row items-center justify-center rounded-full bg-red-600"
          >
            <Icon name="log-out" size={20} color={'#fff'} />
          </TouchableOpacity>
        </View>
      </View>

      <View className="mt-10 space-y-10">
        {memories.map((memory) => {
          return (
            <View key={memory.id} className="flex-col space-y-4">
              <View className="flex-row items-center gap-2">
                <View className="h-[2px] w-5 bg-gray-100" />
                <Text className="ml-1 text-xs text-gray-100">
                  {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
                </Text>
              </View>
              <View className="space-y-4 px-8">
                <Image
                  source={{ uri: memory.coverUrl }}
                  alt=""
                  className="aspect-video w-full rounded-lg"
                />
                <Text className="text-sm text-gray-100 ">{memory.excerpt}</Text>

                <Link href="/memorie/id" asChild>
                  <View className="flex-row items-center gap-2">
                    <Text className="font-body text-xs text-gray-200">
                      Leia mais
                    </Text>
                    <Icon name="arrow-right" size={14} color={'#9E9EA0'} />
                  </View>
                </Link>
              </View>
            </View>
          )
        })}
      </View>
    </ScrollView>
  )
}
