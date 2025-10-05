import {MMKV} from 'react-native-mmkv';

import {getString, setString} from '../../src/services/storageService';

jest.mock('react-native-mmkv', () => {
  return {
    MMKV: jest.fn().mockImplementation(() => {
      const store = new Map();
      return {
        set: jest.fn((key: string, value: string) => store.set(key, value)),
        getString: jest.fn((key: string) => store.get(key) ?? undefined),
      };
    }),
  };
});

describe('Storage Functions', () => {
  let mockStorage: jest.Mocked<MMKV>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockStorage = new MMKV() as jest.Mocked<MMKV>;
  });

  describe('setString', () => {
    it('should set a string value successfully', () => {
      const key = 'testKey';
      const value = 'testValue';

      setString(key, value);

      expect(mockStorage.set).toHaveBeenCalledWith(key, value);
      expect(mockStorage.set).toHaveBeenCalledTimes(1);
    });

    it('should handle errors when setting a string', () => {
      const key = 'testKey';
      const value = 'testValue';
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      (mockStorage.set as jest.Mock).mockImplementation(() => {
        throw new Error('Storage error');
      });

      setString(key, value);

      expect(mockStorage.set).toHaveBeenCalledWith(key, value);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        `Error setting string for key ${key}:`,
        expect.any(Error),
      );
      consoleErrorSpy.mockRestore();
    });
  });

  describe('getString', () => {
    it('should retrieve a string value successfully', () => {
      const key = 'testKey';
      const value = 'testValue';
      (mockStorage.getString as jest.Mock).mockReturnValue(value);

      const result = getString(key);

      expect(mockStorage.getString).toHaveBeenCalledWith(key);
      expect(mockStorage.getString).toHaveBeenCalledTimes(1);
      expect(result).toBe(value);
    });

    it('should return null if no value exists for the key', () => {
      const key = 'testKey';
      (mockStorage.getString as jest.Mock).mockReturnValue(undefined);

      const result = getString(key);

      expect(mockStorage.getString).toHaveBeenCalledWith(key);
      expect(result).toBeNull();
    });

    it('should handle errors when getting a string', () => {
      const key = 'testKey';
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      (mockStorage.getString as jest.Mock).mockImplementation(() => {
        throw new Error('Storage error');
      });

      const result = getString(key);

      expect(mockStorage.getString).toHaveBeenCalledWith(key);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        `Error getting string for key ${key}:`,
        expect.any(Error),
      );
      expect(result).toBeNull();
      consoleErrorSpy.mockRestore();
    });
  });
});
