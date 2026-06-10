<template>
  <div class="home-wrapper overflow-hidden bg-light">
    <!-- SECTION 1: HERO (視覺震撼導向) -->
    <section
      class="hero-section vh-100 d-flex align-items-center justify-content-center position-relative px-3 px-md-0"
    >
      <!-- 背景圖片與疊加層 -->
      <div class="hero-bg-overlay position-absolute top-0 start-0 w-100 h-100"></div>

      <div class="hero-content text-center z-2 text-white">
        <div class="gsap-hero-keywords overflow-hidden mb-3">
          <h2
            class="display-6 fw-black text-primary text-uppercase letter-spacing-10 opacity-100 mb-0 neon-text"
          >
            Code / Volley / Growth
          </h2>
        </div>
        <div class="gsap-main-statement overflow-hidden">
          <h1 class="display-1 fw-black mb-0 ls-tightest anim-text text-white">
            在競技中尋求<span class="text-primary">極致</span><br />
            在邏輯中建構<span class="text-primary">秩序</span>
          </h1>
        </div>
        <div class="gsap-sub-statement mt-4 overflow-hidden">
          <p class="fs-5 fw-light opacity-75">Beyond the Court / Behind the Terminal</p>
        </div>
      </div>
    </section>

    <!-- 橫向跑馬燈裝飾區 (填補空洞) -->
    <div class="marquee-decor py-3 bg-white border-top border-bottom">
      <div class="marquee-content fw-black text-uppercase opacity-10">
        Volleyball . Frontend . Logic . Synergy . Teamwork . Problem Solving . Impact . Spike .
        Debug . Deploy . Win .
      </div>
    </div>

    <!-- SECTION 2: ABOUT (故事性的介紹) -->
    <section class="section-about container-fluid py-15 py-md-20 bg-white position-relative">
      <!-- 裝飾：漂浮括號 -->
      <div
        class="decor-element decor-bracket position-absolute text-primary opacity-10 fs-huge floating-slow"
        style="top: 10%; left: 5%"
      >
        {
      </div>
      <div
        class="decor-element decor-bracket-r position-absolute text-primary opacity-10 fs-huge floating-slower"
        style="bottom: 10%; right: 5%"
      >
        }
      </div>

      <div class="container position-relative z-1">
        <div class="row align-items-center">
          <div class="col-lg-5 mb-5 mb-lg-0">
            <div class="gsap-reveal-up">
              <span class="text-primary fw-bold text-uppercase d-block mb-3 letter-spacing-5"
                >CORE ESSENCE</span
              >
              <h2 class="display-4 fw-black text-dark mb-4">不只是開發者，<br />更是競技者。</h2>
            </div>
            <p class="fs-5 text-secondary mb-5 lh-lg gsap-reveal-up">
              十餘年的排球生涯，教會我的不只是擊球，而是如何在比分落後時保持冷靜。當我踏入軟體工程的世界時，我發現邏輯的背後也需要同樣的爆發力與韌性。
            </p>
            <div class="gsap-reveal-up">
              <router-link to="/about" class="btn btn-dark rounded-0 px-5 py-3 fw-bold"
                >認識我</router-link
              >
            </div>
          </div>
          <div class="col-lg-7 ps-lg-5">
            <div class="about-quote-box p-5 bg-light rounded-5 position-relative gsap-reveal-right">
              <i
                class="bi bi-quote display-1 text-primary opacity-25 position-absolute top-0 start-0 m-3"
              ></i>
              <h3 class="fw-bold mb-3 mt-4">
                「在球場上，沒有第二次機會；在代碼中，我們追求一次就做對。」
              </h3>
              <p class="text-secondary mb-0">
                這是我對技術與比賽共同的敬畏。我將每一次的 Commit
                都視為一次關鍵的扣殺，必須精準、有力、且具備戰略性。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 3: VOLLEYBALL (特色區) -->
    <section
      class="section-volleyball bg-dark text-white py-15 py-md-20 position-relative overflow-hidden"
    >
      <!-- 裝飾：動態衝擊球 (由左往右飛入) -->
      <div
        class="decor-ball-impact position-absolute text-white opacity-25 fs-huge"
        style="top: 20%; left: -10vw"
      >
        🏐
      </div>

      <!-- 巨型裝飾口號 (半透明) -->
      <div
        class="position-absolute d-none d-lg-block top-50 start-50 translate-middle w-100 text-center opacity-05 pointer-events-none"
      >
        <div class="display-huge fw-black text-uppercase">ATHLETE</div>
      </div>

      <div class="container position-relative z-1">
        <div class="d-flex justify-content-between align-items-end mb-6">
          <div>
            <h2 class="display-3 fw-black mb-0 text-uppercase">競技場：球場上的我</h2>
            <p class="fs-5 text-primary opacity-75 mt-2">
              Sport is not just exercise, it's character building.
            </p>
          </div>
          <div class="d-none d-md-block text-end">
            <div class="h1 fw-black mb-0 opacity-25">01</div>
            <span class="small tracking-widest">CHAPTER: SPORT</span>
          </div>
        </div>

        <div class="row g-5">
          <div class="col-md-7">
            <div
              class="volleyball-visual-main rounded-5 bg-secondary d-flex flex-column justify-content-end p-5 shadow-lg overflow-hidden ratio ratio-16x9"
            >
              <div class="z-1 bg-dark bg-opacity-25 p-4 rounded-4 backdrop-blur-sm">
                <h3 class="fw-bold mb-2">領悟團隊真義</h3>
                <p class="mb-0 text-light small">
                  在排球中，如果沒有舉球員的助攻，再強的扣殺也無法發生。這讓我理解了模組化協作的重要性。
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-5">
            <div class="d-flex flex-column gap-4 h-100">
              <div class="quote-card bg-primary p-5 rounded-5 shadow-lg flex-grow-1">
                <h4 class="fw-bold mb-3">戰鬥意志</h4>
                <p class="mb-0 small opacity-90">
                  我不怕失敗，我只怕沒有在失敗中學到東西。排球聯賽教會我在高壓環境下持續產出高品質的判斷。
                </p>
              </div>
              <div class="info-card border border-white border-opacity-20 p-5 rounded-5">
                <div class="d-flex align-items-center mb-3">
                  <i class="bi bi-patch-check-fill text-primary fs-3 me-2"></i>
                  <h5 class="mb-0 fw-bold">參與賽事</h5>
                </div>
                <p class="small text-light opacity-50 mb-0">
                  大專排球聯賽 (UVL) / 企業級校友盃 / 各大盃賽精華...
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-5 text-center">
          <router-link to="/content/volleyball" class="btn btn-outline-light rounded-pill px-5"
            >探索排球內容 <i class="bi bi-arrow-right ms-2"></i
          ></router-link>
        </div>
      </div>
    </section>

    <!-- SECTION 4: PROJECTS -->
    <section class="section-projects container py-15 py-md-20 bg-white position-relative">
      <!-- 裝飾：代碼標籤 -->
      <div
        class="decor-tag position-absolute text-dark opacity-05 fs-1 fw-black"
        style="top: 15%; right: 10%"
      >
        &lt;section /&gt;
      </div>
      <div
        class="decor-tag-2 position-absolute text-dark opacity-05 fs-3 fw-black"
        style="bottom: 15%; left: 5%"
      >
        git push --force
      </div>

      <div class="row mb-8 align-items-center position-relative z-1">
        <div class="col-md-6">
          <h2 class="display-4 fw-black text-dark mb-0">實踐：打造產品</h2>
          <p class="fs-5 text-secondary mt-3">From concept to deployment.</p>
        </div>
        <div class="col-md-6 text-md-end">
          <p class="fw-bold text-dark fs-5 italic-motto">"Code is temporary, logic is forever."</p>
        </div>
      </div>

      <div class="row g-4 justify-content-center position-relative z-1">
        <div class="col-md-6 col-lg-4" v-for="i in 3" :key="i">
          <div
            class="project-item bg-light p-4 rounded-5 border-0 shadow-sm transition-all hover-up h-100 d-flex flex-column"
          >
            <div
              class="bg-white rounded-4 mb-4 d-flex align-items-center justify-content-center p-3 shadow-inner"
              style="height: 180px"
            >
              <i class="bi bi-laptop fs-1 text-primary opacity-25"></i>
            </div>
            <h4 class="fw-bold mb-2">作品名稱 Placeholder {{ i }}</h4>
            <p class="text-secondary small mb-4 flex-grow-1">
              探索如何利用現代前端技術優化複雜的業務流程，這是我在開發過程中最引以為傲的一點...
            </p>
            <a
              href="#"
              class="text-dark fw-bold text-decoration-none small d-flex align-items-center"
            >
              Case Study <i class="bi bi-chevron-right ms-1"></i>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 5: THOUGHTS -->
    <section class="section-thoughts py-15 py-md-20 bg-dark text-white">
      <div class="container text-center">
        <div class="mb-5">
          <h2 class="display-3 fw-black">LIFE & INSIGHTS</h2>
          <p class="text-primary tracking-widest font-monospace">BLOG / THOUGHTS / NOTES</p>
        </div>
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="quote-slide mb-6">
              <h2 class="fw-light italic mb-4">「生活不僅是寫程式，更是如何有意識地去生活。」</h2>
              <div class="divider bg-primary mx-auto mb-5" style="width: 50px; height: 3px"></div>
            </div>
            <div class="d-flex flex-wrap justify-content-center gap-3">
              <span class="badge bg-secondary p-3 rounded-pill"># 咖啡與代碼的平衡</span>
              <span class="badge bg-secondary p-3 rounded-pill"># 競技心態的跨界應用</span>
              <span class="badge bg-secondary p-3 rounded-pill"># 為什麼我選擇 React/Vue</span>
              <span class="badge bg-secondary p-3 rounded-pill"># 比賽後的修復、冷靜與重啟</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const mainBall = ref(null)
