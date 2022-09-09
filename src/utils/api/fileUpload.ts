import axios, { AxiosRequestHeaders } from 'axios'

export const getFilePath = (fileName: string): string => `/uploads/${fileName}`
export const getLocalFilePath = (fileName: string): string => `./public${getFilePath(fileName)}`

export const uploadImage = async (image: File, headers?: AxiosRequestHeaders): Promise<string> => {
  const formData = new FormData()
  formData.append('image', image)

  try {
    const {
      data: {
        imageName
      },
    } = await axios.post('/api/upload', formData, {
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data',
      }
    })

    return imageName
  } catch (e) {
    throw new Error(e.message)
  }
}

export const unlinkImage = (imageName: string, headers?: AxiosRequestHeaders): Promise<void> => axios.delete(`/api/upload/${imageName}`, {
  headers,
})
