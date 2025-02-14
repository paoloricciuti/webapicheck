<script setup lang="ts">
definePageMeta({
  validate: ({ params }) => {
    return Object.keys(webApiData).includes(params.id.toString())
  },
})

const route = useRoute()

const webApiStatuses: Ref<WebApiStatuses> = useState('webApiStatuses', () => ({}))

const webApiId = computed(() => route.params.id.toString())
const webApi = computed(() => ({ id: webApiId.value, ...webApiData[webApiId.value] }))
const available = computed(() => webApiStatuses.value[webApiId.value])

useSeoMeta({
  title: () => webApi.value.name,
  description: () => `Open this page to test if your current device supports ${webApi.value.name} (WebAPI). Details, properties, special requirements, and more for ${webApi.value.name}.`,
})

const status = computed(() => {
  if (available.value) {
    if (webApi.value.experimental) {
      return {
        name: 'experimental',
        icon: 'experimental',
        label: 'Available on this device (experimental)',
      }
    }
    return {
      name: 'available',
      icon: 'check',
      label: 'Available on this device',
    }
  }
  if (available.value === false) {
    return {
      name: 'unavailable',
      icon: 'cross',
      label: 'Not available on this device',
    }
  }
  return undefined
})

onMounted(() => useTestWebApis([webApi.value]))
</script>

<template>
  <div>
    <NuxtLayout>
      <div max-w-screen-lg mx-auto px-3 md:px-4>
        <h1>
          {{ webApi.name }}
        </h1>
        <div class="status" :class="status?.name">
          <span class="status-icon">
            <Icon :name="status?.icon || ''" />
          </span>
          <span class="status-label">
            {{ status?.label }}
          </span>
        </div>
        <div class="box" grid md:grid-cols-2 gap-3 md:gap-4 mt-8>
          <div>
            <div class="label">
              Path
            </div>
            <div class="value">
              {{ webApi.path || 'N/A' }}
            </div>
          </div>
          <div>
            <div class="label">
              Source
            </div>
            <div class="value">
              <ApiSource :source="webApi.source" />
            </div>
          </div>
          <div>
            <div class="label">
              Documentation
            </div>
            <div inline-flex items-center>
              <NuxtLink
                :to="webApi.url"
                :title="`Documentation for ${webApi.name}`"
                target="_blank"
                btn-xs btn-outline
                @click="useTrackEvent('click: WebAPI documentation', { props: { webapi: webApi.id } })"
              >
                OPEN <Icon name="external" class="ml-0.5" />
              </NuxtLink>
            </div>
          </div>
        </div>
        <div mt-8>
          <p mb-6 text-dim font-bold>
            Special properties
          </p>
          <div v-if="webApi.availableInWebWorkers" class="panel">
            <div flex items-center>
              <Icon name="webworker" size="1.25rem" /> Available in Web Workers
            </div>
          </div>
          <div v-if="webApi.userInteractionRequired" class="panel">
            <div flex items-center>
              <Icon name="interaction" size="1.25rem" /> User interaction required
            </div>
          </div>
          <div v-if="webApi.permissionsRequired" class="panel">
            <div flex items-center>
              <Icon name="permission" size="1.25rem" /> Permission/s required
            </div>
          </div>
          <div v-if="webApi.secureContextRequired" class="panel">
            <div flex items-center>
              <Icon name="secure" size="1.25rem" /> Secure context required
            </div>
          </div>
          <p v-if="!webApi.availableInWebWorkers && !webApi.userInteractionRequired && !webApi.permissionsRequired && !webApi.secureContextRequired" mt-4 italic>
            No special features or requirements.
          </p>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<style lang="postcss" scoped>
h1 {
  @apply mb-8;
}
.status {
  @apply flex items-center;
  &.available {
    .status-icon {
      @apply text-available border-available bg-lime-100 dark:bg-lime-500/20;
    }
  }
  &.experimental {
    .status-icon {
      @apply text-experimental border-experimental bg-purple-100 dark:bg-purple-500/20;
    }
  }
  &.unavailable {
    .status-icon {
      @apply text-unavailable border-unavailable bg-rose-100 dark:bg-rose-500/20;
    }
  }
  .status-icon {
    @apply flex justify-center items-center w-6 h-6 border-solid border-1 rounded-full box-border;
  }
  .status-label {
    @apply ml-2.5;
  }
}
.box {
  @apply p-3 md:p-4 border-solid border-1 border-base rounded;
}
.panel {
  @apply px-3 md:px-4 py-3 bg-blue-50 dark:bg-blue-400/10 mt-4 rounded;
  .icon {
    @apply mr-2 text-blue-600 dark:text-blue-400;
  }
}
.label {
  @apply mb-1.5 text-sm text-dim font-bold;
}
.value {
  @apply flex items-center h-5;
}
</style>
