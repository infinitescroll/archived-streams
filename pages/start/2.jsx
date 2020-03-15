import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Box, Text } from '../../components/Shared'
import { API_ENDPOINT, MAGIC_LINK_ENDPOINT, STREAMS_JWT } from '../../constants'
import { setInStorage } from '../../utils'

export default () => {
  const router = useRouter()
  useEffect(() => {
    const params = new URLSearchParams(router.query)
    const convertTokenToLocalStorage = async () => {
      const authToken = params.get('token')
      const getNewTokenURL = `${API_ENDPOINT}/${MAGIC_LINK_ENDPOINT}?token=${authToken}`
      const { data } = await axios.get(getNewTokenURL)

      setInStorage(STREAMS_JWT, data)

      router.replace('/create-stream')
    }
    if (Array.from(params).length > 0) convertTokenToLocalStorage()
  }, [router, router.query])
  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      p={3}
      height='100vh'
    >
      <h1>Step 2</h1>
      <Text>Please go to your email and verify!</Text>
    </Box>
  )
}
