import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import { useEffect } from 'react'
import { api } from '../src/lib/api'
import * as SecureStore from 'expo-secure-store'
import { Text, TouchableOpacity, View } from 'react-native'
import { useRouter } from 'expo-router'

import Logo from '@assets/logo.svg'

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint:
    'https://github.com/settings/connections/applications/5109ea28c825154486b0',
}

export default function App() {
  const router = useRouter()

  const [_, response, signInWithGithub] = useAuthRequest(
    {
      clientId: '5109ea28c825154486b0',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'nlwspacetime',
      }),
    },
    discovery,
  )

  async function handleGithubOAuthCode(code: string) {
    const response = await api.post('/register', {
      code,
    })

    const { token } = response.data

    console.log(token)

    await SecureStore.setItemAsync('token', token)

    router.push('/memmories')
  }

  useEffect(() => {
    // console.log(
    //   'response',
    //   makeRedirectUri({
    //     scheme: 'nlwspacetime',
    //   }),
    // )

    if (response?.type === 'success') {
      const { code } = response.params

      handleGithubOAuthCode(code)
    }
  }, [response])

  return (
    <View className="flex-1 items-center">
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
        <TouchableOpacity
          onPress={() => signInWithGithub()}
          className="rounded-full bg-green-500 px-4 py-3"
        >
          <Text className="font-alt text-sm leading-none">
            COMEÇAR A CADASTRAR
          </Text>
        </TouchableOpacity>
      </View>
      <Text className="pb-10 text-xs text-gray-200">
        Feito com 💜 no NLW da Rocketseat
      </Text>
    </View>
  )
}
