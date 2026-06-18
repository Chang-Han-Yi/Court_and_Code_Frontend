export const ADMIN_SECTIONS = [
  { key: 'content', label: '內容' },
  { key: 'about', label: '關於' },
  { key: 'experience', label: '經歷' },
  { key: 'contact', label: '聯絡' },
]

export function isAdminSection(value) {
  return ADMIN_SECTIONS.some((item) => item.key === value)
}

export function getAdminSectionLabel(key) {
  return ADMIN_SECTIONS.find((item) => item.key === key)?.label ?? key
}
