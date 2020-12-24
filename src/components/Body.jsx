import React, { useEffect, useState } from 'react';
import { useMachine } from '@xstate/react';
import classNames from 'classnames';
import { todoMachine } from '../state/todoMachine';
import './Body.css';

export function Body() {
  const [filterValue, setFilterValue] = useState('');
  const [addValue, setAddValue] = useState('');
  const [todos, send] = useMachine(todoMachine, { devTools: true });
  const { list, selected, error } = todos.context;

  useEffect(() => {
    send('FETCH_TODOS');
  }, []);

  return (
    <div className="container">
      <section className="body">
        <div className="body__status">{todos.value}</div>

        <h1 className="body__title">todo list</h1>

        <div className="body__content-wrapper">
          {todos.matches('loading') && (
            <div className="spinner-border" role="status" />
          )}

          {todos.matches('success') && (
            <>
              <div className="mb-3 d-flex align-items-end">
                <div>
                  <label htmlFor="filter" className="form-label">
                    Filter
                  </label>
                  <input
                    id="filter"
                    type="text"
                    className="form-control"
                    placeholder="todo title"
                    value={filterValue}
                    onChange={({ target: { value } }) => setFilterValue(value)}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary ml-3 btn-sm"
                  onClick={() => send('FILTER_TODOS', { str: filterValue })}
                >
                  Filter
                </button>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm ml-2"
                  onClick={() => send('RESET_FILTER')}
                >
                  reset
                </button>
              </div>

              <div className="mb-3 d-flex align-items-end">
                <div>
                  <label htmlFor="addTodo" className="form-label">
                    New todo
                  </label>
                  <input
                    id="addTodo"
                    type="text"
                    className="form-control"
                    placeholder="todo title"
                    value={addValue}
                    onChange={({ target: { value } }) => setAddValue(value)}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary ml-3 btn-sm"
                  onClick={() => send('ADD_TODO', { title: addValue })}
                >
                  Save
                </button>
              </div>

              <ul className="body__list list-group">
                {list.length === 0 ? (
                  <span style={{ color: '#fff' }}>Нет данных..</span>
                ) : (
                  list.map(({ id, title }) => {
                    const isChecked = selected.includes(id);

                    return (
                      <li
                        key={id}
                        className={classNames('list-group-item', {
                          'list-group-item-success': isChecked,
                        })}
                      >
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            id={`todo–${id}`}
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => send('COMPLETE_TODO', { id })}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`todo–${id}`}
                          >
                            {title}
                          </label>
                        </div>

                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => send('REMOVE_TODO', { id })}
                        >
                          delete
                        </button>
                      </li>
                    );
                  })
                )}
              </ul>
            </>
          )}

          {todos.matches('failure') && (
            <div>
              <p className="alert alert-danger" role="alert">
                {error}
              </p>

              <button
                className="btn btn-light"
                style={{ display: 'block', margin: '0 auto' }}
                type="button"
                onClick={() => send('RETRY')}
              >
                Retry
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
