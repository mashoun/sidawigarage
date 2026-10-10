import { defineNuxtPlugin } from '#app';
import type { DirectiveBinding } from 'vue';

export interface RevealOptions {
  variant?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'blur-in';
  delay?: number;
  duration?: number;
  distance?: string;
  threshold?: number;
  once?: boolean;
}

export default defineNuxtPlugin((nuxtApp) => {
  let observer: IntersectionObserver | null = null;
  const activeTimers = new WeakMap<HTMLElement, ReturnType<typeof setTimeout>>();

  if (import.meta.client) {
    // Mark HTML document so CSS knows the scroll reveal system is active
    document.documentElement.classList.add('reveal-ready');

    const isReducedMotion = () => {
      return (
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      );
    };

    const triggerReveal = (el: HTMLElement) => {
      const existingTimer = activeTimers.get(el);
      if (existingTimer) {
        clearTimeout(existingTimer);
        activeTimers.delete(el);
      }

      el.classList.add('is-revealed');

      const once = el.getAttribute('data-reveal-once') === 'true';
      if (once && observer) {
        observer.unobserve(el);
      }

      const delay = parseFloat(el.style.getPropertyValue('--reveal-delay') || '0');
      const duration = parseFloat(el.style.getPropertyValue('--reveal-duration') || '1000');
      const totalDuration = delay + duration + 50;

      const timer = setTimeout(() => {
        if (el.classList.contains('is-revealed')) {
          el.classList.add('is-transitioned');
        }
        activeTimers.delete(el);
      }, totalDuration);

      activeTimers.set(el, timer);
    };

    const resetReveal = (el: HTMLElement) => {
      const once = el.getAttribute('data-reveal-once') === 'true';
      if (once) return;

      const existingTimer = activeTimers.get(el);
      if (existingTimer) {
        clearTimeout(existingTimer);
        activeTimers.delete(el);
      }

      // Smoothly reset so that scrolling in either direction triggers the 1s reveal again
      el.classList.remove('is-revealed', 'is-transitioned');
    };

    const setupElement = (el: HTMLElement, options: RevealOptions = {}) => {
      if (isReducedMotion()) {
        el.classList.add('reveal-item', 'is-revealed', 'is-transitioned');
        return;
      }

      el.classList.add('reveal-item');

      const variant = options.variant || 'fade-up';
      el.classList.add(`reveal-${variant}`);
      el.setAttribute('data-reveal', variant);

      if (options.once) {
        el.setAttribute('data-reveal-once', 'true');
      }

      if (options.delay !== undefined) {
        el.style.setProperty('--reveal-delay', `${options.delay}ms`);
      }

      const duration = options.duration !== undefined ? options.duration : 1000;
      el.style.setProperty('--reveal-duration', `${duration}ms`);

      // Check if element is already within the initial top viewport (e.g. Hero items on load)
      const rect = el.getBoundingClientRect();
      const inViewport =
        rect.top < window.innerHeight &&
        rect.bottom > 0 &&
        rect.left < window.innerWidth &&
        rect.right > 0;

      if (inViewport && rect.top < window.innerHeight * 0.75) {
        requestAnimationFrame(() => {
          setTimeout(() => triggerReveal(el), 20);
        });
      }

      // Always observe for continuous bi-directional scroll reveals (down and up)
      if (observer) {
        observer.observe(el);
      }
    };

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const el = entry.target as HTMLElement;
            if (entry.isIntersecting) {
              triggerReveal(el);
            } else {
              // Element exited the viewport in either direction: reset for next entrance
              resetReveal(el);
            }
          });
        },
        {
          root: null,
          rootMargin: '0px 0px -40px 0px',
          threshold: 0.08,
        }
      );
    }

    // Vue directive v-reveal (Client hooks)
    nuxtApp.vueApp.directive('reveal', {
      mounted(el: HTMLElement, binding: DirectiveBinding<RevealOptions | string | undefined>) {
        let options: RevealOptions = {};

        if (typeof binding.value === 'string') {
          options.variant = binding.value as RevealOptions['variant'];
        } else if (typeof binding.value === 'object' && binding.value !== null) {
          options = { ...binding.value };
        }

        if (binding.arg) {
          if (binding.arg === 'up') options.variant = 'fade-up';
          if (binding.arg === 'down') options.variant = 'fade-down';
          if (binding.arg === 'left') options.variant = 'fade-left';
          if (binding.arg === 'right') options.variant = 'fade-right';
          if (binding.arg === 'zoom') options.variant = 'zoom-in';
          if (binding.arg === 'blur') options.variant = 'blur-in';
        }

        if (binding.modifiers.left) options.variant = 'fade-left';
        if (binding.modifiers.right) options.variant = 'fade-right';
        if (binding.modifiers.up) options.variant = 'fade-up';
        if (binding.modifiers.down) options.variant = 'fade-down';
        if (binding.modifiers.zoom) options.variant = 'zoom-in';
        if (binding.modifiers.blur) options.variant = 'blur-in';

        setupElement(el, options);
      },
      unmounted(el: HTMLElement) {
        if (observer) {
          observer.unobserve(el);
        }
        const existingTimer = activeTimers.get(el);
        if (existingTimer) {
          clearTimeout(existingTimer);
          activeTimers.delete(el);
        }
      },
      getSSRProps() {
        return {};
      },
    });

    const scanDataRevealElements = () => {
      const elements = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.reveal-item)');
      elements.forEach((el) => {
        const variant = (el.getAttribute('data-reveal') as RevealOptions['variant']) || 'fade-up';
        const delayAttr = el.getAttribute('data-reveal-delay');
        const durationAttr = el.getAttribute('data-reveal-duration');
        const onceAttr = el.getAttribute('data-reveal-once');

        setupElement(el, {
          variant,
          delay: delayAttr ? parseInt(delayAttr, 10) : undefined,
          duration: durationAttr ? parseInt(durationAttr, 10) : undefined,
          once: onceAttr === 'true',
        });
      });
    };

    nuxtApp.hook('page:finish', () => {
      setTimeout(scanDataRevealElements, 50);
    });
  } else {
    // Server-side registration so SSR template compiler recognizes v-reveal
    nuxtApp.vueApp.directive('reveal', {
      getSSRProps() {
        return {};
      },
    });
  }
});
