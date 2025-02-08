<template>
  <main>
    <Header />
    <slot />
    <Footer />
  </main>
</template>

<script setup>
  import Footer from '@/components/Footer.vue';
  import Header from '@/components/Header.vue';
</script>
