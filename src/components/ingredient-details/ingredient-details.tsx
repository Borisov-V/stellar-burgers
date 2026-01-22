import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '@store';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { ingredients } = useSelector((state) => state.ingredients);

  const ingredient = ingredients.find((item) => item._id === id);

  if (!ingredient) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredient} />;
};
