/**
 * useScrollReveal Composable
 * 
 * Provides reactive scroll trigger detection and entrance hooks for Vue components.
 * Fully SSR-safe and honors prefers-reduced-motion.
 */

import { ref, getCurrentInstance, onMounted, onBeforeUnmount } from 'vue';

export interface ScrollRevealConfig {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useScrollReveal(config: ScrollRevealConfig = {}) {
  const isRevealed = ref(false);
  const targetRef = ref<HTMLElement | null>(null);

  const initObserver = () => {
    if (typeof window === 'undefined') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      isRevealed.value = true;
      return;
    }

    if (!targetRef.value) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          isRevealed.value = true;
          if (config.once === true) {
            observer.disconnect();
          }
        } else if (config.once !== true) {
          isRevealed.value = false;
        }
      },
      {
        threshold: config.threshold ?? 0.12,
        rootMargin: config.rootMargin ?? '0px 0px -40px 0px',
      }
    );

    observer.observe(targetRef.value);

    return observer;
  };

  if (getCurrentInstance()) {
    let observer: IntersectionObserver | undefined;

    onMounted(() => {
      observer = initObserver();
    });

    onBeforeUnmount(() => {
      observer?.disconnect();
    });
  }

  return {
    targetRef,
    isRevealed,
  };
}
