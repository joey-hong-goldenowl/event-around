import {Event} from '../../types/event';

export interface EventItemProps {
  data: Event;
  onViewDetails: (data: Event) => void;
}
