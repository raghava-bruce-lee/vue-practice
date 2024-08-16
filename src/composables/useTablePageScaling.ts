import { computed, onMounted, onUnmounted, ref } from 'vue';
import type { ComputedRef, Ref } from 'vue';
import type { VuetifyTableElement } from '@/models/common';

interface tablePageScaling {
  tableHeight: ComputedRef<number>;
}

const DEFAULT_BOTTOM_SPACING = 18;
const FOOTER_HEIGHT = 60;
const MIN_HEIGHT = 300;

export function useTablePageScaling(
  tableRef: Ref<VuetifyTableElement | null>,
  pageContainerId: string,
  bottomSpacing = DEFAULT_BOTTOM_SPACING
): tablePageScaling {
  const height = ref(MIN_HEIGHT);

  function recalculateContainerHeight(): void {
    if (tableRef.value) {
      const yTop = tableRef.value.$el.getBoundingClientRect()?.top;
      if (yTop) {
        height.value = window.innerHeight - yTop - bottomSpacing - FOOTER_HEIGHT;
      }
    }
  }

  const observer = new ResizeObserver(recalculateContainerHeight);

  onMounted(() => {
    const targetNode = document.getElementById(pageContainerId);
    if (targetNode) observer.observe(targetNode);
  });

  onUnmounted(() => {
    observer.disconnect();
  });

  return {
    tableHeight: computed(() => (height.value > MIN_HEIGHT ? height.value : MIN_HEIGHT))
  };
}
