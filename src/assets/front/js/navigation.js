export const MAIN_NAV = [
  { label: '首頁', to: '/', match: 'exact' },
  { label: '關於', to: '/about', match: 'prefix' },
  { label: '經歷', to: '/experience', match: 'prefix' },
  { label: '內容', to: '/content', match: 'prefix' },
  { label: '聯絡', to: '/contact', match: 'exact' },
]

export const SECTIONS = {
  about: {
    key: 'about',
    title: '關於',
    base: '/about',
    tabs: [
      { label: '總覽', to: '/about', match: 'exact' },
      { label: '排球', to: '/about/volleyball', match: 'exact' },
      { label: '工程', to: '/about/engineer', match: 'exact' },
    ],
  },
  experience: {
    key: 'experience',
    title: '經歷',
    base: '/experience',
    tabs: [
      { label: '總覽', to: '/experience', match: 'exact' },
      { label: '排球', to: '/experience/volleyball', match: 'exact' },
      { label: '工程', to: '/experience/engineer', match: 'exact' },
    ],
  },
  content: {
    key: 'content',
    title: '內容',
    base: '/content',
    tabs: [
      { label: '總覽', to: '/content', match: 'exact' },
      { label: '排球', to: '/content/volleyball', match: 'prefix' },
      { label: '工程', to: '/content/engineer', match: 'prefix' },
    ],
  },
}

export function isNavActive(item, path) {
  if (item.match === 'prefix') {
    if (item.to === '/') return path === '/'
    return path === item.to || path.startsWith(`${item.to}/`)
  }
  return path === item.to
}

export function isTabActive(tab, path) {
  if (tab.match === 'prefix') {
    return path === tab.to || path.startsWith(`${tab.to}/`)
  }
  return path === tab.to
}
