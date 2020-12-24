import { Machine, assign, send } from 'xstate';
import { nanoid } from 'nanoid';
import { todosList } from '../data';

const fetchTodos = (context, event) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      // reject('Something went wrong...');
      if (event.str !== undefined && event.str !== '') {
        resolve(todosList.filter((item) => item.title.includes(event.str)));
      }
      resolve(todosList);
    }, 500);
  });

export const todoMachine = Machine({
  id: 'todos',
  initial: 'loading',
  context: {
    list: [],
    selected: [],
    error: {},
  },
  states: {
    loading: {
      invoke: {
        src: fetchTodos,
        onDone: {
          target: 'success',
          actions: assign({
            list: (context, event) => event.data,
          }),
        },
        onError: {
          target: 'failure',
          actions: assign({
            error: (context, event) => event.data,
          }),
        },
      },
    },
    success: {
      on: {
        COMPLETE_TODO: {
          actions: assign({
            selected: (context, event) => {
              const { selected } = context;

              if (selected.includes(event.id)) {
                return selected.filter((item) => item !== event.id);
              }
              return [...selected, event.id];
            },
          }),
        },
        ADD_TODO: {
          actions: assign({
            list: (context, event) => [
              ...context.list,
              { id: nanoid(), title: event.title },
            ],
          }),
        },
        REMOVE_TODO: {
          actions: assign({
            list: (context, event) =>
              context.list.filter((item) => item.id !== event.id),
            selected: (context, event) =>
              context.selected.filter((item) => item !== event.id),
          }),
        },
        FILTER_TODOS: {
          target: 'loading',
          actions: send((context, event) => ({
            type: 'FETCH_TODOS',
            str: event.str,
          })),
        },
        RESET_FILTERS: {
          target: 'loading',
          actions: send('FETCH_TODOS'),
        },
      },
    },
    failure: {
      on: {
        RETRY: { target: 'loading', actions: send('FETCH_TODOS') },
      },
    },
  },
});
