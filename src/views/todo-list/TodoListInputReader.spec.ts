import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { createTestingVuetify } from '@/plugins/testing/vuetify';
import { useTodoListStore } from '@/stores/todoList';
import TodoListInputReader from './TodoListInputReader.vue';

function getWrapper() {
  return mount(TodoListInputReader, {
    global: {
      plugins: [createTestingVuetify, createTestingPinia()]
    }
  });
}

describe('TodoListInputReader', () => {
  it('should not enable the button when the input filed is not a valid text', async () => {
    const wrapper = getWrapper();
    const button = wrapper.find('[data-test="add-todo-btn"]');
    expect(button.attributes().disabled).toBeDefined();
  });

  it('should call the store action when the button is clicked with the valid text', async () => {
    const wrapper = getWrapper();
    const todoListStore = useTodoListStore();
    const TODO = 'todo 1';

    const inputField = wrapper.find('[data-test="todo-input-field"] input');
    const button = wrapper.find('[data-test="add-todo-btn"]');

    await inputField.setValue(TODO);
    expect(button.attributes().disabled).toBeUndefined();

    await button.trigger('click');
    expect(todoListStore.addTodo).toHaveBeenCalledWith(TODO);
  });
});
