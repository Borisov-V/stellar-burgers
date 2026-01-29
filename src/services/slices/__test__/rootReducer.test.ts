import { rootReducer } from '../index';

describe('rootReducer', () => {
  it('Возвращает корректное начальное состояние при инициализации', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(initialState).toEqual({
      ingredients: {
        ingredients: [],
        loading: false,
        error: null
      },
      order: {
        bun: null,
        ingredients: [],
        orderRequest: false,
        orderModalData: null,
        error: null
      },
      feed: {
        orders: [],
        total: 0,
        totalToday: 0,
        loading: false,
        error: null
      },
      user: {
        isAuthChecked: false,
        user: null,
        orders: [],
        loading: false,
        error: null
      }
    });
  });
});
