<template>
  <div
    flex items-center max-w-120 h-9 mx-auto rounded-md overflow-hidden
    border="solid 1 base"
  >
    <div flex justify-center items-center min-h-10 min-w-8 ml-1 text-zinc-500 dark:text-zinc-400>
      <Icon name="search" size="1.1rem" />
    </div>
    <input
      :value="searchTerm"
      w-full lt-md:text-center text-size-base text-base bg-transparent border-none outline-none transition-all box-border
      placeholder="Search APIs..."
      @input="$emit('update:searchTerm', ($event.target as HTMLInputElement)?.value)"
      @focus="$emit('update:searchMode', true); useTrackEvent('focus: Search')"
      @blur="$emit('update:searchMode', false)"
    >
    <div
      flex-center min-h-10 min-w-8 mr-1 text-dim hover:text-zinc-700 hover:dark:text-zinc-200 cursor-pointer
      @click="$emit('update:searchTerm', '')"
    >
      <Icon v-if="searchTerm" name="clear" size="1.1rem" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  searchTerm: string
  searchMode: boolean
}>()
defineEmits<{
  (event: 'update:searchTerm', value: string): void
  (event: 'update:searchMode', value: string): void
}>()
</script>
