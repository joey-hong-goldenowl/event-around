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
    console.log('valueFromStorage', valueFromStorage);
    if (valueFromStorage) {
      this.favoriteEvents = convertStringToFavoriteItemArray(valueFromStorage);
    }
    makeAutoObservable(this);
  }

  toggleFavorite(id: string, source: EventSource) {
    if (
      this.favoriteEvents.find(item => item.id === id && item.source === source)
    ) {
      this.favoriteEvents = this.favoriteEvents.filter(
        item => item.id !== id && item.source !== source,
      );
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
