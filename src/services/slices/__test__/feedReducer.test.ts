import feedReducer, {
  getFeeds,
  getOrderByNumber,
  TFeedState
} from '../feedSlice';
import { TOrder } from '../../../utils/types';

describe('feedReducer', () => {
  const initialState: TFeedState = {
    orders: [],
    total: 0,
    totalToday: 0,
    loading: false,
    error: null
  };

  const orders: TOrder[] = [
    {
      _id: '123',
      status: 'done',
      name: 'Космический бургер',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
      number: 12345,
      ingredients: ['ingredient1', 'ingredient2']
    },
    {
      _id: '456',
      status: 'pending',
      name: 'Флюоресцентный бургер',
      createdAt: '2024-01-02',
      updatedAt: '2024-01-02',
      number: 12346,
      ingredients: ['ingredient3', 'ingredient4']
    }
  ];

  it('Возвращает корректное начальное состояние при инициализации', () => {
    const state = feedReducer.reducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual(initialState);
  });

  describe('Тест асинхронных экшенов', () => {
    describe('getFeeds', () => {
      it('getFeeds pending', () => {
        const action = { type: getFeeds.pending.type };
        const state = feedReducer.reducer(initialState, action);

        expect(state.loading).toBe(true);
        expect(state.error).toBe(null);
      });

      it('getFeeds rejected', () => {
        const state = {
          ...initialState,
          loading: true
        };

        const action = {
          type: getFeeds.rejected.type,
          error: { message: 'Ошибка сервера' }
        };
        const newState = feedReducer.reducer(state, action);

        expect(newState.loading).toBe(false);
        expect(newState.error).toBe('Ошибка сервера');
      });

      it('getFeeds fulfilled', () => {
        const state = {
          ...initialState,
          loading: true
        };

        const action = {
          type: getFeeds.fulfilled.type,
          payload: {
            orders: orders,
            total: 100,
            totalToday: 50
          }
        };

        const newState = feedReducer.reducer(state, action);

        expect(newState.loading).toBe(false);
        expect(newState.orders).toEqual(orders);
        expect(newState.total).toBe(100);
        expect(newState.totalToday).toBe(50);
      });
    });

    describe('getOrderByNumber', () => {
      it('getOrderByNumber pending', () => {
        const action = { type: getOrderByNumber.pending.type };
        const state = feedReducer.reducer(initialState, action);

        expect(state.loading).toBe(true);
        expect(state.error).toBe(null);
      });

      it('getOrderByNumber rejected', () => {
        const state = {
          ...initialState,
          loading: true
        };

        const action = {
          type: getOrderByNumber.rejected.type,
          error: { message: 'Заказ не найден' }
        };
        const newState = feedReducer.reducer(state, action);

        expect(newState.loading).toBe(false);
        expect(newState.error).toBe('Заказ не найден');
      });

      it('getOrderByNumber fulfilled', () => {
        const state = {
          ...initialState,
          loading: true
        };

        const newOrder: TOrder = {
          _id: '789',
          status: 'done',
          name: 'Новый бургер',
          createdAt: '2024-01-03',
          updatedAt: '2024-01-03',
          number: 12347,
          ingredients: ['ingredient5', 'ingredient6']
        };

        const action = {
          type: getOrderByNumber.fulfilled.type,
          payload: {
            orders: [newOrder]
          }
        };

        const newState = feedReducer.reducer(state, action);

        expect(newState.loading).toBe(false);
        expect(newState.orders).toEqual([newOrder]);
      });
    });
  });
});
