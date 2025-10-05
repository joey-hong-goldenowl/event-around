import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

export const setString = (key: string, value: string): void => {
  try {
    storage.set(key, value);
  } catch (error) {
    console.error(`Error setting string for key ${key}:`, error);
  }
};

export const getString = (key: string): string | null => {
  try {
    const value = storage.getString(key);
    return value ?? null;
  } catch (error) {
    console.error(`Error getting string for key ${key}:`, error);
    return null;
  }
};
