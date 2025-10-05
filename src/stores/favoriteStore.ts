import {makeAutoObservable} from 'mobx';

import {EventSource} from '../types/event';
import {getString, setString} from '../services/storageService';
import {FavoriteItem} from '../types/favorite';
import {convertStringToFavoriteItemArray} from '../utils/favorite';

const FAVORITE_KEY = 'favorite_key';

export class FavoriteStore {
  favoriteEvents: FavoriteItem[] = [];

  constructor() {
    const valueFromStorage = getString(FAVORITE_KEY);
    if (valueFromStorage) {
      this.favoriteEvents = convertStringToFavoriteItemArray(valueFromStorage);
    }
    makeAutoObservable(this);
  }

  toggleFavorite(id: string, source: EventSource) {
    const itemIndex = this.favoriteEvents.findIndex(
      item => item.id === id && item.source === source,
    );
    if (itemIndex !== -1) {
      this.favoriteEvents = [
        ...this.favoriteEvents.slice(0, itemIndex),
        ...this.favoriteEvents.slice(itemIndex + 1),
      ];
    } else {
      this.favoriteEvents.push({id, source});
    }
    setString(FAVORITE_KEY, JSON.stringify(this.favoriteEvents));
  }

  isFavorite(id: string, source: EventSource): boolean {
    return !!this.favoriteEvents.find(
      item => item.id === id && item.source === source,
    );
  }
}

export const favoriteStore = new FavoriteStore();
