import { computed, onMounted, onUnmounted, ref } from 'vue';
import type { ComputedRef, Ref } from 'vue';
import type { VuetifyTableElement } from '@/models/common';

interface tablePageScaling {
  tableHeight: ComputedRef<number>;
}

const DEFAULT_BOTTOM_SPACING = 16;
const V_CARD_BOTTOM_SPACING = 20;
const TABLE_FOOTER_HEIGHT = 54;
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
        height.value =
          window.innerHeight -
          (yTop + bottomSpacing + TABLE_FOOTER_HEIGHT + V_CARD_BOTTOM_SPACING + 1);
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
