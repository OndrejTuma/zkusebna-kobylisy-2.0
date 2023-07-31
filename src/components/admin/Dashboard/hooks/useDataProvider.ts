import { useCallback, useMemo } from 'react'
import simpleRestProvider from 'ra-data-simple-rest'
import { fetchUtils } from 'react-admin'
import type { User } from '@firebase/auth'

import { useAuth } from 'Components/admin/Auth'
import { unlinkImage, uploadImage } from 'Utils/api/fileUpload'

const deleteImage = async (params: any, user: User | null) => {
  const imageName = params.previousData.image.src.split('/').pop()

  try {
    const headers = await getAuthorizationHeaders(user)

    await unlinkImage(imageName, headers)
  } catch (error) {
    console.error(error.message)
  }
}
const insertImage = async (params: any, user: User | null) => {
  const headers = await getAuthorizationHeaders(user)

  const imageSrc = await uploadImage(params.data.image.rawFile, headers)

  return {
    ...params,
    data: {
      ...params.data,
      image: {
        src: imageSrc,
      },
    }
  }
}
const getAuthorizationHeaders = async (user: User | null) => ({
  authorization: await user?.getIdToken() || false,
})

const useDataProvider = () => {
  const { user } = useAuth()

  const httpClient = useCallback(async (url: any, options?: fetchUtils.Options) => {
    if (!options) {
      options = {}

      if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' })
      }
    }

    options.user = {
      authenticated: true,
      token: await user?.getIdToken(),
    }

    return fetchUtils.fetchJson(url, options)
  }, [user])

  const dataProvider = useMemo(() => {
    const provider = simpleRestProvider('/api', httpClient)

    return {
      ...provider,
      delete: async (resource: string, params: any) => {
        if (resource === 'items' && params.previousData.image) {
          deleteImage(params, user)
        }

        if (params.meta) {
          return provider.delete(resource, {
            ...params,
            id: `${params.id}?${new URLSearchParams(params.meta).toString()}`
          })
        }

        return provider.delete(resource, params)
      },
      create: async (resource: string, params: any) => {
        const isImageUpload = params.data.image && params.data.image.rawFile instanceof File

        if (resource !== 'items' || !isImageUpload) {
          return provider.create(resource, params)
        }

        const updatedParams = await insertImage(params, user)

        return provider.create(resource, updatedParams)
      },
      update: async (resource: any, params: any) => {
        if (resource !== 'items') {
          return provider.update(resource, params)
        }

        const isImageDelete = params.data.image === null
        const isImageUpload = params.data.image && params.data.image.rawFile instanceof File

        if (isImageDelete || isImageUpload && params.previousData.image?.src) {
          deleteImage(params, user)
        }

        if (!isImageUpload) {
          return provider.update(resource, params)
        }

        const updatedParams = await insertImage(params, user)

        return provider.update(resource, updatedParams)
      }
    }
  }, [httpClient, user])

  return dataProvider
}

export default useDataProvider
