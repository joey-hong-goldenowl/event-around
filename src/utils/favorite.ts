import {FavoriteItem} from '../types/favorite';

export const convertStringToFavoriteItemArray = (
  value: string,
): FavoriteItem[] => {
  try {
    const parsed = JSON.parse(value);
    return parsed as FavoriteItem[];
  } catch (error) {
    console.error('Invalid string:', error);
    return [];
  }
};
