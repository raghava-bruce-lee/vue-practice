import { setActivePinia, createPinia } from 'pinia';
import { useTodoListStore } from './todoList';
import { nextTick } from 'vue';

const MOCK_TODO = ['Todo 1', 'Todo 2'];

describe('todoList store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('initial state', () => {
    it('should be a default value', () => {
      const todoListStore = useTodoListStore();
      expect(todoListStore.todoList).toEqual([]);
    });
  });

  describe('actions', () => {
    it('should add a todo list to the store', () => {
      const todoListStore = useTodoListStore();
      todoListStore.addTodo(MOCK_TODO[0]);
      expect(todoListStore.todoList).toEqual([MOCK_TODO[0]]);
    });

    it('should remove a todo list from the store', async () => {
      const todoListStore = useTodoListStore();
      todoListStore.todoList = [...MOCK_TODO];
      await nextTick();

      todoListStore.removeTodo(0);

      expect(todoListStore.todoList).toEqual([MOCK_TODO[1]]);
    });
  });
});
