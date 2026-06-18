export const ARTICLE_CATEGORIES = [
  { value: 'volleyball', label: '排球' },
  { value: 'engineer', label: '工程' },
]

export function getCategoryLabel(value) {
  return ARTICLE_CATEGORIES.find((item) => item.value === value)?.label ?? value
}

export function createEmptyArticleForm() {
  return {
    title: '',
    content: '',
    img: '',
    category: 'volleyball',
    isPublished: false,
  }
}

export function validateArticleForm(form) {
  if (!String(form.title ?? '').trim()) return '請輸入標題。'
  if (!String(form.content ?? '').trim()) return '請輸入內文。'
  return ''
}

export function buildArticlePayload(form) {
  return {
    title: form.title.trim(),
    content: form.content.trim(),
    img: form.img.trim() || null,
    category: form.category,
    isPublished: form.isPublished,
  }
}
