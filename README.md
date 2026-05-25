# Court_and_Code · 前端（my-volleyball-vue）

張翰浥個人專區 **Court_and_Code** 的 **前端專案**，負責前台展示與文章管理後台（CMS）介面。

> 本 repo 為全端工作區中的 **前端一半**。後端 API 位於同層的 [`my-volleyball-api`](../my-volleyball-api/)。  
> 整體說明、同時啟動方式與 API 功能對照表見 [根目錄 README](../README.md)。

## 與後端的關係

| 情境 | 結果 |
|------|------|
| 只啟動本專案 | 首頁、關於、經歷、聯絡等靜態頁可瀏覽；**文章與後台功能無法取得資料** |
| 同時啟動前端 + 後端 | 文章列表、詳情、後台 CRUD、圖片上傳可完整運作 |

開發時請先啟動後端（`http://localhost:3000`），再啟動本專案。

## 技術堆疊

- [Vue 3](https://vuejs.org/)（Composition API）
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vue Router 4](https://router.vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Bootstrap 5](https://getbootstrap.com/)
- [GSAP](https://gsap.com/)（首頁與部分內容頁動畫）
- [Axios](https://axios-http.com/)（API 請求，封裝於 `src/lib/api.ts`）

## 環境建置

### 1. 安裝依賴

```bash
npm install
```

### 2. 設定 API 位址（選用）

建立 `.env` 或 `.env.local`：

```env
VITE_API_BASE_URL=http://localhost:3000
```

未設定時預設為 `http://localhost:3000`。

### 3. 啟動開發伺服器

```bash
npm run dev
```

### 4. 建置正式版

```bash
npm run build
```

## 串接 API 的功能

以下頁面透過 `src/lib/api.ts` 呼叫後端，**需後端與資料庫正常運作**：

| 頁面 | 路由 | API 函式 | 後端端點 |
|------|------|----------|----------|
| 內容總覽 | `/content` | `listArticles()` | `GET /articles` |
| 排球文章列表 | `/content/volleyball` | `listArticles()` | `GET /articles` |
| 排球文章詳情 | `/content/volleyball/:id` | `getArticle(id)` | `GET /articles/:id` |
| 文章管理 | `/admin/dashboard` | `listArticles({ includeDraft: true })` | `GET /articles?includeDraft=1` |
| 文章管理 | `/admin/dashboard` | `updateArticle()` | `PUT /articles/:id` |
| 文章管理 | `/admin/dashboard` | `deleteArticle()` | `DELETE /articles/:id` |
| 新增文章 | `/admin/create-post` | `createArticle()` | `POST /articles` |
| 新增文章 | `/admin/create-post` | `uploadImage()` | `POST /uploads` |
| 編輯文章 | `/admin/edit-post/:id` | `getArticle()`、`updateArticle()` | `GET`、`PUT /articles/:id` |
| 編輯文章 | `/admin/edit-post/:id` | `uploadImage()` | `POST /uploads` |

### 不依賴 API 的頁面

- `/` 首頁
- `/about`、`/experience`、`/contact` 及其子頁
- `/content/engineer`

## 目錄結構（重點）

```
src/
├── lib/api.ts          # 後端 API 封裝
├── router/index.ts     # 路由（前台 + /admin 後台）
├── layouts/
│   ├── FrontendLayout.vue
│   ├── SectionLayout.vue
│   └── AdminLayout.vue
└── views/
    ├── content/        # 含 API 串接的文章頁
    └── Dashboard.vue   # 後台文章管理
```

## 開發規範

- 在 `src/main.ts` 統一載入 Bootstrap CSS 與 JS。
- 排版優先使用 Bootstrap Utility Classes，表單與表格採 Bootstrap 元件結構。
- 後台路由收斂於 `/admin` 父路由，版面由 `AdminLayout.vue` 提供。

## 相關文件

- [根目錄 README（雙專案總覽）](../README.md)
- [後端 README](../my-volleyball-api/README.md)
