import { createRouter, createWebHistory } from 'vue-router'
import type { SectionKey } from '@/constants/navigation'

export const SITE_TITLE = 'Court_and_Code'

function sectionMeta(
  section: SectionKey,
  layerTitle: string,
  extra: Record<string, unknown> = {},
) {
  const titles: Record<SectionKey, string> = {
    about: '關於',
    experience: '經歷',
    content: '內容',
    contact: '聯絡',
  }
  return {
    section,
    title: titles[section],
    layerTitle,
    subtitle: extra.subtitle as string | undefined,
    icon: extra.icon as string | undefined,
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../layouts/FrontendLayout.vue'),
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('../views/Home.vue'),
          meta: { title: '首頁' },
        },
        {
          path: 'about',
          component: () => import('../layouts/SectionLayout.vue'),
          meta: { title: '關於', section: 'about' },
          redirect: '/about',
          children: [
            {
              path: '',
              name: 'AboutOverview',
              component: () => import('../views/about/AboutOverview.vue'),
              meta: sectionMeta('about', '總覽', {
                subtitle: '認識排球與工程兩種身份',
                icon: 'bi bi-person-badge',
              }),
            },
            {
              path: 'volleyball',
              name: 'AboutVolleyball',
              component: () => import('../views/about/AboutVolleyball.vue'),
              meta: sectionMeta('about', '排球', {
                subtitle: '場上角色與運動理念',
                icon: 'bi bi-dribbble',
              }),
            },
            {
              path: 'engineer',
              name: 'AboutEngineer',
              component: () => import('../views/about/AboutEngineer.vue'),
              meta: sectionMeta('about', '工程', {
                subtitle: '技能與開發方向',
                icon: 'bi bi-laptop',
              }),
            },
          ],
        },
        {
          path: 'experience',
          component: () => import('../layouts/SectionLayout.vue'),
          meta: { title: '經歷', section: 'experience' },
          redirect: '/experience',
          children: [
            {
              path: '',
              name: 'ExperienceOverview',
              component: () => import('../views/experience/ExperienceOverview.vue'),
              meta: sectionMeta('experience', '總覽', {
                subtitle: '排球與工程時間軸摘要',
                icon: 'bi bi-signpost-split',
              }),
            },
            {
              path: 'volleyball',
              name: 'ExperienceVolleyball',
              component: () => import('../views/experience/ExperienceVolleyball.vue'),
              meta: sectionMeta('experience', '排球', {
                subtitle: '賽事與隊伍經歷',
                icon: 'bi bi-dribbble',
              }),
            },
            {
              path: 'engineer',
              name: 'ExperienceEngineer',
              component: () => import('../views/experience/ExperienceEngineer.vue'),
              meta: sectionMeta('experience', '工程', {
                subtitle: '學習與工作歷程',
                icon: 'bi bi-briefcase',
              }),
            },
          ],
        },
        {
          path: 'content',
          component: () => import('../layouts/SectionLayout.vue'),
          meta: { title: '內容', section: 'content' },
          redirect: '/content',
          children: [
            {
              path: '',
              name: 'ContentOverview',
              component: () => import('../views/content/ContentOverview.vue'),
              meta: sectionMeta('content', '總覽', {
                subtitle: '排球文章與工程專案入口',
                icon: 'bi bi-collection',
              }),
            },
            {
              path: 'volleyball',
              name: 'ContentVolleyball',
              component: () => import('../views/content/ContentVolleyball.vue'),
              meta: sectionMeta('content', '排球', {
                subtitle: '賽事文章與精華影片',
                icon: 'bi bi-dribbble',
              }),
            },
            {
              path: 'volleyball/:id',
              name: 'ContentVolleyballArticle',
              component: () => import('../views/content/ContentVolleyballArticle.vue'),
              meta: {
                ...sectionMeta('content', '文章', { icon: 'bi bi-file-text' }),
                title: '內容',
              },
            },
            {
              path: 'engineer',
              name: 'ContentEngineer',
              component: () => import('../views/content/ContentEngineer.vue'),
              meta: sectionMeta('content', '工程', {
                subtitle: '專案與開發筆記',
                icon: 'bi bi-code-slash',
              }),
            },
          ],
        },
        {
          path: 'contact',
          component: () => import('../layouts/SectionLayout.vue'),
          meta: { title: '聯絡', section: 'contact' },
          redirect: '/contact',
          children: [
            {
              path: '',
              name: 'ContactOverview',
              component: () => import('../views/contact/ContactOverview.vue'),
              meta: sectionMeta('contact', '總覽', {
                subtitle: '合作與交流方式',
                icon: 'bi bi-envelope-paper',
              }),
            },
            {
              path: 'volleyball',
              name: 'ContactVolleyball',
              component: () => import('../views/contact/ContactVolleyball.vue'),
              meta: sectionMeta('contact', '排球', {
                subtitle: '賽事與排球相關邀約',
                icon: 'bi bi-dribbble',
              }),
            },
            {
              path: 'engineer',
              name: 'ContactEngineer',
              component: () => import('../views/contact/ContactEngineer.vue'),
              meta: sectionMeta('contact', '工程', {
                subtitle: '技術與專案合作',
                icon: 'bi bi-laptop',
              }),
            },
          ],
        },
        // 舊路徑導向新架構
        { path: 'volleyball', redirect: '/content/volleyball' },
        { path: 'volleyball/:slug', redirect: (to) => `/content/volleyball/${to.params.slug}` },
        { path: 'engineer', redirect: '/about/engineer' },
        { path: 'growth', redirect: '/content/engineer' },
        { path: 'projects', redirect: '/content/engineer' },
      ],
    },
    {
      path: '/admin',
      name: 'AdminLayout',
      component: () => import('../layouts/AdminLayout.vue'),
      redirect: '/admin/dashboard',
      meta: { title: '管理後台' },
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: () => import('../views/Dashboard.vue'),
          meta: { title: '文章管理' },
        },
        {
          path: 'create-post',
          name: 'CreatePost',
          component: () => import('../views/CreatePost.vue'),
          meta: { title: '新增文章' },
        },
        {
          path: 'edit-post/:id',
          name: 'EditPost',
          component: () => import('../views/EditPost.vue'),
          meta: { title: '編輯文章' },
        },
      ],
    },
  ],
})

router.afterEach((to) => {
  const pageTitle = typeof to.meta.title === 'string' ? to.meta.title : undefined
  const layerTitle = typeof to.meta.layerTitle === 'string' ? to.meta.layerTitle : undefined
  if (pageTitle && layerTitle && pageTitle !== layerTitle) {
    document.title = `${pageTitle} · ${layerTitle} | ${SITE_TITLE}`
  } else if (pageTitle) {
    document.title = `${pageTitle} | ${SITE_TITLE}`
  } else {
    document.title = SITE_TITLE
  }
})

export default router
