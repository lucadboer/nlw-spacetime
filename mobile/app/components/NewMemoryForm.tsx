import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import * as SecureStore from 'expo-secure-store'
import {
  ActivityIndicator,
  Alert,
  Image,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import Icon from '@expo/vector-icons/Feather'
import { api } from '../../src/lib/api'
import { useRouter } from 'expo-router'

export function NewMemoryForm() {
  const router = useRouter()

  const [isPublic, setIsPublic] = useState<boolean>()
  const [image, setImage] = useState('')
  const [content, setContent] = useState('')
  const [imageIsLoading, setImageIsLoading] = useState(false)

  async function handleUploadImage() {
    setImageIsLoading(true)

    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        quality: 1,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      })

      if (photoSelected.canceled) {
        return setImageIsLoading(false)
      }

      const newPhoto = photoSelected.assets[0].uri

      if (newPhoto) {
        const photoInfo = await FileSystem.getInfoAsync(newPhoto)

        if (photoInfo.exists && photoInfo.size / 1024 / 1024 > 4) {
          return Alert.alert('Foto muito grande')
        }

        setImage(newPhoto)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setImageIsLoading(false)
    }
    console.log(image)
  }

  async function handleCreateMemory() {
    const token = await SecureStore.getItemAsync('token')

    let coverUrl = ''

    if (image) {
      const uploadFormData = new FormData()

      uploadFormData.append('file', {
        uri: image,
        name: 'image.jpg',
        type: 'image/jpg',
      } as any)

      const uploadResponse = await api.post('/upload', uploadFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      coverUrl = uploadResponse.data.fileUrl
    }

    await api.post(
      '/memories',
      {
        content,
        isPublic,
        coverUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    router.push('/memories')
  }

  return (
    <View className="mt-4 space-y-4">
      <View className="flex-row items-center gap-2">
        <Text className="font-body text-gray-100">Tornar memória pública</Text>
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

      {imageIsLoading ? (
        <ActivityIndicator
          className="h-32 items-center justify-center rounded-lg border border-dashed  border-gray-500 bg-black/20"
          color="#764fd0"
        />
      ) : (
        <TouchableOpacity
          disabled={imageIsLoading}
          onPress={handleUploadImage}
          activeOpacity={0.5}
          className="h-32 items-center justify-center rounded-lg border border-dashed  border-gray-500 bg-black/20"
        >
          {image ? (
            <View className="absolute h-full w-full">
              <Image
                source={{ uri: image }}
                className="flex-1 rounded-lg object-cover"
                alt=""
              />
              <View className="absolute right-3 top-3 rounded bg-purple-600 px-1 py-1">
                <Icon name="edit" size={16} color={'#fff'} />
              </View>
            </View>
          ) : (
            <View className="flex-row items-center gap-2">
              <Icon name="image" color={'#9e9ea0'} size={14} />
              <Text className="font-body text-sm text-gray-200">
                Adicionar foto ou vídeo de capa
              </Text>
            </View>
          )}
        </TouchableOpacity>
      )}

      <TextInput
        value={content}
        onChangeText={setContent}
        multiline
        placeholder="Escreva sobre essa experiência..."
        placeholderTextColor={'#56565a'}
        className="font-body text-lg text-gray-50"
      />

      <TouchableOpacity
        onPress={handleCreateMemory}
        className="self-end rounded-full bg-green-500 px-6 py-3"
      >
        <Text className="font-alt text-sm leading-none">Salvar</Text>
      </TouchableOpacity>
    </View>
  )
}
