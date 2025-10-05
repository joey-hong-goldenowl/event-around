import {makeAutoObservable} from 'mobx';

import {Event, EventSource} from '../types/event';
import {getEvents} from '../services/apiService';

export class EventStore {
  events: Event[] = [];
  loading: boolean = false;
  error: string | null = null;
  selectedEvent: Event | null = null;
  selectedEventError: string | null = null;

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

  getSelectedEvent(id: string, source: EventSource) {
    this.selectedEvent =
      this.events.find(event => event.id === id && event.source === source) ??
      null;
    if (!this.selectedEvent) {
      this.selectedEventError = 'Event not found';
    }
  }

  clearSelectedEvent() {
    this.selectedEvent = null;
    this.selectedEventError = null;
  }
}

export const eventStore = new EventStore();
