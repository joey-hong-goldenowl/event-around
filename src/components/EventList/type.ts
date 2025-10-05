import {Event} from '../../types/event';

export interface EventListProps {
  onViewEventDetails: (event: Event) => void;
}

export type EventListSection = {
  category: string;
  data: Event[];
};
