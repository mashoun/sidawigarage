export default defineAppConfig({
  ui: {
    colors: {
      primary: 'amber',
      neutral: 'zinc',
    },
    button: {
      defaultVariants: {
        size: 'md',
        color: 'primary',
      },
    },
    card: {
      slots: {
        root: 'rounded-2xl border border-white/10 bg-zinc-900/60 backdrop-blur-xl shadow-2xl transition-all duration-300',
      },
    },
    badge: {
      defaultVariants: {
        size: 'sm',
        variant: 'subtle',
      },
    },
  },
});
