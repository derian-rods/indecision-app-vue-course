<template>
  <div ref="chatRef" class="chat-messages overflow-y-auto h-full p-4 space-y-4">
    <ChatBubble v-for="message in messages" :key="message.id" v-bind="message" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { MessageInterface } from '@/interfaces/chat-message.interface';
import ChatBubble from '@/components/ChatBuble/ChatBubble.vue';

interface Props {
  messages: MessageInterface[];
}

const { messages } = defineProps<Props>();

const chatRef = ref<HTMLDivElement | null>(null);
watch(
  () => messages,
  () => {
    setTimeout(() => {
      chatRef.value?.scrollTo({
        top: chatRef.value.scrollHeight,
        behavior: 'smooth',
      });
    }, 200);
  },
  { immediate: true, deep: true },
);
</script>
