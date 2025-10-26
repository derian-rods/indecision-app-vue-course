<template>
  <ChatLayout>
    <ChatMessages :messages="messages"> </ChatMessages>
    <MenssageBox @send-message="sendMessage($event)" />
  </ChatLayout>
</template>

<script setup lang="ts">
import ChatMessages from '@/components/ChatMessages/ChatMessages.vue';
import MenssageBox from '@/components/MessageBox/MenssageBox.vue';
import ChatLayout from '@/Layout/ChatLayout.vue';
import { useSendMessage } from '@/composables/useSendMessage';

const { messages, sendMessage } = useSendMessage();
</script>
