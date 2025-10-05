import {EventSource} from './event';

// Define the type for our stack navigator
export type RootStackParamList = {
  Home: undefined;
  Details: {
    id: string;
    source: EventSource;
  };
};
