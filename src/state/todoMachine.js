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
    }, 1500);
  });

export const todoMachine = Machine({
  id: 'todos',
  initial: 'request',
  context: {
    list: [],
    selected: [],
    error: {},
  },
  states: {
    request: {
      on: { FETCH_TODOS: { target: 'loading' } },
    },
    loading: {
      invoke: {
        id: 'fetch data',
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
            selected: (ctx, event) => {
              const { selected } = ctx;

              if (selected.includes(event.id)) {
                return selected.filter((item) => item !== event.id);
              }
              return [...selected, event.id];
            },
          }),
        },
        ADD_TODO: {
          actions: assign({
            list: (ctx, event) => [
              ...ctx.list,
              { id: nanoid(), title: event.title },
            ],
          }),
        },
        REMOVE_TODO: {
          actions: assign({
            list: (ctx, event) =>
              ctx.list.filter((item) => item.id !== event.id),
            selected: (ctx, event) =>
              ctx.selected.filter((item) => item.id !== event.id),
          }),
        },
        FILTER_TODOS: {
          target: 'request',
          actions: send((ctx, event) => ({
            type: 'FETCH_TODOS',
            str: event.str,
          })),
        },
        RESET_FILTER: {
          target: 'loading',
          actions: send('FETCH_TODOS'),
        },
      },
    },
    failure: {
      on: {
        RETRY: {
          target: 'request',
          actions: send('FETCH_TODOS'),
        },
      },
    },
  },
});
