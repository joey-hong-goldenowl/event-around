import {FavoriteItem} from '../types/favorite';
import {EventSource} from '../types/event';

const isValidEventSource = (value: unknown): value is EventSource => {
  return Object.values(EventSource).includes(value as EventSource);
};

export const convertStringToFavoriteItemArray = (
  value: string,
): FavoriteItem[] => {
  try {
    if (!value || typeof value !== 'string') {
      return [];
    }

    const parsed = JSON.parse(value);

    if (!Array.isArray(parsed)) {
      return [];
    }

    const validItems = parsed.filter(item => {
      if (typeof item !== 'object' || item === null) {
        return false;
      }

      const {id, source} = item as Record<string, unknown>;
      return (
        typeof id === 'string' && id.trim() !== '' && isValidEventSource(source)
      );
    });

    return validItems;
  } catch (error) {
    console.error('Invalid string:', error);
    return [];
  }
};
