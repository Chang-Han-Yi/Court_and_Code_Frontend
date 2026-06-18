import axios from 'axios'

export const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
})

export async function listArticles(options = {}) {
  const params = {}
  if (options.includeDraft) params.includeDraft = '1'
  if (options.category) params.category = options.category
  const { data } = await api.get('/articles', { params })
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

/** @param {'overview' | 'volleyball' | 'engineer'} page */
export async function getAboutPage(page) {
  const { data } = await api.get(`/about/${encodeURIComponent(page)}`)
  return data
}

/** @param {'overview' | 'volleyball' | 'engineer'} page */
export async function updateAboutPage(page, payload) {
  const { data } = await api.put(`/about/${encodeURIComponent(page)}`, payload)
  return data
}

export async function getContact() {
  const { data } = await api.get('/contact')
  return data
}

export async function updateContact(payload) {
  const { data } = await api.put('/contact', payload)
  return data
}

/** @param {'overview' | 'volleyball' | 'engineer'} page */
export async function getExperiencePage(page) {
  const { data } = await api.get(`/experience/${encodeURIComponent(page)}`)
  return data
}

/** @param {'overview' | 'volleyball' | 'engineer'} page */
export async function updateExperiencePage(page, payload) {
  const { data } = await api.put(`/experience/${encodeURIComponent(page)}`, payload)
  return data
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
