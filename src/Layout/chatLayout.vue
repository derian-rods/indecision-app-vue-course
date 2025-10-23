<template>
  <div class="bg-gray-100 h-screen flex flex-col max-w-lg mx-auto">
    <ChatHeader :title="'Mom'" />
    <slot />
  </div>
</template>

<script setup lang="ts">
import ChatHeader from '@/components/ChatHeader/ChatHeader.vue';
</script>
