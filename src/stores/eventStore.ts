import {makeAutoObservable} from 'mobx';

import {Event} from '../types/event';
import {getEvents} from '../services/apiService';

export class EventStore {
  events: Event[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchEvents() {
    this.loading = true;
    this.error = null;

    try {
      const response = await getEvents();
      this.events = response.events;
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Unknown error';
    } finally {
      this.loading = false;
    }
  }

  get eventsByCategory(): Record<string, Event[]> {
    return this.events.reduce(
      (accumulate, current) => {
        if (accumulate[current.category]) {
          accumulate[current.category] = [
            ...accumulate[current.category],
            current,
          ];
        } else {
          accumulate[current.category] = [current];
        }
        return accumulate;
      },
      {} as Record<string, Event[]>,
    );
  }
}

export const eventStore = new EventStore();
