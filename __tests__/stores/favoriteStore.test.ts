import {getString, setString} from '../../src/services/storageService';
import {FavoriteStore} from '../../src/stores/favoriteStore';
import {EventSource} from '../../src/types/event';
import {convertStringToFavoriteItemArray} from '../../src/utils/favorite';

jest.mock('../../src/services/storageService', () => ({
  getString: jest.fn(),
  setString: jest.fn(),
}));
jest.mock('../../src/utils/favorite', () => ({
  convertStringToFavoriteItemArray: jest.fn(),
}));

describe('FavoriteStore', () => {
  let store: FavoriteStore;

  beforeEach(() => {
    jest.clearAllMocks();
    store = new FavoriteStore();
  });

  describe('constructor', () => {
    it('should initialize with empty favoriteEvents if no storage value', () => {
      (getString as jest.Mock).mockReturnValue(null);
      store = new FavoriteStore();
      expect(store.favoriteEvents).toEqual([]);
      expect(getString).toHaveBeenCalledWith('favorite_key');
      expect(convertStringToFavoriteItemArray).not.toHaveBeenCalled();
    });

    it('should initialize with favoriteEvents from storage if value exists', () => {
      const mockFavorites = [{id: '1', source: EventSource.YELP}];
      (getString as jest.Mock).mockReturnValue('mocked_storage_value');
      (convertStringToFavoriteItemArray as jest.Mock).mockReturnValue(
        mockFavorites,
      );
      store = new FavoriteStore();
      expect(store.favoriteEvents).toEqual(mockFavorites);
      expect(getString).toHaveBeenCalledWith('favorite_key');
      expect(convertStringToFavoriteItemArray).toHaveBeenCalledWith(
        'mocked_storage_value',
      );
    });
  });

  describe('toggleFavorite', () => {
    it('should add a new favorite if it does not exist', () => {
      store.favoriteEvents = [];
      store.toggleFavorite('1', EventSource.YELP);
      expect(store.favoriteEvents).toEqual([
        {id: '1', source: EventSource.YELP},
      ]);
      expect(setString).toHaveBeenCalledWith(
        'favorite_key',
        JSON.stringify([{id: '1', source: EventSource.YELP}]),
      );
    });

    it('should remove a favorite if it exists', () => {
      store.favoriteEvents = [{id: '1', source: EventSource.YELP}];
      store.toggleFavorite('1', EventSource.YELP);
      expect(store.favoriteEvents).toEqual([]);
      expect(setString).toHaveBeenCalledWith('favorite_key', '[]');
    });

    it('should not remove other favorites when removing one', () => {
      store.favoriteEvents = [
        {id: '1', source: EventSource.YELP},
        {id: '2', source: EventSource.FOURSQUARE},
      ];
      store.toggleFavorite('1', EventSource.YELP);
      expect(store.favoriteEvents).toEqual([
        {id: '2', source: EventSource.FOURSQUARE},
      ]);
      expect(setString).toHaveBeenCalledWith(
        'favorite_key',
        JSON.stringify([{id: '2', source: EventSource.FOURSQUARE}]),
      );
    });

    it('should handle different event sources correctly', () => {
      store.favoriteEvents = [{id: '1', source: EventSource.YELP}];
      store.toggleFavorite('1', EventSource.TICKETMASTER);
      expect(store.favoriteEvents).toEqual([
        {id: '1', source: EventSource.YELP},
        {id: '1', source: EventSource.TICKETMASTER},
      ]);
      expect(setString).toHaveBeenCalledWith(
        'favorite_key',
        JSON.stringify([
          {id: '1', source: EventSource.YELP},
          {id: '1', source: EventSource.TICKETMASTER},
        ]),
      );
    });
  });

  describe('isFavorite', () => {
    it('should return true if the item is a favorite', () => {
      store.favoriteEvents = [{id: '1', source: EventSource.YELP}];
      expect(store.isFavorite('1', EventSource.YELP)).toBe(true);
    });

    it('should return false if the item is not a favorite', () => {
      store.favoriteEvents = [{id: '1', source: EventSource.YELP}];
      expect(store.isFavorite('2', EventSource.YELP)).toBe(false);
      expect(store.isFavorite('1', EventSource.FOURSQUARE)).toBe(false);
    });
  });
});
