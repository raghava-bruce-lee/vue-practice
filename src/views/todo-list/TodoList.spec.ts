import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { createTestingVuetify } from '@/plugins/testing/vuetify';
import TodoList from './TodoList.vue';

function getWrapper() {
  return shallowMount(TodoList, {
    global: {
      plugins: [createTestingVuetify, createTestingPinia()]
    }
  });
}

describe('TodoList', () => {
  it('should render', () => {
    const wrapper = getWrapper();
    expect(wrapper.exists()).toBeTruthy();
  });
});
