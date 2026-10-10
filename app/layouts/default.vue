<template>
  <div class="min-h-screen w-full max-w-full overflow-x-clip relative flex flex-col bg-[#08090C] text-[#F8F9FA] selection:bg-amber-500/30 selection:text-amber-200">
    <ScrollProgressBar />
    <AppHeader />
    <main class="flex-1 w-full max-w-full overflow-x-clip">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
