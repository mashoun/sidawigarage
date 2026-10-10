<template>
  <div class="min-h-screen flex flex-col bg-[#08090C] text-[#F8F9FA] selection:bg-amber-500/30 selection:text-amber-200">
    <ScrollProgressBar />
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
