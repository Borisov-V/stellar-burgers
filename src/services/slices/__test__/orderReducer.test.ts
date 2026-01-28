import orderReducer, {
  addIngredient,
  clearConstructor,
  createOrder,
  removeIngredient,
  initialState
} from '../orderSlice';
import { TConstructorIngredient, TOrder } from '../../../utils/types';

describe('orderReducer', () => {
  const bun: TConstructorIngredient = {
    id: '1',
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  };

  const main: TConstructorIngredient = {
    id: '2',
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  };

  const sauce: TConstructorIngredient = {
    id: '3',
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
  };

  it('Возвращает корректное начальное состояние при инициализации', () => {
    const state = orderReducer.reducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual(initialState);
  });

  it('Добавление булки в заказ', () => {
    const state = orderReducer.reducer(initialState, addIngredient(bun));

    expect(state).toEqual({ ...initialState, bun: bun });
  });

  it('Добавление начинки в заказ', () => {
    const state = orderReducer.reducer(initialState, addIngredient(main));

    expect(state).toEqual({ ...initialState, ingredients: [main] });
  });

  it('Добавление соуса в заказ', () => {
    const state = orderReducer.reducer(initialState, addIngredient(sauce));

    expect(state).toEqual({ ...initialState, ingredients: [sauce] });
  });

  it('Удаление ингредиента из заказа', () => {
    const state = { ...initialState, ingredients: [main, sauce] };
    const mainId = main.id;

    const newState = orderReducer.reducer(state, removeIngredient(mainId));

    expect(newState).toEqual({ ...initialState, ingredients: [sauce] });
  });

  it('Замена булки в заказе', () => {
    const state = {
      ...initialState,
      bun: bun
    };

    const newBun: TConstructorIngredient = {
      id: '4',
      _id: '643d69a5c3f7b9001cfa093d',
      name: 'Флюоресцентная булка R2-D3',
      type: 'bun',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/bun-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
    };

    const newState = orderReducer.reducer(state, addIngredient(newBun));

    expect(newState).toEqual({ ...initialState, bun: newBun });
  });

  it('Очистка конструктора', () => {
    const state = {
      ...initialState,
      bun: bun,
      ingredients: [main, sauce]
    };

    const newState = orderReducer.reducer(state, clearConstructor());

    expect(newState).toEqual(initialState);
  });

  describe('Тест асинхронных экшенов', () => {
    it('createOrder pending', () => {
      const action = { type: createOrder.pending.type };
      const state = orderReducer.reducer(initialState, action);

      expect(state.orderRequest).toBe(true);
      expect(state.error).toBe(null);
    });

    it('createOrder rejected', () => {
      const state = {
        ...initialState,
        orderRequest: true
      };

      const action = {
        type: createOrder.rejected.type,
        error: { message: 'Ошибка создания заказа' }
      };
      const newState = orderReducer.reducer(state, action);

      expect(newState.orderRequest).toBe(false);
      expect(newState.error).toBe('Ошибка создания заказа');
    });

    it('createOrder fulfilled', () => {
      const state = {
        ...initialState,
        bun: bun,
        ingredients: [main, sauce],
        orderRequest: true
      };

      const order: TOrder = {
        _id: '123',
        status: 'done',
        name: 'Космический бургер',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        number: 12345,
        ingredients: ['ingredient1', 'ingredient2']
      };

      const action = {
        type: createOrder.fulfilled.type,
        payload: order
      };

      const newState = orderReducer.reducer(state, action);

      expect(newState.orderRequest).toBe(false);
      expect(newState.orderModalData).toEqual(order);
      expect(newState.bun).toBe(null);
      expect(newState.ingredients).toEqual([]);
      expect(newState.error).toBe(null);
    });
  });
});
