export const ABOUT_PAGES = [
  { value: 'overview', label: '總覽' },
  { value: 'volleyball', label: '排球' },
  { value: 'engineer', label: '工程' },
]

export function getAboutPageLabel(value) {
  return ABOUT_PAGES.find((item) => item.value === value)?.label ?? value
}

export function isAboutPage(value) {
  return ABOUT_PAGES.some((item) => item.value === value)
}

export function createEmptyAboutCard() {
  return {
    badge: { label: '', class: 'bg-primary' },
    title: '',
    description: '',
    link: { to: '', label: '' },
  }
}

export function createEmptyAboutSection() {
  return {
    title: '',
    body: '',
  }
}

export function createEmptyContactLink() {
  return {
    label: '',
    icon: 'bi bi-link-45deg',
    href: '',
    text: '',
  }
}
