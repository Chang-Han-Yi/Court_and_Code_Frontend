import axios from 'axios'

export const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
})

export async function listArticles(options) {
  const { data } = await api.get('/articles', {
    params: options?.includeDraft ? { includeDraft: '1' } : {},
  })
  return data.data
}

export async function getArticle(id, options) {
  const { data } = await api.get(`/articles/${encodeURIComponent(id)}`, {
    params: options?.includeDraft ? { includeDraft: '1' } : {},
  })
  return data
}

export async function createArticle(payload) {
  const { data } = await api.post('/articles', payload)
  return data
}

export async function updateArticle(id, payload) {
  const { data } = await api.put(`/articles/${encodeURIComponent(id)}`, payload)
  return data
}

export async function deleteArticle(id) {
  await api.delete(`/articles/${encodeURIComponent(id)}`)
}

export async function uploadImage(file) {
  const formData = new FormData()
  formData.append('image', file)
  const { data } = await api.post('/uploads', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data.url
}

/** 從後端 JSON 錯誤取出訊息，供表單顯示用 */
export function getApiErrorMessage(error, fallback) {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data
    if (typeof data?.message === 'string' && data.message.trim()) {
      return data.message
    }
  }
  return fallback
}
