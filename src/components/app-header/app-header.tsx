import { FC } from 'react';
import { AppHeaderUI, Preloader } from '@ui';
import { useSelector } from '@store';

export const AppHeader: FC = () => {
  const { user } = useSelector((state) => state.user);
  const name = user?.name;

  return <AppHeaderUI userName={name} />;
};