let tl = null

onMounted(() => {
  // 1. Hero 入場動畫
  tl = gsap.timeline()

  tl.from('.gsap-hero-keywords', {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  })
    .from(
      '.gsap-main-statement h1',
      {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
      },
      '-=0.5',
    )
    .from(
      '.gsap-sub-statement',
      {
        y: 20,
        opacity: 0,
        duration: 0.8,
      },
      '-=0.8',
    )

  // 2. 靈魂排球 GSAP 動畫 (大幅簡化互動，避免遮擋文字)
  if (mainBall.value) {
    gsap.to(mainBall.value, {
      y: -15,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    })

    // 隨著滾動滾動淡出
    gsap.to(mainBall.value, {
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom center',
        scrub: true,
      },
      opacity: 0,
      scale: 0.5,
      filter: 'blur(10px)',
    })
  }

  // 4. 裝飾元素動畫 (Decor Elements)
  gsap.to('.decor-ball-impact', {
    scrollTrigger: {
      trigger: '.section-volleyball',
      start: 'top 80%',
      end: 'center center',
      scrub: 1.2,
    },
    left: '50%',
    xPercent: -50,
    scale: 1.5,
    rotation: 360,
    opacity: 0.15,
    ease: 'power2.out',
  })

  gsap.to('.decor-bracket, .decor-bracket-r', {
    scrollTrigger: {
      trigger: '.section-about',
      scrub: 2,
    },
    y: '-=100',
    rotation: 45,
  })
})

