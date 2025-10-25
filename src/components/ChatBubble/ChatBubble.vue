<template>
  <!-- Example Message -->
  <div v-if="isSender" class="flex justify-end">
    <div class="bg-blue-200 text-black p-2 rounded-lg max-w-xs">
      {{ message }}
    </div>
  </div>
  <!-- Example Received Message -->
  <div v-else class="flex">
    <div class="bg-gray-300 text-black p-2 rounded-lg max-w-xs">
      <span class="Capitalize">{{ message }}</span>
      <img
        v-if="imageUrl"
        :src="imageUrl"
        loading="eager"
        width="300"
        height="300"
        alt="Avatar"
        class="w-52 h-52 object-cover rounded-md"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface ChatBubbleProps {
  message: string;
  isSender: boolean;
  imageUrl?: string;
}
defineProps<ChatBubbleProps>();
</script>
