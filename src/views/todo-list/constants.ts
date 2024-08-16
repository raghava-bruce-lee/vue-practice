import { TODO_STATUS } from '@/models/todo';

export const TodoStatus: Record<TODO_STATUS, string> = {
  [TODO_STATUS.NOT_STARTED]: 'Not Started',
  [TODO_STATUS.IN_PROGRESS]: 'In Progress',
  [TODO_STATUS.DONE]: 'Done'
};
