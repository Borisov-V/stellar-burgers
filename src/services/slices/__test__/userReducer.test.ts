import userReducer, {
  checkUserAuth,
  loginUser,
  registerUser,
  updateUser,
  logoutUser,
  getOrders,
  initialState
} from '../userSlice';
import { TUser, TOrder } from '../../../utils/types';

describe('userReducer', () => {
  const user: TUser = {
    email: 'test@example.com',
    name: 'Тестовый Пользователь'
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
    const state = userReducer.reducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual(initialState);
  });

  describe('Тест асинхронных экшенов', () => {
    describe('checkUserAuth', () => {
      it('checkUserAuth pending', () => {
        const action = { type: checkUserAuth.pending.type };
        const state = userReducer.reducer(initialState, action);

        expect(state.loading).toBe(true);
        expect(state.error).toBe(null);
      });

      it('checkUserAuth rejected', () => {
        const state = {
          ...initialState,
          loading: true
        };

        const action = { type: checkUserAuth.rejected.type };
        const newState = userReducer.reducer(state, action);

        expect(newState.isAuthChecked).toBe(true);
        expect(newState.loading).toBe(false);
      });

      it('checkUserAuth fulfilled', () => {
        const state = {
          ...initialState,
          loading: true
        };

        const action = {
          type: checkUserAuth.fulfilled.type,
          payload: user
        };

        const newState = userReducer.reducer(state, action);

        expect(newState.isAuthChecked).toBe(true);
        expect(newState.user).toEqual(user);
        expect(newState.loading).toBe(false);
      });
    });

    describe('loginUser', () => {
      it('loginUser pending', () => {
        const action = { type: loginUser.pending.type };
        const state = userReducer.reducer(initialState, action);

        expect(state.loading).toBe(true);
        expect(state.error).toBe(null);
      });

      it('loginUser rejected', () => {
        const state = {
          ...initialState,
          loading: true
        };

        const action = {
          type: loginUser.rejected.type,
          error: { message: 'Неверный email или пароль' }
        };
        const newState = userReducer.reducer(state, action);

        expect(newState.loading).toBe(false);
        expect(newState.error).toBe('Неверный email или пароль');
      });

      it('loginUser fulfilled', () => {
        const state = {
          ...initialState,
          loading: true
        };

        const action = {
          type: loginUser.fulfilled.type,
          payload: user
        };

        const newState = userReducer.reducer(state, action);

        expect(newState.user).toEqual(user);
        expect(newState.loading).toBe(false);
        expect(newState.isAuthChecked).toBe(true);
      });
    });

    describe('registerUser', () => {
      it('registerUser pending', () => {
        const action = { type: registerUser.pending.type };
        const state = userReducer.reducer(initialState, action);

        expect(state.loading).toBe(true);
        expect(state.error).toBe(null);
      });

      it('registerUser rejected', () => {
        const state = {
          ...initialState,
          loading: true
        };

        const action = {
          type: registerUser.rejected.type,
          error: { message: 'Пользователь уже существует' }
        };
        const newState = userReducer.reducer(state, action);

        expect(newState.loading).toBe(false);
        expect(newState.error).toBe('Пользователь уже существует');
      });

      it('registerUser fulfilled', () => {
        const state = {
          ...initialState,
          loading: true
        };

        const action = {
          type: registerUser.fulfilled.type,
          payload: user
        };

        const newState = userReducer.reducer(state, action);

        expect(newState.user).toEqual(user);
        expect(newState.loading).toBe(false);
        expect(newState.isAuthChecked).toBe(true);
      });
    });

    describe('updateUser', () => {
      it('updateUser pending', () => {
        const action = { type: updateUser.pending.type };
        const state = userReducer.reducer(initialState, action);

        expect(state.loading).toBe(true);
        expect(state.error).toBe(null);
      });

      it('updateUser rejected', () => {
        const state = {
          ...initialState,
          loading: true
        };

        const action = {
          type: updateUser.rejected.type,
          error: { message: 'Ошибка обновления профиля' }
        };
        const newState = userReducer.reducer(state, action);

        expect(newState.loading).toBe(false);
        expect(newState.error).toBe('Ошибка обновления профиля');
      });

      it('updateUser fulfilled', () => {
        const state = {
          ...initialState,
          user: { email: 'old@example.com', name: 'Старое Имя' },
          loading: true
        };

        const updatedUser: TUser = {
          email: 'new@example.com',
          name: 'Новое Имя'
        };

        const action = {
          type: updateUser.fulfilled.type,
          payload: updatedUser
        };

        const newState = userReducer.reducer(state, action);

        expect(newState.user).toEqual(updatedUser);
        expect(newState.loading).toBe(false);
      });
    });

    describe('logoutUser', () => {
      it('logoutUser fulfilled', () => {
        const state = {
          ...initialState,
          user: user,
          orders: orders,
          isAuthChecked: true
        };

        const action = { type: logoutUser.fulfilled.type };
        const newState = userReducer.reducer(state, action);

        expect(newState.user).toBe(null);
        expect(newState.orders).toEqual([]);
      });
    });

    describe('getOrders', () => {
      it('getOrders pending', () => {
        const action = { type: getOrders.pending.type };
        const state = userReducer.reducer(initialState, action);

        expect(state.loading).toBe(true);
        expect(state.error).toBe(null);
      });

      it('getOrders rejected', () => {
        const state = {
          ...initialState,
          loading: true
        };

        const action = {
          type: getOrders.rejected.type,
          error: { message: 'Не удалось загрузить заказы' }
        };
        const newState = userReducer.reducer(state, action);

        expect(newState.loading).toBe(false);
        expect(newState.error).toBe('Не удалось загрузить заказы');
        expect(newState.orders).toEqual([]);
      });

      it('getOrders fulfilled', () => {
        const state = {
          ...initialState,
          loading: true
        };

        const action = {
          type: getOrders.fulfilled.type,
          payload: orders
        };

        const newState = userReducer.reducer(state, action);

        expect(newState.loading).toBe(false);
        expect(newState.orders).toEqual(orders);
        expect(newState.error).toBe(null);
      });
    });
  });
});
