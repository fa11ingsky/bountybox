<template>
  <section class="featured-banner" @mouseenter="pauseAuto" @mouseleave="resumeAuto" role="region"
    aria-label="Featured products banner">
    <transition name="fade" mode="out-in">
      <a class="slide" :key="activeIndex" :style="slideStyle(featured[activeIndex])"
        @click="setTag(featured[activeIndex].tag)">
        <div class="overlay">
          <h2 class="title">{{ featured[activeIndex].title }}</h2>
        </div>
      </a>
    </transition>

    <nav class="indicators" aria-label="Select featured product">
      <button v-for="(p, i) in featured" :key="i" :class="['dot', { active: i === activeIndex }]" @click="goTo(i)"
        :aria-pressed="i === activeIndex" :aria-label="`Show product ${i + 1}: ${p.title}`" />
    </nav>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import featured from '~/static/featured.json';

const emit = defineEmits(['update-filter']);

const INTERVAL_MS = 10000;

const props = defineProps({
  products: {
    type: Object,
    required: true
  }
});

const activeIndex = ref(0);
let timer = null;


function next() {
  activeIndex.value = (activeIndex.value + 1) % featured.length;
}

function goTo(i) {
  activeIndex.value = i;
  resetAuto();
}

function startAuto() {
  stopAuto();
  timer = setInterval(next, INTERVAL_MS);
}

function stopAuto() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

function resetAuto() {
  stopAuto();
  startAuto();
}

function pauseAuto() {
  stopAuto();
}

function resumeAuto() {
  startAuto();
}

function setTag(tag) {
  // Emit an event to the parent component to filter products by tag
  emit('update-filter', tag);
}

function onCtaClick(index) {
  console.log('CTA clicked for', featured.value[index]);
}


function slideStyle(product) {
  const overlayGradient = 'linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25))';
  const desktop = `${overlayGradient}, url("/img/${product.img_large}")`;
  const mobile = `${overlayGradient}, url("/img/${product.img_small}")`;

  return {
    backgroundImage: window.innerWidth <= 640 ? mobile : desktop
  };
}

onMounted(() => {
  startAuto();
  console.log('FeaturedBanner mounted with products:', featured);
});

onBeforeUnmount(() => {
  stopAuto();
});
</script>

<style scoped>
.featured-banner {
  height: 33vh;
  min-height: 240px;
  width: 100%;
  position: relative;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
  background: #000;
}

/* Slide */
.slide {
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  position: relative;
}

/* Overlay text */
.overlay {
  padding: 0px 15px;
  max-width: 60%;
  backdrop-filter: blur(3px);
  /* background: linear-gradient(135deg, #ff932f  0%, #ff954e 60%, #ff812d 100%); */
  background: rgb(48, 48, 48);
  border-radius: 12px;
  box-shadow: 0 12px 30px rgba(255, 78, 80, 0.22), 0 4px 10px rgba(0, 0, 0, 0.45);
  display: inline-flex;
  align-items: center;
  transform-origin: bottom left;
  animation: pop-in 640ms cubic-bezier(.2, .8, .2, 1);
  border: 1px solid rgba(255, 255, 255, 0.12);
  user-select: none;
}


/* pop animation for attention */
@keyframes pop-in {
  0% {
    transform: translateY(6px) scale(.96);
    opacity: 0;
  }

  60% {
    transform: translateY(-6px) scale(1.06);
    opacity: 1;
  }

  100% {
    transform: translateY(0) scale(1);
  }
}


.title {
  margin: 0 0 6px 0;
  font-size: clamp(1.1rem, 2.8vw, 1.6rem);
  font-weight: 600;
  color: white;
}

.price {
  margin: 0 0 8px 0;
  font-size: 0.95rem;
  opacity: 0.95;
}


/* Indicators */
.indicators {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 12px;
  display: flex;
  gap: 8px;
}

.dot {
  width: 10px;
  height: 10px;
  background: rgba(255, 255, 255, 0.45);
  border-radius: 50%;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: transform .18s ease, background .18s ease;
}

.dot.active {
  background: #fff;
  transform: scale(1.25);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 600ms ease, transform 600ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(6px);
}

/* Small screens tweaks */
@media (max-width: 640px) {

  .cta {
    padding: 6px 10px;
  }

  .indicators {
    bottom: 8px;
    gap: 6px;
  }

  .dot {
    width: 9px;
    height: 9px;
  }

  .overlay {
    max-width: 100%;
    padding: 10px 12px;
    border-radius: 10px;
  }

  .overlay::before {
    width: 28px;
    height: 28px;
    font-size: 0.85rem;
  }
}
</style>