onUnmounted(() => {
  if (tl) tl.kill()
  ScrollTrigger.getAll().forEach((t) => t.kill())
})
</script>

<style scoped>
/* 裝飾文字與圖示大小 */
.fs-huge {
  font-size: 10rem;
}
.opacity-10 {
  opacity: 0.1;
}

/* 垂直空間加強 */
.py-15 {
  padding-top: 10rem;
  padding-bottom: 10rem;
}
.py-20 {
  padding-top: 14rem;
  padding-bottom: 14rem;
}

/* 浮動動畫 */
@keyframes float {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-30px);
  }
}
.floating-slow {
  animation: float 6s ease-in-out infinite alternate;
}
.floating-slower {
  animation: float 8s ease-in-out infinite alternate-reverse;
}

/* 全域情緒化細節 */
.home-wrapper {
  font-family:
    'Inter',
    system-ui,
    -apple-system,
    sans-serif;
  line-height: 1.6;
}
.display-1 {
  font-size: 5.5rem;
}
.fw-black {
  font-weight: 900;
}
.ls-tightest {
  letter-spacing: -4px;
}
.letter-spacing-5 {
  letter-spacing: 5px;
}

/* Marquee 跑馬燈裝飾 */
.marquee-decor {
  overflow: hidden;
  white-space: nowrap;
}
.marquee-content {
  display: inline-block;
  padding-left: 100%;
  animation: marquee 40s linear infinite;
  font-size: 1.25rem;
}
@keyframes marquee {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-100%, 0);
  }
}

/* Hero Section with Image Background */
.hero-section {
  background-image: url('../assets/hero-bg.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.hero-bg-overlay {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8));
  backdrop-filter: blur(2px);
}

.neon-text {
  text-shadow:
    0 0 10px rgba(13, 110, 253, 0.8),
    0 0 20px rgba(13, 110, 253, 0.5);
}

/* 區塊細節 */
.display-huge {
  font-size: 15vw;
  color: rgba(255, 255, 255, 0.05);
}
.italic-motto {
  font-style: italic;
  opacity: 0.7;
}
.opacity-05 {
  opacity: 0.05;
}
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

/* Project & Hover */
.hover-up:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1) !important;
}
.shadow-inner {
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.02);
}

@media (max-width: 768px) {
  .display-0 {
    font-size: 3rem;
  }
  .ls-tightest {
    letter-spacing: -1.5px;
  }
  .hero-main-ball {
    font-size: 5rem;
  }
}
</style>
