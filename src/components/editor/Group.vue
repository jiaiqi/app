<template>
  <div class="es-group">
    <component
      :id="item.id"
      v-for="item in elements"
      :is="item.component!"
      v-bind="item.props"
      :style="item.groupStyle"
    >
      {{ item.text }}
    </component>
  </div>
</template>

<script setup lang="ts">
/* __placeholder__ */
import type { ComponentType } from '../../types';
import type { PropType } from 'vue';

defineProps({
  elements: {
    type: Array as PropType<Required<ComponentType>[]>,
    default: () => []
  }
})
</script>
