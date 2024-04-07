import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { createTestingVuetify } from '@/plugins/testing/vuetify';
import { useTodoListStore } from '@/stores/todoList';
import ListRenderer from './ListRenderer.vue';
import { nextTick } from 'vue';

function getWrapper() {
  return mount(ListRenderer, {
    global: {
      plugins: [createTestingVuetify, createTestingPinia()]
    }
  });
}

const MOCK_TODOS = ['Todo 1', 'Todo 2'];

describe('ListRenderer', () => {
  it('should render default text when there is no todo lists', () => {
    const wrapper = getWrapper();
    const noTodoList = wrapper.find('[data-test="no-todo-list"] span');
    expect(noTodoList.text()).toBe('No Todo List');
  });

  it('should render the todo lists', async () => {
    const wrapper = getWrapper();
    const todoListStore = useTodoListStore();

    todoListStore.todoList = MOCK_TODOS;
    await nextTick();

    const todoListWrapper = wrapper.findAll('[data-test="todo-list"] > div');
    expect(todoListWrapper.length).toBe(2);

    const todoLists = wrapper.findAll('[data-test="todo-list"] > div > div');
    expect(todoLists[0].text()).toBe(MOCK_TODOS[0]);
    expect(todoLists[1].text()).toBe(MOCK_TODOS[1]);
  });

  it('should call the remove store action when the remove is clicked', async () => {
    const wrapper = getWrapper();
    const todoListStore = useTodoListStore();

    todoListStore.todoList = MOCK_TODOS;
    await nextTick();

    const removeTodoIcon = wrapper.findAll('[data-test="remove-todo-icon"]');
    await removeTodoIcon[1].trigger('click');

    expect(todoListStore.removeTodo).toHaveBeenCalledWith(1);
  });
});
