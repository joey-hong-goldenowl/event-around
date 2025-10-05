export enum EventSource {
  YELP = 'Yelp',
  FOURSQUARE = 'Foursquare',
  TICKETMASTER = 'Ticketmaster',
}

export type Event = {
  source: EventSource;
  id: string;
  name: string;
  description: string;
  location: string;
  startTime: string;
  endTime: string;
  url: string;
  image: string;
  category: string;
};
