<template>
  <div class="bg-blue-500 p-4 text-white flex justify-between items-center">
    <span>{{ title ?? 'Wife' }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
}

defineProps<Props>();
</script>
