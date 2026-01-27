import ingredientsReducer, {
  getIngredients,
  TIngredientsState
} from '../ingredientsSlice';
import { TIngredient } from '../../../utils/types';

describe('ingredientsReducer', () => {
  const initialState: TIngredientsState = {
    ingredients: [],
    loading: false,
    error: null
  };

  const ingredients: TIngredient[] = [
    {
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
    },
    {
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
    },
    {
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
    }
  ];

  it('Возвращает корректное начальное состояние при инициализации', () => {
    const state = ingredientsReducer.reducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    expect(state).toEqual(initialState);
  });

  describe('Тест асинхронных экшенов', () => {
    it('getIngredients pending', () => {
      const action = { type: getIngredients.pending.type };
      const state = ingredientsReducer.reducer(initialState, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
    });

    it('getIngredients rejected', () => {
      const state = {
        ...initialState,
        loading: true
      };

      const action = {
        type: getIngredients.rejected.type,
        error: { message: 'Ошибка загрузки ингредиентов' }
      };
      const newState = ingredientsReducer.reducer(state, action);

      expect(newState.loading).toBe(false);
      expect(newState.error).toBe('Ошибка загрузки ингредиентов');
      expect(newState.ingredients).toEqual([]);
    });

    it('getIngredients fulfilled', () => {
      const state = {
        ...initialState,
        loading: true
      };

      const action = {
        type: getIngredients.fulfilled.type,
        payload: ingredients
      };

      const newState = ingredientsReducer.reducer(state, action);

      expect(newState.loading).toBe(false);
      expect(newState.ingredients).toEqual(ingredients);
      expect(newState.error).toBe(null);
    });
  });
});
