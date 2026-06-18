export const EXPERIENCE_CATEGORIES = [
  { value: 'volleyball', label: '排球經歷' },
  { value: 'engineer', label: '工程經歷' },
]

export const MONTH_OPTIONS = [
  { value: '', label: '不指定月份' },
  { value: 1, label: '1 月' },
  { value: 2, label: '2 月' },
  { value: 3, label: '3 月' },
  { value: 4, label: '4 月' },
  { value: 5, label: '5 月' },
  { value: 6, label: '6 月' },
  { value: 7, label: '7 月' },
  { value: 8, label: '8 月' },
  { value: 9, label: '9 月' },
  { value: 10, label: '10 月' },
  { value: 11, label: '11 月' },
  { value: 12, label: '12 月' },
]

export const PERIOD_MODE_OPTIONS = [
  { value: 'single', label: '單一時間點' },
  { value: 'range', label: '有結束時間' },
  { value: 'ongoing', label: '迄今持續中' },
]

const YEAR_START = 2000

export function getYearOptions(endYear = new Date().getFullYear() + 1) {
  const years = []
  for (let year = endYear; year >= YEAR_START; year -= 1) {
    years.push(year)
  }
  return years
}

export function normalizeMonth(value) {
  if (value == null || value === '') return null
  const month = Number(value)
  if (!Number.isInteger(month) || month < 1 || month > 12) return null
  return month
}

function formatDatePart(year, month) {
  const yearText = String(year ?? '').trim()
  if (!yearText) return ''

  const normalizedMonth = normalizeMonth(month)
  if (!normalizedMonth) return yearText
  return `${yearText}.${String(normalizedMonth).padStart(2, '0')}`
}

function getStartTimestamp(entry) {
  const year = Number(entry?.year)
  const month = normalizeMonth(entry?.month) ?? 0
  if (!Number.isFinite(year)) return 0
  return year * 100 + month
}

export function formatExperienceDate(entry) {
  const start = formatDatePart(entry?.year, entry?.month)
  if (!start) return '—'

  if (entry?.isOngoing) {
    return `${start} — 至今`
  }

  const endYear = String(entry?.endYear ?? '').trim()
  if (endYear) {
    const end = formatDatePart(endYear, entry?.endMonth)
    return end ? `${start} — ${end}` : start
  }

  return start
}

export function getExperiencePeriodMode(entry) {
  if (entry?.isOngoing) return 'ongoing'
  if (String(entry?.endYear ?? '').trim()) return 'range'
  return 'single'
}

export function compareExperienceEntries(a, b) {
  const startDiff = getStartTimestamp(b) - getStartTimestamp(a)
  if (startDiff !== 0) return startDiff
  return (b.sortOrder ?? 0) - (a.sortOrder ?? 0)
}

export function sortExperienceEntries(entries = []) {
  return [...entries].sort(compareExperienceEntries)
}

export function createEmptyExperienceEntry() {
  return {
    id: crypto.randomUUID(),
    year: String(new Date().getFullYear()),
    month: '',
    periodMode: 'single',
    endYear: '',
    endMonth: '',
    title: '',
    subtitle: '',
    description: '',
  }
}

export function getCategoryLabel(value) {
  return EXPERIENCE_CATEGORIES.find((item) => item.value === value)?.label ?? value
}

export function isExperienceCategory(value) {
  return EXPERIENCE_CATEGORIES.some((item) => item.value === value)
}

function isEndBeforeStart(startYear, startMonth, endYear, endMonth) {
  const start = getStartTimestamp({ year: startYear, month: startMonth })
  const end = getStartTimestamp({ year: endYear, month: endMonth })
  return end < start
}

export function validateExperienceForm(form) {
  if (!String(form.year ?? '').trim()) return '請填寫開始年份。'
  if (!String(form.title ?? '').trim()) return '請填寫標題。'

  if (form.periodMode === 'range') {
    if (!String(form.endYear ?? '').trim()) return '請填寫結束年份。'
    if (isEndBeforeStart(form.year, form.month, form.endYear, form.endMonth)) {
      return '結束時間不可早於開始時間。'
    }
  }

  return ''
}

export function buildEntryFromForm(form, existingId) {
  const isOngoing = form.periodMode === 'ongoing'
  const hasRange = form.periodMode === 'range'

  return {
    id: existingId || crypto.randomUUID(),
    year: String(form.year).trim(),
    month: form.month === '' ? null : Number(form.month),
    isOngoing,
    endYear: hasRange ? String(form.endYear).trim() : '',
    endMonth: hasRange && form.endMonth !== '' ? Number(form.endMonth) : null,
    title: form.title.trim(),
    subtitle: form.subtitle.trim(),
    description: form.description.trim(),
  }
}

export function mapEntryToForm(entry, category = 'volleyball') {
  const periodMode = getExperiencePeriodMode(entry)

  return {
    category,
    year: String(entry?.year ?? ''),
    month: entry?.month ?? '',
    periodMode,
    endYear: periodMode === 'range' ? String(entry?.endYear ?? '') : '',
    endMonth: periodMode === 'range' ? entry?.endMonth ?? '' : '',
    title: entry?.title ?? '',
    subtitle: entry?.subtitle ?? '',
    description: entry?.description ?? '',
  }
}
